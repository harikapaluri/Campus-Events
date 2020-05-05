var express = require('express');
var bodyParser = require('body-parser');
var helper=require('./../utilities/Helper');
var router = express.Router();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
//Connection Db details
const ConnDB = require("./../utilities/connDB");
const connDB = new ConnDB();
//User profile details
const UserProfileDB = require("./../utilities/userProfileDB");
const userProfileDB = new UserProfileDB();

router.get('/', function (req, res) {
  res.render('index',{userProfile:req.session.theUser});
})
//Using async function since we need to get all the connections from the db
router.get('/connections', async function (req, res) {


  let events = await connDB.getConnections();
  
   var connectionData={"events":events};
  res.render('connections',{connectionData:connectionData,userProfile:req.session.theUser});
})
router.get('/savedConnections', function (req, res) {
  
  res.render('savedConnections',{userProfile:req.session.theUser});
})
router.post('/savedConnections', function (req, res) {
  
  res.render('savedConnections',{userProfile:req.session.theUser});
})
//Route when no parameter is given should redirect to connections
router.get('/connection', function (req, res) {
	
	//Redirecting to connections page route if no parameter is given.
   res.redirect('/connections');
})
router.get('/connection/:connectionId', async function (req, res) {
	   var id=req.params.connectionId;  //Getting connectionID
       var pattern=new RegExp("[a-zA-Z]{1}[0-9]"); //Defining regex for valid connectionId
       var valid;
        //We need to check if connection Id is of valid format.
       valid=pattern.test(id);
       
       if(valid){  //If valid we check for that particular connection in DB.
        
        try{
        //Displaying the number of people interested in going to that particular connection
        var   count= await userProfileDB.getCountOfConnections(id);
         if(count==null){
          count=0;
         }
          
        
        var connection=await connDB.getConnection(id);
        res.render('connection',{data:connection,userProfile:req.session.theUser,count:count});
      }
      catch(e){
        console.log("Database error")
        res.redirect('/connections');
      }
         
       }
     	else{
           console.log("Error")
            res.redirect('/connections');
     	}
   

	
     })

router.get('/contact', function (req, res) {

   res.render('contact',{userProfile:req.session.theUser});
})
router.get('/about', function (req, res) {

   res.render('about',{userProfile:req.session.theUser});
})
router.get('/Login', function (req, res) {

   res.render('Login',{userProfile:req.session.theUser,errors:null});
})
//Default route for any  url
router.get('/*', function (req, res) {
 res.send('Welcome to the Campus Events App!Route to / to get more information ');
})


module.exports = router;