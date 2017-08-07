import ChatItem from './ChatItem.jsx';
var React = require('react');

var ChatRoom = React.createClass({
	getInitialState: function() {
		return {
			rooms:[{
				src:'./img/room.png',
				nickname:'商务会议',
				value:'room1'
			},{
				src:'./img/room.png',
				nickname:'内部会议',
				value:'room2'
			}]
		};
	},
	handleClick:function(e){
		$('#collapseFour').collapse('toggle');
	},
	render: function() {
		return (
	<div className="panel panel-info" >
		<div className="panel-heading" onClick={this.handleClick}>
			<h4 className="panel-title" >
				<a data-toggle="collapse" data-parent="#accordion" 
				   href="#collapseFour">
					聊天室
				</a>
			</h4>
		</div>
		<div id="collapseFour" className="panel-collapse collapse">
			<div className="panel-body">
					<ChatItem _data={this.state.rooms}/>
			</div>
		</div>
	</div>
		);
	}

});

module.exports = ChatRoom;