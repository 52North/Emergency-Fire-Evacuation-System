var viewer = new Cesium.Viewer('cesiumContainer', {
    timeline: false, //時間線不顯示
    animation: false //動畫控制不顯示 
});

var scene = viewer.scene;

// function displayModel(){

		var dataSource = Cesium.GeoJsonDataSource.load('westport-house-floor-3.geojson').then(
	        function(dataSource) {
	            var p = dataSource.entities.values;
	            for (var i = 0; i < p.length; i++) {
	                p[i].polygon.extrudedHeight = 0; // or height property
	            }
	            viewer.dataSources.add(dataSource);
	            viewer.zoomTo(dataSource);
	        }
	    );

		// var dataSource1 = Cesium.GeoJsonDataSource.load('westport-house-floor-4.geojson').then(
	 //        function(dataSource) {
	 //            var p = dataSource.entities.values;
	 //            for (var i = 0; i < p.length; i++) {
	 //                p[i].polygon.extrudedHeight = 0; // or height property
	 //            }
	 //            viewer.dataSources.add(dataSource);
	 //            viewer.zoomTo(dataSource);
	 //        }
	 //    );	    
// }


// function ViewObservarions(){
//     console.log(model.features[500].Observatons.value);
// }

