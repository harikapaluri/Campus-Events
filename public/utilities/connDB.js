let Connection = require("../models/Connection");

var mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

var connectionSchema = new mongoose.Schema({
 host:{type: String, default: "0000"},connectionId
:{type: String, default: "0000"},name:{type: String, default: "0000"},topic:{type: String, default: "0000"},details:{type: String, default: "0000"},date:{type: String, default: "0000"},time:{type: String, default: "0000"},where:{type: String, default: "0000"},icon:{type: String, default: "0000"},
   rsvp:{type: String, default: "0000"},userID:{type: String, default: "0000"},
});

connDB = mongoose.model("Connection", connectionSchema);


//To get all the connections from the DB
class ConnDB{

//This to generate a unique connectionId everytime a connection is created
getLastTerm(){
     return new Promise((resolve, reject) => {
       connDB
      .find({})
      .sort({'_id':-1})
      .limit(1)
      .then((data) => {
         
          //resolve with array of data object
          resolve(data);
          console.log(data);
        })
        .catch((err) => {
          return reject(err);
        });
   
});
}

getConnections() {
    
    return new Promise((resolve, reject) => {
      connDB
        .find({})
        .then((data) => {
          console.log("fetched all connection data from db");

          let Connections = [];
          data.forEach((connections) => {
            let connection = new Connection();
               connection.setHost(connections.host);
    connection.setConnectionId(connections.connectionId);
    connection.setName(connections.name);
    connection.setTopic(connections.topic);
    connection.setDetails(connections.details) ;
     connection.setDate(connections.date);
      connection.setTime(connections.time);
       connection.setWhere(connections.where);
        connection.setIcon(connections.icon);
        connection.setRsvp(connections.rsvp);
          

            Connections.push(connection);
          });

          //resolve with array of data object
          resolve(Connections);
        })
        .catch((err) => {
          return reject(err);
        });
    });
  }
  //Getting connection object for a particular connection Id  from dB
  getConnection(connectionID) {
  return new Promise((resolve,reject)=>{
  connDB.find({connectionId:connectionID})
   .then((data) => {
 var connectionData;
  data.forEach((connections) => {
            let connection = new Connection();
               connection.setHost(connections.host);
    connection.setConnectionId(connections.connectionId);
    connection.setName(connections.name);
    connection.setTopic(connections.topic);
    connection.setDetails(connections.details) ;
     connection.setDate(connections.date);
      connection.setTime(connections.time);
       connection.setWhere(connections.where);
        connection.setIcon(connections.icon);
        connection.setRsvp(connections.rsvp);
          connectionData=connection;

           
          });

    //resolve with sending a desired connection object
          resolve(connectionData);

   })
  .catch((err) => {
          return reject(err);
        });

  });

  }
  // adding a new document
  addNewConnection(connection) {
  	//console.log(connection);
    return new Promise((resolve, reject) => {
      let theConnection = new connDB({
       host:connection.host,connectionId
:connection.connectionId,name:connection.name,topic:connection.topic,details:connection.details,date:connection.date,time:connection.time,where:connection.where,
   rsvp:"Yes",userID:connection.userID,

      });

      theConnection.save(function (err, data) {
        console.log("connection added.");
        if (data) resolve(data);
        else return reject(err);
      });
    });
  }

//Finding a connection and updating its value.

  updateConnection(id,connection) {
    return new Promise((resolve, reject) => {
      connDB
        .findOneAndUpdate(
          {
            $and: [
              { connectionId:id },
             
              
            ],
          },
          { $set: { userID: connection.getUserID(),rsvp:connection.getRsvp() } },
            function (err, data) {
            console.log("Connection data updated");
            console.log(data);
            resolve(data);
          }
        )
        .catch((erro) => {
          return reject(err);
        });
    });
  } 

}

// export only class with methods to make sure, other part of this app can't modify hardcoded data.
module.exports = ConnDB;