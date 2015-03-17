/*
  Источник: http://drupal.org/project/yamaps, автор: Васильчук Николай, anonym.tsk@gmail.com
  Портация на MODX: Наумов Алексей (http://www.createit.ru)
*/
Ext.onReady(function(){
  ymaps.ready(function() {
    // Basic map class
    Mapex.MapexMap = function(mapId, tvId, tvValue) {
      // storage
      this.storage = Mapex.addStorage(mapId, tvId);
      
      this.options = {
        'init': {
            'center': mapex2Config.mapCenter,
            'zoom': mapex2Config.mapZoom,
            'type': mapex2Config.mapType,
            'behaviors': ['scrollZoom', 'dblClickZoom', 'drag'],
            'controls': ['default']
          },
          'controls': true,
          'traffic': false,
          'placemarks': [],
          'lines': [],
          'polygons': [],
          'routes': [],
          'edit': true
        };
        
      if(tvValue != ''){
        this.storage.load(tvValue);
        this.options.init.center = this.storage.coords.center;
        this.options.init.zoom = this.storage.coords.zoom;
        this.options.init.type = this.storage.type;
        this.options.placemarks = this.storage.placemarks;
        this.options.lines = this.storage.lines;
        this.options.polygons = this.storage.polygons;
        this.options.routes = this.storage.routes;
      }
      this.map = new ymaps.Map(mapId, this.options.init);

      this.mapId = mapId;
      this.tvId = tvId;
      //this.options = options;
      this.mapListeners = this.map.events.group();
      
      
      // Export map coordinates to html element
      this.exportCoords = function(event) {
        var coords = {
          center: event.get('newCenter'),
          zoom: event.get('newZoom')
        };
        
        Mapex.getStorage(mapId).setCoords(coords);
      };

      // Export map type to html element
      this.exportType = function(event) {
        var type = event.get('newType');
        Mapex.getStorage(mapId).setType(type);
      };

      // Map events for export
      this.map.events
        .add('boundschange', this.exportCoords, this.map)
        .add('typechange', this.exportType, this.map);


      // Enable plugins
      this.enableTools = function() {
          var mapTools = Mapex.getMapTools(this);
          var radioGroup = new ymaps.MapexRadioGroup({ float: "right" });
          for (var i = 0; i < mapTools.length; i++) {
              radioGroup.add(mapTools[i]);
          }
          this.map.controls.add(radioGroup, { float: "right" });
      };
    };
  });
});
