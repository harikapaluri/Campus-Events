
class User {
  constructor(userID,firstName,lastName,emailId,add1,add2,city,state, zipcode, country,password) {
    this.userID =userID;
    this.firstName =firstName;
    this.lastName = lastName;
    this.emailId = emailId;
     this.add1 = add1;
      this.add2 = add2;
       this.city = city;
        this.state =state;
        this.zipcode =zipcode;
         this.country =country;
         this.password=password;
  }

 getPassword(){
  return this.password
 }
 setPassword(password){
  this.password=password
 }
  getUserID() {
    return this.userID;
  }

  setUserID(userID) {
    this.userID = userID;
  }

  getFirstName() {
    return this.firstName;
  }

  setFirstName(firstName) {
    this.firstName = firstName;
  }
  getLastName() {
    return this.lastName;
  }

  setLastName(lastName) {
    this.lastName = lastName;
  }
  getEmailId() {
    return this.emailId;
  }

  setEmailId(emailId) {
    this.emailId =emailId;
  }
  getAdd1() {
    return this.add1;
  }

  setAdd1(add1) {
    this.add1 =add1;
  }
  getAdd2() {
    return this.getAdd2;
  }

  setAdd2(add2) {
    this.add2 =add2;
  }
  getCity() {
    return this.city;
  }

  setCity(city) {
    this.city =city;
  }
  getState() {
    return this.state;
  }

  setState(state) {
    this.state=state;
}
 getZipcode() {
    return this.zipcode;
  }

  setZipcode(zipcode) {
    this.zipcode=zipcode;
}
getCountry() {
    return this.country;
  }

  setCountry(country) {
    this.country=country;
}
  getUserDetails() {
    return {
      userID:this.userID,firstName:this.firstName,lastName:this.lastName,emailId:this.emailId,add1:this.add1,add2:this.add2,city:this.city,state:this.state,zipcode:this.zipcode,country:this.country,password:this.password
    };
  };
}
module.exports =User;
