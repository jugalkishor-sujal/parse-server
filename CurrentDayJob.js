Parse.Cloud.job("currentDayCalculatedWhenKhatmaInProgress", function(request, status) {
Parse.Cloud.useMasterKey();
    var query = new Parse.Query("KhatmaGroup");
var d = new Date();
var timeNow = d.getTime();
var timeThen = timeNow - (600 * 100 * 60 *24);   //60 *24= 24 hour. Time is in milliseconds test for 3 minutes
var queryDate = new Date();
queryDate.setTime(timeThen);
    query.lessThanOrEqualTo("updatedAt", queryDate);
    query.equalTo( "Status", 2 );
    query.find(function(resultKhatmaGroups) {
        for(var i=0;i<resultKhatmaGroups.length;i++)
        {
            var Group=resultKhatmaGroups[i];
            Group.increment("CurrentDay");
            Group.save();
        }           
    }, function(errorQ) {
        console.log( errorQ);
        }); 
});