# **Emergency Fire Evacuation System**

A Real-time Intelligent Three Dimensional Fire Evacuation Guidance System Based on Sensor Web Service and 3D City Models Open Standards

This project was developed in the course of 52°North's Student Innovation Challenge 2018 against the SOS implementation by 52°North. ([Slides](https://52north.org/wp-content/uploads/2018/09/GSW_Real-time-Fire-Management-System-Based-on-Sensor-Web-Services.pdf))



## Introduction

The rapid economic development and urbanization have led to the intensive use of land in urban areas. In order to accommodate more people and space, the interior of  buildings become more complex.   The high capacity and centralized nature affect the design of escape and rescue routes, which could be more complicated or effective. In this situation, the issue of fire disaster prevention and management, including alarm notification and evacuation route simulation, is critical.

As evacuation maps are commonly displayed in a two-dimensional format, people may find it difficult to plan an ideal evacuation route while it is in emergency. In recent years, applications of the sensor web have been used to improve the capability of environment observation. The users can monitor the environment immediately and obtain the dynamical phenomenon by sensor web. For building model, using GeoJSON permits the display of a site in three dimensions, which helps building occupants to visualize and immediately understand the status of a fire or other emergency. By using nodes and edges, JSON forms the network for interior space navigation in three dimensions. Effective fire disaster prevention methods integrate sensing technology, analysis, judgment, decision, and action functions. Therefore, the key aspects of this project include (1) The fire escape perspective, which provides people with critical and accurate information and identifies the most appropriate routes to evacuate; and (2) Integration System, which is to integrate and share the information about fire and rescue attempt by using a sensor web integration platform. Achieving these aspects is critical to resolve the current communication problems that are inhibiting effective information transmission between firefighters and persons in danger.

## Objective

This project will apply GeoJSON and indoor route network with JSON format in a 3D model for the disaster prevention that integrates information on fire-prevention facilities, wireless sensors, evacuation route analysis and disaster-prevention functions. Creating a framework for an intelligent fire and disaster-prevention system by using the integration GeoJSON and route network will work as follows. When the wireless sensors detect high temperature or smoke levels, the system will alarm, and then monitor the fire-outbreak locations and the evacuation routes, which are calculated by the operations in the integration 3D model. The system will record the data about this accident on sensor web database for future review and analysis. The proposed integration system is designed to enhance the timeliness and safety of evacuation actions.



## Installation & Configuration

### Installation

This project is based on SOS and Cesium.

- Sensor Observation Service ([SOS Github](https://github.com/52north/SOS)) [[installation](https://wiki.52north.org/SensorWeb/SensorObservationServiceIVDocumentation#Installation)]
- [Cesium](https://cesiumjs.org/) ([Github](https://github.com/AnalyticalGraphicsInc/cesium)) [[installation](https://cesiumjs.org/downloads/)]<br>
  Hint:<br>
  You can download CesiumJS and extract.<br>
  Install [Node.js](https://nodejs.org/en/), then navigate to the root directory and run the following command to install the dependencies.<br>
  `$ npm install`<br>
  Start the web server by executing the command:<br>
  `$ node server.js`<br>
  Finally, launch a browser and navigate to `http://localhost:8080/{path to the html}` <br>

### Configuration

**After installation, the SOS service should be replaced to your own service url.** <br>

In this implementation, the SOS service is  `http://localhost:8080/52n-sos/service` <br>
In the SOS Service folder, there is a `SOSconnecter.js` file.<br>

You have to replace the URL to your own service URL. <br>

The url of ajax for  `insertObservation()`, `getLastestObservation()` and `getSmokeObservations()` have to be replaced. <br>

- `inserObservation()` 
  In order to make the demonstration, insert the new observations for default value when the system start or refresh.
- `getLastestObservation()`, `getSmokeObservations()`
  Getting the lastest observations to check is over than the warning value or not.



## Start Cesium by node.js

After you install the Cesium, there is a `server.js` in the Cesium file.
Use node.js to start the server. 

```
cd [Cesium_folder]
node server.js
```

In the cmd interface, you can get the url to start.

***The 52N_InnovationChallenge file should be copy and put inside Cesium floder, same with the server.js.*** <br>
*(After finish the installation of Cesium, there is a server.js file.)*



![](https://github.com/chsimon4/Emergency-Fire-Evacuation-System/blob/master/52N_InnovationChallenge/Cesium%20Configuration.JPG?raw=true)

In this implementation, the url will be  `http:localhost:8080/52N_InnovationChallenge/index.html`

In this example, 8080 is the number of the port. You can replace it to yours.

## Indoor route network

#### Format: JSON

#### **"Node name" : *"weight*"**

#### Example:

![](https://github.com/chsimon4/Emergency-Fire-Evacuation-System/blob/master/52N_InnovationChallenge/NodeExample.JPG?raw=true)

```javascript
{
	"nodeA": { "nodeB" : 1, "nodeC" : 2},
	"nodeB": { "nodeA" : 1, "nodeE" : 2},
	"nodeC": { "nodeA" : 2, "nodeD" : 1},
	.
	.
	"nodeE": { "finish" : 0}
}
```

About the exit or the final node of the navigation, it will be set as `"finish"`.

You can design and digitize your own route network based on this structure.

## Routing method [`dijkstra(graph,start)`]

This function is inside Routing.js in RoutingMoudle folder.
`graph` is the route network for the input.

`Start` is the node of the start point.
There also some comment note in the code about more detail.

For example:
In the implementation, I use R3route as the input graph and use the value in the input text area for the start point.

### Result of routing 

Example :

```javascript
{
	"distance" : 15,
	"path": [
	"node 1",
	"node 2",
	"node 3",
	.
	.
	.
	"finish"
	]
}
```

So that we can get the route planning by the system routing module. *(From node1 to node2 to node3 ...)*

**Based on the result of the node name, we can get the node location by node's GeoJSON file.** [`findCoordinates(results)`]

Then using Cesium [`RouteVisualize()`] to visualize the route.



## Integration with SOS

Based on the **feature of interest** of the observation. 

We can get the corresponding node with the observation.

If the observation result analyze by warning module is dangerous area, the node will be blocked.



![](https://github.com/chsimon4/Emergency-Fire-Evacuation-System/blob/master/52N_InnovationChallenge/Integration%20with%20SOS.JPG?raw=true)



**How to insert sensor and observation on SOS?** ([here](https://wiki.52north.org/SensorWeb/SensorObservationServiceIVDocumentation#Installation))

In SOS Service file , there are some example for insert sensor *(DHT22, EN54-7)* and observations.



## Implementation

![](https://github.com/chsimon4/Emergency-Fire-Evacuation-System/blob/master/52N_InnovationChallenge/Figure/Demo%20screenshot.JPG?raw=true)

- `Start` : Set the node name of the start point.
- `Offering ID` : Simulate the data for the the node based on offering id.
- `Temperature` : Set the value you want to simulate.
- `Insert Observation` : System will upload the data which you simulated.
- `Routing` : Start routing. System will send the request to get the latest observation of each node then analyze the safe evacuation route from the start point.

Short demonstration video ([Here](https://youtu.be/_KGaXKQZbuI))

## License

National Central University, Taiwan - Yao-Hsin Chiang
