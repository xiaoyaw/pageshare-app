import ChatItem from './ChatItem.jsx';
var React = require('react');

var MyGroup = React.createClass({
	getInitialState: function() {
		return {
			groups:[{
				src:'./img/group.png',
				nickname:'java群',
				value:'group1'
			},{
				src:'./img/group.png',
				nickname:'react群',
				value:'group2'
			},{
				src:'./img/group.png',
				nickname:'c++群',
				value:'group3'
			}]
		};
	},
	handleClick:function(e){
		$('#collapseThree').collapse('toggle');
	},
	render: function() {
		return (
	<div className="panel panel-success">
		<div className="panel-heading"  onClick={this.handleClick}>
			<h4 className="panel-title" >
				<a data-toggle="collapse" data-parent="#accordion" 
				   href="#collapseThree">
					我的群组
				</a>
			</h4>
		</div>
		<div id="collapseThree" className="panel-collapse collapse">
			<div className="panel-body">
				<ChatItem _data={this.state.groups}/>
			</div>
		</div>
	</div>
		);
	}

});

module.exports = MyGroup;