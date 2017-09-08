$(function() {
	$("#openfile").click(function() {
		chrome.fileSystem.chooseEntry({
		    type: "openFile"
		}, function(fileEntry) {
			console.log(fileEntry);
			fileEntry.file(function(file){
			   
			});
		});
	});
	
	function errorHandler(e){
	    console.log(e.message);
	}
	
	function echoEntry(depth, Entry){
	    var tree = '|';
	    for(var i=0; i<depth-1; i++){
	        tree += ' |';
	    }
	    console.log(tree+'-'+Entry.name);
	}
	function getSubEntries(depth, Entry){
	    var dirReader = Entry.createReader();
	    dirReader.readEntries (function(Entries) {
	        for(var i=0; i<Entries.length; i++){
	            echoEntry(depth+1, Entries[i]);
	            if(Entries[i].isDirectory){
	                getSubEntries(depth+1, Entries[i]);
	            }
	        }
	    }, errorHandler);
	}
	
	$("#opendirectory").click(function(){
	   /* chrome.fileSystem.chooseEntry({type: 'openDirectory'}, function(Entry){
	    	 var dirReader = Entry.createReader();
	    	    dirReader.readEntries (function(Entries) {
	    	    for(var i=0; i<Entries.length; i++){
	    	        
	    	         if(Entries[i].isDirectory){
	    	        
	    	         }
	    	    }
	    	    }, errorHandler);
	    });*/
		chrome.fileSystem.chooseEntry({type: 'openDirectory'}, function(Entry) {
		    console.log(Entry.fullPath);
		    getSubEntries(0, Entry);
		});
	} );
	
	/*document.getElementById('myFile').onchange = function(){
	    var file = this.files[0];
	    console.log(file);
	    var reader = new FileReader();
	    reader.readAsText(file);
	    reader.onload = function(){
	        console.log(this.result);
	    }
	}*/
});