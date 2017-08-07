/*
 * 包裹canvas,bgimg的组件
 * 连接websocket，handleMessage
 * 计算尺寸大小位置以及resize以后重新计算
 * 在handleMessage中播放video，audio。1、没有加入video子组件的原因是 导航栏按钮无法获取此子组件的DOM节点
 * 2、没有放在canvas中处理视频的原因是 此组件任何state变化都会导致render方法执行，从而导致视频或音频重复播放
 */
import React from 'react';
import Canvas from './blackBoard/Canvas.jsx';
import BgImage from './blackBoard/BgImage.jsx';
//import OpenAudio from './alertComponent/OpenAudio.jsx';
import OpenShare from './alertComponent/OpenShare.jsx';
import Loading from './alertComponent/Loading.jsx';
import {
  hashHistory
} from 'react-router';
let Application = React.createClass({
  getInitialState: function() {

    var audio = document.getElementById('myaudio');
    var video = document.getElementById('myvideo');
    //禁止选中
    if (typeof(document.onselectstart) != "undefined") {
      // IE下禁止元素被选取        
      document.onselectstart = new Function("return false");
    }
    return {
      connection: null,
      //liv
      user: '',
      pwd: '',
      isStop: false,
      pageIndex: 0,
      pageNum: 0,
      res: null,
      livsize: [],
      dataNow: 0,
      audio: audio,
      audioCollect: [],
      video: video,
      interTime: '',
      userName: null,
      scaleX: null, //给canvas  X轴图片或笔迹伸缩量
      scaleY: null, //给canvas  Y轴图片或笔迹伸缩量
      src: "./img/welcome.png", //给imgae的
      width: null, //给image  canvse的
      height: null, //给image  canvse的
      left: null, //给image  canvse的
      top: null, //给image  canvse的
      data: null, //从ws接收的数据传递给canvas处理
      img_width: null, //将图片原始宽高传递过去，计算加入者尺寸和图片尺寸比例
      img_height: null, //将图片原始宽高传递过去，计算加入者尺寸和图片尺寸比例
      startVideo: '',
      allVideo: ''
    };
  },

  //搁置
  handleResize: function(e) {
    if (this.isMounted()) {
      this.calculateImgProp(this.state.src);
    }
  },
  componentWillUnmount() {
    var that = this;
    var username = this.state.username;
    var audio = document.getElementById('myaudio');
    var video = document.getElementById('myvideo');
    audio.pause();
    audio.src = '';
    video.pause();
    video.src = '';
    window.clearInterval(this.state.interTime);
    var roomid = this.props._roomid;
    this.state.connection.send($pres({
      from: that.state.user + "@" + Config.XMPP_DOMAIN,
      to: roomid + "@conference." + Config.XMPP_DOMAIN + "/" + that.state.user,
      type: "unavailable"
    }).tree());
  },

  //渲染以后？ 设置为以前收不到Message
  componentDidMount: function() {
    var thiz = this;
    if (this.isMounted()) {
      //
      this.calculateImgProp(this.state.src);
      //
      if (typeof(Storage) !== "undefined") {
        // if (sessionStorage.username) {
          this.setState({
            //user: sessionStorage.getItem("username"),
            //pwd: sessionStorage.getItem("password")
            user: "demo",
            pwd: "111111"
          }, function() {
            var jid = this.state.user + "@" + Config.XMPP_DOMAIN;
            this.state.connection = new Strophe.Connection(Config.XMPP_BOSH_SERVICE);
            this.state.connection.connect(jid, thiz.state.pwd, thiz.onConnect);
          });
        // }
      }
      window.addEventListener('resize', this.handleResize);
    }
  },
  onConnect: function(status) {
    var roomid = this.props._roomid;
    var that = this;
    //console.log(status);
    if (status == Strophe.Status.CONNFAIL) {
      alert("连接失败！");
    } else if (status == Strophe.Status.AUTHFAIL) {
      alert("登录失败！");
    } else if (status == Strophe.Status.DISCONNECTED) {
      alert("连接断开！");
    } else if (status == Strophe.Status.CONNECTED) {
      //console.log("连接成功！");

      $('#loading').fadeOut();

      // 当接收到<message>节，调用onMessage回调函数
      this.state.connection.addHandler(that.onMessage, null, 'message', null, null, null);

      // 首先要发送一个<presence>给服务器（initial presence）
      this.state.connection.send($pres().tree());
      // 发送<presence>元素，加入房间
      this.state.connection.send($pres({
        from: that.state.user + "@" + Config.XMPP_DOMAIN,
        to: roomid + "@conference." + Config.XMPP_DOMAIN + "/" + that.state.user
      }).c('x', {
        xmlns: 'http://jabber.org/protocol/muc'
      }).tree());

      this.state.connection.send($iq({
        from: that.state.user + "@" + Config.XMPP_DOMAIN + "/Smack",
        to: roomid + "@conference." + Config.XMPP_DOMAIN + "/" + that.state.user,
        id: "pageshare_unlockroom",
        type: "set"
      }).c('query', {
        xmlns: 'http://jabber.org/protocol/muc#owner'
      }).c('x', {
        xmlns: "jabber:x:data",
        type: "submit"
      }).tree());
    }
  },
  onMessage: function(msg) {
    // 解析出<message>的from、type属性，以及body子元素
    var from = msg.getAttribute('from');
    var type = msg.getAttribute('type');
    var elems = msg.getElementsByTagName('body');
    if (type == "groupchat" && elems.length > 0) {
      var body = elems[0];
      var obj = this.xmppToWs(Strophe.getText(body));
      if (obj != undefined) {
        this.handleMessage(obj);
      }
    }
    return true;
  },
  xmppToWs: function(msg) {
    var cmd = msg.split("##")[1].substring(0, 4);
    var obj;
    switch (cmd) {
      case "imag":
        obj = {
          cmd: "image",
          image: msg.split("!!##image##!!")[1]
        }
        break;
      case "path":
        var properties = msg.split("!!##path[")[1].split("]##!!")[0].split(",");
        var oo = JSON.parse(window.atob(msg.split("]##!!")[1]));
        oo.properties = {
          color: properties[0],
          weight: properties[1],
          width: properties[2],
          height: properties[3]
        }
        oo.cmd = "path";
        obj = oo;
        break;
      case "text":
        var stext = msg.split("!!##text[")[1].split("]")[0].split(",");
        obj = {
          cmd: "text",
          stext: {
            width: stext[2],
            height: stext[3],
            color: stext[4],
            line: stext[5],
            text: stext[6],
            x: stext[0],
            y: stext[1]
          }
        }
        break;
      case "icon":
        var sicon = msg.split("!!##icon[")[1].split("]")[0].split(",");
        obj = {
          cmd: "icon",
          sicon: {
            rid: sicon[6],
            width: sicon[4],
            height: sicon[5],
            x: sicon[0],
            y: sicon[1],
            x2: sicon[2],
            y2: sicon[3]
          }

        }
        break;
      case "eras":
        var properties = msg.split("!!##erase[")[1].split("]##!!")[0].split(",");
        var oo = JSON.parse(window.atob(msg.split("]##!!")[1]));
        oo.properties = {
          width: properties[2],
          height: properties[3]
        };
        oo.cmd = "erase";
        obj = oo;
        break;
      case "sour":
        var source = msg.split("!!##source[")[1].split("]##!!")[0].split(",");
        switch (source[0]) {
          case "voice":
            obj = {
              cmd: "urlvoice",
              url: source[1]
            }
            break;

          case "video":
            obj = {
              cmd: "urlvideo",
              url: source[1]
            }
            break;
        }
        break;
    }
    return obj;
  },

  getWindowSize: function() {
    var ww = window.innerWidth;
    var wh = window.innerHeight;
    if (window.innerWidth) { // 兼容火狐，谷歌,safari等浏览器
      ww = window.innerWidth;
    } else if ((document.body) && (document.body.clientWidth)) { // 兼容IE浏览器
      ww = document.body.clientWidth;
    }
    if (window.innerHeight) {
      wh = window.innerHeight;
    } else if ((document.body) && (document.body.clientHeight)) {
      wh = document.body.clientHeight;
    }
    return {
      window_width: ww,
      window_height: wh
    };

  },
  calculateImgProp: function(src) {
    var thiz = this;
    //预先获取图片的宽高
    var pic = new Image();
    pic.src = src;
    //先计算图片长宽比例
    pic.onload = function() {
      var ratio = pic.width / pic.height;
      //获取屏幕宽高
      var w = thiz.getWindowSize().window_width;
      var h = thiz.getWindowSize().window_height;
      //按照高度缩放
      if (h * ratio <= w) {
        thiz.setState({
          img_width: pic.width,
          img_height: pic.height,
          scaleY: h / pic.height, //X坐标需要伸缩量
          scaleX: h * ratio / pic.width, //Y坐标需要伸缩量
          width: h * ratio, //canvas,图片宽
          height: h, //canvas,图片高
          left: (w - h * ratio) / 2, //居中后偏左多少
          top: 0 //居中后偏右多少
        });
      } else { //顶齐top

        var offtop = (h - w / ratio) / 2;
        if (offtop < $('#nnn').height()) {
          thiz.setState({
            img_width: pic.width,
            img_height: pic.height,
            scaleY: w / ratio / pic.height,
            scaleX: w / pic.width,
            width: w,
            height: w / ratio,
            left: 0,
            top: 0
          });
        } else {
          thiz.setState({
            img_width: pic.width,
            img_height: pic.height,
            scaleY: w / ratio / pic.height,
            scaleX: w / pic.width,
            width: w,
            height: w / ratio,
            left: 0,
            top: offtop
          });
        }
      }
      thiz.setState({
        src: src
      });
    }
  },
  playbothaudio: function() {
    var that = this;
    var audio = this.state.audio;
    if (audio.ended || audio.paused) {
      if (this.state.audioCollect.length > 0) {
        audio.src = this.state.audioCollect.shift();
        audio.play();
      }
    } else {
      var is_playFinish = setInterval(
        function() {
          if (audio.ended) {
            that.playbothaudio();
            window
              .clearInterval(is_playFinish);
          }
        }, 10);
    }
  },
  saveaudio: function(src) {
    var newArry = this.state.audioCollect;
    newArry.push(src);
    this.setState({
      audioCollect: newArry
    }, function() {
      this.playbothaudio();
    });
  },
  handleMessage: function(msg) {
    var thiz = this;
    this.setState({
      isResize: false
    });
    var value = msg;
    switch (value.cmd) {
      case "login":
        //账号密码为空时
        break;
      case "Error":
        //console.log('XMPP no response');
        //hashHistory.replace('/');
        //roomID为空时
        break;
      case "startSession":
        //不知道什么时候触发
        this.calculateImgProp('img/welcome.png');
        break;
      case "joinSession":
        //加入房间后触发，先判断有无历史记录背景图
        if (value.image != undefined) {
          this.calculateImgProp('data:image/png;base64,' + value.image);
        } else { //没有背景图计算并展示welcome
          this.calculateImgProp('img/welcome.png');
        }
        break;

      case "image":
        //注意：换background的时候，需要将data置空
        this.setState({
          data: null,
          audioCollect: []
        }, function() {
          this.state.audio.pause();
        });
        this.calculateImgProp('data:image/png;base64,' + value.image);

        break;

      case "urlvoice":
        // if (sessionStorage.getItem('openaudio') == 'isOpen') {
          this.saveaudio(value.url);
        // }
        break;

      case "voice":
        // if (sessionStorage.getItem('openaudio') == 'isOpen') {
          this.saveaudio("data:audio/mpeg;base64," + value.voice);
        // }
        break;

      case "urlvideo":
        $('#myvideo').fadeIn();
        var video = document.getElementById('myvideo');
        video.src = value.url;
        video.play();
        var is_playFinish = setInterval(function() {
          if (video.ended) {
            $('#myvideo').fadeOut();
            window.clearInterval(is_playFinish);
          }
        }, 10);
        break;

      case "openvideo":
        this.setState({
          startVideo: this.state.startVideo + value.video,
          allVideo: ''
        });
        break;

      case "video":
        if (this.state.startVideo != '') { //过滤若为历史记录video片段
          $('#myvideo').fadeIn();
          this.setState({
            allVideo: this.state.startVideo + value.video,
            startVideo: ''
          });
          var video = document.getElementById('myvideo');
          video.src = 'data:video/mp4;base64,' + this.state.allVideo;
          video.play();
          var is_playFinish = setInterval(function() {
            if (video.ended || video.paused) {
              $('#myvideo').fadeOut();
              window.clearInterval(is_playFinish);
            }
          }, 10);
        }
        break;

      default:
        this.setState({
          data: value
        });
    }
  },

  render: function() {
    //  resize  video size and position
    var video = document.getElementById('myvideo');
    video.width = this.state.width;
    video.height = this.state.height;
    video.style.left = this.state.left + 'px';
    video.style.top = this.state.top + 'px';

    return ( < div >

      < BgImage _src = {
        this.state.src
      }
      _width = {
        this.state.width
      }
      _height = {
        this.state.height
      }
      _left = {
        this.state.left
      }
      _top = {
        this.state.top
      }
      />   < Canvas _img_width = {
      this.state.img_width
    }
    _img_height = {
      this.state.img_height
    }

    _scaleX = {
      this.state.scaleX
    }
    _scaleY = {
      this.state.scaleY
    }
    _data = {
      this.state.data
    }
    _left = {
      this.state.left
    }
    _top = {
      this.state.top
    }
    _width = {
      this.state.width
    }
    _height = {
      this.state.height
    }
    / >   
        < Loading/>
      < OpenShare / >
      < /div >
  );
}


});

export default Application;