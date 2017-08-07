import ChatItem from './ChatItem.jsx';
var React = require('react');

var MyFriend = React.createClass({
	getInitialState: function() {
		return {
			friends:[{
				src:'./img/boy.png',
				nickname:'小明',
				value:'user1'
			},{
				src:'./img/girl.png',
				nickname:'小红',
				value:'user2'
			},{
				src:'./img/boy.png',
				nickname:'小天',
				value:'user3'
			},{
				src:'./img/girl.png',
				nickname:'小芳',
				value:'user4'
			},{
				src:'./img/boy.png',
				nickname:'小李',
				value:'user5'
			}]
		};
	},
	handleClick:function(e){
		$('#collapseTwo').collapse('toggle');
	},
	render: function() {
		return (
	<div className="panel panel-warning " >
		<div className="panel-heading"  onClick={this.handleClick}>
			<h4 className="panel-title">
				<a data-toggle="collapse" data-parent="#accordion" 
				   href="#collapseTwo">
					我的好友
				</a>
			</h4>
		</div>
		<div id="collapseTwo" className="panel-collapse collapse">
			<div className="panel-body ">
				<ChatItem _data={this.state.friends}/>
			</div>
		</div>
	</div>
		);
	}

});

module.exports = MyFriend;