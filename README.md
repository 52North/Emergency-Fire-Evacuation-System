# **Emergency Fire Evacuation System**

A Real-time Intelligent Three Dimensional Fire Evacuation Guidance System Based on Sensor Web Service and 3D City Models Open Standards

This project was developed in the course of 52°North's Student Innovation Challenge 2018 against the SOS implementation by 52°North.

## Installation

- Sensor Observation Service ([SOS](https://github.com/52north/SOS))
- [Cesium](https://github.com/AnalyticalGraphicsInc/cesium) ([official website](https://cesiumjs.org/downloads/))

## Indoor route network

Format: JSON

**"Node name" : *"weight*"**

#### Example:

![](https://github.com/chsimon4/Emergency-Fire-Evacuation-System/blob/master/52N_InnovationChallenge/NodeExample.JPG?raw=true)

```javascript
{
​	"nodeA": { "nodeB" : 1, "nodeC" : 2},
​	"nodeB": { "nodeA" : 1, "nodeE" : 2},
​	"nodeC": { "nodeA" : 2, "nodeD" : 1},
​	.
​	.
​	.
}
```



## Result after routing

Example :

```javascript
{
​	"distance" : 15,
​	"path": [
​	"node 1",
​	"node 2",
​	"node 3",
​	.
​	.
​	.
​	"finish"
​	]
}
```

So that we can get the route planning by the system routing module.
From node1 to node2 to node3 ...
Based on the result of the node name, we can get the node location by node's GeoJSON file.
Then using Cesium [`RouteVisualize()`] to visualize the route.
