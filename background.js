
// alert('OK');
// Get the current tab and send a message from it:
 
 

function downloadFileFromText(filename, content) {
//courtesy: https://stackoverflow.com/questions/4845215/making-a-chrome-extension-download-a-file
    var a = document.createElement('a');
    var blob = new Blob([ content ], {type : "text/plain;charset=UTF-8"});
    a.href = window.URL.createObjectURL(blob);
    a.download = filename;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click(); //this is probably the key - simulating a click on a download link
    delete a;// we don't need this anymore
}
 
var words=[];


 var showMenuItem = {
                    "id": "word_saver1",
                    "title": "show words", 
                    "contexts": ["all"],  // type of context
					 
					onclick: function() {
					 alert('words: '+String(words) );    
			}
			
}
 chrome.contextMenus.create(showMenuItem); 

 
var contextMenuItem = {
                    "id": "word_saver",
                    "title": "save words now", 
                    "contexts": ["all"],  // type of context
					 
					onclick: function() {  
						downloadFileFromText('ws_words_'+String(words.length)+'.txt',String(words) );
						words=[];
			}
			
}
 chrome.contextMenus.create(contextMenuItem); 


 
 
 
 chrome.runtime.onMessage.addListener(         //receive double clicked word. after google showed meaning. 
  (request, sender, sendResponse) => {
	 // alert("_OK_="+request.message); 
	 words.push(request.message);
  });
  
  