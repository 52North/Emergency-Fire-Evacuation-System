# **Emergency Fire Evacuation System**

A Real-time Intelligent Three Dimensional Fire Evacuation Guidance System Based on Sensor Web Service and 3D City Models Open Standards

This project was developed in the course of 52°North's Student Innovation Challenge 2018 against the SOS implementation by 52°North.

## Installation

- Sensor Observation Service ([SOS](https://github.com/52north/SOS))
- [Cesium](https://github.com/AnalyticalGraphicsInc/cesium)

## Indoor route network

Format: JSON

Example:

![](https://github.com/chsimon4/Emergency-Fire-Evacuation-System/blob/master/52N_InnovationChallenge/NodeExample.JPG?raw=true)

```javascript
{

​	"nodeA": { "nodeB" : 1, "nodeC" : 2},

​	"nodeD": { "nodeE" : 1},
​	.

​	.

​	.

}
```

