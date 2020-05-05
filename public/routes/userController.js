var express = require('express');

var helper=require('./../utilities/Helper');

var userProfileUtilty=require('./../utilities/userProfileUtilty');
let userProfile=require('./../models/userProfile');
var bodyParser = require('body-parser');
var router = express.Router();
var urlencodedParser = bodyParser.urlencoded({ extended: false })
//Connection db utilities
const ConnDB = require("./../utilities/connDB");
const connDB = new ConnDB();
//User details
const UserDB = require("./../utilities/userDB");
const userDB = new UserDB();
//User profile details
const UserProfileDB = require("./../utilities/userProfileDB");
const userProfileDB = new UserProfileDB();

//User Validation
//Express validator related
const { check, validationResult,body } = require('express-validator');



router.post('/',urlencodedParser,
  
  //Performing Validation Checks for Login
  [
  check('usrName').isEmail().withMessage('Please enter a valid User ID and password'),
  check('password').isAlphanumeric().isLength({ min: 7 }).withMessage('Password should have letters,numbers and a minimum length of 7'),

  ],



  async function (req, res) {

    //Now we check if any errors have occured.
    // Finds the validation errors in this request and wraps them in an object with handy functions

    //******************Validation Related *********************//
  const errors = validationResult(req);
  var errorarray=errors.array();
  if (errorarray.length>0) {
    return res.render('Login',{userProfile:req.session.theUser,errors:errorarray});
  }

 //***************************************//

//After Login we need to create a session object for the userId.
   //If user enters a Proper userName
  
    var x=[ ];
    let userProfile=require('./../models/userProfile');
    let user=require('./../models/User');   
       //Fetching  user details stored in db
     user= await userDB.getUser(req.body.usrName,req.body.password);
     //If user exists in the database then we proceed to create a userProfile or retrieve an exisitng userProfile   
     if(user!=null){ 


     //Now check if userProfile exists.
     var userProfileData=await userProfileDB.getuserProfile(req.body.usrName);
     //If profile doesnt exist we have to create session as well as save it in db.If it exists just fetch from db and set session
      if(userProfileData!=null){
        userProfile=userProfileData;
     req.session.theUser=userProfile;
      } 
      else{
      userProfile= new userProfile(req.body.usrName,"Yes",x,user.firstName);
      var userNewProfileData=await userProfileDB.addNewProfileData(userProfile);
      req.session.theUser=userNewProfileData;
      }

    res.render('savedConnections',{userProfile:req.session.theUser});
  }
  else{
    var errormessage={
      'msg':"There is no record which matches this username and password",
   'value':req.body.usrName,
   'param':'usrName',
    } 
    errorarray=[];
    errorarray.push(errormessage)
     res.render('Login',{userProfile:req.session.theUser,errors:errorarray})
  }

  })
router.get('/rsvp',urlencodedParser,async function (req, res) {

  if(req.session.theUser!=null){  //If session is active we need to now save this particular info in saved Connections
    //Get information of the connection
    var id=req.query.connectionId;  //Getting connectionID
    var rsvp=req.query.rsvp;//Getting rsvp information
    var userID=req.session.theUser.userID; //Getting userID 

//Here we are checking wether it is valid parameter object
    if(rsvp==="Yes"||rsvp==="No"||rsvp=="Maybe"){
    //var connection=userProfileUtilty.addConnection(rsvp,id,userID);
   
    //Creating a connection model for a new connection with specified rsvp value
  let connection=require('./../models/Connection');
    var connectionData = await connDB.getConnection(id);
    connection=new connection(connectionData.host,connectionData.connectionId,connectionData.name,connectionData.topic,connectionData.details,connectionData.date,connectionData.time,connectionData.where,connectionData.icon,rsvp,userID);


   //***********Session related *********//
    var array=req.session.theUser.connections
    //If connection already exists do not add in the Connections again
    //This is also used if rsvp has to be updated for a particular connection
    var array1=userProfileUtilty.updateConnection(array,connection,id,rsvp);

     //If there is a need to update userProfiledb and connectionDb value we need to check
     var value=helper.compare(array,array1,id);
     if(value==true){
     var userData=await userProfileDB.findAndUpdate(userID,array1);
     var connectionData=await connDB.updateConnection(id,connection);

     }

   
   //Updating array.
   req.session.theUser.connections=array1;
    res.render('savedConnections',{userProfile:req.session.theUser});
  }
  else{
	//Invalid rsvp so redirect to savedConnections page without any updates.
	res.render('savedConnections',{userProfile:req.session.theUser})
}
}
else{
	//If user isnt logged in then redirect to Login page

  res.render('Login',{userProfile:req.session.theUser,errors:null});
}

  })

router.get('/delete/:connectionId',urlencodedParser,async function (req, res) {
	
    if(req.session.theUser!=null){  //If session is active we need to now save this particular info in saved Connections
    //Get information of the connection
    var id=req.params.connectionId;  //Getting connectionID
    var userID=req.session.theUser.userID;
       
        //Getting list of connections so that we can delete the requested connection
        var array=req.session.theUser.connections
  
        var array=userProfileUtilty.removeConnection(array,id);
        req.session.theUser.connections=array;
   
   //Now we need to delete it from userProfileDb as well as update connection by removing userID associated with it.
    var userData=await userProfileDB.findAndUpdate(userID,array);
     

} 
res.render('savedConnections',{userProfile:req.session.theUser})
  })
router.get('/SignOut',urlencodedParser,function (req, res) {

  req.session.destroy();
  res.render('index',{userProfile:null});
})

module.exports = router;