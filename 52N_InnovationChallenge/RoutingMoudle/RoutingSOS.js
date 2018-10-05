
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
  checkObservations();
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
