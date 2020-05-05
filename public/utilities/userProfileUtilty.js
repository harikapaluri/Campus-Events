let userProfile=require('./../models/userProfile');
var express = require('express');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
const ConnDB = require("./../utilities/connDB");
const connDB = new ConnDB();

var addConnection=  function(rsvp,id,userID){
    //Creating a connection model for a new connection with specified rsvp value
	let connection=require('./../models/Connection');

  	//Setting rsvp value
    
    
return connection;
};

var removeConnection= function(array,connectionId){
//removes the UserConnection associated with the given connection.
var counter=0;
 for(let item of array){
    if(item.connectionId===connectionId){
        array.splice(counter,1);   //Deleting information from array
        
    	  	break;
    }
    counter=counter+1;
    }
    return array;
}
var updateConnection = function(array,connection,id,rsvp,userID){
//updates an RSVP property for a specified UserConnection
 var flag=0; //Flag variable for identifying a unique object in the connections list.
 var counter=0; //This is for getting the location for updation

 for(let item of array){
    if(item.connectionId===id){
        array[counter].rsvp=rsvp;
         
    	flag=1;
    	break;
    }
    counter=counter+1;
    }
    //Its a new item and has to be pushed
    if(flag===0)
    {
    	array.push(connection);
      }
return array;
}
var getUserConnections= function(){
//

}


module.exports.addConnection =addConnection;
module.exports.removeConnection=removeConnection;
module.exports.updateConnection =updateConnection
module.exports.getUserConnections=getUserConnections;