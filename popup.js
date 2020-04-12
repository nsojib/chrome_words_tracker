
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
 
      // //alert('hi'); 
	  // var txt='';
	  // for(var i=0;i<words.length;i++) {
		  // txt+=words[i]+'<br>';
	  // }
	  // alert(txt);

    });
  }, false);
}, false);

