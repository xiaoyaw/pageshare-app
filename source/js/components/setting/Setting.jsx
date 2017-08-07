import NotLoginNav from './NotLoginNav.jsx';
import LoginType from './LoginType.jsx';
import HasLoginedNav from './HasLoginedNav.jsx';

var React = require('react');

var Setting = React.createClass({
	getInitialState: function() {
		return {
			isLogin:false
		};
	},
	componentWillMount:function(){
		//是否异步登录过
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
	handleExit:function(e){
		sessionStorage.clear();
		window.location.reload(false);
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
			this.state.isLogin?<div>
				<HasLoginedNav/>
				<div className="exit-app"><button onClick={this.handleExit}><span className="glyphicon glyphicon-log-out">退出登录</span></button></div>
			</div>:<div>
				<NotLoginNav/>
				<LoginType/>
			</div>
		);
	}

});

module.exports = Setting;