/*
Copyrighted, 版权所有，奕甲智能技术（上海）有限公司 2015-2018
*/


import React from 'react';
import ReactDOM from 'react-dom';
import MainApp from './MainApp.jsx';
import Approom from './components/course/onlineroom/AppRoom.jsx'
import EreadRoom from './components/course/reader/EreadRoom.jsx';


import {
	Router,
	Route,
	hashHistory
} from 'react-router';

// 	ReactDOM.render(
//  <Router history={hashHistory}>
//  	<Route path="/" component={Login}/>
//  	<Route path="/wxlogin"  component={wxLogin}/>
//   	<Route path="/join" component={AppJoin}/>
//   	<Route path="/eread/:id" component={EreadRoom}/>
//    	<Route path="/room/:id" component={AppRoom}/>
// </Router>,document.getElementById('app'));


ReactDOM.render(<Router history={hashHistory}>
  	<Route path="/(:tab)" component={MainApp}/>
  	<Route path="/eread/:id" component={EreadRoom}/>
   	<Route path="/room/:id" component={Approom}/>
 </Router>,document.getElementById('app'));


window.addEventListener('click',function(e){
		e.preventDefault();
},false);