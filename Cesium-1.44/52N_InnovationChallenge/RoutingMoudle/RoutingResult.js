var R31F_point = Cesium.GeoJsonDataSource.load('GeoJSON/R3_point.geojson');

R31F_point.then(
    function(dataSource) {
        Models = dataSource.entities.values;
        // for (var i = 0; i < Models.length; i++) {
        //     Models[i].polygon.extrudedHeight = 3; // or height property
        // }
        viewer.dataSources.add(dataSource);
        viewer.zoomTo(dataSource);
    }
);