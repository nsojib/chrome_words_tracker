
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
}, false);

