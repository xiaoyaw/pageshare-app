import CourseItem from './CourseItem.jsx';
import CourseJoinNav from './CourseJoinNav.jsx';

var React = require('react');

var CourseList = React.createClass({
	getInitialState: function() {
		return {
			data_recent:[
			{sessionID:"pub",time:"07-25 11:50:18"},{sessionID:"2001",time:"07-26 11:50:18"},{sessionID:"2002",time:"07-26 11:50:18"}
			],
			data_now:[
			{sessionID:"pub",time:"07-25 11:50:18"},{sessionID:"2001",time:"07-26 11:50:18"},{sessionID:"2002",time:"07-26 11:50:18"}
			],
			data_my:[
			{sessionID:"pub",time:"07-25 11:50:18"},{sessionID:"2001",time:"07-26 11:50:18"},{sessionID:"2002",time:"07-26 11:50:18"}
			],
		};
	},
	componentDidMount:function(){
			$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
				$('.join_input').val("");
			});
	},
	render: function() {
		return (
			<div className="tab-pane fade in active" id="course_list">
				<div>
					<ul id="myTab" className="nav nav-pills course-nav course-nav-container">
						<li className="active "><a className="nav-li" href="#course_recent" data-toggle="tab">最近</a></li>
						<li><a href="#course_now" data-toggle="tab">当前</a></li>
						<li><a href="#course_my" data-toggle="tab">我的</a></li>
					</ul>
				<div id="myTabContent" className="tab-content">
					<div className="tab-pane fade in active" id="course_recent">
						<CourseJoinNav/>
						<CourseItem _maxHeight={this.props._maxHeight} _data={this.state.data_recent}/>
					</div>
					<div className="tab-pane fade" id="course_now">
						<CourseJoinNav/>
						<CourseItem _maxHeight={this.props._maxHeight} _data={this.state.data_now}/>
					</div>
					<div className="tab-pane fade" id="course_my">
						<CourseJoinNav/>
						<CourseItem  _maxHeight={this.props._maxHeight} _data={this.state.data_my}/>
					</div>
				</div>
				</div>
			</div>
		);
	}

});

module.exports = CourseList;