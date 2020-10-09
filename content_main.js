// alert("Content main loaded");

  
function highlight(text, backgroundColor) {
  if (window.find && window.getSelection) {
    document.designMode = "on";
    var sel = window.getSelection();
    sel.collapse(document.body, 0);

    while (window.find(text)) {
      document.execCommand("HiliteColor", false, backgroundColor);
      //sel.collapseToEnd();
	  break;
    }
    document.designMode = "off";
	
	// alert("search completed");
  }
}

 document.body.addEventListener('dblclick',function(){
	   
	    
	   setTimeout(function() { 
		   var site=window.location.href;
		   var sel=window.getSelection().toString() ; 
		   //alert("text: "+words.toString() );
		    //highlight(sel, 'yellow');
			
			document.designMode = "on";
			var ss = window.getSelection();
			ss.collapse(document.body, 0); 
			// document.execCommand("HiliteColor", false, 'yellow');
			 while (window.find(sel)) {
			  document.execCommand("HiliteColor", false, 'yellow');
			  //sel.collapseToEnd();
			  break;
			}
	
			document.designMode = "off";
			
		   
		   chrome.runtime.sendMessage(
				{message: sel},               //sending word to the background page. 
				function (response) {
					console.log(response);
				}
			);
		   

	   }, 1000);
	
	}); 

	
function load_words(){
	//https://wordsaver.000webhostapp.com/linkwords.php?link=https://time.com/5898069/gretchen-whitmer-kidnapping-plot/
	
		var url=window.location.href;
		//alert("getting words for="+url);
		 
	 var st="https://wordsaver.000webhostapp.com/linkwords.php?link="+url;
	 console.log("st="+st);
	 
	 
	 	 // $.ajax({
			// type: 'GET',
			// url: 'https://wordsaver.000webhostapp.com/linkwords.php', 
			// data: {"link":url} ,
			// crossDomain : true,
			// success: function (data) {
				// console.log(data);
				// alert("data_loaded");
			// }
		// });
	 
	 
	 
	 
	 
	 
	 var xhr = new XMLHttpRequest();
xhr.open("GET", "https://wordsaver.000webhostapp.com/linkwords.php?link="+url, true);
xhr.onreadystatechange = function() {
  if (xhr.readyState == 4) {
    console.log("data="+xhr.responseText);
	
    var resp= xhr.responseText;
	alert("resp="+resp);
  }
}
xhr.send();


 
	
}
	
	
	
chrome.runtime.onMessage.addListener(         //receive msg from popup.
  (request, sender, sendResponse) => {
	  var str = JSON.stringify(request.data).trim();
	  //alert("msg request received="+str); 
	  
	   if(str.includes("_popup")){
		   	 chrome.runtime.sendMessage(
				{message: "__popup__echo__"},               //sending word to the background page. 
				function (response) {
					console.log(response);
				}
			);
	   }else { 
			str=str.replace('\t',''); 
			//alert("datadata="+str); 
			str=str.substring( str.indexOf('[')+1, str.indexOf(']')-1 );
			console.log("cleanstr="+str);
			var datas=str.split(',');
			for(var i=0;i<datas.length;i++) {
				var w=datas[i].trim();
				console.log("w="+w);
				//
				highlight(w, 'yellow');
			}
			
	   } 
  });
	