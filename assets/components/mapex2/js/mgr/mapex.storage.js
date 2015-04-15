Ext.onReady(function(){
    ymaps.ready(function() {
        // Basic map class
        Mapex.MapexStorage = function(tvId) {
            this.tvId = tvId;
            this.coords = {"center":[55.751565,37.617935],"zoom":10};
            this.type = 'yandex#map';
            this.placemarks = [];
            this.polygons = [];
            this.lines = [];
            this.routes = [];

            this.setCoords = function(coords) {
                this.coords = coords;
                this.updateInputValue();
            };
            this.setType = function(type) {
                this.type = type;
                this.updateInputValue();
            };
            this.setPlacemarks = function(placemarks) {
                this.placemarks = placemarks;
                this.updateInputValue();
            };
            // for lines and polygons
            this.setCollection = function(collectionType, collectionElements) {
                if(collectionType == 'line'){
                    this.lines = collectionElements;
                }
                else if(collectionType == 'polygon'){
                    this.polygons = collectionElements;
                }
                this.updateInputValue();
            };
            this.setRoutes = function(routes) {
                this.routes = routes;
                this.updateInputValue();
            };

            this.updateInputValue = function(){
                var v = {
                    "coords": this.coords,
                    "type": this.type,
                    "placemarks": this.placemarks,
                    "polygons": this.polygons,
                    "lines": this.lines,
                    "routes": this.routes
                };
                document.getElementById(tvId).value = Ext.encode(v);
                MODx.fireResourceFormChange();
                //document.getElementById(tvId).value = JSON.stringify(v);
            };

            this.load = function(jsonString){
                var o = Ext.decode(jsonString);
                //var o =  JSON.parse(jsonString);
                this.coords = o.coords;
                this.type = o.type;
                this.placemarks = o.placemarks;
                this.polygons = o.polygons;
                this.lines = o.lines;
                this.routes = o.routes;
            };
        };
    });
});