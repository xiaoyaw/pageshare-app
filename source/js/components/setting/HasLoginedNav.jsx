var React = require('react');

var HasLoginedNav = React.createClass({

	getInitialState: function() {
		var appid,redirect;
		if(document.location.href.split('pageshare').length==2){
			appid="wx6573103bb78bec40";
			redirect="http://h5.pageshare.net/dev/build";	
		}else{
			appid="wxe818778f16e4400d";
			redirect="http://h5.pageshare.net/pageshare/build";
		}
		return {
			nickname:"pageshare",
			headimage:"img/user.png",
			code:'',
			appid:appid,
			redirect:redirect  
		};
	},
	componentWillMount:function(){
		if(this.is_weixin()){
			var req = new Object();
			req = this.getRequest();
			var code = req['code'];
			if (code != '' && code != undefined) {
				this.setState({
						code: code
					}, function() {
					this.getuserinfo();
				});
			}else{
			this.setState({
				nickname:sessionStorage.getItem('nickname') 
			},function(){
				console.log(this.state.nickname);
			});
		}
		}else{
			this.setState({
				nickname:sessionStorage.getItem('nickname') 
			},function(){
				console.log(this.state.nickname);
			});
		}
	},
			
	getuserinfo: function() {
		var thiz=this;
			var cc = this.state.code;
			var appid = this.state.appid;
			$.ajax({
				async: false,
				url: "php/oauth2_sub.php",
				type: "POST",
				data: {
					code: cc,
					appid: appid
				},
				timeout: 5000,
				success: function(result) {
					var arry = result.split(":");
					var subscribe = arry[3];
						if (arry[2] != '' && arry[0] != '' && arry[1] != '' && arry[3] != '') {
							this.localSave(arry[2], arry[3], arry[0], arry[1]);
						}else{
							sessionStorage.clear();
							document.location=thiz.state.redirect;
						}
				}.bind(this),
			});
	},
	localSave: function(n, s, o, t) {
		if (typeof(Storage) !== "undefined") {
			sessionStorage.setItem("nickname", n);
			sessionStorage.setItem("subscribe", s);
			sessionStorage.setItem("username", o);
			sessionStorage.setItem("password", t);
			this.setState({
				nickname:sessionStorage.getItem('nickname') 
			});

			// this.setState({
			// 	headimage:sessionStorage.getItem('headimage') 
			// });
		}
	},
	is_weixin:function(){
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
		return (
			<nav className="navbar navbar-default" role="navigation-top">
			 	<img id="setting_bg" src="img/lg-bg.jpg" className="setting-lg-bg"/>
			 			<img className="user-headimg" src={this.state.headimage}/>
			 			<h4 className="user-nick">{this.state.nickname}</h4>
			 </nav>
		);
	}

});

module.exports = HasLoginedNav;