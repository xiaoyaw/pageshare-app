import CourseItem from './CourseItem.jsx';
import CourseJoinNav from './CourseJoinNav.jsx';

var React = require('react');

var CourseList = React.createClass({
	getInitialState: function() {
		return {
			data_recent:[],
			data_now:[
			{sessionID:"2001",time:"07-26 11:50:18"},{sessionID:"2002",time:"07-26 11:50:18"}
			],
			data_my:[
			{sessionID:"pub",time:"07-25 11:50:18"},{sessionID:"2001",time:"07-26 11:50:18"},{sessionID:"2002",time:"07-26 11:50:18"}
			],
		};
	},
	componentWillMount:function(){
		if(sessionStorage.recent){
			var recent=JSON.parse(sessionStorage.getItem("recent"));
			this.setState({
				data_recent:recent 
			});
		}else{
			var recent=this.state.data_recent;
			var timenow=this.getAndFormatTime();
			var pub={sessionID:"pub",time:timenow};
			recent.push(pub);
			this.setState({
				data_recent:recent 
			},function(){
				sessionStorage.setItem("recent",JSON.stringify(recent));
			});
		}
	},
	componentDidMount:function(){
			$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
				$('.join_input').val("");
			});
	},
	getAndFormatTime:function(){
			var time=new Date();
			var month=time.getMonth()+1;
			if(month<10){
				month="0"+month
			}
			var day=time.getDate();
			if(day<10){
				day="0"+day;
			}
			var hour=time.getHours();
			if(hour<10){
				hour="0"+hour;
			}
			var minute=time.getMinutes();
			if(minute<10){
				minute="0"+minute;
			}
			var seconds=time.getSeconds();
			if(seconds<10){
				seconds="0"+seconds;
			}
			return month+"-"+day+"  "+hour+":"+minute+":"+seconds
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