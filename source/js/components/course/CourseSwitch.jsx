var React = require('react');

var CourseSwitch = React.createClass({

	getInitialState: function() {
		return {
			left: 20,
			top: 270,
			isMouseDown: false,
			downX: null, //按下的x坐标
			downY: null, //按下的y坐标
			dx: null, //对于父组件的x坐标
			dy: null,
			isMove: false, //相对于父组件的y坐标
			isCourse: false
		};
	},
	componentDidMount: function() {
			var maxH=this.props._maxHeight-65,
			maxW=this.props._maxWidth-65;
			var moveX, moveY,nowleft,nowtop;
			var hastouch = "ontouchstart" in window ? true : false, //判断是否为移动设备
				slideStart = hastouch ? "touchstart" : "mousedown",
				slideMove = hastouch ? "touchmove" : "mousemove",
				slideEnd = hastouch ? "touchend" : "mouseup";
			var objectSlider = hastouch ? this.refs.slider : window;
			var thiz = this;
			var slider = this.refs.slider;
			slider.addEventListener(slideStart, function(e) {
				var x = hastouch ? e.targetTouches[0].pageX : e.pageX;
				var y = hastouch ? e.targetTouches[0].pageY : e.pageY;
				var w = hastouch ? e.targetTouches[0].pageX - thiz.state.left : e.pageX - thiz.state.left;
				var h = hastouch ? e.targetTouches[0].pageY - thiz.state.top : e.pageY - thiz.state.top;
				//alert(w);
				thiz.setState({
					isMouseDown: true,
					downX: x,
					downY: y,
					dx: x - w,
					dy: y - h
				});
			}, false);
			objectSlider.addEventListener(slideMove, function(ev) {
				if (thiz.state.isMouseDown) {
					moveX = hastouch ? ev.targetTouches[0].pageX : ev.pageX;
					moveY = hastouch ? ev.targetTouches[0].pageY : ev.pageY;
					nowleft=thiz.state.dx + moveX - thiz.state.downX;
					nowtop=thiz.state.dy + moveY - thiz.state.downY;
					if(nowleft>=0&&nowleft<=maxW&&nowtop>=0&&nowtop<=maxH){
							thiz.setState({
								isMove: true,
								left: nowleft,
								top: nowtop
							});
					}else{
							thiz.setState({
								isMove: true
							});
					}
				}
				ev.preventDefault();
			}, false);
			slider.addEventListener(slideEnd, function(ev) {
				if (thiz.state.isMove) {
					thiz.setState({
						isMove: false
					});
					ev.preventDefault();
				} else {
					thiz.setState({
						isCourse: !thiz.state.isCourse
					});
				}
				thiz.setState({
					isMouseDown: false
				});
				if (typeof(Storage) !== "undefined") {
					sessionStorage.setItem("model", thiz.state.isCourse);
				}
			}, false);

			// window.addEventListener(slideEnd, function(ev) {
			// 	thiz.setState({
			// 		isMouseDown: false
			// 	});
			// }, false);
	},
	render: function() {
		var shadow = this.state.isMouseDown ? '0px 0px 20px #0AFFB6' : '0px 0px 20px #73FAFF';
		var sClass = this.state.isCourse ? 'glyphicon glyphicon-book' : 'glyphicon glyphicon-user';
		var	name = this.state.isCourse ? '课件' : '课程';
		var color = this.state.isCourse ? '#F0F8FF' : '#F0FFFF';
		var tabhref=this.state.isCourse?'#course_file_list':'#course_list';
		return ( < a ref = "slider"
			id = 'switch'
			href={tabhref}

			data-toggle="tab"
			style = {
				{	
					boxShadow: shadow,
					borderRadius: '30%',
					backgroundColor: color,
					textAlign: 'center',
					lineHeight: '60px',
					width: '65px',
					height: '65px',
					position: 'absolute',
					left: this.state.left,
					top: this.state.top,
					zIndex: 999999,
					opacity: 0.8,
					cursor: 'pointer'
				}
			} >
			< span style = {
				{
					color: '#ffaabb'
				}
			}

			className = {
				sClass
			} > < /span> {name}< /a > );
	}

});


module.exports = CourseSwitch;