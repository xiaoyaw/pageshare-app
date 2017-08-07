import GuestLogin from './login/GuestLogin.jsx';
import WeChatLogin from './login/WeChatLogin.jsx';
import PageShareLogin from './login/PageShareLogin.jsx';


var React = require('react');

var LoginType = React.createClass({
	getInitialState: function() {
		var isweichat=this.is_weixin();
		return {
			isWeiChat: isweichat
		};
	},
	is_weixin:function(){
		var ua = navigator.userAgent.toLowerCase();
		if (ua.match(/MicroMessenger/i) == "micromessenger") {
			return true;
		} else {
			return false;
		}
	},
	render: function() {
		return (
			<div className="modal fade" id="logintype" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header align-center">
								<h6>────选择登录方式────</h6>
						</div>
						<div className="modal-body align-center">
						{
							this.state.isWeiChat?<div><div>
							<WeChatLogin/>
							</div>	
							<div>	
							<PageShareLogin/>
							</div>
							<div>	
							<GuestLogin/>
							</div>
							</div>:<div><div>	
							<PageShareLogin/>
							</div>
							<div>	
							<GuestLogin/>
							</div>
							</div>
						}
						</div>
					</div>
				</div>
			</div>
		);
	}

});

module.exports = LoginType;