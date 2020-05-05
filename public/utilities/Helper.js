var express = require('express');
var userProfileUtilty=require('./../utilities/userProfileUtilty');
let userProfile=require('./../models/userProfile');
const moment=require('moment');
const today = moment();
var bodyParser = require('body-parser');

//This function aims to compare an existing connection's rsvp value from the db
//and the current rsvp value of the connection selected by a user.If the value is different then we need to update db
var compare=function(Arr1,arr2,id){
   var a;
   var b;
	for(var i=0;i<Arr1.length;i++){
		if(Arr1[i].connectionId===id){
			a=Arr1[i].rsvp;
			break;
		}
	}
	for(var i=0;i<arr2.length;i++){
		if(arr2[i].connectionId===id){
			a=arr2[i].rsvp;
			break;
		}
	}
	if(a===b){
		return false;
	}else{
		return true;
	}

}
var getUniqueId=function(lastrecord){
	var connId=lastrecord[0].connectionId;

    var connectionNumber=Number(connId.substring(1));
   connectionNumber=connectionNumber+1;
  var connection="F"+connectionNumber;
return connection;
}

var validDate=function(date){
	//Past date not allowed
	//Invalid month not allowed.
	//Invalid year not allowed
	var a=true;
		if( moment(date, "YYYY-MM-DD", true).isValid()){

		if(moment(date).isBefore(today)){
			a=false;
		}
       	}else{
		a=false;
	}
  return a;
}


module.exports.validDate=validDate;
module.exports.getUniqueId =getUniqueId;
module.exports.compare=compare;