# **Emergency Fire Evacuation System**

A Real-time Intelligent Three Dimensional Fire Evacuation Guidance System Based on Sensor Web Service and 3D City Models Open Standards

This project was developed in the course of 52°North's Student Innovation Challenge 2018 against the SOS implementation by 52°North. ([Slides](https://52north.org/wp-content/uploads/2018/09/GSW_Real-time-Fire-Management-System-Based-on-Sensor-Web-Services.pdf))

## Installation & Configuration

This project is based on SOS and Cesium.

- Sensor Observation Service ([SOS](https://github.com/52north/SOS)) [[installation](https://wiki.52north.org/SensorWeb/SensorObservationServiceIVDocumentation#Installation)]
- [Cesium](https://github.com/AnalyticalGraphicsInc/cesium) ([official website](https://cesiumjs.org/downloads/))

### Configuration

**After installation, the SOS service should be replaced to your own service url.**

The *52N_InnovationChallenge* file should be inside Cesium folder, same with the server.js.

![](https://github.com/chsimon4/Emergency-Fire-Evacuation-System/blob/master/52N_InnovationChallenge/Cesium%20Configuration.JPG?raw=true)

SOS service : `http://localhost:8080/52n-sos/service`

**Start Cesium by node.js**

```
cd D:\Research\Cesium\Cesium-1.44
node server.js
```

In the cmd interface, you can get the url to start.

## Indoor route network

#### Format: JSON

#### **"Node name" : *"weight*"**

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



### Result of routing [`dijkstra()`]

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

So that we can get the route planning by the system routing module. *(From node1 to node2 to node3 ...)*

Based on the result of the node name, we can get the node location by node's GeoJSON file. [`findCoordinates(results)`]

Then using Cesium [`RouteVisualize() in Routing.js`] to visualize the route.



## Integration with SOS

Based on the **feature of interest** of the observation. 

We can get the corresponding node with the observation.

If the observation result analyze by warning module is dangerous area, the node will be blocked.



![](https://github.com/chsimon4/Emergency-Fire-Evacuation-System/blob/master/52N_InnovationChallenge/Integration%20with%20SOS.JPG?raw=true)



How to insert sensor and observation on SOS? ([here](https://wiki.52north.org/SensorWeb/SensorObservationServiceIVDocumentation#Installation))

In SOS Service file , there are some example for insert sensor *(DHT22, EN54-7)* and observations.



## License

National Central University, Taiwan - Yao-Hsin Chiang
