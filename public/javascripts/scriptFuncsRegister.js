$(document).ready(function() {

	$('#divMess').hide();

	$('#submit').click(function(event){

		event.preventDefault();
		
		var username = $('#username').val();
		var password = $('#password').val();
		

		$.ajax({
	        url: 'http://localhost:3000/register',
	        type: 'GET',
	        contentType: 'application/json',
	        dataType: 'json',
	        success: function(data) {
				
	        	if(JSON.stringify(data) === '[]') { 
	        		$.ajax({
					        url: 'http://localhost:3000/register',
					        type: 'POST',
					        contentType: 'application/json',
					        data: JSON.stringify({
					           username : username,
					           password : password
					        }),
					        dataType: 'json',
					        success: function(data) {
					        	alert("Register successfully");
		            
					        	var url = "http://localhost:8000/index.html";
					            window.location.replace(url);
					            return false;
					        },
					        error: function(xhr, textStatus, errorThrown) {
					        	console.log("error");
					            console.log("Error" + xhr + textStatus + errorThrown);
					        }
					        
				    });//ajax
				    return false;

				}else{

	        	$.each(data, function(x, value) {

		            if(value.username === username){
		             	$('#divMess').show();
		             	$("#message").html("User is already present");
		             	return false;
		            }else{
		             	$.ajax({
					        url: 'http://localhost:3000/register',
					        type: 'POST',
					        contentType: 'application/json',
					        data: JSON.stringify({
					           username : username,
					           password : password
					        }),
					        dataType: 'json',
					        success: function(data) {
					        	alert("Register successfully");
		            			var url = "http://localhost:8000/index.html/" + data.id;
					            window.location.replace(url);
					            return false;
					        },
					        error: function(xhr, textStatus, errorThrown) {
					        	console.log("error");
					            console.log("Error" + xhr + textStatus + errorThrown);
					        }
					        
					    });
					    return false;
		            }//else
		            
		        });
	       
	        }
	    },
        error: function(xhr, textStatus, errorThrown) {
        	console.log("error");
            console.log("Error" + xhr + textStatus + errorThrown);
        }
	    
		
	});
 });
});