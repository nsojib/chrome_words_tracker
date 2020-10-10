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

 document.body.addEventListener('dblclick',function(){   //double click listener
	   
	    
	   setTimeout(function() { 
		   var site=window.location.href;
		   var sel=window.getSelection().toString() ;
		   console.log("selected="+sel);
		   
		   if(sel.length>50) {
			   console.log("Error: Selected word is too long");
			   return;
		   } 
		   //alert("text: "+words.toString() );
		    highlight(sel, 'yellow'); 
		   chrome.runtime.sendMessage(
				{message: sel},               //sending word to the background page. 
				function (response) {
					console.log(response);
				}
			);
		   

	   }, 1000);
	
	}); 

 
	
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
	   }else { //found word to highlight.
			str=str.replace('\t',''); 
			//alert("datadata="+str); 
			str=str.substring( str.indexOf('[')+1, str.indexOf(']')-1 );
			console.log("cleanstr="+str);
			var datas=str.split(',');
			for(var i=0;i<datas.length;i++) {
				var w=datas[i].trim();
				console.log("w="+w); 
				highlight(w, 'yellow');
			}
			if(datas.length==1 && str.length<3) {
				alert("Total 0 words loaded");
			}else{
				alert("Total "+datas.length+" words loaded");
			}
	   } 
  });
	