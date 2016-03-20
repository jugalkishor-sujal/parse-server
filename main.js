require('cloud/EmailNotifications.js');
require('cloud/CurrentDayJob.js');
Parse.Cloud.define('getAllNotificationCounts',function(request,response){

	Parse.Cloud.useMasterKey(); //  just in case

	if(Parse.User.current().authenticated())
	{
		// this object will be updated and returned
		var counts = {
		GROUP_CREATED:0,
                 GROUP_DELETED:0,
                 GROUP_INPROGRESS:0,
                 GROUP_COMPLETED:0,
                 GROUP_RECITATION_COMPLETED25:0,
                 GROUP_RECITATION_COMPLETED50:0,
                 GROUP_RECITATION_COMPLETED75:0,
                 GROUP_USER_JOINED:0,
                 GROUP_USER_ADMIN:0
		};

		var userId = Parse.User.current().id;

		/**
		 * Grab all unread notifs, then add the count
		 */
		var Notf  = Parse.Object.extend('Notification');
		var query = new Parse.Query(Notf);
		// get notifs + requests
		query.equalTo('targetId',userId);
		query.descending('createdAt');
		query.notEqualTo('read',true);
		query.limit(50); // the limit
		query.find({

			success: function(ress){              
                for(i = 0; i < ress.length; i++)
                {
                	var res=ress[i];
                    if(res.get('type') == 'GROUP_CREATED')
                        counts.GROUP_CREATED++;
                    else if(res.get('type') == 'GROUP_DELETED')
                        counts.GROUP_DELETED++;
                    else if(res.get('type') == 'GROUP_INPROGRESS')
                        counts.GROUP_INPROGRESS++;
                    else if(res.get('type') == 'GROUP_COMPLETED')
                        counts.GROUP_COMPLETED++;
                    else if(res.get('type') == 'GROUP_RECITATION_COMPLETED25')
                        counts.GROUP_RECITATION_COMPLETED25++;
                    else if(res.get('type') == 'GROUP_RECITATION_COMPLETED50')
                        counts.GROUP_RECITATION_COMPLETED50++;
                    else if(res.get('type') == 'GROUP_RECITATION_COMPLETED75')
                        counts.GROUP_RECITATION_COMPLETED75++;
                    else if(res.get('type') == 'GROUP_USER_JOINED')
                        counts.GROUP_USER_JOINED++;
                    else if(res.get('type') == 'GROUP_USER_ADMIN')
                        counts.GROUP_USER_ADMIN++;

                }
							response.success(counts);					
			},
			error: function(error) {
				response.error(error.message);
			}


		});


	}

});
Parse.Cloud.define('getAllNotification',function(request,response){

	Parse.Cloud.useMasterKey(); //  just in case

	if(Parse.User.current().authenticated())
	{
		var userId = Parse.User.current().id;
		var _response=[];
		_response.userId=userId;
		/**
		 * Grab all unread notifs, then add the count
		 */
		var Notf  = Parse.Object.extend('Notification');
		var query = new Parse.Query(Notf);
		// get notifs + requests
		query.equalTo('targetId',userId);
		query.descending('createdAt');
		query.notEqualTo('read',true);
		query.limit(50); // the limit
		query.find({
			success: function(notifs){
				console.log(notifs);
					for (var i =0; i <  notifs.length - 1; i++) {
						_response.push(
						{
							type:notifs[i].get("type"),
							Title:notifs[i].get("Title"),
							from:notifs[i].get("from"),
							fromFullName:notifs[i].get("fromFullName"),
							targetId:notifs[i].get("targetId"),
							targetFullName:notifs[i].get("targetFullName")
						}
						);
					}
						response.success(_response);					
			},
			error: function(error) {
				response.error(error.message);
			}


		});


	}

});