import CourseSwitch from './CourseSwitch.jsx';
import CourseFileList from './CourseFileList.jsx';
import CourseList from './CourseList.jsx';
var React = require('react');

var Course = React.createClass({
	getInitialState: function() {
		var h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
		w=window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

		return {
			courseWidth:w,
			courseHeight: h -65
		};
	},
	componentDidMount:function(){
		$('#nav-bottom').fadeIn();
	},
	render: function() {
		return ( <div>
			<CourseSwitch  _maxHeight={this.state.courseHeight} _maxWidth={this.state.courseWidth}/ >
			<div className="tab-content">
				<CourseList _maxHeight={this.state.courseHeight} />
				<CourseFileList _maxHeight={this.state.courseHeight}/>
			</div>
			</div>
		);
	}

});

module.exports = Course;