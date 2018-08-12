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
	var URLstring = 'http://140.115.111.128:8080/STA/v1.0/Datastreams('+id+')/Observations?$select=result,phenomenonTime&$top=1&$orderby=phenomenonTime%20desc';
	//用得到的url進行post
	var xhttp = new XMLHttpRequest();
	  xhttp.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {
	      var responseText = this.responseText;
	      var responseJSON = JSON.parse(responseText);
	      var temperature = responseJSON.value[0].result;
	      if(temperature>30){
	      		console.log(temperature);
	      		console.log(id+" is Not Safe!!");
	      		AddObstacle(id);
	  		}else{
	  			console.log("Safe!!");
	  		}
	    }
	  };
	  xhttp.open("GET", URLstring, true);
	  xhttp.send();	
}

//加入障礙物
function AddObstacle(id){
  // var obstacle = document.getElementById("obstacle").value;
  var obstacle = id;
  //將障礙物從路網剃除
  R3route[obstacle] = {};
  //找到障礙物的座標
  findObstacleCoordinates(obstacle);
  // delete R3route[obstacle];
}


//為了findResultNode所做的(很重要!!!!!!!!!!!!)
var search;

//用來找Results裡面各的node對應的feature
function findObstacleNode(features){
  return features.properties.id === search; //之後要改Sensor的id
};

//找到Result每個Node對應feature的coordinate
function findObstacleCoordinates(obstacle){
	search = obstacle; //之後要改Sensor的id
    var NodeCoordinates = R3_point.features.find(findObstacleNode);
    var locationOfObstacle = NodeCoordinates.geometry.coordinates;

    var ObstacleName = NodeCoordinates.properties.Name;
    R3route[ObstacleName] = {};
    console.log("Finish add Obstacle point!!");
    // console.log(locationOfObstacle);
    ObstacleVisualize(locationOfObstacle)
};

function ObstacleVisualize(locationOfObstacle){
	var Obstacle = [{
	    "id" : "document",
	    "name" : "CZML Point",
	    "version" : "1.0"
	}, {
	    "id" : "Obstacle",
	    "name": "Obstacle",
	    "position" : {
	        "cartographicDegrees" : locationOfObstacle
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

// var Obstacle = [{
// 	    "id" : "document",
// 	    "name" : "CZML Point",
// 	    "version" : "1.0"
// 	}, {
// 	    "id" : "Obstacle",
// 	    "name": "Obstacle",
// 	    "position" : {
// 	        "cartographicDegrees" : locationOfObstacle
// 	    },
// 	    "image":"fire.png",
//       	"scale":1.0
// 	}];

	var dataSourcePromise = Cesium.CzmlDataSource.load(Obstacle);
	viewer.dataSources.add(dataSourcePromise);
}

function GetSensorsObservation(){
	for(var i=1;i<R3_point.features.length+1;i++){
		GETthing(i);
	}
}


//更新障礙
function AddObstacleObservations(){
	var Today=new Date();
	var TimeText = (Today.getFullYear()+"-"+(Today.getMonth()+1)+"-"+Today.getDate()+"T"+Today.getHours()+":"+Today.getMinutes()+":"+Today.getSeconds()+"Z");
	console.log("加入新資料的時間是: " +TimeText);
	var id = document.getElementById("ThingID").value
	var ObservationValue = document.getElementById("temperature").value;

		var json = JSON.stringify({
		  "phenomenonTime": TimeText,
		  "resultTime" : TimeText,
		  "result" : ObservationValue
		  // "Datastream":{"@iot.id":id}
		});

		POSTdata(id,json);		
}



//每次重整都先更新
function updateObservations(){
	var Today=new Date();
	var TimeText = (Today.getFullYear()+"-"+(Today.getMonth()+1)+"-"+Today.getDate()+"T"+Today.getHours()+":"+Today.getMinutes()+":"+Today.getSeconds()+"Z");
	console.log(TimeText);

	for(var i=1; i<R3_point.features.length+1; i++){
		var json = JSON.stringify({
		  "phenomenonTime": TimeText,
		  "resultTime" : TimeText,
		  "result" : 25,
		  "Datastream":{"@iot.id":i}
		});
		POSTdata(i,json);
	}		
}

function POSTdata(id,json){
        $.ajax({
            url: "http://140.115.111.128:8080/STA/v1.0/Datastreams("+id+")/Observations",
            type: "POST",
            data: json,
            contentType: "application/json; charset=utf-8",
            success: function(data){
                console.log(data);
            },
            error: function(response, status){
                console.log(response);
                console.log(status);
            }
        });
    }

