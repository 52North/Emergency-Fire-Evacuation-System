
//Simulate the default observations
var search;

//The url of the SOS service (The url for ajax)
var SOSurl = "http://localhost:8080/52n-sos/service";

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
			var DHT22Information = {
				"offering":"Offering_DHT22",
				"procedure":"DHT22_Sensor",
				"observedProperty": "Temperature_DHT22",
				"sampledFeature": "DHT22_Parent",
				"uom": "Celsius"
			};		

		insertObservation(i,featureOfInterest,geometry,30,DHT22Information); //default temperature is 30

			var EN54Information = {
				"offering":"Offering_EN54-7",
				"procedure":"EN54-7",
				"observedProperty": "obscuration_rate",
				"sampledFeature": "EN54-7_Parent",
				"uom": "Percentage"
			};

		insertObservation(i,featureOfInterest,geometry,2.5,EN54Information); //default obscuration_rate is 2.5

	}
};


//use id to find the featureOfInterent name; 
function findFeatureOfInterestNode(features){
  return features.properties.id === search; 
};

function insertObservation(offeringID,featureOfInterest,geometry,value,sensorInformation){

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
				  "offering": sensorInformation.offering.toString(),  //offeringID.toString()
				  "observation": {    
				    "type": "http://www.opengis.net/def/observationType/OGC-OM/2.0/OM_Measurement",
				    "procedure": sensorInformation.procedure.toString(),
				    "observedProperty": sensorInformation.observedProperty.toString(),
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
				        sensorInformation.sampledFeature.toString()
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
				    "phenomenonTime": time, //(yyyy-mm-ddThh:mm:ss+08:00)
				    "resultTime": time,  //(yyyy-mm-ddThh:mm:ss+08:00)
				    "result": {
				      "uom": sensorInformation.uom.toString(),
				      "value": parseInt(value)
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
		    url:SOSurl,
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

function AddTemperatureObservation(){
	var OfferingID_T = document.getElementById("OfferingID_T").value;
	var temperatureResult = document.getElementById("temperature").value;

		search2 = parseInt(OfferingID_T);
		var findNode = R3_point.features.find(findObstacleNode);
		var featureOfInterest = findNode.properties.Name;
		var geometry = findNode.geometry;

		console.log(OfferingID_T);
		console.log(featureOfInterest);
		console.log(geometry);
		console.log(temperatureResult)

		var DHT22Information = {
			"offering":"Offering_DHT22",
			"procedure":"DHT22_Sensor",
			"observedProperty": "Temperature_DHT22",
			"sampledFeature": "DHT22_Parent",
			"uom": "Celsius"
		}

		// // do insert observation
		insertObservation(OfferingID_T,featureOfInterest,geometry,temperatureResult,DHT22Information); 	
}



function AddSmokeObservation(){
	var OfferingID_O = document.getElementById("OfferingID_O").value;
	var ObscurationRateResult = document.getElementById("ObscurationRate").value;

		search2 = parseInt(OfferingID_O);
		var findNode = R3_point.features.find(findObstacleNode);
		var featureOfInterest = findNode.properties.Name;
		var geometry = findNode.geometry;

		console.log(OfferingID_O);
		console.log(featureOfInterest);
		console.log(geometry);
		console.log(ObscurationRateResult)


		var EN54Information = {
			"offering":"Offering_EN54-7",
			"procedure":"EN54-7",
			"observedProperty": "obscuration_rate",
			"sampledFeature": "EN54-7_Parent",
			"uom": "Percentage"
		};

		// // do insert observation
		insertObservation(OfferingID_O,featureOfInterest,geometry,ObscurationRateResult,EN54Information); 	
}




function checkObservations(){
	for(var i=1; i<111; i++){
		// var i=1
		console.log(i);
		getObservationsByOffering(i);
		getSmokeObservations(i);
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
		  "offering": [
		    "Offering_DHT22",
        	// "Offering_EN54-7"
		  ],
		  "observedProperty": [
		    "Temperature_DHT22",
        	// "obscuration_rate"
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
			    url:SOSurl,
			    type: "POST",
			    data: JSON.stringify(getLastestObservation),
			    contentType: "application/json",
			    acception: "application/json",
			    success: function(data){
			        console.log(data);
			        var latestTemperatureResult = data.observations[0].result.value;
			        // var latestSmokeDensityResult = data.observations[0].result.value;

			        if(latestTemperatureResult>60){
			        	// var obstacleName = data.observations[data.observations.length-1].featureOfInterest.name.value;
			        	// var obstacleGeomatry = data.observations[data.observations.length-1].featureOfInterest.geometry;
			        	var obstacleName = data.observations[0].featureOfInterest.name.value;
			        	var obstacleGeomatry = data.observations[0].featureOfInterest.geometry;			        	
			        	AddObstacle(obstacleName);
			        }


			       // if(latestTemperatureResult > 60 && latestSmokeDensityResult < 22.5){
			       //  	var obstacleName = data.observations[1].featureOfInterest.name.value;
			       //  	var obstacleGeomatry = data.observations[1].featureOfInterest.geometry;			        	
			       //  	AddObstacle(obstacleName);
			       // }else if(latestTemperatureResult < 60 && latestSmokeDensityResult > 22.5){
			       //  	var obstacleName = data.observations[0].featureOfInterest.name.value;
			       //  	var obstacleGeomatry = data.observations[0].featureOfInterest.geometry;			        	
			       //  	AddObstacle(obstacleName);			       	
			       // }else if(latestTemperatureResult >60 && latestSmokeDensityResult > 22.5){
			       //  	var obstacleName = data.observations[0].featureOfInterest.name.value;
			       //  	var obstacleGeomatry = data.observations[0].featureOfInterest.geometry;			        	
			       //  	AddObstacle(obstacleName);
			       // }
			    },
			    error: function(response, status){
			        console.log(response);
			        console.log(status);
			    }
			});
	}


function getSmokeObservations(featureOfInterestID){

var getLastestObservation = {
		  "request": "GetObservation",
		  "service": "SOS",
		  "version": "2.0.0",
		  "offering": [
		    // "Offering_DHT22",
        	"Offering_EN54-7"
		  ],
		  "observedProperty": [
		    // "Temperature_DHT22",
        	"obscuration_rate"
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
			    url:SOSurl,
			    type: "POST",
			    data: JSON.stringify(getLastestObservation),
			    contentType: "application/json",
			    acception: "application/json",
			    success: function(data){
			        console.log(data);
			        var latestSomkeResult = data.observations[0].result.value;
			        // var latestSmokeDensityResult = data.observations[0].result.value;

			        if(latestSomkeResult>22.5){
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
	        "pixelSize": 50
	    }
	}];

	// var Obstacle = [{
 //    "id":"Headquarters",
 //    "position":{
 //      "cartesian":[
 //        positionOfObstacle
 //      ]
 //    },
 //    "billboard":{
 //      "color":{
 //        "rgba":[
 //          0,255,255,255
 //        ]
 //      },
 //      "horizontalOrigin":"CENTER",
 //      "image":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAEISURBVEhLvVXBDYQwDOuojHKj8LhBbpTbpBCEkZsmIVTXq1RVQGrHiWlLmTTqPiZBlyLgy/KSZQ5JSHDQ/mCYCsC8106kDU0AdwRnvYZArWRcAl0dcYJq1hWCb3hBrumbDAVMwAC82WoRvgMnVMDBnB0nYZFTbE6BBvdUGqVqCbjBIk3PyFFR/NU7EKzru+qZsau3ryPwwCRLKYOzutZuCL6fUmWeJGzNzL/RxAMrUmASSCkkAayk2IxPlwhAAYGpsiHQjbLccfdOY5gKkCXAMi7SscAwbQpAnKyctWyUZ6z8ja3OGMepwD8asz+9FnSvbhU8uVOHFIwQsI3/p0CfhuqCSQuxLqsN6mu8SS+N42MAAAAASUVORK5CYII=",
 //      "scale":1.0,
 //      "verticalOrigin":"CENTER"
 //    }
 //  }]

	var dataSourcePromise = Cesium.CzmlDataSource.load(Obstacle);
	viewer.dataSources.add(dataSourcePromise);
}
