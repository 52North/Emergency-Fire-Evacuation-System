
var viewer = new Cesium.Viewer('cesiumContainer');
var Things = null;

function httpGET(){
	//得到input裡面的url字串
	var URLstring = document.getElementById("inputURL").value;
	// var URLstring = 'http://140.115.111.128:8080/STA/v1.0/Things?$expand=Locations';
	//用得到的url進行get
	var xhttp = new XMLHttpRequest();
	  xhttp.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {
	      var Things_geoJSON_String = this.responseText;
	      displayModel(Things_geoJSON_String);
	      var JSONobj = JSON.parse(Things_geoJSON_String);
	      nextpage(JSONobj);
	    }
	  };
	  xhttp.open("GET", URLstring, true);
	  xhttp.send();	
}

function displayModel(Things_geoJSON_String){
	//把GET到的response讀取為GeoJSON
	var JSONobj = JSON.parse(Things_geoJSON_String);
	// nextpage();
	Things = JSONobj;
	for (var i=0;i < 20;i++) {
		var dataSource = Cesium.GeoJsonDataSource.load(JSONobj.value[i].Locations[0].location).then(
	        function(dataSource) {
	            var p = dataSource.entities.values;
	            for (var i = 0; i < p.length; i++) {
	                p[i].polygon.extrudedHeight = 0; // or height property
	            }
	            viewer.dataSources.add(dataSource);
	            viewer.zoomTo(dataSource);
	        }
	    );
	}
}

function nextpage(JSONobj){
	if(JSONobj.hasOwnProperty("@iot.nextLink")){
        var URLstring=JSONobj["@iot.nextLink"];
			var xhttp = new XMLHttpRequest();
			  xhttp.onreadystatechange = function() {
			    if (this.readyState == 4 && this.status == 200) {
			      var Things_geoJSON_String = this.responseText;
			      displayModel(Things_geoJSON_String)
			    }
			  };
			  xhttp.open("GET", URLstring, true);
			  xhttp.send();	
    }
}