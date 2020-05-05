let User = require("../models/User");

var mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

var userSchema = new mongoose.Schema({
userID:{type: String, default: "0000"},firstName:{type: String, default: "0000"},lastName:{type: String, default: "0000"},emailId:{type: String, default: "0000"},add1:{type: String, default: "0000"},add2:{type: String, default: "0000"},city:{type: String, default: "0000"},state:{type: String, default: "0000"},zipcode:{type: String, default: "0000"},country:{type: String, default: "0000"},password:{type: String, default: "NBAD2020"}
});

userDB = mongoose.model("User",userSchema);

class UserDB{
//Getting user object for a particular user Id  from dB
  getUser(userId,password) {
  return new Promise((resolve,reject)=>{
  userDB.find({userID:userId,password:password})
   .then((data) => {
 var userData;
  data.forEach((users) => {
            let user = new User();
             user.setUserID(users.userID);
             user.setFirstName(users.firstName);
             user.setLastName(users.lastName);
             user.setEmailId(users.emailId);
           userData=user;

           
          });

    //resolve with sending a desired user object
          resolve(userData);

   })
  .catch((err) => {
          return reject(err);
        });

  });

  }


}


// export only class with methods to make sure, other part of this app can't modify hardcoded data.
module.exports = UserDB;