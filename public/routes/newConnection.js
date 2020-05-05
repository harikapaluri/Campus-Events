var express = require('express');
let connection=require('./../models/Connection');
var bodyParser = require('body-parser');
var moment=require('moment');
var router = express.Router();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
//Express validator related
const { check, validationResult } = require('express-validator');
//Connection Db related
const ConnDB = require("./../utilities/connDB");
const connDB = new ConnDB();
//Helper Class
var helper=require('./../utilities/Helper');
router.get('/', function (req, res) {

	 if(req.session.theUser!=null){ 
     if(req.query.topic==null){
    res.render('newConnection',{userProfile:req.session.theUser,errors:null});
  }
	 }
   else{
   	res.render('Login',{userProfile:req.session.theUser,errors:null});
   }
  
  })
router.post('/',urlencodedParser,
[ 
check('name').matches('^[A-Za-z]+[0-9]?.*').withMessage('Name should start with Alphabets and can contain other characters that follow'),
check('topic').matches('^[A-Za-z]+[0-9]?.*').withMessage('Topic should start with Alphabets and can contain other characters that follow'),
check('details').matches('^[A-Za-z]+[0-9]?.*').withMessage('Details should start with Alphabets and can contain other characters that follow'),
check('stTime').matches("([0-9]|0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])([ ][AaPp][Mm])").withMessage('Enter Time in hh:mm AM/PM/am/pm'),
check('endTime').matches("([0-9]|0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])([ ][AaPp][Mm])").withMessage('Enter Time in hh:mm AM/PM/am/pm'),
check('where').matches('^[A-Za-z]+[0-9]?.*').withMessage('Location should start with Alphabets and can contain other characters that follow'),
],

 async function (req, res) {

 // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  //This function returns a Boolean of true/False which indicates whether date is valid or not.
  var validate=helper.validDate(req.body.date);
  
  var errorarray=errors.array();
 if(validate==false){
  var json={
   'msg':"Please Enter date in valid format and event should occur in the future.Past date is not allowed",
   'value':req.body.date,
   'param':'date',
  }
  errorarray.push(json);
  
 }


  //Errors in validation
  if (errorarray.length>0) {
    return res.render('newConnection',{userProfile:req.session.theUser,errors:errorarray});
  }
  
  


  //This code is for getting information from new connection and setting it in our model.
let Connection= new connection();
//Fetching host name from the session

 Connection.setHost(req.session.theUser.userName);
  //Creating a unique Id for connectionId
 var lastrecord= await connDB.getLastTerm();
 console.log(lastrecord);
 var connId=helper.getUniqueId(lastrecord);

    Connection.setConnectionId(connId);
    Connection.setName(req.body.name);
    Connection.setTopic(req.body.topic);
    Connection.setDetails(req.body.details) ;
     Connection.setDate(req.body.date);
      Connection.setTime(req.body.stTime+"-"+req.body.endTime);
       Connection.setWhere(req.body.where);
       
        Connection.setUserID(req.session.theUser.userID);
        Connection.setRsvp("Yes");
//Adding the new connection to the db

let data=await connDB.addNewConnection(Connection);  
//Getting a list of new connections          
let events = await connDB.getConnections();
var connectionData={"events":events};
 res.render('connections',{connectionData:connectionData,userProfile:req.session.theUser});
})


router.get('/*', function (req, res) {
 res.send('Welcome to the Campus Events App!Route to / to get more information ');
})


module.exports = router;