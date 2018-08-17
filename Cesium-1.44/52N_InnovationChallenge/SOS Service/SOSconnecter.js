
//Simulate the default observations
var search;

//when user open the page, insert the default observation result value to each offering 
function updateObservations(){
	for(var i=1;i<R3_point.features.length+1;i++){
		// var i = 1; //use first node to test
		search = i;
		var findNode = R3_point.features.find(findFeatureOfInterestNode);
		var featureOfInterest = findNode.properties.Name;
		var geometry = findNode.geometry;

		// do insert observation
		insertObservation(i,featureOfInterest,geometry,30); //default temperature is 30
		console.log(i);
	}
};


//use id to find the featureOfInterent name; 
function findFeatureOfInterestNode(features){
  return features.properties.id === search; 
};

function insertObservation(offeringID,featureOfInterest,geometry,temperatureResult){

	var currentTime=new Date();
	var Time = (currentTime.getFullYear()+"-"+"0"+(currentTime.getMonth()+1)+"-"+currentTime.getDate()+"T"+currentTime.getHours()+":"+currentTime.getMinutes()+":"+currentTime.getSeconds()+"+08:00");	
	var TimeText = Time.toString();

	var defaultObservation = {
				  "request": "InsertObservation",
				  "service": "SOS",
				  "version": "2.0.0",
				  "offering": offeringID.toString(),
				  "observation": {    
				    "type": "http://www.opengis.net/def/observationType/OGC-OM/2.0/OM_Measurement",
				    "procedure": "DHT22_Sensor",
				    "observedProperty": "Temperature_DHT22",
				    "featureOfInterest": {
				      "identifier": {
				        "value": featureOfInterest.toString(),
				        "codespace": "http://www.opengis.net/def/nil/OGC/0/unknown"
				      },
				      "name": [
				        {
				          "value": featureOfInterest.toString(),
				          "codespace": "http://www.opengis.net/def/nil/OGC/0/unknown"
				        }
				      ],
				      "sampledFeature": [
				        "DHT22_Parent"
				      ],
				      "geometry": {
				        "type": "Point",
				        "coordinates": [
				          geometry.coordinates[0],
				          geometry.coordinates[1]
				        ],
				        "crs": {
				          "type": "name",
				          "properties": {
				            "name": "EPSG:4326"
				          }
				        }
				      }
				    },
				    "phenomenonTime": TimeText.toString(),
				    "resultTime": TimeText.toString(),
				    "result": {
				      "uom": "Celsius",
				      "value": temperatureResult
				    }
				  }
				};

		$.ajax({
		    url:"http://localhost:8080/52n-sos-webapp/service",
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