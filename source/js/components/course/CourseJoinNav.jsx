import {
	hashHistory
} from 'react-router';

var React = require('react');

var CourseJoinNav = React.createClass({

	handleClick:function(e){
		var roomid=$('.join_input').val();
		if(roomid!=""){
			var audio = document.getElementById("myaudio");
				audio.src='./img/kong.mp3';
				audio.play();
			hashHistory.replace('/room/'+roomid);
		}
		
	},
	render: function() {
		return (
			<div className="input-group join-nav" >
				<span className="input-group-addon">课号 ： </span>
				<input  type="text"  className="form-control join_input"/>
				<span className="input-group-btn">
					<button className="btn btn-default" type="button" id="join_classroom" onClick={this.handleClick}>
					加入</button>
				 </span>
			</div>
		);
	}

});

module.exports = CourseJoinNav;