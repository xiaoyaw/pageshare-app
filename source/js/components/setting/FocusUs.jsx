var React = require('react');

var FocusUs = React.createClass({

	getInitialState: function() {
		var is_weixin = this.is_weixin();
		return {
			is_weixin: is_weixin
		};
	},
	is_weixin: function() {
		var ua = navigator.userAgent.toLowerCase();
		if (ua.match(/MicroMessenger/i) == "micromessenger") {
			return true;
		} else {
			return false;
		}
	},
	handleFocus: function(e) {
		if(sessionStorage.subscribe&&sessionStorage.focus){
			var sub=sessionStorage.getItem("subscribe");
			var focus=sessionStorage.getItem("focus");
			document.location = "http://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=" + focus + "==&scene=110#&wechat_redirect";
		}else{
			document.location = "http://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzIyNzE3NjM1Nw==&scene=110#&wechat_redirect";
		}

	},
	handleClick: function(e) {
		document.location = "http://yijiafeibo.com";
	},
	render: function() {
		return ( < div > {
			this.state.is_weixin ? < div className="well well-sm" onClick = {
				this.handleFocus
			} > <span className="glyphicon glyphicon-heart-empty"></span>&nbsp;&nbsp;关注我们< /div>:<div className="well well-sm"
			 onClick={this.handleClick}><span className="glyphicon glyphicon-heart-empty"></span>&nbsp;&nbsp;关注我们</div >
		} < /div>);
	}

});

module.exports = FocusUs;