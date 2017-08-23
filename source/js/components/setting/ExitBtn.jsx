var React = require('react');

var ExitBtn = React.createClass({

	handClick:function(e){
		sessionStorage.clear();
		window.location.reload(false);
	},

	render: function() {
		return (
			<div className="well well-sm" onClick={this.handClick}>
				<span className="glyphicon glyphicon-log-out"></span>&nbsp;&nbsp;退出
			</div>
		);
	}

});

module.exports = ExitBtn;