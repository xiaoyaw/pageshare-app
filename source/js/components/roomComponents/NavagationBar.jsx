import MyVideo from './navBar/MyVideo.jsx';
import Home from './navBar/Home.jsx';
import Share from './navBar/Share.jsx';


var React = require('react');

var NavagationBar = React.createClass({
	componentWillMount:function(){
		document.body.addEventListener('touchstart', function () {
			//绑定touch  IOS按钮active兼容性
		});
	},
	render: function() {
		return ( < div id = 'nnn'
			style = {
				{
					zIndex: 10,
					opacity: 0.7,
					position: 'absolute',
					left: '0px',
					top: '0px',
					width: '100%'
				}
			} >

			< ul className = 'nav nav-pills' >
			< li > < img id = 'logo'
			src = 'img/pageshare.png' / > < /li>  < li > < Home / > < /li > < li > < MyVideo / > < /li> < li > < Share / > < /li > < /ul >  < /div>
		);
	}

});

module.exports = NavagationBar;