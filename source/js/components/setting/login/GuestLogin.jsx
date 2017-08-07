import {
	Router,
	Route,
	hashHistory
} from 'react-router';

var React = require('react');

var GuestLogin = React.createClass({

	handleClick:function(e){
		this.getcode('guest','111111');
	},

	getcode: function(user, pass) {
		var thiz = this;
		$.post("http://www.pictoshare.net/index.php?controller=apis&action=login", {
				login_info: user,
				password: pass
			},
			function(data, status) {
				if (data != '') {
					var value = JSON.parse(data);
					if (value.status == "success") {
						thiz.getUserInfo(value.tokenkey);
					}
				}
		});
	},
	getUserInfo: function(token) {
		var thiz = this;
		$.post("http://www.pictoshare.net/index.php?controller=apis&action=getmemberinfo", {
				tokenkey: token
			},
			function(data, status) {
				var value = JSON.parse(data);
				if (value.status == "success") {
					var un = value.info.username;
					var pw = value.info.password;
					if (un != '' && un != null && pw != '' && pw != null) {
						thiz.localSave(un, pw);
					}
				}
		});
	},
	localSave: function(u, p) {
		if (typeof(Storage) !== "undefined") {
			sessionStorage.setItem("username", u);
			sessionStorage.setItem("nickname", u);
			sessionStorage.setItem("password", p);
		}
		 $('#logintype').modal('hide');
		 window.location.reload(false);
	},
	render: function() {
		return (
			<button className="logintype" onClick={this.handleClick}>游客登录</button>
		);
	}

});

module.exports = GuestLogin;