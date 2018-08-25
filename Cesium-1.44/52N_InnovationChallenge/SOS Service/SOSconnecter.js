
//Simulate the default observations
var search;

//when user open the page, insert the default observation result value to each offering 
function updateObservations(){
	for(var i=1;i<R3_point.features.length+1;i++){
		// var i = 1 //for test
		search = i;
		var findNode = R3_point.features.find(findFeatureOfInterestNode);
		var featureOfInterest = findNode.properties.Name;
		var geometry = findNode.geometry;
		console.log(i);
		// do insert observation
		insertObservation(i,featureOfInterest,geometry,30); //default temperature is 30
	}
};


//use id to find the featureOfInterent name; 
function findFeatureOfInterestNode(features){
  return features.properties.id === search; 
};

function insertObservation(offeringID,featureOfInterest,geometry,temperatureResult){

	var TimeNow= new Date();
	var yyyy = TimeNow.toLocaleDateString().slice(0,4)
	var MM = (TimeNow.getMonth()+1<10 ? '0' : '')+(TimeNow.getMonth()+1);
	var dd = (TimeNow.getDate()<10 ? '0' : '')+TimeNow.getDate();
	var h = (TimeNow.getHours()<10 ? '0' : '')+TimeNow.getHours();
	var m = (TimeNow.getMinutes()<10 ? '0' : '')+TimeNow.getMinutes();
	var s = (TimeNow.getSeconds()<10 ? '0' : '')+TimeNow.getSeconds(); 

	var time = yyyy + "-" + MM + "-" + dd + "T" + h + ":" + m + ":" + s + "+08:00";
	// var Time = (currentTime.getFullYear()+"-"+"0"+(currentTime.getMonth()+1)+"-"+currentTime.getDate()+"T"+currentTime.getHours()+":"+currentTime.getMinutes()+":"+currentTime.getSeconds()+"+08:00");	
	// var TimeText = Time.toString();

	var defaultObservation = {
				  "request": "InsertObservation",
				  "service": "SOS",
				  "version": "2.0.0",
				  "offering": "Offering_DHT22",  //offeringID.toString()
				  "observation": {    
				    "type": "http://www.opengis.net/def/observationType/OGC-OM/2.0/OM_Measurement",
				    "procedure": "DHT22_Sensor",
				    "observedProperty": "Temperature_DHT22",
				    "featureOfInterest": {
				      "identifier": {
				        "value": offeringID.toString(),  //featureOfInterest.toString()
				        "codespace": "http://www.opengis.net/def/nil/OGC/0/unknown"
				      },
				      "name": [
				        {
				          "value": featureOfInterest.toString(), //featureOfInterest.toString()
				          "codespace": "http://www.opengis.net/def/nil/OGC/0/unknown"
				        }
				      ],
				      "sampledFeature": [
				        "DHT22_Parent"
				      ],
				      "geometry": {
				        "type": "Point",
				        "coordinates": [
				          geometry.coordinates[0],  //geometry.coordinates[0]
				          geometry.coordinates[1]   //geometry.coordinates[1]
				        ],
				        "crs": {
				          "type": "name",
				          "properties": {
				            "name": "EPSG:4326"
				          }
				        }
				      }
				    },
				    "phenomenonTime": time, //一定要是都是兩位數的時間格式(yyyy-mm-ddThh:mm:ss+08:00)
				    "resultTime": time,  //一定要是都是兩位數的時間格式(yyyy-mm-ddThh:mm:ss+08:00)
				    "result": {
				      "uom": "Celsius",
				      "value": parseInt(temperatureResult) //一定要是數字，不能為字串
				    }
				  }
				};

// {
//   "request": "InsertObservation",
//   "service": "SOS",
//   "version": "2.0.0",
//   "offering": "1",
// 				  "observation": {    
// 				    "type": "http://www.opengis.net/def/observationType/OGC-OM/2.0/OM_Measurement",
// 				    "procedure": "DHT22_Sensor",
// 				    "observedProperty": "Temperature_DHT22",
// 				    "featureOfInterest": {
// 				      "identifier": {
// 				        "value": "1",  
// 				        "codespace": "http://www.opengis.net/def/nil/OGC/0/unknown"
// 				      },
// 				      "name": [
// 				        {
//                   "value": "R3-115", 
// 				          "codespace": "http://www.opengis.net/def/nil/OGC/0/unknown"
// 				        }
// 				      ],
// 				      "geometry": {
// 				        "type": "Point",
// 				        "coordinates": [
// 				          0,  
// 				          0  
// 				        ],
// 				        "crs": {
// 				          "type": "name",
// 				          "properties": {
// 				            "name": "EPSG:4326"
// 				          }
// 				        }
// 				      }
// 				    },
//             "phenomenonTime": "1994-02-01T00:00:00+08:00", 
// 				    "resultTime": "1994-02-01T00:00:00+08:00",  
// 				    "result": {
// 				      "uom": "Celsius",
// 				      "value": 25 
// 				    }
// 				  }
// }

		$.ajax({
		    url:"http://localhost:8080/52n-sos/service",
		    type: "POST",
		    data: JSON.stringify(defaultObservation),
		    contentType: "application/json",
		    acception: "application/json",
		    success: function(data){
		        console.log(data);
		    },
		    error: function(response, status){
		        console.log(response);
		        console.log(status);
		    }
		});
}

var search2 ;

//use id to find the featureOfInterent name; 
function findObstacleNode(features){
  return features.properties.id === search2; 
};

function AddObstacleObservation(){
	var offeringID = document.getElementById("OfferingID").value;
	var temperatureResult = document.getElementById("temperature").value;

		search2 = parseInt(offeringID);
		var findNode = R3_point.features.find(findObstacleNode);
		var featureOfInterest = findNode.properties.Name;
		var geometry = findNode.geometry;

		console.log(offeringID);
		console.log(featureOfInterest);
		console.log(geometry);
		console.log(temperatureResult)

		// // do insert observation
		insertObservation(offeringID,featureOfInterest,geometry,temperatureResult); 	
}





function checkObservations(){
	for(var i=1; i<111; i++){
		// var i=1
		console.log(i);
		getObservationsByOffering(i);
	}
}


function getObservationsByOffering(featureOfInterestID){



// var getObservation = {
// 		  "request": "GetObservation",
// 		  "service": "SOS",
// 		  "version": "2.0.0",
// 		  "offering": [
// 		    offeringID.toString()
// 		  ],
// 		  "observedProperty": [
// 		    "Temperature_DHT22"
// 		  ]
// 		};

// var getLastestObservation = {
// 		  "request": "GetObservation",
// 		  "service": "SOS",
// 		  "version": "2.0.0",
// 		  "procedure": [
// 		    "DHT22_Sensor"
// 		  ],
// 		  "featureOfInterest": [
// 		    featureOfInterestID.toString()
// 		  ],
// 		   "temporalFilter": {
// 		    "equals": {
// 		      "ref": "om:phenomenonTime",
// 		      "value": "first"
// 		    }
// 		  }
// 		}


var getLastestObservation = {
		  "request": "GetObservation",
		  "service": "SOS",
		  "version": "2.0.0",
		  "procedure": [
		    "DHT22_Sensor"
		  ],
		  "offering": [
		    "Offering_DHT22"
		  ],
		  "observedProperty": [
		    "Temperature_DHT22"
		  ],
		  "featureOfInterest": [
				featureOfInterestID.toString()
		  ],
		  "temporalFilter": {
				    "equals": {
				      "ref": "om:phenomenonTime",
				      "value": "latest"
				    }
				  }
}

			$.ajax({
			    url:"http://localhost:8080/52n-sos/service",
			    type: "POST",
			    data: JSON.stringify(getLastestObservation),
			    contentType: "application/json",
			    acception: "application/json",
			    success: function(data){
			        console.log(data);
			        // var latestObservationResult = data.observations[data.observations.length-1].result.value;
			        var latestObservationResult = data.observations[0].result.value;
			        if(latestObservationResult>60){
			        	// var obstacleName = data.observations[data.observations.length-1].featureOfInterest.name.value;
			        	// var obstacleGeomatry = data.observations[data.observations.length-1].featureOfInterest.geometry;
			        	var obstacleName = data.observations[0].featureOfInterest.name.value;
			        	var obstacleGeomatry = data.observations[0].featureOfInterest.geometry;			        	
			        	AddObstacle(obstacleName);
			        }
			    },
			    error: function(response, status){
			        console.log(response);
			        console.log(status);
			    }
			});
	}


var searchFeatureOfInterestNode;

function findFeatureOfInterestByName(features){
  return features.properties.Name === searchFeatureOfInterestNode; 
};


function AddObstacle(name){
	searchFeatureOfInterestNode = name;
	var obstacleObj = R3_point.features.find(findFeatureOfInterestByName);  // find featureOfInterest by name
	var obstacle = obstacleObj.properties.Name;
	var positionOfObstacle = obstacleObj.geometry.coordinates;
	R3route[obstacle] = {}; // Let the obstacle node to {}
	EscapeSling[obstacle] = {};
    console.log("Finish add Obstacle point!!");
    ObstacleVisualize(positionOfObstacle);
}


// Add Obstacle point
function ObstacleVisualize(positionOfObstacle){
	var Obstacle = [{
	    "id" : "document",
	    "name" : "CZML Point",
	    "version" : "1.0"
	}, {
	    "id" : "Obstacle",
	    "name": "Obstacle",
	    "position" : {
	        "cartographicDegrees" : positionOfObstacle
	    },
	    "point": {
	        "color": {
	            "rgba": [255, 255, 255, 255]
	        },
	        "outlineColor": {
	            "rgba": [255, 0, 0, 255]
	        },
	        "outlineWidth" : 4,
	        "pixelSize": 20
	    }
	}];

	var dataSourcePromise = Cesium.CzmlDataSource.load(Obstacle);
	viewer.dataSources.add(dataSourcePromise);
}