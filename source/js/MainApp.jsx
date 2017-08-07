import Chat from './components/chat/Chat.jsx';
import Course from './components/course/Course.jsx';
import Setting from './components/setting/Setting.jsx';


var React = require('react');

var MainApp = React.createClass({
    

    componentDidMount:function(){
        var tab=this.props.params.tab;
       if(tab=="course"){
         $('#tab-course').tab('show');
       }
    },

	render: function() {
		return (
			<div>
			     <div className="tab-content">
    		          <div className="tab-pane fade in active" id="chat-div">
    			         <Chat/>
    		          </div>
    		          <div className="tab-pane fade" id="class-div">
    			         <Course/>
    		          </div>
    		          <div className="tab-pane fade" id="setting-div">
    			         <Setting/>
    		          </div>
			     </div>
                <div className="navbar-fixed-bottom flex-bottom-container " role="navigation-bottom" id='nav-bottom'>
                    <a  id="tab-chat" href="#chat-div" data-toggle="tab" className="tab-button"><span className="glyphicon glyphicon-comment"></span></a>
                    <a id="tab-course" href="#class-div" data-toggle="tab" className="tab-button"><span className=" glyphicon glyphicon-th-list"></span></a>
                    <a id="tab-setting"  href="#setting-div" data-toggle="tab" className="tab-button"><span className="glyphicon glyphicon-cog"></span></a>
                </div>
			</div>
		);
	}

});

module.exports = MainApp;