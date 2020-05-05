let userProfile = require("../models/userProfile");

var mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

var userProfileSchema = new mongoose.Schema({
userID:{type: String, default: "0000"},rsvp:{type: String, default: "0000"},connections:{type: Array, default: "0000"},userName:{type: String, default: "0000"},
});

userProfileDB = mongoose.model("userProfile",userProfileSchema);

class UserProfileDB{

//Getting the count of connections in the db that have a certain Id.
getCountOfConnections(id){

return new Promise((resolve, reject) => {
      userProfileDB
        .find({connections:{$elemMatch:{connectionId:id}}})
        .count()
        .then((data) => {
         
          //resolve with array of data object
          resolve(data);
        })
        .catch((err) => {
          return reject(err);
        });
    });




}


//Getting userProfile information
  getuserProfile(UserID) {
  return new Promise((resolve,reject)=>{
  userProfileDB.find({userID:UserID})
   .then((data) => {
 var userProfileData;
  data.forEach((userprofiles) => {
  	     console.log(userprofiles);
            let UserProfile = new userProfile();
             UserProfile.setUserID(userprofiles.userID);
             UserProfile.setRsvp(userprofiles.rsvp);
             UserProfile.setConnections(userprofiles.connections); 
             UserProfile.setUserName(userprofiles.userName);
           userProfileData=UserProfile;
          });

    //resolve with sending a desired userProfile data
          resolve(userProfileData);

   })
  .catch((err) => {
          return reject(err);
        });

  });

  }
  // adding a new document
  addNewProfileData(userprofiles) {
  	
    return new Promise((resolve, reject) => {
      let theProfileData = new userProfileDB({
        userName:userprofiles.userName,
        userID:userprofiles.userID,
        rsvp:userprofiles.rsvp,
        connections:userprofiles.connections,

      });

      theProfileData.save(function (err, data) {
        console.log("Profile data  added.");
        if (data) resolve(data);
        else return reject(err);
      });
    });
  }
  //Update  connections in a userProfile for a certain userId
 findAndUpdate(UserID,connectionsArray){
   return new Promise((resolve, reject) => {
      userProfileDB
        .findOneAndUpdate(
          {
            $and: [
              { userID:UserID },
              
            ],
          },
          { $set: { connections: connectionsArray } },
            function (err, data) {
            console.log("User Profile Updated");
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
module.exports = UserProfileDB;