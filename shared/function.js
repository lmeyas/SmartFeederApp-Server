export default  {
    
    retrieve_timestamp(){
      var unix_date = Date.now();
      var complete_date = new Date(unix_date);
      var day = complete_date.getDate();
      var month = complete_date.getMonth() + 1 ;
      var year = complete_date.getFullYear();
      var date = year + "/"+ month +"/"+day;
      return {"unix": unix_date, "complete_date":complete_date, "date": date};
    },
  
  }