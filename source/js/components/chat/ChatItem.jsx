var React = require('react');

var ChatItem = React.createClass({
	render: function() {
		var data = this.props._data;
		return ( < div > {
			data.map(function(user) {
				return <a 
				href="#"
				key = {
					user.value
				} > <div className = "friend-item"><img className = "user-headimage"
				src = {
					user.src
				}
				/><font className="user-nickname">{user.nickname}</font> </div></a>
			})
		} < /div>);
	}

});

module.exports = ChatItem;