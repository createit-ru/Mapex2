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
                  'center': new Array(55.751565, 37.617935),'zoom': 10,
                  'type': 'yandex#map',
                  'behaviors': ['scrollZoom', 'dblClickZoom', 'drag']
        		    },
          'controls': true,'traffic': false,'placemarks': [],
          'lines': [],'polygons': [],'routes': [],
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

      // Right top controls
      var rightTopControlGroup = [];

      // Enable map controls
      this.enableControls = function() {
        rightTopControlGroup.push('typeSelector');
        var mapSize = this.map.container.getSize();
        if (mapSize[1] < 270) {
          this.map.controls.add('smallZoomControl', {right: 5, top: 50});
        }
        else {
          this.map.controls.add('zoomControl', {right: 5, top: 50});
        }
        Mapex._mapTools.unshift('default');
      };

      // Enable traffic control
      this.enableTraffic = function() {
        var traffic = new ymaps.control.TrafficControl({
          providerKey:'traffic#actual',
          shown:true
        });
        traffic.getProvider().state.set('infoLayerShown', true);
        traffic.state.set('expanded', false)
        rightTopControlGroup.unshift(traffic);
      };


      // Enable plugins
      this.enableTools = function() {
        var mapTools = Mapex.getMapTools(this);
        this.map.controls.add(new ymaps.control.MapTools(mapTools), {left: 5, top: 5});

        if (rightTopControlGroup.length > 0) {
          var groupControl = new ymaps.control.Group({
            items: rightTopControlGroup
          });
          this.map.controls.add(groupControl, {right: 5, top: 5});
        }
      };
    };
  });
});
