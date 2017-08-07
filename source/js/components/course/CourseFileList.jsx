import CourseFileItem from './CourseFileItem.jsx';

var React = require('react');

var CourseFileList = React.createClass({
	getInitialState: function() {
			return {
				source:[{
					sourceName:"依赖心",
					sourcePic:"./img/pageshare.png"
				},{
					sourceName:"Soccer",
					sourcePic:"./img/pageshare.png"
				},{
					sourceName:"blank",
					sourcePic:"./img/pageshare.png"
				},{
					sourceName:"double",
					sourcePic:"./img/pageshare.png"
				},{
					sourceName:"furelise",
					sourcePic:"./img/pageshare.png"
				},{
					sourceName:"user_guide",
					sourcePic:"./img/pageshare.png"
				},{
					sourceName:"公开课",
					sourcePic:"./img/pageshare.png"
				}],
				record:[],
				online:[{
					sourceName:"2001",
					sourcePic:"./img/pageshare.png"
				},{
					sourceName:"2002",
					sourcePic:"./img/pageshare.png"
				}] 
			};
		},	
	componentWillMount:function(){
		var thiz=this;
			$.ajax({
			async: true,
			url: "php/getAllLiv.php",
			type: 'GET',
			timeout: 5000,
			success: function(res) {
				var obj=JSON.parse(res);
				thiz.setState({
					record:obj 
				});
			}
		})
	},
	render: function() {
		var maxh=this.props._maxHeight-50;
		return (
			<div className="tab-pane fade" id="course_file_list">
				<div>
					<ul id="myTab" className="nav nav-pills course-nav course-nav-container">
						<li className="active"><a href="#course_file_file" data-toggle="tab">素材</a></li>
						<li><a href="#course_file_return" data-toggle="tab">回放</a></li>
						<li><a href="#course_file_online" data-toggle="tab">在线</a></li>
					</ul>
				<div id="myTabContent" className="tab-content coursefile-cotainer">
					<div className="tab-pane fade in active" id="course_file_file" style={
						{
							width:'100%',
							overflowY:'auto',
							height:maxh+'px',
							maxHeight:maxh+'px'
						}
					}>
						<CourseFileItem _maxHeight={this.props._maxHeight} _data={this.state.source}/>
					</div>
					<div className="tab-pane fade" id="course_file_return" style={
						{
							width:'100%',
							overflowY:'auto',
							height:maxh+'px',
							maxHeight:maxh+'px'
						}
					}>
						<CourseFileItem _maxHeight={this.props._maxHeight} _data={this.state.record}/>
					</div>
					<div className="tab-pane fade" id="course_file_online" style={
						{
							width:'100%',
							overflowY:'auto',
							height:maxh+'px',
							maxHeight:maxh+'px'
						}
					}>
						<CourseFileItem _maxHeight={this.props._maxHeight} _data={this.state.online}/>
					</div>
				</div>
				</div> 
			</div>
		);
	}

});

module.exports = CourseFileList;