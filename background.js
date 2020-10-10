
// alert('OK');
// Get the current tab and send a message from it:
 
 

//upload data. 
function save_to_server(txt){ 
	
	// https://wordsaver.000webhostapp.com/insert.php?word=%22OK%22&link=%22_dd__%22
	
		chrome.identity.getProfileUserInfo(function(info) { 
			var email=info.email;
			 
				var url=window.location.href;
				chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
					 url = tabs[0].url; 
						 $.ajax({
						type: 'GET',
						url: 'https://wordsaver.000webhostapp.com/insert.php', 
						data: {"word":txt, "link":url, "user":email} ,
						success: function (data) {
							console.log(data);
						}
					});
				});
			 
			 
			// doSearch(txt, 'yellow');
			
			
		});

 
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
			   chrome.tabs.getSelected(null, function(tab) {             //send to context to highlight these words
					chrome.tabs.query({active:true},function(tabs){ 
						chrome.tabs.sendMessage(tab.id, { data: data }, (response) => {
								console.log(response);
							}); 	
					}); 
				});
			
				
			}
		});
		
	});
	  
}

 
 chrome.runtime.onMessage.addListener(         //receive double clicked word. after google showed meaning. 
  (request, sender, sendResponse) => {
	  //alert("sender="+request.message); 
	 if(request.message.startsWith("__popup__echo")){
//		load words
	//alert("loading");
		load_words();
	 }else{ 
	 console.log("newword="+request.message);
		 words.push(request.message);
		 last_word=request.message;
	 }
  });
  
  