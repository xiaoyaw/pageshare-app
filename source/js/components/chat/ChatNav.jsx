var React = require('react');

var ChatNav = React.createClass({

	handleClick:function(e){
			 $('#tab-setting').tab('show');
	},

	render: function() {
		return (
			 <nav className="navbar navbar-default" role="navigation-top">
			 <div className="flex-top-container">
			 	<a className="nav-user" onClick={this.handleClick}><span className="glyphicon glyphicon-user"></span></a>
			 	<font className="nav-title">聊天</font>
			 	<div  className="dropdown pull-right nav-div-search"><a href="#" className="dropdown-toggle nav-user" id="dropdownMenu1" 
					data-toggle="dropdown"><span className="glyphicon glyphicon-search"></span></a>
			 		<ul className="dropdown-menu select-add" role="menu" aria-labelledby="dropdownMenu1">
						<li><a href="#" className="nav-add"> 添加好友</a></li>
						<li className="divider"></li>
						<li><a href="#" className="nav-add">添加群组</a></li>
						<li className="divider"></li>
						<li><a href="#" className="nav-add">创建聊天室</a></li>
					</ul>
			 	</div>
			 </div>
			 </nav>
		);
	}

});

module.exports = ChatNav;