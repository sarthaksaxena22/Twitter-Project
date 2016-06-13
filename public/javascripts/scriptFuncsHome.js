$(document).ready(function() {

	displayPendingTweets();

	//loads twitter data
	function displayPendingTweets(){
		$.ajax({
		    url: 'http://localhost:3000/db',
		    type: "GET",
		    dataType: 'json',
		    success: function(data) {
		        $.each(data, function(x, value) {
		             $("#postTweets").append(dbData(value));
		        });
		    },
		    error: function(xhr, textStatus, errorThrown) {
		        alert("Error" + xhr + textStatus + errorThrown);
		    }
      	});	
	}


	//generates dyanmic generated html
	function dbData(jsonData) {
	     
		 var verifyApproved = jsonData.approved;
	
		 if(verifyApproved >=1){
		 	
		 	var today = new Date();
			var dd = today.getDate();
			var mm = today.getMonth()+1; //January is 0!
			var yyyy = today.getFullYear();

			if(dd<10) {
			    dd='0'+dd
			} 

			if(mm<10) {
			    mm='0'+mm
			} 

			today = mm+'/'+dd+'/'+yyyy;
			//today = "03/17/2016";

			
			if(today === jsonData.date && jsonData.postedOnTwitter === 0){
				
			    $.ajax({
				    url: 'http://localhost:3000/db/' + jsonData.id,
				    type: "PUT",
				    contentType: 'application/json',
				    data: JSON.stringify({
			            approved: jsonData.approved,
			            date: jsonData.date,
			            tweet: jsonData.tweet,
			            datePosted: jsonData.datePosted,
			            postedOnTwitter: 1
		       		}),
				    success: function(data) {
			        	var parameters = { tweet: jsonData.tweet };
				     	$.post( '/tweetPost', parameters, function(data) {
					       	alert(" Status updated successfully on to the twitter");
					       	location.reload(true);
					     });
				
				    },
				    error: function(xhr, textStatus, errorThrown) {
				        alert("Error" + xhr + textStatus + errorThrown);
				    }
				});

			}else{
				if(jsonData.postedOnTwitter === 0){
					 $("#postTweets").append('<div class="post_body">');
					 $("#postTweets").append('<div style="font-size: 16px;" class="tweet_body"><span>'+jsonData.tweet+'</span> <button style="margin:20px" id="'+ jsonData.id +'" type="button" class="btn btn-primary">Approve</button> </div> ');
				     $("#postTweets").append('<p class="desription"><span>'+ "#" +jsonData.id+'</span> &#0149;<span style="margin:20px">'+ "Posted on account: " +jsonData.datePosted+'</span></p>');
					 $("#postTweets").append('<hr style="border-color: #106cc8;border-width: 2px;"/>');
					 $("#"+jsonData.id).prop("disabled", true);
				}
			}
		 }else{
		 	 $("#postTweets").append('<div class="post_body">');
			 $("#postTweets").append('<div style="font-size: 16px;" class="tweet_body"><span>'+jsonData.tweet+'</span> <button style="margin:20px" id="'+ jsonData.id +'" type="button" class="btn btn-primary">Approve</button> </div> ');
		     $("#postTweets").append('<p class="desription"><span>'+ "#" +jsonData.id+'</span> &#0149;<span style="margin:20px">'+ "Posted on account: " +jsonData.datePosted+'</span></p>');
			 $("#postTweets").append('<hr style="border-color: #106cc8;border-width: 2px;"/>');
		 }	

		 //$("#postTweets").append('<br/><br/>');
	}

	//post tweet on twitter
	$("#postTweets").on("click", "button", function() {
		
		var rowId = $(this).attr("id");
    	var approved, date, tweet, date, datePosted;

    	//updates approved for this it first gets the data and then updates it.
    	$.ajax({
	    
	        url: 'http://localhost:3000/db/' + rowId,
	        type: 'GET',
	        contentType: 'application/json',
	        dataType: 'json',
	        success: function(data) {
		     	
		     	approved = data.approved + 1;
		     	date = data.date;
		     	tweet = data.tweet;
		     	datePosted = data.datePosted;
		     	postedOnTwitter = data.postedOnTwitter;

		     	updateApprove(approved);

		     	function updateApprove(approved) {
                	
                	// gets today date
                	var today = new Date();
					var dd = today.getDate();
					var mm = today.getMonth()+1; //January is 0!
					var yyyy = today.getFullYear();

					if(dd<10) {
					    dd='0'+dd;
					} 

					if(mm<10) {
					    mm='0'+mm;
					} 

					today = mm+'/'+dd+'/'+yyyy;

					// if today date is same as date schedule to post
					if(today === date){

		            	$.ajax({
						    url: 'http://localhost:3000/db/' + rowId,
						    type: "PUT",
						    contentType: 'application/json',
						    data: JSON.stringify({
					            approved: approved,
					            date: date,
					            tweet: tweet,
					            datePosted: datePosted,
					            postedOnTwitter: 1
				       		}),
						    success: function(data) {
					        	var parameters = { tweet: tweet };
						     	$.post( '/tweetPost', parameters, function(data) {
							       	alert(" Status updated successfully on to the twitter");
							       	//$("#"+data.id).prop("disabled", true);
							       	location.reload(true);
							     });
						
						    },
						    error: function(xhr, textStatus, errorThrown) {
						        alert("Error" + xhr + textStatus + errorThrown);
						    }
				      	});
					}else{

						$.ajax({
						    url: 'http://localhost:3000/db/' + rowId,
						    type: "PUT",
						    contentType: 'application/json',
						    data: JSON.stringify({
					            approved: approved,
					            date: date,
					            tweet: tweet,
					            datePosted: datePosted,
					            postedOnTwitter: postedOnTwitter
				       		}),
						    success: function(data) {
					     		alert("Tweet is schedule to update on mentioned date");
					     		//location.reload(true)
					     		$("#"+data.id).prop("disabled", true);
						    },
						    error: function(xhr, textStatus, errorThrown) {
						        alert("Error" + xhr + textStatus + errorThrown);
						    }
				      	});
					}

                }

		    },
		    error: function(xhr, textStatus, errorThrown) {
		        alert("Error" + xhr + textStatus + errorThrown);
		    }
    	});

	});
	

});
	
