const Queue = require("./Queue");

class StarshipEnterprise {
  constructor(officerId = null, officerName = null, reportTo = null) {
    this.officerId = officerId;
    this.officerName = officerName;
    this.reportTo = reportTo; // the officer that the new officer reports to,PARENT
    this.leftReport = null;
    this.rightReport = null;
  }
  //find and replace

  assignOfficer(officerId, officerName) {
    // your solution here
    if(this.officerId==null&&this.officerName==null){
      this.officerId=officerId
      this.officerName=officerName
    }else if(this.officerId==officerId){
      this.officerName==officerName
    }else if(officerId<this.officerId){
      if(this.leftReport===null){
        this.leftReport=new StarshipEnterprise(officerId,officerName,this)
      }else{this.leftReport.assignOfficer(officerId,officerName)}
    }
    if(this.officerId===null&&this.officerName===null){
      this.officerId=officerId
      this.officerName=officerName
    }
   else if(officerId>this.officerId){
      if(this.rightReport===null){
        this.rightReport=new StarshipEnterprise(officerId,officerName,this)
      }else{this.rightReport.assignOfficer(officerId,officerName)}
    }
  }
//leaf node 
  findOfficersWithNoDirectReports(values = []) {
    // your solution here
    if(this.leftReport===null&&this.rightReport===null){
      // console.log("this is leaf node",this.officerName)
      values.push(this.officerName)
    }
    if(this.leftReport){
      this.leftReport.findOfficersWithNoDirectReports(values)
    }
    if(this.rightReport){
      this.rightReport.findOfficersWithNoDirectReports(values)
    }
    return values;
  }
  //DFS in-order then reverse the sequence(but visit right first,current then left)

  listOfficersByExperience(officerNames = []) {
    // your solution here
    if(this.rightReport){
      this.rightReport.listOfficersByExperience(officerNames)
    }
    officerNames.push(this.officerName)
    if(this.leftReport){
      this.leftReport.listOfficersByExperience(officerNames)
    }
    // console.log("this is officerNames",officerNames)
    return officerNames;
  }

  listOfficersByRank(tree, rankedOfficers = {}) {
    // your solution here
    console.log(tree)
    const queue=new Queue()
    queue.enqueue(tree)
    let node = queue.dequeue()
    let count = 1
    while(node){
      if(!node.reportTo){
        rankedOfficers[count]=[node.officerName]
      }      
      else{
        for(let [key,value] of Object.entries(rankedOfficers)){
          if(value.includes(node.reportTo.officerName)){
            count=+key+1
            if(Object.keys(rankedOfficers).includes(String(count))){
              rankedOfficers[count]=[...rankedOfficers[count],node.officerName]
            }else{
              rankedOfficers[count]=[node.officerName]
            }
          }
        }
      }
      if(node.leftReport){
        queue.enqueue(node.leftReport)
      }
      if(node.rightReport){
        queue.enqueue(node.rightReport)
      }
      node=queue.dequeue()
    }
    return rankedOfficers
}}

module.exports = StarshipEnterprise;
