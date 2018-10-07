var viewer = new Cesium.Viewer('cesiumContainer', {
    timeline: false, 
    animation: false, 
    vrButton: true
});

var scene = viewer.scene;

// var R31F = Cesium.GeoJsonDataSource.load('GeoJSON/R3-1F-Polygon.geojson');

// R31F.then(
//     function(dataSource) {
//         Models = dataSource.entities.values;
//         for (var i = 0; i < Models.length; i++) {
//             Models[i].polygon.extrudedHeight = 3; // or height property
//         }
//         viewer.dataSources.add(dataSource);
//         viewer.zoomTo(dataSource);
//     }
// );

// var R32F = Cesium.GeoJsonDataSource.load('GeoJSON/R3-2F-Polygon.geojson');

// R32F.then(
//     function(dataSource) {
//         var Models = dataSource.entities.values;
//         for (var i = 0; i < Models.length; i++) {
//             Models[i].polygon.height = 3
//             Models[i].polygon.extrudedHeight = 6; // or height property
//         }
//         viewer.dataSources.add(dataSource);

//         var entities = dataSource.entities.values;

//         viewer.zoomTo(dataSource);
//     }
// );

var R31F = Cesium.GeoJsonDataSource.load('GeoJSON/R3-1F-Polygon.geojson');
    R31F.then(function(dataSource) {
        viewer.dataSources.add(dataSource);

        //Get the array of entities
        var entities = dataSource.entities.values;

        var colorHash = {};
        for (var i = 0; i < entities.length; i++) {
            //For each entity, create a random color based on the state name.
            //Some states have multiple entities, so we store the color in a
            //hash so that we use the same color for the entire state.
            var entity = entities[i];

            var type = entity.properties.type._value;
            var color = colorHash[type];
            if (!color) {
                color = Cesium.Color.fromRandom({
                    alpha : 0.4
                });
                colorHash[type] = color;
            }

            //Set the polygon material to our random color.
            entity.polygon.material = color;
            //Remove the outlines.
            entity.polygon.outline = false;

            //Extrude the polygon based on the state's population.  Each entity
            //stores the properties for the GeoJSON feature it was created from
            //Since the population is a huge number, we divide by 50.
            entity.polygon.height = 0;
            entity.polygon.extrudedHeight = 3;
            viewer.zoomTo(dataSource);
        }
    }).otherwise(function(error){
        //Display any errrors encountered while loading.
        window.alert(error);
    });


var R32F = Cesium.GeoJsonDataSource.load('GeoJSON/R3-2F-Polygon.geojson');
    R32F.then(function(dataSource) {
        viewer.dataSources.add(dataSource);

        //Get the array of entities
        var entities = dataSource.entities.values;

        var colorHash = {};
        for (var i = 0; i < entities.length; i++) {
            //For each entity, create a random color based on the state name.
            //Some states have multiple entities, so we store the color in a
            //hash so that we use the same color for the entire state.
            var entity = entities[i];

            var type = entity.properties.Type._value;
            var color = colorHash[type];
            if (!color) {
                color = Cesium.Color.fromRandom({
                    alpha : 0.4
                });
                colorHash[type] = color;
            }

            //Set the polygon material to our random color.
            entity.polygon.material = color;
            //Remove the outlines.
            entity.polygon.outline = false;

            //Extrude the polygon based on the state's population.  Each entity
            //stores the properties for the GeoJSON feature it was created from
            //Since the population is a huge number, we divide by 50.
            entity.polygon.height = 3;
            entity.polygon.extrudedHeight = 6;
            viewer.zoomTo(dataSource);
        }
    }).otherwise(function(error){
        //Display any errrors encountered while loading.
        window.alert(error);
    });