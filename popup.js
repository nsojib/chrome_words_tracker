
var words=[];
document.addEventListener('DOMContentLoaded', function() {

chrome.tabs.executeScript( {
  code: "window.getSelection().toString();"
}, function(selection) {
  sendServiceRequest(selection[0]);
}); 


function sendServiceRequest(selectedText) {
   words.push(selectedText);
}

function getUserID(){
	chrome.identity.getProfileUserInfo(function(info) {
		 /* Use userInfo.email, or better (for privacy) userInfo.id
			They will be empty if user is not signed in in Chrome */
			var email=info.email;
			//alert('id='+email);
			
			document.getElementById('output').value=email;
			
			var url = "https://wordsaver.000webhostapp.com?user="+email;
			document.getElementById('view').href=url;
			
		});
}

getUserID();


  var checkPageButton = document.getElementById('search');
  checkPageButton.addEventListener('click', function() {
 
    chrome.tabs.getSelected(null, function(tab) {
      d = document;
 
      //alert('hi');  
		 
		 chrome.tabs.query({active:true},function(tabs){ 
			chrome.tabs.sendMessage(tab.id, { data: '__popup__' }, (response) => {
        console.log(response);
    }); 	
        });   

    });
	
  }, false);
  
 
  
    var tButton = document.getElementById('test');
    tButton.addEventListener('click', function() {
		//alert('test');
       //getUserID();
	    

    });
	
  
  
  
}, false);

