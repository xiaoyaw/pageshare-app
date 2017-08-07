import ChatNav from './ChatNav.jsx';
import MyFriend from './MyFriend.jsx';
import MyGroup from './MyGroup.jsx';
import ChatRoom from './ChatRoom.jsx';

var React = require('react');

var Chat = React.createClass({
	getInitialState: function() {
		var h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
		return {
			chatHeight: h - 145
		};
	},
	componentDidMount:function(){
		$('#nav-bottom').fadeIn();
	},
	render: function() {
		return ( 
			< div >
			< ChatNav / >
			< div className = "panel-group"
			id = "accordion"  style = {
				{
					width:'100%',
					overflowY:'auto',
					height:this.state.chatHeight+'px',
					maxHeight:this.state.chatHeight+'px'
				}
			} >
			< MyFriend / >
			< MyGroup / >
			< ChatRoom / >
			< /div> < /div>
		);
	}

});

module.exports = Chat;