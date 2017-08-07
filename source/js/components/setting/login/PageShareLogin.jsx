var React = require('react');

var PageShareLogin = React.createClass({
	getInitialState: function() {
		return {
			warning:"密码" 
		};
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
				}else{
						thiz.setState({
							warning:"服务器繁忙" 
						},function(){
							$('#pageshare_pwd').val('');
						});
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
					}else{
						thiz.setState({
							warning:"输入有误" 
						},function(){
							$('#pageshare_pwd').val('');
						});
					}
				}else{
						thiz.setState({
							warning:"密码位数不正确" 
						},function(){
							$('#pageshare_pwd').val('');
						});
				}
		});
	},
	handleClick:function(e){
		var usa=$('#pageshare_usa').val();
		var pwd=$('#pageshare_pwd').val();
		if(usa!=''&&pwd!=''){
			this.getcode(usa,pwd);
		}
	},
	render: function() {
		return (
			<div>
				<button className="logintype" data-toggle="collapse" 
					data-target="#pagesharelogininput">飞播账号</button>
				<div id="pagesharelogininput" className="collapse">
						<input type="text" className="input-username" id="pageshare_usa" placeholder="账号"/>
						<br/>
						<input type="password" className="input-username" id="pageshare_pwd" placeholder={this.state.warning}/>
						<br/>
						<button className="usa-pwd-login" onClick={this.handleClick}>登录</button>
				</div>
			</div>
		);
	}

});

module.exports = PageShareLogin;