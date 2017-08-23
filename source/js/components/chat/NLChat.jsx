var React = require('react');

var NLChat = React.createClass({
	getInitialState: function() {
		var h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
			return {
				height: h
			};
	},

	render: function() {
		return ( < div style = {
				{
					width: '100%',
					height: this.state.height+"px",
					lineHeight:this.state.height+"px",
					textAlign:'center'
				}
			} >
				        <a href="#setting-div" data-toggle="tab" >
          					<span className="glyphicon glyphicon-share-alt"></span>&nbsp;&nbsp;去登录
        				</a>
			< /div>
		);
	}

});

module.exports = NLChat;