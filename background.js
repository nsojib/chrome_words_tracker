
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

 
function save_to_server(txt){ 
	
	// https://wordsaver.000webhostapp.com/insert.php?word=%22OK%22&link=%22_dd__%22
	
	var url=window.location.href;
	chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
		 url = tabs[0].url; 
			 $.ajax({
			type: 'GET',
			url: 'https://wordsaver.000webhostapp.com/insert.php', 
			data: {"word":txt, "link":url} ,
			success: function (data) {
				console.log(data);
			}
		});
	});
 
 
 doSearch(txt, 'yellow');
 
	
}

var words=[];

var last_word='';
 var addItem = {
                    "id": "word_saver3",
                    "title": "save_word", 
                    "contexts": ["all"],  // type of context
					 
					onclick: function() {
						//highlight(last_word);
						save_to_server(last_word);
					 // alert('Saving word:'+String(last_word) ); 
					 
			}
			
}
 chrome.contextMenus.create(addItem); 
 

 // var showMenuItem = {
                    // "id": "word_saver1",
                    // "title": "show words", 
                    // "contexts": ["all"],  // type of context
					 
					// onclick: function() {
					 // alert('words: '+String(words) );    
			// }
			
// }
 // chrome.contextMenus.create(showMenuItem); 

 
 
// var contextMenuItem = {
                    // "id": "word_saver",
                    // "title": "save words now", 
                    // "contexts": ["all"],  // type of context
					 
					// onclick: function() {  
						// downloadFileFromText('ws_words_'+String(words.length)+'.txt',String(words) );
						// words=[];
			// }
			
// }
 // chrome.contextMenus.create(contextMenuItem); 
 
 function load_words(){
	//https://wordsaver.000webhostapp.com/linkwords.php?link=https://time.com/5898069/gretchen-whitmer-kidnapping-plot/
	
		var url=window.location.href;
		//alert("getting words for="+url);
		 
	 var st="https://wordsaver.000webhostapp.com/linkwords.php?link="+url;
	 console.log("st="+st);
	 
	 
	 	var url=window.location.href;
	chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
		 url = tabs[0].url; 
		
			 	 $.ajax({
			type: 'GET',
			url: 'https://wordsaver.000webhostapp.com/linkwords.php', 
			data: {"link":url} ,
			crossDomain : true,
			success: function (data) {
				console.log("data loaded="+data);
				//alert("data_loaded="+data);
				
				//=		[tactical ,violent ,]
				
			
			//worked.
			   chrome.tabs.getSelected(null, function(tab) { 
			   					 chrome.tabs.query({active:true},function(tabs){ 
			chrome.tabs.sendMessage(tab.id, { data: data }, (response) => {
        console.log(response);
    }); 	
        }); 
			   
		 // chrome.tabs.query({active:true},function(tabs){
            // chrome.tabs.sendMessage(tab.id, "__bbbbbbbb__");
			// // chrome.runtime.sendMessage({data:"Handshake"},function(response){
			// // });
			
			// });   
			
			
		});
			

			
			
			
			
				
				
			}
		});
		
		
	});
	  
	 
	 // var xhr = new XMLHttpRequest();
// xhr.open("GET", "https://wordsaver.000webhostapp.com/linkwords.php?link="+url, true);
// xhr.onreadystatechange = function() {
  // if (xhr.readyState == 4) {
    // console.log("data="+xhr.responseText);
	
    // var resp= xhr.responseText;
	// alert("resp="+resp);
  // }
// }
// xhr.send();


 
	
}

 
 chrome.runtime.onMessage.addListener(         //receive double clicked word. after google showed meaning. 
  (request, sender, sendResponse) => {
	  //alert("sender="+request.message); 
	 if(request.message.startsWith("__popup__echo")){
//		load words
	//alert("loading");
		load_words();
	 }else{ 
		 words.push(request.message);
		 last_word=request.message;
	 }
  });
  
  