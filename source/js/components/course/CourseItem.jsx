var React = require('react');

var CourseItem = React.createClass({
	handleClick:function(item){
		$(".join_input").val(item.sessionID);
	},
	render: function() {
		var height=this.props._maxHeight;
		var data=this.props._data;
		var thiz=this;
		return (
			<div 
			style = {
				{
					width:'100%',
					overflowY:'auto',
					height:height-120+'px',
					maxHeight:height-120+'px'
				}
			} >
				<div className="list-group ">
				{
					data.map(function(item){
						return 	<a href="#" key = {item.sessionID} onClick={function(){
							thiz.handleClick(item)
						}}><div className="course-li-container"> 
							<img src="./img/chat.png" className="course-li-img"/><font className="course-li-font">{item.sessionID}</font><font className="course-li-font">{item.time}</font>
						</div></a>				
					})
				}
				</div>
			</div>
		);
	}

});

module.exports = CourseItem;