var Mailgun = require('mailgun');
Mailgun.initialize('sandbox82443.mailgun.org', 'key-2-ekaeg6843ltjanh9tavhfilzha2rg1');//initialize mailgun
var msgGroup={};
function EmailWhenKhatmaBegin(GroupID,GroupCreatorName,GroupCreatorID)
{
	var GroupUsers = Parse.Object.extend("GroupUsers");
	var QueryGroupUsers = new Parse.Query(GroupUsers);
	QueryGroupUsers.equalTo('GroupID', GroupID);
	QueryGroupUsers.equalTo('JoiningStatus', 2);
	QueryGroupUsers.find(
		{
			success: function(ResultGroupUsers)
				{
					if(ResultGroupUsers.length>0)
						{
							for(var i=0;i<ResultGroupUsers.length;i++)
								{
									var ResultGroupUser=ResultGroupUsers[i];
									
									msgGroup.to=ResultGroupUser.get("email");
									msgGroup.from="info@khatma.com";
									msgGroup.subject='Khatma '+ResultGroupUser.get("GroupName")+' has begun! ';
									//msgGroup.html='<h3>Al-Salamu Alaikum '+ResultGroupUser.get("FullName")+'</h3><p>Great, '+ResultGroupUser.get("GroupName")+' Khatma has begun, now your can see your recitations assigned to you under the MY RECITATIONS tab and your can see everyone\'s under the ALL RECITATIONS tab. Every day when you complete a daily full recitation, check it off in the app, this will help you see how far along the Khatma is to completion of the Holy Quran.</p><br><p>If you miss a daily recitation or recite a future daily recitation you can always check those off as well at a later time. If you all complete your recitations sooner than planned everybody wins and you can start a new Khatma sooner! </p><br><a href="http://khatma.thedemo.co">Join the Khatma group by Signing up OR Logging in</a> <br>Fee Aman Allah<br><br>';
									msgGroup.html='<head><link href="https://fonts.googleapis.com/css?family=Open+Sans:400,700,700italic,400italic" rel="stylesheet" type="text/css"></head><body bgcolor="#FFFFFF" style="padding: 0;margin: 0;"><table class="head-wrap" bgcolor="#f4edd4" style="width: 100%;font-family: Open Sans" cellspacing="0" cellpadding="0"><tr><td></td><td class="header container"><table bgcolor="#f4edd4" style="padding: 15px;width: 600px;margin: 0 auto;"><tr><td><img src="http://khatma.thedemo.co/KhatmaApp/www/img/email_logo.png"/></td><td align="right"><h6 class="collapse" style="margin: 0;font-weight: 500;font-size: 14px;text-transform: uppercase;color: #444;"><a href="http://khatma.thedemo.co" style="color: #444;text-decoration:none;">khatma.thedemo.co</a></h6></td></tr></table></td><td></td></tr></table><table cellspacing="0" cellpadding="0" style="width: 100%;font-family: Open Sans"><tr><td></td><td class="container" bgcolor="#FFFFFF"><table style="padding: 15px;width: 600px;margin: 0 auto;"><tr><td><h3 style="padding-top: 20px;font-weight: 500;font-size: 27px;line-height: 1.1;margin-bottom: 15px;margin-top:0;color: #000;">Al-Salamu Alaikum <u>'+ResultGroupUser.get("FullName")+'</u></h3><p style="font-size: 17px;padding-top: 20px;padding-bottom: 20px;margin-top: 0;margin-bottom: 10px;line-height: 1.6;">Great, <u>'+ResultGroupUser.get("GroupName")+'</u> Khatma has begun, now your can see yourrecitations assigned to you under the MY RECITATIONS tab and your can see everyone\'s underthe ALL RECITATIONS tab. Every day when you complete a daily full recitation, check it offin the app, this will help you see how far along the Khatma is to completion of the HolyQuran.</p><p style="margin-bottom: 10px;font-weight: normal;font-size: 14px;line-height: 1.6;">If you missa daily recitation or recite a future daily recitation you can always check those off aswell at a later time. If you all complete your recitations sooner than planned everybodywins and you can start a new Khatma sooner!<br/><br/></p><a href="http://khatma.thedemo.co" style="display: block; width: 100%; text-decoration: none; padding: 15px;background-color: #3c8f42;margin-bottom: 0;color: #FFFFFF;font-weight: normal;font-size: 14px;line-height: 1.6;margin-top: 0"><span style="font-weight: bold;color: #d6bd47;text-decoration: underline">LOG IN</span> andsee your recitations and how everyone else is doing</a></td></tr></table></td></tr></table><table cellpadding="0" cellspacing="0" style="width: 100%; font-family: Open Sans"><tr><td></td><td class="container"><table style="padding: 15px;width: 600px;margin: 0 auto;"><tr><td align="center"><pstyle="margin-bottom: 10px;font-weight: normal;font-size: 14px;line-height: 1.6;margin-top: 0;"><a href="#" style="color: #2BA6CB;">Terms</a> | <a href="#" style="color: #2BA6CB;">Privacy</a></p></td></tr></table></td><td></td></tr></table></body>';
									Mailgun.sendEmail(msgGroup,
										{
											success: function(httpResponse)
												{
													
												},
												error: function(error) 
												{
													console.log('sendEmail error'+JSON.stringify(error));
												}
										});	
								}
                        	}
                        },
						error: function(error) 
							{
								console.log('ResultGroupUsers error'+JSON.stringify(error));
							}
				});	
};
function DeleteAwaitingUserFromGroup(GroupID)
{
	var GroupUsers = Parse.Object.extend("GroupUsers");
				var QueryGroupUsers = new Parse.Query(GroupUsers);
				QueryGroupUsers.equalTo('GroupID', GroupID);
				QueryGroupUsers.equalTo('JoiningStatus', 1);
				QueryGroupUsers.find({
                        success: function(ResultGroupUsers)
                        {
                        	if(ResultGroupUsers.length>0)
                        	{
                        		for(var i=0;i<ResultGroupUsers.length;i++)
									{
										var ResultGroupUser=ResultGroupUsers[i];
										ResultGroupUser.set("JoiningStatus",3);
										ResultGroupUser.save(
										 {
											success:function (successGroupUser)
												 {
												 	console.log('successGroupUser');
												 },
											error: function(error) 
												{
													console.log('successGroupUser error'+JSON.stringify(error));
												}
										 }); 
									}
                        	}
                        },
						error: function(error) 
							{
								console.log('ResultGroupUsers error'+JSON.stringify(error));
							}
				});
};
function EmailWhenKhatmaComplete(GroupID,GroupCreatorName,GroupCreatorID)
{	
	var GroupUsers = Parse.Object.extend("GroupUsers");
	var QueryGroupUsers = new Parse.Query(GroupUsers);
	QueryGroupUsers.equalTo('GroupID', GroupID);
	QueryGroupUsers.equalTo('JoiningStatus', 2);
	QueryGroupUsers.find(
		{
			success: function(ResultGroupUsers)
				{
					if(ResultGroupUsers.length>0)
						{
							for(var i=0;i<ResultGroupUsers.length;i++)
								{
									var ResultGroupUser=ResultGroupUsers[i];
									
									msgGroup.to=ResultGroupUser.get("email");
									msgGroup.from="info@khatma.com";
									msgGroup.subject='Khatma '+ResultGroupUser.get("GroupName")+' has been completed ';
									//msgGroup.html='<h3>Al-Salamu Alaikum '+ResultGroupUser.get("FullName")+'</h3><p>Congratulations! you have completed the recitation of the Holy Quran. Make sure you make your intention (niyya\'s) if you wish to gift the rewards of this Khatma to your loved ones! You can start a new khatma with your friends once again and multiply your rewards! </p><br><a href="http://khatma.thedemo.co">Join the Khatma group by Signing up OR Logging in</a> <br>Fee Aman Allah<br><br>';
									msgGroup.html='<head> <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,700,700italic,400italic" rel="stylesheet" type="text/css"></head><body bgcolor="#FFFFFF" style="padding: 0;margin: 0;"><table class="head-wrap" bgcolor="#f4edd4" style="width: 100%;font-family: Open Sans" cellspacing="0" cellpadding="0"> <tr> <td></td><td class="header container"> <table bgcolor="#f4edd4" style="padding: 15px;width: 600px;margin: 0 auto;"> <tr> <td><img src="http://khatma.thedemo.co/KhatmaApp/www/img/email_logo.png"/></td><td align="right"><h6 class="collapse" style="margin: 0;font-weight: 500;font-size: 14px;text-transform: uppercase;color: #444;"> <a href="http://khatma.thedemo.co" style="color:#444;text-decoration:none">khatma.thedemo.co</a> </h6></td></tr></table> </td><td></td></tr></table><table cellspacing="0" cellpadding="0" style="width: 100%;font-family: Open Sans"> <tr> <td></td><td class="container" bgcolor="#FFFFFF"> <table style="padding: 15px;width: 600px;margin: 0 auto;"> <tr> <td> <h3 style="padding-top: 20px;font-weight: 500;font-size: 27px;line-height: 1.1;margin-bottom: 15px;margin-top:0;color: #000;"> Al-Salamu Alaikum <u>'+ResultGroupUser.get("FullName")+'</u></h3> <p style="font-size: 17px;padding-top: 20px;padding-bottom: 20px;margin-top: 0;margin-bottom: 10px;line-height: 1.6;"> Congratulations! You have completed the recitation of the Holy Quran. Make sure you make your intention (niyya\'s) if you wish to gift the rewards of this Khatma to your loved ones! You can start a new khatma with your friends once again and multiply your rewards! <br/></p><a href="http://khatma.thedemo.co" style="width:100%;display: block;text-decoration:none;padding: 15px;background-color: #3c8f42;margin-bottom: 0;color: #FFFFFF;font-weight: normal;font-size: 14px;line-height: 1.6;margin-top: 0"> <span style="font-weight: bold;color: #d6bd47;text-decoration: underline">LOG IN</span> now and create a new group.</a></td></tr></table> </td></tr></table><table cellpadding="0" cellspacing="0" style="width: 100%; font-family: Open Sans"> <tr> <td></td><td class="container"> <table style="padding: 15px;width: 600px;margin: 0 auto;"> <tr> <td align="center"><p style="margin-bottom: 10px;font-weight: normal;font-size: 14px;line-height: 1.6;margin-top: 0;"> <a href="#" style="color: #2BA6CB;">Terms</a> |<a href="#" style="color: #2BA6CB;">Privacy</a> </p></td></tr></table> </td><td></td></tr></table></body>';
									Mailgun.sendEmail(msgGroup,
										{
											success: function(httpResponse)
												{
													GROUP_COMPLETED(GroupID,ResultGroupUser.get("GroupName"),ResultGroupUser.get("UserID"),GroupCreatorName);
												},
												error: function(error) 
												{
													console.log('sendEmail error'+JSON.stringify(error));
												}
										});	
								}
                        	}
                        },
						error: function(error) 
							{
								console.log('ResultGroupUsers error'+JSON.stringify(error));
							}
				});	
};
function GROUP_CREATED(GroupID,GroupCreatorName)
    {
    var GroupUsers = Parse.Object.extend("GroupUsers");
	var QueryGroupUsers = new Parse.Query(GroupUsers);
	QueryGroupUsers.equalTo('GroupID', GroupID);
	QueryGroupUsers.containedIn('JoiningStatus', [1,2,4]);
	QueryGroupUsers.find(
		{
			success: function(ResultGroupUsers)
				{
					if(ResultGroupUsers.length>0)
						{
							for(var i=0;i<ResultGroupUsers.length;i++)
								{
									var ResultGroupUser=ResultGroupUsers[i];
									var targetId=ResultGroupUser.get("UserID");
									var GroupName=ResultGroupUser.get("GroupName");
									var Noti = Parse.Object.extend('Notification');
							            var newNoti = new Noti();
							            newNoti.set('type','GROUP_CREATED');
            							newNoti.set('GroupID',GroupID);       
							            newNoti.set('targetId',targetId);
							            newNoti.set('description',GroupName+' Khatma created by '+GroupCreatorName);
							            newNoti.set('read',false);
							            newNoti.save(null,{
							                success: function(newNoti)
							                {
							                },
							                error: function(error)
							                {console.log('Notification Saving error'+JSON.stringify(error));
							                }
							            });
								}
						}
				},
			error: function(error) 
				{
					console.log('ResultGroupUsers error'+JSON.stringify(error));
				}
		});	
    };
function GROUP_CREATED_BY_USER(GroupID,GroupName,GroupCreatorName,targetId)
    {
    if(targetId!=='' || targetId!==undefined || targetId!==null)
    {
									var Noti = Parse.Object.extend('Notification');
							            var newNoti = new Noti();
							            newNoti.set('type','GROUP_CREATED');
            							newNoti.set('GroupID',GroupID);       
							            newNoti.set('targetId',targetId);
							            newNoti.set('description',GroupName+' Khatma created by '+GroupCreatorName);
							            newNoti.set('read',false);
							            newNoti.save(null,{
							                success: function(newNoti)
							                {
							                },
							                error: function(error)
							                {console.log('Notification Saving error'+JSON.stringify(error));
							                }
							            });
	}
    };
function GROUP_DELETED(GroupID,GroupCreatorName)
    {
    var GroupUsers = Parse.Object.extend("GroupUsers");
	var QueryGroupUsers = new Parse.Query(GroupUsers);
	QueryGroupUsers.equalTo('GroupID', GroupID);
	QueryGroupUsers.containedIn('JoiningStatus', [1,2,4]);
	QueryGroupUsers.find(
		{
			success: function(ResultGroupUsers)
				{
					if(ResultGroupUsers.length>0)
						{
							for(var i=0;i<ResultGroupUsers.length;i++)
								{
									var ResultGroupUser=ResultGroupUsers[i];
									var targetId=ResultGroupUser.get("UserID");
									var GroupName=ResultGroupUser.get("GroupName");									
							    if(targetId!=='' || targetId!==undefined || targetId!==null)
								    {
										var Noti = Parse.Object.extend('Notification');
							            var newNoti = new Noti();
							            newNoti.set('type','GROUP_DELETED');
            							newNoti.set('GroupID',GroupID);       
							            newNoti.set('targetId',targetId);
							            newNoti.set('description',GroupName+' Khatma cancelled by '+GroupCreatorName);
							            newNoti.set('read',false);
							            newNoti.save(null,{
							                success: function(newNoti)
							                {
							                },
							                error: function(error)
							                {console.log('Notification Saving error'+JSON.stringify(error));
							                }
							            });
							        }
								}
						}
				},
			error: function(error) 
				{
					console.log('ResultGroupUsers error'+JSON.stringify(error));
				}
		});
    };
function GROUP_INPROGRESS(GroupID,GroupCreatorName)
    {
    var GroupUsers = Parse.Object.extend("GroupUsers");
	var QueryGroupUsers = new Parse.Query(GroupUsers);
	QueryGroupUsers.equalTo('GroupID', GroupID);
	QueryGroupUsers.containedIn('JoiningStatus', [2,4]);
	QueryGroupUsers.find(
		{
			success: function(ResultGroupUsers)
				{
					if(ResultGroupUsers.length>0)
						{
							for(var i=0;i<ResultGroupUsers.length;i++)
								{
									var ResultGroupUser=ResultGroupUsers[i];
									var targetId=ResultGroupUser.get("UserID");
									var GroupName=ResultGroupUser.get("GroupName");
							    if(targetId!=='' || targetId!==undefined || targetId!==null)
								    {
										var Noti = Parse.Object.extend('Notification');
							            var newNoti = new Noti();
							            newNoti.set('type','GROUP_INPROGRESS');
            							newNoti.set('GroupID',GroupID);       
							            newNoti.set('targetId',targetId);
							            newNoti.set('description',GroupName+' Khatma is now progress');
							            newNoti.set('read',false);
							            newNoti.save(null,{
							                success: function(newNoti)
							                {
							                	var KhatmaGroup = Parse.Object.extend("KhatmaGroup");
												var QueryKhatmaGroup = new Parse.Query(KhatmaGroup);
												//QueryKhatmaGroup.equalTo('GroupID', GroupID);
												QueryKhatmaGroup.get(GroupID,
												{
													success: function(ResultKhatmaGroup)
														{
															ResultKhatmaGroup.set("CurrentDay",1);
										                	ResultKhatmaGroup.save(
															{
																success:function (successGroupUser)
																	{
																		console.log('successGroupUser');
																	},
																error: function(error)
																	{
																		console.log('KhatmaGroup Saving error'+JSON.stringify(error));
																	}
															});
								                },
									                error: function(error)
									                {console.log('Notification Saving error'+JSON.stringify(error));
									                }
							            		});
							        		},
											error: function(error) 
												{
													console.log('ResultGroupUsers error'+JSON.stringify(error));
												}
										});
									}
								}
							}
						},
						error: function(error) 
						{
						console.log('ResultGroupUsers error'+JSON.stringify(error));
						}
					});
    };
function GROUP_COMPLETED(GroupID,GroupCreatorName)
    {
    var GroupUsers = Parse.Object.extend("GroupUsers");
	var QueryGroupUsers = new Parse.Query(GroupUsers);
	QueryGroupUsers.equalTo('GroupID', GroupID);
	QueryGroupUsers.containedIn('JoiningStatus', [2,4]);
	QueryGroupUsers.find(
		{
			success: function(ResultGroupUsers)
				{
					if(ResultGroupUsers.length>0)
						{
							for(var i=0;i<ResultGroupUsers.length;i++)
								{
									var ResultGroupUser=ResultGroupUsers[i];
									var targetId=ResultGroupUser.get("UserID");
									var GroupName=ResultGroupUser.get("GroupName");
							    if(targetId!=='' || targetId!==undefined || targetId!==null)
								    {
										var Noti = Parse.Object.extend('Notification');
							            var newNoti = new Noti();
							            newNoti.set('type','GROUP_COMPLETED');
            							newNoti.set('GroupID',GroupID);       
							            newNoti.set('targetId',targetId);
							            newNoti.set('description',GroupName+' Khatma is completed');
							            newNoti.set('read',false);
							            newNoti.save(null,{
							                success: function(newNoti)
							                {
							                },
							                error: function(error)
							                {console.log('Notification Saving error'+JSON.stringify(error));
							                }
							            });
							        }
								}
						}
				},
			error: function(error) 
				{
					console.log('ResultGroupUsers error'+JSON.stringify(error));
				}
		});
};
function GROUP_RECITATION_COMPLETED(GroupID,Value)
    {
    var GroupUsers = Parse.Object.extend("GroupUsers");
	var QueryGroupUsers = new Parse.Query(GroupUsers);
	QueryGroupUsers.equalTo('GroupID', GroupID);
	QueryGroupUsers.containedIn('JoiningStatus', [2,4]);
	QueryGroupUsers.find(
		{
			success: function(ResultGroupUsers)
				{
					if(ResultGroupUsers.length>0)
						{
							for(var i=0;i<ResultGroupUsers.length;i++)
								{
									var ResultGroupUser=ResultGroupUsers[i];
									var targetId=ResultGroupUser.get("UserID");
									var GroupName=ResultGroupUser.get("GroupName");

							    if(targetId!=='')
								    {
								    	var Noti = Parse.Object.extend('Notification');
							            var newNoti = new Noti();
							            newNoti.set('type','GROUP_RECITATION_COMPLETED'+Value);
							            newNoti.set('GroupID',GroupID); 
							            newNoti.set('targetId',targetId);
							            newNoti.set('description',Value+'% Complete for '+GroupName+' Khatma');
							            newNoti.set('read',false);
							            newNoti.save(null,{
							                success: function(newNoti)
							                {
							                },
							                error: function(error)
							                {console.log('Notification Saving error'+JSON.stringify(error));
							                }
							            });
							        }
								}
						}
				},
			error: function(error) 
				{
					console.log('ResultGroupUsers error'+JSON.stringify(error));
				}
		});
    };
Parse.Cloud.afterSave("KhatmaGroup", function(request) 
{
	var createdAt = request.object.get("createdAt");
	var updatedAt = request.object.get("updatedAt");
	var objectExisted = (createdAt.getTime() != updatedAt.getTime());
	if(!objectExisted)
		{
			Parse.Cloud.useMasterKey();
			var KhatmaGroupObj = request.object;
			var GroupID = KhatmaGroupObj.id;
		}
		else
		{
			Parse.Cloud.useMasterKey();
			var KhatmaGroupObj = request.object;
			if(parseInt(KhatmaGroupObj.get("Status"),10)===2)
				{
					if(parseInt(KhatmaGroupObj.get("PercentCompleted"),10)===0)
					{
						if(parseInt(KhatmaGroupObj.get("CurrentDay"),10)===0)
						{
							EmailWhenKhatmaBegin(KhatmaGroupObj.id,KhatmaGroupObj.get("GroupCreatorName"),KhatmaGroupObj.get("GroupCreatorID"));
							DeleteAwaitingUserFromGroup(KhatmaGroupObj.id);
							GROUP_INPROGRESS(KhatmaGroupObj.id,KhatmaGroupObj.get("GroupCreatorName"));
						}						
					}
				}
				else if(parseInt(KhatmaGroupObj.get("Status"),10)===3)
				{
					EmailWhenKhatmaComplete(KhatmaGroupObj.id,KhatmaGroupObj.get("GroupCreatorName"),KhatmaGroupObj.get("GroupCreatorID"));
					GROUP_COMPLETED(KhatmaGroupObj.id,KhatmaGroupObj.get("GroupCreatorName"));	
				}
		}
});
Parse.Cloud.afterSave("GroupUsers",function(request)
{
	var createdAt = request.object.get("createdAt");
	var updatedAt = request.object.get("updatedAt");
	var objectExisted = (createdAt.getTime() != updatedAt.getTime());
	if(!objectExisted)
		{
			Parse.Cloud.useMasterKey();
			var GroupUsersObj = request.object;
			var email = GroupUsersObj.get("email");
			var JoiningStatus = GroupUsersObj.get("JoiningStatus");
			var UserID=GroupUsersObj.get("UserID");
			var GroupID=GroupUsersObj.get("GroupID");
			var GroupName=GroupUsersObj.get("GroupName");
			var FullName=GroupUsersObj.get("FullName");
			
			msgGroup.to=email;
			msgGroup.from="info@khatma.com";
			if(JoiningStatus===4)
				{
					msgGroup.subject='Khatma group created: '+GroupName;
					//msgGroup.html='<h3>Al-Salamu Alaikum '+ FullName +'</h3><p>You have created a new khatma, it is <b>'+GroupName+'</b> group, all invitations to others reciters in this group have been sent out now we wait for them to join the khatma group. On your Khatma home page, click on the khatma group name, and you will see a live list of who has joined the room and who has yet to respond to your invitation.</p><br><p>You may start the khatma at any time your wish, only those who joined the khatma will be part of your khatma; those who have not responded yet or left the group will not be part of the khatma. Once your press Begin khatma, the Quran will be equally divided amongst all those who joined the room and spread out evenly across the number of days you have selected for the khatma. Once the Khatma is in progress, you can view your daily recitations and check them off every day as your complete them. This way every can stay on track of their own recitations. You can also see how everyone else is progressing and inshalla you will all complete the Quran and reap the rewards and gift those rewards to all of your loved ones! </p><br><a href="http://khatma.thedemo.co">Log into the Khatma now</a><br><br>';
					msgGroup.html='<head> <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,700,700italic,400italic" rel="stylesheet" type="text/css"></head><body bgcolor="#FFFFFF" style="padding: 0;margin: 0;"><table class="head-wrap" bgcolor="#f4edd4" style="width: 100%;font-family: Open Sans" cellspacing="0" cellpadding="0"> <tr> <td></td><td class="header container"> <table bgcolor="#f4edd4" style="padding: 15px;width: 600px;margin: 0 auto;"> <tr> <td><img src="http://khatma.thedemo.co/KhatmaApp/www/img/email_logo.png"/></td><td align="right"><h6 class="collapse" style="margin: 0;font-weight: 500;font-size: 14px;text-transform: uppercase;color: #444;"> <a href="http://khatma.thedemo.co" style="color:#444;text-decoration:none;">khatma.thedemo.co</a></h6></td></tr></table> </td><td></td></tr></table><table cellspacing="0" cellpadding="0" style="width: 100%;font-family: Open Sans"> <tr> <td></td><td class="container" bgcolor="#FFFFFF"> <table style="padding: 15px;width: 600px;margin: 0 auto;"> <tr> <td> <h3 style="padding-top: 20px;font-weight: 500;font-size: 27px;line-height: 1.1;margin-bottom: 15px;margin-top:0;color: #000;"> Al-Salamu Alaikum <u>'+FullName+'</u></h3> <p style="font-size: 17px;padding-top: 20px;padding-bottom: 20px;margin-top: 0;margin-bottom: 10px;line-height: 1.6;"> You have created a new khatma, it is <u>'+GroupName+'</u> group, all invitations to others reciters in this group have been sent out now we wait for them to join the khatma group. On your Khatma home page, click on the khatma group name, and you will see a live list of who has joined the room and who has yet to respond to your invitation.</p><p style="margin-bottom: 10px;font-weight: normal;font-size: 14px;line-height: 1.6;"> You may start the khatma at any time your wish, only those who joined the khatma will be part of your khatma; those who have not responded yet or left the group will not be part of the khatma. Once your press Begin khatma, the Quran will be equally divided amongst all those who joined the room and spread out evenly across the number of days you have selected for the khatma. Once the Khatma is in progress, you can view your daily recitations and check them off every day as your complete them. This way every can stay on track of their own recitations. You can also see how everyone else is progressing and inshalla you will all complete the Quran and reap the rewards and gift those rewards to all of your loved ones! <br/><br/></p><a href="http://khatma.thedemo.co/" style="display:block;width: 100%;text-decoration: none; padding: 15px;background-color: #3c8f42;margin-bottom: 0;color: #FFFFFF;font-weight: normal;font-size: 14px;line-height: 1.6;"> Log into the Khatma now - <span style="font-weight: bold;color: #d6bd47;text-decoration: underline">GO AHEAD AND LOG IN!</span></a></td></tr></table> </td></tr></table><table cellpadding="0" cellspacing="0" style="width: 100%; font-family: Open Sans"> <tr> <td></td><td class="container"> <table style="padding: 15px;width: 600px;margin: 0 auto;"> <tr> <td align="center"><p style="margin-bottom: 10px;font-weight: normal;font-size: 14px;line-height: 1.6;margin-top: 0"> <a href="#" style="color: #2BA6CB;">Terms</a> | <a href="#" style="color: #2BA6CB;">Privacy</a> </p></td></tr></table> </td><td></td></tr></table></body>';
				}
			else
				{
					msgGroup.subject='Your Invitation to Khatma group: '+GroupName;
					//msgGroup.html='<h3>Al-Salamu Alaikum</h3><br><p>You have been invited to join a Khatma Group to complete a full recitation of the Holy Quran using the Khatma App.</p><br><p>This app will portion the Holy Quran equally amongst your group members then assign it daily so you can recite and reap the rewards of Completing the Holy Quran more frequently.</p><p>The Messenger of Allah (prayers of Allah be upon him and his family) has said: These hearts rust just as iron rusts; and indeed they are polished through the recitation of the Qurâ€™an.</p><br><p>Khatma app is the only app that intuitively helps muslims collaborate together to read the Holy Quran daily. Now you can earn and gift the rewards (thawab/hassanat) of Cover to Cover Holy Quran recitation many times over throughout the year</p><br><a href="http://khatma.thedemo.co">Join the Khatma group by Signing up OR Logging in</a> <br>Fee Aman Allah<br><br>';
					msgGroup.html='<head> <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,700,700italic,400italic" rel="stylesheet" type="text/css"></head><body bgcolor="#FFFFFF" style="padding: 0;margin: 0;"><table class="head-wrap" bgcolor="#f4edd4" style="width: 100%;font-family: Open Sans" cellspacing="0" cellpadding="0"> <tr> <td></td><td class="header container"> <table bgcolor="#f4edd4" style="padding: 15px;width: 600px;margin: 0 auto;"> <tr> <td><img src="http://khatma.thedemo.co/KhatmaApp/www/img/email_logo.png"/></td><td align="right"><h6 class="collapse" style="margin: 0;font-weight: 500;font-size: 14px;text-transform: uppercase;color: #444;"> <a href="http://khatma.thedemo.co" style="color:#444;text-decoration:none;">khatma.thedemo.co</a></h6></td></tr></table> </td><td></td></tr></table><table cellspacing="0" cellpadding="0" style="width: 100%;font-family: Open Sans"> <tr> <td></td><td class="container" bgcolor="#FFFFFF"> <table style="padding: 15px;width: 600px;margin: 0 auto;"> <tr> <td> <h3 style="padding-top: 20px;font-weight: 500;font-size: 27px;line-height: 1.1;margin-bottom: 15px;margin-top:0;color: #000;"> Al-Salamu Alaikum <u>'+FullName+'</u></h3> <p style="font-size: 17px;padding-top: 20px;padding-bottom: 20px;margin-top: 0;margin-bottom: 10px;line-height: 1.6;"> You have been invited to join a Khatma Group <u>'+GroupName+'</u> to complete a full recitation of the Holy Quran using the Khatma App.</p><p style="margin-bottom: 10px;font-weight: normal;font-size: 14px;line-height: 1.6;"> This app will portion the Holy Quran equally amongst your group members then assign it daily so you can recite and reap the rewards of Completing the Holy Quran more frequently. The Messenger of Allah (prayers of Allah be upon him and his family) has said: <br/><br/><strong>"These hearts rust just as iron rusts; and indeed they are polished through the recitation of the Qur’an."</strong><br/><br/></p><p style="margin-bottom: 10px;font-weight: normal;font-size: 14px;line-height: 1.6;">Khatma app is the only app that intuitively helps muslims collaborate together to read the Holy Quran daily. Now you can earn and gift the rewards (thawab/hassanat) of Cover to Cover Holy Quran recitation many times over throughout the year<br/><br/></p><a href="http://khatma.thedemo.co/" style="display:block;text-decoration: none; width: 100%; padding: 15px;background-color: #3c8f42;margin-bottom: 0;color: #FFFFFF;font-weight: normal;font-size: 14px;line-height: 1.6;"> Join the Khatma group by <span style="text-decoration: underline;font-weight: bold;color: #d6bd47;">SIGNING UP</span> OR <span style="font-weight: bold;color: #d6bd47;text-decoration: underline">LOGGING IN</span></a></td></tr></table> </td></tr></table><table cellpadding="0" cellspacing="0" style="width: 100%; font-family: Open Sans"> <tr> <td></td><td class="container"> <table style="padding: 15px;width: 600px;margin: 0 auto;"> <tr> <td align="center"><p style="margin-bottom: 10px;font-weight: normal;font-size: 14px;line-height: 1.6;margin-top: 0"> <a href="#" style="color: #2BA6CB;">Terms</a> |<a href="#" style="color: #2BA6CB;">Privacy</a> </p></td></tr></table> </td><td></td></tr></table></body>';
				}
			Mailgun.sendEmail(msgGroup, 
				{
					success: function(httpResponse)
						{
							var Users = Parse.Object.extend("_User");
							var QueryUser = new Parse.Query(Users);
							QueryUser.equalTo('email', email);
					        QueryUser.find({
					                        success: function(AppUser)
					                        {
					                        	if(AppUser.length>0)
					                        	{
					      						 GroupUsersObj.set("UserID",AppUser[0].id);
					      						 var f_name=AppUser[0].get("first_name")!==undefined?AppUser[0].get("first_name"):' ';
					      						 var l_name=AppUser[0].get("last_name")!==undefined?AppUser[0].get("last_name"):' ';
					      						 GroupUsersObj.set("FullName", f_name + ' ' +l_name);
												 GroupUsersObj.save(
												 {
													success:function (successGroupUser)
														 {
														 	
															 	var KhatmaGroup = Parse.Object.extend("KhatmaGroup");
															 	var QueryKhatmaGroup= new Parse.Query(KhatmaGroup);
															 	QueryKhatmaGroup.get(GroupID,function(_response){
															 	GROUP_CREATED_BY_USER(_response.id,GroupName,_response.get("GroupCreatorName"),AppUser[0].id);
															 	},function(_response,error){});														 	
															console.log('successGroupUsers');
														 },
													error: function(error) 
														{
															console.log('successGroupUsers error'+JSON.stringify(error));
														}
												 });
					                        	}
					                        	else
					                        	{
					                        	 GroupUsersObj.set("UserID",'');
					      						 GroupUsersObj.set("FullName", '');
												 GroupUsersObj.save(
												 {
													success:function (successGroupUsers)
														 {
														 	console.log('successGroupUsers');
														 },
													error: function(error) 
														{
															console.log('successGroupUsers error'+JSON.stringify(error));
														}
												 });
					                        	}
					                        },
											error: function(error) 
												{
													console.log('AppUser error'+JSON.stringify(error));
												}
										 });
						},
					error: function(error) 
						{
							console.log('sendEmail error'+JSON.stringify(error));
						}
				});			
		}
});
Parse.Cloud.afterDelete("GroupUsers",function(request) 
		{
			var GroupUsersObj = request.object;			
			var GroupID=GroupUsersObj.get("GroupID");
			var FullName=GroupUsersObj.get("FullName");
			//GROUP_USER_LEFT(GroupID,FullName);
		}
);
Parse.Cloud.afterSave("_User",function(request)
{
	var createdAt = request.object.get("createdAt");
	var updatedAt = request.object.get("updatedAt");
	var objectExisted = (createdAt.getTime() != updatedAt.getTime());
	if(!objectExisted)
		{
			Parse.Cloud.useMasterKey();
			var UsersObj = request.object;
			var GroupUsers = Parse.Object.extend("GroupUsers");
			var QueryGroupUsers = new Parse.Query(GroupUsers);
			QueryGroupUsers.equalTo('email', UsersObj.get("email"));
			QueryGroupUsers.find({
				success: function(GroupUserRecords)
					{
						for (var i = GroupUserRecords.length - 1; i >= 0; i--) 
						{
							var GroupUser = GroupUserRecords[i];
							GroupUser.set("UserID",UsersObj.id);
							var f_name=UsersObj.get("first_name")!==undefined?UsersObj.get("first_name"):' ';
							var l_name=UsersObj.get("last_name")!==undefined?UsersObj.get("last_name"):' ';
							GroupUser.set("FullName", f_name + ' ' +l_name);
							GroupUser.save(
							{
								success:function (successGroupUser)
									{
										console.log('successGroupUser');
									},
								error: function(error)
									{
										console.log('GroupUser Saving error'+JSON.stringify(error));
									}
							});
						};					
					},
				error: function(error)
					{
						console.log('GroupUser Fetching error'+JSON.stringify(error));
					}
			});
		}
});
Parse.Cloud.afterDelete("KhatmaGroup", 
	function(request) 
		{
			Parse.Cloud.useMasterKey();
			var KhatmaGroupObj = request.object;
			var GroupUsers = Parse.Object.extend("GroupUsers");
			var QueryGroupUsers = new Parse.Query(GroupUsers);
				QueryGroupUsers.equalTo('GroupID', KhatmaGroupObj.id);
				QueryGroupUsers.find(
					{
                        success: function(ResultGroupUsers)
                        {
						    GROUP_DELETED(KhatmaGroupObj.id,KhatmaGroupObj.get("GroupCreatorName"));
                        	Parse.Object.destroyAll(ResultGroupUsers, 
                        	{
						        success: function() 
						        {
							        
						        },
						        error: function(error) 
						        {
						          console.error("Error deleting related ResultGroupUsers " + error.code + ": " + error.message);
						        }
						      });

                        },
						error: function(error) 
							{
								console.error("Error finding related ResultGroupUsers " + error.code + ": " + error.message);
							}
					});
			var DivisionsAssignments = Parse.Object.extend("DivisionsAssignments");
									var QueryDivisionsAssignments = new Parse.Query(DivisionsAssignments);
									QueryDivisionsAssignments.equalTo('GroupID', KhatmaGroupObj.id);
									QueryDivisionsAssignments.find(
										{
	                        				success: function(ResultDivisionsAssignments)
	                        				{
	                        					Parse.Object.destroyAll(ResultDivisionsAssignments, 
	                        						{
		                        						success: function() 
		                        						{

		                        						},
														error: function(error) 
														{ 
															console.error("Error finding related ResultDivisionsAssignments " + error.code + ": " + error.message);
														}
													});
	                        				},
											error: function(error) 
											{
												console.error("Error finding related ResultGroupUsers " + error.code + ": " + error.message);
											}
										});
		}
);
function UPDATE_PERCENT(GroupID,Value)
{
	var KhatmaGroup = Parse.Object.extend("KhatmaGroup");
                    var KhatmaGroupQuery = new Parse.Query(KhatmaGroup);
                    KhatmaGroupQuery.get(GroupID,
                    {
                        success: function(result){
                            result.set("PercentCompleted",Value);
                            result.save(null,{
                              success: function(myObject) {
                         		return 1;
                              },
                              error: function(myObject, error) {
                              return 0;
                              }
                            });              
                        },
                        error: function(result,error)
                        {
                        	return 0;
                        }
                    });
};
Parse.Cloud.afterSave("DivisionsAssignments",function(request)
{
	var createdAt = request.object.get("createdAt");
	var updatedAt = request.object.get("updatedAt");
	var objectExisted = (createdAt.getTime() != updatedAt.getTime());
	if(objectExisted)
		{
		var Obj = request.object;
		var GroupID=Obj.get("GroupID");
	var TotalCount=0;
	var CheckedCount=0;	
	Parse.Cloud.useMasterKey(); //  just in case
	var DivisionsAssignments = Parse.Object.extend("DivisionsAssignments");
	var DivisionsAssignmentsQuery = new Parse.Query(DivisionsAssignments);
    DivisionsAssignmentsQuery.equalTo("GroupID",GroupID);    
    DivisionsAssignmentsQuery.count(
        {
            success: function(_response) 
                {
                	TotalCount=parseInt(_response,10);
                	var DivisionsAssignmentsQuery2 = new Parse.Query(DivisionsAssignments);
				    DivisionsAssignmentsQuery2.equalTo("GroupID",GroupID); 
				    DivisionsAssignmentsQuery2.equalTo("CheckedStatus",true);   
				    DivisionsAssignmentsQuery2.count(
				        {
				            success: function(_response2) 
				                {
				                	CheckedCount=parseInt(_response2,10);
				                	var Percent=(parseFloat((CheckedCount/TotalCount))*100);
				                	if(Percent==25)
				                	{
				                		GROUP_RECITATION_COMPLETED(GroupID,25);
				                		UPDATE_PERCENT(GroupID,25);
				                	}
				                	else if(Percent==50)
				                	{
				                		GROUP_RECITATION_COMPLETED(GroupID,50);
				                		UPDATE_PERCENT(GroupID,50);
				                	}
				                	else if(Percent==75)
				                	{
				                		GROUP_RECITATION_COMPLETED(GroupID,75);
				                		UPDATE_PERCENT(GroupID,75);
				                	}
				                },
				            error: function(error)
				                {
				                }
				        });
                },
            error: function(error)
                {
                }
        });
	}
});
Parse.Cloud.afterDelete("_User",function(request)
{
	Parse.Cloud.useMasterKey();
	var UserObj = request.object;
	var KhatmaGroup = Parse.Object.extend("KhatmaGroup");
	var QueryKhatmaGroup = new Parse.Query(KhatmaGroup);
	QueryKhatmaGroup.equalTo('GroupCreatorID', UserObj.id);
	QueryKhatmaGroup.find(
		{
            success: function(ResultKhatmaGroup)
            {
                Parse.Object.destroyAll(ResultKhatmaGroup, 
                    {
						success: function() 
						{
							var Notification = Parse.Object.extend("Notification");
							var QueryNotification = new Parse.Query(Notification);
							QueryNotification.equalTo('targetId', UserObj.id);
							QueryNotification.find(
								{
						            success: function(ResultNotification)
						            {
						                Parse.Object.destroyAll(ResultNotification, 
						                    {
												success: function() 
												{

												},
												error: function(error) 
												{
													console.error("Error deleting related ResultNotification " + error.code + ": " + error.message);
												}
											});
									},
									error: function(error) 
									{
										console.error("Error finding related ResultNotification " + error.code + ": " + error.message);
									}
								});
						},
						error: function(error) 
						{
							console.error("Error deleting related ResultKhatmaGroup " + error.code + ": " + error.message);
						}
					});
			},
			error: function(error) 
			{
				console.error("Error finding related ResultKhatmaGroup " + error.code + ": " + error.message);
			}
		});
	var GroupUsers = Parse.Object.extend("GroupUsers");
	var QueryGroupUsers = new Parse.Query(GroupUsers);
	QueryGroupUsers.equalTo('UserID', UserObj.id);
	QueryGroupUsers.notEqualTo('JoiningStatus', 4);
	QueryGroupUsers.find(
		{
            success: function(ResultGroupUsers)
            {
                Parse.Object.destroyAll(ResultGroupUsers, 
                    {
						success: function() 
						{
							var Notification = Parse.Object.extend("Notification");
							var QueryNotification = new Parse.Query(Notification);
							QueryNotification.equalTo('targetId', UserObj.id);
							QueryNotification.find(
								{
						            success: function(ResultNotification)
						            {
						                Parse.Object.destroyAll(ResultNotification, 
						                    {
												success: function() 
												{

												},
												error: function(error) 
												{
													console.error("Error deleting related ResultNotification " + error.code + ": " + error.message);
												}
											});
									},
									error: function(error) 
									{
										console.error("Error finding related ResultNotification " + error.code + ": " + error.message);
									}
								});
						},
						error: function(error) 
						{
							console.error("Error deleting related ResultGroupUsers " + error.code + ": " + error.message);
						}
					});
			},
			error: function(error) 
			{
				console.error("Error finding related ResultGroupUsers " + error.code + ": " + error.message);
			}
		});	
});