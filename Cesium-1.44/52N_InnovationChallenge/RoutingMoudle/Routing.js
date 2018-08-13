
const lowestCostNode = (costs, processed) => {
  return Object.keys(costs).reduce((lowest, node) => {
    if (lowest === null || costs[node] < costs[lowest]) {
      if (!processed.includes(node)) {
        lowest = node;
      }
    }
    return lowest;
  }, null);
};

// //加入障礙物
// function AddObstacle(){
//   var obstacle = document.getElementById("obstacle").value;
//   R3route[obstacle] = {};
//   // delete R3route[obstacle];
// }


//規畫路徑
function routing(){
  GetSensorsObservation();
  setTimeout(function(){
    var start = document.getElementById("start").value;
    dijkstra(R3route,start);    
  },2000);

}

// function that returns the minimum cost and path to reach Finish
const dijkstra = (graph,start) => {
  var graph;

  graph.start = graph[start];

  // track lowest cost to reach each node
  const costs = Object.assign({finish: Infinity}, graph.start);

  // track paths
  const parents = {finish: null};
  for (let child in graph.start) {
    // parents[child] = 'R3107';
    parents[child] = start;
  }

  // track nodes that have already been processed
  const processed = [];

  let node = lowestCostNode(costs, processed);

  while (node) {
    let cost = costs[node];
    let children = graph[node];
    for (let n in children) {
      let newCost = cost + children[n];
      if (!costs[n]) {
        costs[n] = newCost;
        parents[n] = node;
      }
      if (costs[n] > newCost) {
        costs[n] = newCost;
        parents[n] = node;
      }
    }
    processed.push(node);
    node = lowestCostNode(costs, processed);
  }

  let optimalPath = ['finish'];
  let parent = parents.finish;
  while (parent) {
    optimalPath.push(parent);
    parent = parents[parent];
  }
  optimalPath.reverse();

  const results = {
    distance: costs.finish,
    path: optimalPath
  };
  
  console.log(results);
  findCoordinates(results);
  judgment(results);
  // return results;
};


//判斷樓梯是否通行
function judgment(results){
    if(results.distance == "Infinity"){
    console.log("Secnond option")
    StairsBlock(start);
  }else{
    console.log("nothing");
  }
};


//如果樓梯無法通行升降梯
function StairsBlock(start){
  // var EscapeSling = {
  // "R3-231":{"Level-2-Left-Corridor-A":1},
  // "R3-232":{"Level-2-Left-Corridor-A":1},
  // "R3-229":{"Level-2-Left-Corridor-B":1},
  // "R3-230":{"Level-2-Left-Corridor-B":1},
  // "R3-227":{"Level-2-Left-Corridor-C":1},
  // "R3-228":{"Level-2-Left-Corridor-C":1},
  // "R3-226":{"Level-2-Left-Corridor-D":1},
  // "Level-2-Left-Female-WC":{"Level-2-Left-Corridor-D":1},
  // "R3-225":{"Level-2-Left-Corridor-E":1},
  // "R3-224":{"Level-2-Left-Corridor-G":1},
  // "R3-233":{"Level-2-Left-Corridor-G":1},
  // "R3-223":{"Level-2-Left-Corridor-H":1},
  // "R3-220":{"Level-2-Left-Corridor-I":1},
  // "R3-221":{"Level-2-Left-Corridor-I":1},
  // "R3-222":{"Level-2-Left-Corridor-I":1.5},
  // "Level-2-Left-Male-WC":{"Level-2-Left-Corridor-J":1},
  // "Level-2-Left-Corridor-A":{"Level-2-Left-Corridor-B":1, "EscapeSling":1},
  // "Level-2-Left-Corridor-B":{"Level-2-Left-Corridor-A":1,"Level-2-Left-Corridor-C":1},
  // "Level-2-Left-Corridor-C":{"Level-2-Left-Corridor-B":1,"Level-2-Left-Corridor-D":1},
  // "Level-2-Left-Corridor-D":{"Level-2-Left-Corridor-C":1,"Level-2-Left-Corridor-E":1},
  // "Level-2-Left-Corridor-E":{"Level-2-Left-Corridor-D":1,"Level-2-Left-Corridor-F":1},
  // "Level-2-Left-Corridor-F":{"Level-2-Left-Corridor-J":2,"Level-2-Left-Corridor-E":1,"Level-2-Left-Corridor-G":1},
  // "Level-2-Left-Corridor-G":{"Level-2-Left-Corridor-F":1,"Level-2-Left-Corridor-H":1},
  // "Level-2-Left-Corridor-H":{"Level-2-Left-Corridor-G":1,"Level-2-Left-Corridor-I":1.5},
  // "Level-2-Left-Corridor-I":{"Level-2-Left-Corridor-H":1.5},
  // "Level-2-Left-Corridor-J":{"Left-Stairs-2-1":1,"Level-2-Left-Corridor-F":2,"Level-2-Mid-Corridor-A":1},
  // "R3-218":{"Level-2-Mid-Corridor-A":1},
  // "R3-219":{"Level-2-Mid-Corridor-A":1},
  // "R3-216":{"Level-2-Mid-Corridor-B":1},
  // "R3-217":{"Level-2-Mid-Corridor-B":1},
  // "R3-214":{"Level-2-Mid-Corridor-C":1},
  // "R3-215":{"Level-2-Mid-Corridor-C":1},
  // "R3-212":{"Level-2-Mid-Corridor-D":1},
  // "R3-213":{"Level-2-Mid-Corridor-D":1},
  // "R3-210":{"Level-2-Mid-Corridor-E":1},
  // "R3-211":{"Level-2-Mid-Corridor-E":1},
  // "Level-2-Mid-Corridor-A":{"Level-2-Left-Corridor-J":1,"Level-2-Mid-Corridor-B":1},
  // "Level-2-Mid-Corridor-B":{"Level-2-Mid-Corridor-A":1,"Level-2-Mid-Corridor-C":1},
  // "Level-2-Mid-Corridor-C":{"Level-2-Mid-Corridor-B":1,"Level-2-Mid-Corridor-D":1},
  // "Level-2-Mid-Corridor-D":{"Level-2-Mid-Corridor-C":1,"Level-2-Mid-Corridor-E":1},
  // "Level-2-Mid-Corridor-E":{"Level-2-Mid-Corridor-D":1,"Level-2-Right-Corridor-A":1},
  // "R3-209":{"Level-2-Right-Corridor-G":1},
  // "R3-208":{"Level-2-Right-Corridor-H":2},
  // "R3-207":{"Level-2-Right-Corridor-H":2},
  // "R3-206":{"Level-2-Right-Corridor-H":1},
  // "R3-205":{"Level-2-Right-Corridor-D":1},
  // "R3-204-1":{"Level-2-Right-Corridor-E":1},
  // "R3-204":{"Level-2-Right-Corridor-F":1.5},
  // "R3-203":{"Level-2-Right-Corridor-F":2},
  // "R3-202":{"Level-2-Right-Corridor-F":1.5},
  // "R3-201":{"Level-2-Right-Corridor-F":1},
  // "Level-2-Right-Male-WC":{"Level-2-Right-Corridor-E":1},
  // "Level-2-Right-Female-WC":{"Level-2-Right-Corridor-E":1},
  // "Level-2-Right-Corridor-A":{"Level-2-Right-Corridor-B":1,"Level-2-Mid-Corridor-E":1,"Right-Stairs-2-1":1},
  // "Level-2-Right-Corridor-B":{"Level-2-Right-Corridor-A":1,"Level-2-Right-Corridor-C":1},
  // "Level-2-Right-Corridor-C":{"Level-2-Right-Corridor-B":1,"Level-2-Right-Corridor-G":3,"Level-2-Right-Corridor-D":1},
  // "Level-2-Right-Corridor-D":{"Level-2-Right-Corridor-C":1,"Level-2-Right-Corridor-E":1},
  // "Level-2-Right-Corridor-E":{"Level-2-Right-Corridor-D":1,"Level-2-Right-Corridor-F":1.5},
  // "Level-2-Right-Corridor-F":{"Level-2-Right-Corridor-E":1},
  // "Level-2-Right-Corridor-G":{"Level-2-Right-Corridor-C":3,"Level-2-Right-Corridor-H":1},
  // "Level-2-Right-Corridor-H":{"Level-2-Right-Corridor-G":1},
  // "EscapeSling": {finish: 1},
  // finish: {}
  // };

  var graph = EscapeSling;
  var start = document.getElementById("start").value;

  graph.start = graph[start];

  // track lowest cost to reach each node
  const costs = Object.assign({finish: Infinity}, graph.start);

  // track paths
  const parents = {finish: null};
  for (let child in graph.start) {
    parents[child] = start;
  }

  // track nodes that have already been processed
  const processed = [];

  let node = lowestCostNode(costs, processed);

  while (node) {
    let cost = costs[node];
    let children = graph[node];
    for (let n in children) {
      let newCost = cost + children[n];
      if (!costs[n]) {
        costs[n] = newCost;
        parents[n] = node;
      }
      if (costs[n] > newCost) {
        costs[n] = newCost;
        parents[n] = node;
      }
    }
    processed.push(node);
    node = lowestCostNode(costs, processed);
  }

  let optimalPath = ['finish'];
  let parent = parents.finish;
  while (parent) {
    optimalPath.push(parent);
    parent = parents[parent];
  }
  optimalPath.reverse();

  const results = {
    distance: costs.finish,
    path: optimalPath
  };
  
  if(results.distance === Infinity){
  		alert("No suitable escape route, please stay in place!!  ")
  }else{
  		console.log(results);
  		findCoordinates(results)
  		// return results;
  }
};



// var R31F_point = Cesium.GeoJsonDataSource.load('./GeoJSON/R3_point.geojson');

// R31F_point.then(
//     function(dataSource) {
//         Models = dataSource.entities.values;
//         // for (var i = 0; i < Models.length; i++) {
//         //     Models[i].polygon.extrudedHeight = 3; // or height property
//         // }
//         viewer.dataSources.add(dataSource);
//         viewer.zoomTo(dataSource);
//     }
// );



//為了findResultNode所做的
var search;

//用來找Results裡面各的node對應的feature
function findResultNode(features){
  return features.properties.Name === search;
};

//找到Result每個Node對應feature的coordinate
function findCoordinates(results){
  var resultsWithCoordinate = [];
  for(var i=0; i<results.path.length-1; i++){
    search = results.path[i];  
    var NodeCoordinates = R3_point.features.find(findResultNode);
    resultsWithCoordinate[i] = NodeCoordinates.geometry.coordinates;
  }
//resultsWithCoordinate 是含有每個Node座標的陣列
  // console.log(resultsWithCoordinate);
  formatForCesiumPolyline(resultsWithCoordinate)
};


//將得到的座標轉換成CesiumPolyline的格式
function formatForCesiumPolyline(resultsWithCoordinate){
  var newFormat = [];
  for(var i=0; i<resultsWithCoordinate.length;i++){
    for(var j=0; j<3;j++){
      newFormat.push(resultsWithCoordinate[i][j]);
    }
  }
  // console.log(newFormat);
  RouteVisualize(newFormat);
}

//在Cesium中畫出路線
function RouteVisualize(newFormat){
  viewer.entities.removeAll();
  var escapeRoute = viewer.entities.add({
      name : 'Escape Route',
      polyline : {
          positions : Cesium.Cartesian3.fromDegreesArrayHeights(newFormat),
          width : 20,
          followSurface : false,
          material : new Cesium.PolylineArrowMaterialProperty(Cesium.Color.PURPLE)
      }
  });
  // viewer.entities.remove(escapeRoute);  
}
