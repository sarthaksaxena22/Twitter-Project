$(document).ready(function() {


	$.ajax({
	        url: 'http://localhost:3000/register',
	        type: 'GET',
	        contentType: 'application/json',
	        dataType: 'json',
	        success: function(data) {
	        },
	        error: function(xhr, textStatus, errorThrown) {
	        	console.log("error");
	            console.log("Error" + xhr + textStatus + errorThrown);
	        }
	});
	       
	        

	//for character count twitter
	var $textarea = $('textarea');
	var $chars_remaining = $('#charCount');

	$textarea.keyup(function(){
	    $chars_remaining.html((140 - parseInt($textarea.val().length)));
	});

	$textarea.keydown(function(){
	    $chars_remaining.html((140 - parseInt($textarea.val().length)));
	    $('#divMess').hide();
	});

	$( "#datepicker" ).datepicker({ minDate: 0 });

	$('#divMess').hide();

	//for button submission
	$('#btnSubmit').click(function(event){

		event.preventDefault();
		var tweet = $textarea.val();
		var date = $('#datepicker').val();
		
		var datePosted = new Date();
		var dd = datePosted.getDate();
		var mm = datePosted.getMonth()+1; //January is 0!
		var yyyy = datePosted.getFullYear();

		if(dd<10) {
		    dd='0'+dd
		} 

		if(mm<10) {
		    mm='0'+mm
		} 

		datePosted = mm+'/'+dd+'/'+yyyy;

       	if(tweet === "" || date === ""){
       		 $('#divMess').show();
		     $("#message").html("Tweets can't be blank.. Thanks");
       	}else{
		    $.ajax({
		        url: 'http://localhost:3000/db',
		        type: 'POST',
		        contentType: 'application/json',
		        data: JSON.stringify({
		            tweet: tweet,
		            approved:0,
		            date: date,
		            datePosted:datePosted,
		            postedOnTwitter:0
		        }),
		        dataType: 'json',
		        success: function(data) {
		            //console.log(data);
		            $('#divMess').show();
		            $("#message").html("Tweet posted successfully");
		        },
		        error: function(xhr, textStatus, errorThrown) {
		            console.log("Error" + xhr + textStatus + errorThrown);
		        }
		    });
		}


    });

});