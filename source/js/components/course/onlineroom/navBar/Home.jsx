import {
	hashHistory
} from 'react-router';

var React = require('react');

var Home = React.createClass({

	// componentDidMount:function(){
	// 	if(this.isMounted()){
	// 		$('#exit').on('click',function(){
				
	// 		})
	// 	}
	// },
	handleClick:function(e){
		hashHistory.replace('/course');
	},
	render: function() {
		return ( < a id = 'exit'
			onClick={this.handleClick}> < span className = "glyphicon glyphicon-home" > < /span> </a >
		);
	}


});

module.exports = Home;