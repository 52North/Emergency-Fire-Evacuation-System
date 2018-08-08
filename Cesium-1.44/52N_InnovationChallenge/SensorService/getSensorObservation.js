//滑鼠右鍵點擊事件
var handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);

	handler.setInputAction(function(click) {
	    var pickedObject = scene.pick(click.position);
	    if (Cesium.defined(pickedObject)) {
	    	id = pickedObject.id.properties.id._value;
	    	alert("ID = "+id);
	    	GETthing(id);
	    }
	}, Cesium.ScreenSpaceEventType.RIGHT_CLICK);


function GETthing(id){
	//得到input裡面的url字串
	var URLstring = 'http://140.115.111.128:8080/STA/v1.0/Datastreams('+id+')/Observations?$select=result,result,phenomenonTime';
	//用得到的url進行post
	var xhttp = new XMLHttpRequest();
	  xhttp.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {
	      var responseText = this.responseText;
	      var responseJSON = JSON.parse(responseText);
	      console.log(responseJSON);
	    }
	  };
	  xhttp.open("GET", URLstring, true);
	  xhttp.send();	
}
