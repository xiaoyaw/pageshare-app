var React = require('react');

var WeChatLogin = React.createClass({
	handleClick:function(e){
		if(document.location.href.split('pageshare').length==2){
			document.location="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx6573103bb78bec40&redirect_uri=http%3a%2f%2fh5.pageshare.net%2fdev%2fbuild&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
		}else{
			document.location="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxe818778f16e4400d&redirect_uri=http%3a%2f%2fh5.pageshare.net%2fpageshare%2fbuild&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
		}
	},
	render: function() {
		return (
			<button className="logintype" onClick={this.handleClick}>微信登录</button>
		);
	}

});

module.exports = WeChatLogin;