// alert("Content main loaded");

  

 document.body.addEventListener('dblclick',function(){
	   
	    
	   setTimeout(function() { 
		   var site=window.location.href;
		   var sel=window.getSelection().toString() ; 
		   //alert("text: "+words.toString() );
		   
		   chrome.runtime.sendMessage(
				{message: sel},               //sending word to the background page. 
				function (response) {
					console.log(response);
				}
			);
		   

	   }, 1000);
	
	}); 
	