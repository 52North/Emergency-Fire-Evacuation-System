
// const R3route = {
//   start: {R3117: 1},
//   R31181: {R3117: 1},
//   R3117: {start: 1, R31181: 1, R3119:2},
//   R3119: {R3117:2, LeftCorridor:1},
//   R31151: {LeftCorridor:2},
//   R3116: {LeftCorridor:1},
//   R3115: {LeftCorridor:1},
//   R3114: {LeftCorridor:2},
//   R3113: {LeftCorridor:4},
//   R3112: {LeftCorridor:3},
//   R3111: {LeftCorridor:2},
//   LeftCorridor: {R3116:1, R3115:1, R21151:2, R3119:2, R3114:1, R3113:4, R3112:3, R3111:1, MidCorridor:3},
//   MidCorridor: {LeftCorridor:3, R3110:1, R3102:2,R3111:3, RightCorridor:3, R3101:2, Finish: 3},
//   RightCorridor: {MidCorridor:3, R3103:1, R3105:1, R3106:2, R3107:3, R3108:4, R3109:3},
//   R3105: {RightCorridor: 1},
//   R3106: {RightCorridor: 2},
//   R3107: {RightCorridor: 3},
//   R3108: {RightCorridor: 4},
//   R3109: {RightCorridor: 3},
//   finish: {}
// };

// const R3route = {
//   //Level-1
//   "R3-118": {"R3-117": 1},
//   "R3-118-1": {"R3-117": 1},
//   "R3-117": {"R3-119":2},
//   "R3-119": {"Level-1-Left-Corridor":1},
//   "R3-115-1": {"Level1-Left-Corridor":2},
//   "R3-116": {"Level-1-Left-Corridor":1},
//   "R3-115": {"Level-1-Left-Corridor":1},
//   "R3-114": {"Level-1-Left-Corridor":2},
//   "R3-113": {"Level-1-Left-Corridor":4},
//   "R3-112": {"Level-1-Left-Corridor":3},
//   "R3-111": {"Level-1-Left-Corridor":2},
//   "R3-110": {"Level-1-Mid-Corridor":1},
//   "R3-102": {"Level-1-Mid-Corridor":1},
//   "R3-103": {"Level-1-Right-Corridor":2},
//   "Level-1-Left-Corridor": {"Level-1-Mid-Corridor":3, "Left-Door": 2},
//   "Level-1-Mid-Corridor": {"Main-Door": 3},
//   "Level-1-Right-Corridor": {"Level-1-Mid-Corridor":3, "Right-Door": 2},
//   "R3-105": {"Level-1-Right-Corridor": 1},
//   "R3-106": {"Level-1-Right-Corridor": 2},
//   "R3-107": {"Level-1-Right-Corridor": 3},
//   "R3-108": {"Level-1-Right-Corridor": 4},
//   "R3-109": {"Level-1-Right-Corridor": 3},
//   "Left-Stairs-1-2": {"Level-1-Left-Corridor": 2},
//   "Right-Stairs-1-2": {"Level-1-Right-Corridor": 1},
//   "Main-Door":{finish: 1},
//   "Left-Door":{finish: 1},
//   "Right-Door":{finish: 1},
//   finish: {},
//   //Level-2
//   "Right-Stairs-2-1": {"Right-Stairs-1-2": 2},
//   "Level-2-Right-Corridor": {"Right-Stairs-2-1": 2, "Level-2-Mid-Corridor": 4},
//   "R3-201": {"Level-2-Right-Corridor":3},
//   "R3-202": {"Level-2-Right-Corridor":4},
//   "R3-203": {"Level-2-Right-Corridor":4},
//   "R3-204": {"Level-2-Right-Corridor":3},
//   "R3-204-1": {"Level-2-Right-Corridor":2},
//   "R3-205": {"Level-2-Right-Corridor":1},
//   "R3-206": {"Level-2-Right-Corridor":3},
//   "R3-207": {"Level-2-Right-Corridor":4},
//   "R3-208": {"Level-2-Right-Corridor":3},
//   "R3-209": {"Level-2-Right-Corridor":2},
//   "Level-2-Mid-Corridor": {"Level-2-Right-Corridor":3,"Level-2-Left-Corridor":3},
//   "R3-211": {"Level-2-Mid-Corridor":3, "Level-2-Right-Corridor":1},
//   "R3-213": {"Level-2-Mid-Corridor":2, "Level-2-Right-Corridor":2},
//   "R3-215": {"Level-2-Mid-Corridor":1},
//   "R3-217": {"Level-2-Mid-Corridor":2, "Level-2-Left-Corridor":2},
//   "R3-219": {"Level-2-Mid-Corridor":3, "Level-2-Left-Corridor":1},
//   "R3-210": {"Level-2-Mid-Corridor":3, "Level-2-Right-Corridor":1},
//   "R3-212": {"Level-2-Mid-Corridor":2, "Level-2-Right-Corridor":2},
//   "R3-214": {"Level-2-Mid-Corridor":1},
//   "R3-216": {"Level-2-Mid-Corridor":2, "Level-2-Left-Corridor":2},
//   "R3-218": {"Level-2-Mid-Corridor":3, "Level-2-Left-Corridor":1},
//   "Left-Stairs-2-1": {"Left-Stairs-1-2": 2},
//   "Level-2-Left-Corridor": {"Left-Stairs-2-1": 2, "Level-2-Mid-Corridor": 4 },
//   "R3-233": {"Level-2-Left-Corridor":1},
//   "R3-220": {"Level-2-Left-Corridor":3},
//   "R3-221": {"Level-2-Left-Corridor":4},
//   "R3-222": {"Level-2-Left-Corridor":4, "R3-221":1, "R3-223":2},
//   "R3-223": {"Level-2-Left-Corridor":2},
//   "R3-224": {"Level-2-Left-Corridor":1},
//   "R3-225": {"Level-2-Left-Corridor":1.5},
//   "R3-226": {"Level-2-Left-Corridor":2},
//   "R3-227": {"Level-2-Left-Corridor":3},
//   "R3-229": {"Level-2-Left-Corridor":4},
//   "R3-231": {"Level-2-Left-Corridor":5},
//   "R3-232": {"Level-2-Left-Corridor":5},
//   "R3-230": {"Level-2-Left-Corridor":4},
//   "R3-228": {"Level-2-Left-Corridor":3}
// };

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

//加入障礙物
function AddObstacle(){
  var obstacle = document.getElementById("obstacle").value;
  R3route[obstacle] = {};
  // delete R3route[obstacle];
}

//規畫路徑
function routing(){
  var start = document.getElementById("start").value;
  dijkstra(R3route,start);
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
  judgment(results);
  return results;
};


//判斷樓梯是否通行
function judgment(results){
    if(results.distance == "Infinity"){
    console.log("Secnond option")
    StairBlock(start);
  }else{
    console.log("nothing");
  }
}


//如果樓梯無法通行升降梯
function StairBlock(start){
  var EscapeSling = {
  "Level-2-Right-Corridor": {"Level-2-Mid-Corridor": 4},
  "R3-201": {"Level-2-Right-Corridor":3},
  "R3-202": {"Level-2-Right-Corridor":4},
  "R3-203": {"Level-2-Right-Corridor":4},
  "R3-204": {"Level-2-Right-Corridor":3},
  "R3-204-1": {"Level-2-Right-Corridor":2},
  "R3-205": {"Level-2-Right-Corridor":1},
  "R3-206": {"Level-2-Right-Corridor":3},
  "R3-207": {"Level-2-Right-Corridor":4},
  "R3-208": {"Level-2-Right-Corridor":3},
  "R3-209": {"Level-2-Right-Corridor":2},
  "Level-2-Mid-Corridor": {"Level-2-Right-Corridor":3,"Level-2-Left-Corridor":3},
  "R3-211": {"Level-2-Mid-Corridor":3, "Level-2-Right-Corridor":1},
  "R3-213": {"Level-2-Mid-Corridor":2, "Level-2-Right-Corridor":2},
  "R3-215": {"Level-2-Mid-Corridor":1},
  "R3-217": {"Level-2-Mid-Corridor":2, "Level-2-Left-Corridor":2},
  "R3-219": {"Level-2-Mid-Corridor":3, "Level-2-Left-Corridor":1},
  "R3-210": {"Level-2-Mid-Corridor":3, "Level-2-Right-Corridor":1},
  "R3-212": {"Level-2-Mid-Corridor":2, "Level-2-Right-Corridor":2},
  "R3-214": {"Level-2-Mid-Corridor":1},
  "R3-216": {"Level-2-Mid-Corridor":2, "Level-2-Left-Corridor":2},
  "R3-218": {"Level-2-Mid-Corridor":3, "Level-2-Left-Corridor":1},
  "Level-2-Left-Corridor": {"Level-2-Mid-Corridor": 4 ,"EscapeSling": 3},
  "R3-233": {"Level-2-Left-Corridor":1},
  "R3-220": {"Level-2-Left-Corridor":3},
  "R3-221": {"Level-2-Left-Corridor":4},
  "R3-222": {"Level-2-Left-Corridor":4, "R3-221":1, "R3-223":2,"EscapeSling": 1},
  "R3-223": {"Level-2-Left-Corridor":2},
  "R3-224": {"Level-2-Left-Corridor":1},
  "R3-225": {"Level-2-Left-Corridor":1.5},
  "R3-226": {"Level-2-Left-Corridor":2},
  "R3-227": {"Level-2-Left-Corridor":3, "EscapeSling": 4},
  "R3-229": {"Level-2-Left-Corridor":4, "EscapeSling": 3},
  "R3-231": {"Level-2-Left-Corridor":5, "EscapeSling": 2},
  "R3-232": {"Level-2-Left-Corridor":5, "EscapeSling": 2},
  "R3-230": {"Level-2-Left-Corridor":4, "EscapeSling": 3},
  "R3-228": {"Level-2-Left-Corridor":3, "EscapeSling": 4},
  "EscapeSling": {finish: 1},
  finish: {}
  };

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
  
  console.log(results);
  return results;

}