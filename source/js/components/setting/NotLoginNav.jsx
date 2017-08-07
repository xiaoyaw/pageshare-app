var React = require('react');

var NotLoginNav = React.createClass({
	handleClick:function(e){
		$('#logintype').modal('show');
	},

	render: function() {
		return (
			 <nav className="navbar navbar-default" role="navigation-top">
			 	<img id="setting_bg" src="img/lg-bg.jpg" className="setting-lg-bg"/>
			 			<button className="login" data-toggle="modal" data-target="#logintype" onClick={this.handleClick}>登录</button>
			 			<button className="register">注册</button>
			 </nav>
		);
	}

});

module.exports = NotLoginNav;