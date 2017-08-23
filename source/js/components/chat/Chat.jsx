import ChatNav from './ChatNav.jsx';
import MyFriend from './MyFriend.jsx';
import MyGroup from './MyGroup.jsx';
import ChatRoom from './ChatRoom.jsx';
import NLChat from './NLChat.jsx';

var React = require('react');

var Chat = React.createClass({
	getInitialState: function() {
		var h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
		return {
			chatHeight: h - 145,
			isLogin:false
		};
	},
	componentWillMount:function(){
		if (sessionStorage.username&&sessionStorage.nickname) {
			this.setState({
				isLogin: true
			});
		}else {
			this.setState({
				isLogin: false
			});
		}

		//是否为wechat redirect 过来的
		if(this.is_weixin()){
			var req = new Object();
			req = this.getRequest();
			var code = req['code'];
			if (code != '' && code != undefined) {
				this.setState({
					isLogin:true
				});
			}
		}
	},
	componentDidMount:function(){
		$('#nav-bottom').fadeIn();
	},
	
	is_weixin: function() {
		var ua = navigator.userAgent.toLowerCase();
		if (ua.match(/MicroMessenger/i) == "micromessenger") {
			return true;
		} else {
			return false;
		}
	},
	getRequest: function() {
		var url = document.location.search;
		var theRequest = new Object();
		var strs;
		if (url.indexOf("?") != -1) {
			var str = url.substr(1);
			strs = str.split("&");
			for (var i = 0; i < strs.length; i++) {
				theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
			}
		}
		return theRequest;
	},

	render: function() {
		return (<div> 
			{this.state.isLogin?< div >
			< ChatNav / >
			< div className = "panel-group"
			id = "accordion"  style = {
				{
					width:'100%',
					overflowY:'auto',
					height:this.state.chatHeight+'px',
					maxHeight:this.state.chatHeight+'px'
				}
			} >
			< MyFriend / >
			< MyGroup / >
			< ChatRoom / >
			< /div> < /div>:<NLChat/>}
			</div>
		);
	}

});

module.exports = Chat;