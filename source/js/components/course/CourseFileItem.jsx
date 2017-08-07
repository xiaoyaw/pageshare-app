import {
  hashHistory
} from 'react-router';

var React = require('react');

var CourseFileItem = React.createClass({
  

  handleClick:function(item){
      var audio = document.getElementById("myaudio");
        audio.src='./img/kong.mp3';
        audio.play();
        hashHistory.replace('/eread/'+item.sourceName.split('.liv')[0]);
  },
	render: function() {
    var coursefile=this.props._data;
    var thiz=this;
		return (
				  <div className="container">
                  <div className="row">
                     {
                        coursefile.map(function(item){
                           return    <div key={item.sourceName+ new Date()} onClick={function(){
              thiz.handleClick(item)
            }} className="col-xs-6 col-sm-4 col-md-3 col-lg-2">
                                          <div className="thumbnail">
                                                <img src={item.sourcePic}
                                                   alt="通用的占位符缩略图"/>
                                                <div className="caption item-dec">
                                                    <h4>{item.sourceName}</h4>
                                                </div>
                                          </div>
                                     </div>
                        })
                     }
                  </div>
				   </div>
		);
	}

});

module.exports = CourseFileItem;