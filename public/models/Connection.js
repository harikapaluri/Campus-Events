
class Connection {
  constructor(host,connectionId,name,topic,details,date,time,where,icon,rsvp,userID) {
    this.host = host;
    this.connectionId =connectionId;
    this.topic = topic;
    this.name=name;
    this.details = details;
     this.date = date;
      this.time = time;
       this.where = where;
        this.icon = icon;
        this.rsvp=rsvp;
        this.userID=userID;
  }

  getUserID(){
  return this.userID;
  }
  setUserID(userID){
this.userID=userID;
  }
  getConnectionId() {
    return this.connectionId;
  }

  setConnectionId(connectionId) {
    this.connectionId = connectionId;
  }

  getHost() {
    return this.host;
  }

  setHost(host) {
    this.host = host;
  }
  getName() {
    return this.name;
  }

  setName(name) {
    this.name = name;
  }
  getTopic() {
    return this.topic;
  }

  setTopic(topic) {
    this.topic = topic;
  }
  getDetails() {
    return this.details;
  }

  setDetails(details) {
    this.details =details;
  }
  getDate() {
    return this.date;
  }

  setDate(date) {
    this.date =date;
  }
  getTime() {
    return this.time;
  }

  setTime(time) {
    this.time =time;
  }
  getWhere() {
    return this.where;
  }

  setWhere(where) {
    this.where =where;
  }
  getIcon() {
    return this.icon;
  }

  setIcon(icon) {
    this.icon=icon;
}
getRsvp() {
    return this.rsvp;
  }

  setRsvp(rsvp) {
    this.rsvp=rsvp;
}
  getConnectionDetails() {
    return {
      host:this.host,connectionId
:this.connectionId,name:this.name,topic:this.topic,details:this.details,date:this.date,time:this.time,where:this.where,icon:this.icon,
   rsvp:this.rsvp,userID:this.userID 
    };
  };
}
module.exports =Connection;
