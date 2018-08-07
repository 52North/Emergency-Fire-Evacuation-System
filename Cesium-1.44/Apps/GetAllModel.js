
var viewer = new Cesium.Viewer('cesiumContainer');
var Things = null;

function httpGET(){
	//得到input裡面的url字串
	var URLstring = document.getElementById("inputURL").value;
	// var URLstring = 'http://localhost:8080/STA/v1.0/Things(7)/Locations';
	// var URLstring = 'http://localhost:8080/STA/v1.0/Things(27)/Locations';
	//用得到的url進行get
	var xhttp = new XMLHttpRequest();
	  xhttp.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {
	      var model_geoJSON_String = this.responseText;
	      displayModel(model_geoJSON_String)
	    }
	  };
	  xhttp.open("GET", URLstring, true);
	  xhttp.send();	
}

function displayModel(model_geoJSON_String){
	//把GET到的response讀取為GeoJSON
	var model = JSON.parse(model_geoJSON_String);
	var dataSource = Cesium.GeoJsonDataSource.load(model.value[0].location).then(
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