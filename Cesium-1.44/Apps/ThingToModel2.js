
var viewer = new Cesium.Viewer('cesiumContainer');
var ThingsArray = [];

function Thing(name,model){
	this.name = name;
	this.model = model;
}

function InitxmlHttp(){
    var xmlhttp;
    if(window.XMLHttpRequest){
       xmlhttp=new XMLHttpRequest();
    }
    else{
       xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    return xmlhttp;
}

function sendRequest(xmlhttp, requestURL, handler){
    xmlhttp.onreadystatechange = handler;
    xmlhttp.open("GET",requestURL,true);
    xmlhttp.send();    
}

function retrieveData(){
    doGetThing();
}

function doGetThing(){
   
    var requestURL = 'http://140.115.111.128:8080/STA/v1.0/Things?$expand=Locations';
    
    var xmlhttp =InitxmlHttp();
    sendRequest(xmlhttp, requestURL, function (){doGetThingHandler(xmlhttp)});
}

function doGetThingHandler(xmlhttp){
if(xmlhttp.readyState==4 &&xmlhttp.status==200){
    displayModel(xmlhttp.responseText) ;  
    }
}

function displayModel(jsonString){
     var thingsJSONObj = JSON.parse(jsonString);
 
    	for (var i=0;i < thingsJSONObj.value.length;i++) {

    	var name = thingsJSONObj.value[0].name;
    	var model = thingsJSONObj.value[i].Locations[0].location;
    	var newThing = new Thing(name,model);
		ThingsArray.push(newThing);	



		var dataSource = Cesium.GeoJsonDataSource.load(thingsJSONObj.value[i].Locations[0].location).then(
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
	if(thingsJSONObj.hasOwnProperty("@iot.nextLink")){
        var nextLinkURL=thingsJSONObj["@iot.nextLink"];
        var xmlhttp =InitxmlHttp();
        sendRequest(xmlhttp, nextLinkURL, function (){doGetThingHandler(xmlhttp)});
    }
    else{
    	alert("Load All Model !!!");
    }
}

// function markModel(){
// 	var i = 953;

// 	viewer.dataSources.add(Cesium.GeoJsonDataSource.load(ThingsArray[i].model, {
// 	  stroke: Cesium.Color.HOTPINK,
// 	  fill: Cesium.Color.RED,
// 	  strokeWidth: 3
// 	}));	
// }