
//Simulate the default observations
var search;

//when user open the page, insert the default observation result value to each offering 
function updateObservations(){
	// for(var i=1;i<R3_point.features.length+1;i++){
		var i = 1; //use first node to test
		search = i;
		var findNode = R3_point.features.find(findFeatureOfInterestNode);
		var featureOfInterest = findNode.properties.Name;
		var geometry = findNode.geometry;

		// do insert observation
		insertObservation(i,featureOfInterest,geometry,30); //default temperature is 30
	// }
};


//use id to find the featureOfInterent name; 
function findFeatureOfInterestNode(features){
  return features.properties.id === search; 
};

function insertObservation(offeringID,featureOfInterest,geometry,temperatureResult){

	var currentTime=new Date();
	var TimeText = (currentTime.getFullYear()+"-"+(currentTime.getMonth()+1)+"-"+currentTime.getDate()+"T"+currentTime.getHours()+":"+currentTime.getMinutes()+":"+currentTime.getSeconds()+"+08:00");	

	var defaultObservation = {
			  "request": "InsertObservation",
			  "service": "SOS",
			  "version": "2.0.0",
			  "offering": offeringID,
			  "observation": {    
			    "type": "http://www.opengis.net/def/observationType/OGC-OM/2.0/OM_Measurement",
			    "procedure": "DHT22_Sensor",
			    "observedProperty": "Temperature_DHT22",
			    "featureOfInterest": {
			      "identifier": {
			        "value": featureOfInterest,
			        "codespace": "http://www.opengis.net/def/nil/OGC/0/unknown"
			      },
			      "name": [
			        {
			          "value": featureOfInterest,
			          "codespace": "http://www.opengis.net/def/nil/OGC/0/unknown"
			        }
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
			    "phenomenonTime": TimeText,
			    "resultTime": TimeText,
			    "result": {
			      "uom": "Celsius",
			      "value": temperatureResult
			    }
			  }
			};

	// var defaultObservationString = '{'+
	// 		  '"request": "InsertObservation",'+
	// 		  '"service": "SOS",'+
	// 		  '"version": "2.0.0",'+
	// 		  '"offering": "' + offeringID.toString() +'",'+
	// 		  '"observation": {' +   
	// 		    '"type": "http://www.opengis.net/def/observationType/OGC-OM/2.0/OM_Measurement",'+
	// 		    '"procedure": "DHT22_Sensor",'+
	// 		    '"observedProperty": "Temperature_DHT22",'+
	// 		    '"featureOfInterest": {'+
	// 		      '"identifier": {'+
	// 		        '"value": "' + featureOfInterest.toString() + '",'+
	// 		        '"codespace": "http://www.opengis.net/def/nil/OGC/0/unknown"'+
	// 		      '},'+
	// 		      '"name": ['+
	// 		        '{'+
	// 		          '"value":"'+ featureOfInterest.toString() + '",'+
	// 		          '"codespace": "http://www.opengis.net/def/nil/OGC/0/unknown"'+
	// 		        '}'+
	// 		      '],'+
	// 		      '"geometry": {'+
	// 		        '"type": "Point",'+
	// 		        '"coordinates": ['+
	// 		          geometry.coordinates[0]+','+
	// 		          geometry.coordinates[1]+
	// 		        '],'+
	// 		        '"crs": {'+
	// 		          '"type": "name",'+
	// 		          '"properties": {'+
	// 		            '"name": "EPSG:4326"'+
	// 		          '}'+
	// 		        '}'+
	// 		      '}'+
	// 		    '},'+
	// 		    '"phenomenonTime":"'+ TimeText.toString()+'",'+
	// 		    '"resultTime": "'+TimeText.toString()+'",'+
	// 		    '"result": {'+
	// 		      '"uom": "Celsius",'+
	// 		      '"value": '+temperatureResult+
	// 		    '}'+
	// 		  '}'+
	// 		'}';


	// var defultObservation = {};
	// defultObservation.request = "InsertObservation";
	// defultObservation.service = "SOS";
	// defultObservation.version = "2.0.0";
	// defultObservation.offering = offeringID;
	// defultObservation.observation = {};
	// defultObservation.observation.type = "http://www.opengis.net/def/observationType/OGC-OM/2.0/OM_Measurement";
	// defultObservation.observation.procedure = "DHT22_Sensor";
	// defultObservation.observation.observedProperty = "Temperature_DHT22";
	// defultObservation.observation.featureOfInterest = {};
	// defultObservation.observation.featureOfInterest.identifier = {value:""};
	// defultObservation.observation.featureOfInterest.identifier.value = featureOfInterest;
	// defultObservation.observation.featureOfInterest.identifier.codespace = "http://www.opengis.net/def/nil/OGC/0/unknown";
	// defultObservation.observation.featureOfInterest.name = [];
	// defultObservation.observation.featureOfInterest.name[0] = {value:""};
	// defultObservation.observation.featureOfInterest.name[0].value = featureOfInterest;
	// defultObservation.observation.featureOfInterest.name[0].codespace = "http://www.opengis.net/def/nil/OGC/0/unknown";
	// defultObservation.observation.featureOfInterest.geometry = {type:"Point"};
	// defultObservation.observation.featureOfInterest.geometry.coordinates = [];
	// defultObservation.observation.featureOfInterest.geometry.coordinates[0] = geometry.coordinates[0];
	// defultObservation.observation.featureOfInterest.geometry.coordinates[1] = geometry.coordinates[1];
	// defultObservation.observation.featureOfInterest.geometry.crs = {type:"name",properties:{name:"EPSG:4326"}};
	// defultObservation.observation.phenomenonTime = TimeText;
	// defultObservation.observation.resultTime = TimeText;
	// defultObservation.observation.result = {uom:"Celsius"};
	// defultObservation.observation.result.value = temperatureResult;




			// var data = JSON.stringify(defaultObservation);

			// console.log(defaultObservationString)

			// console.log(JSON.stringify(observation));

			$.ajax({
			    url:"http://localhost:8080/52n-sos-webapp/service",
			    type: "POST",
			    data: JSON.stringify(defaultObservation),
			    contentType: "application/json",
			    acception: "application/json",
			    success: function(data){
			        console.log(data);
			        response = data;
			    },
			    error: function(response, status){
			        console.log(response);
			        console.log(status);
			    }
			});
}