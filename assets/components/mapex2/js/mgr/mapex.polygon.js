/*
 Источник: http://drupal.org/project/yamaps, автор: Васильчук Николай, anonym.tsk@gmail.com
 Портация на MODX: Наумов Алексей (http://www.createit.ru)
 */
Ext.onReady(function(){
    ymaps.ready(function() {
        // Class for one polygon
        Mapex.MapexPolygon = function(geometry, properties, options) {
            this._init(new ymaps.Polygon(geometry, properties, options));
        };
        Mapex.MapexPolygon.prototype = Mapex.BaseMapexObject;

        // Class for polygons collection
        Mapex.MapexPolygonCollection = function(options) {
            this._init(options);
            this.collectionType = 'polygon';

            // Create polygon and add to collection
            this.createPolygon = function(geometry, properties, options) {
                return this.add(new Mapex.MapexPolygon(geometry, properties, options));
            };
        };
        Mapex.MapexPolygonCollection.prototype = Mapex.BaseMapexObjectCollection;

        // Edit polygon balloon template
        Mapex.addLayout('mapex#PolygonBalloonEditLayout',
            ymaps.templateLayoutFactory.createClass(
                [
                    '<div class="mapex-balloon mapex-polygon-edit">',
                    '<div class="form-element line-colors">',
                    '<label>Цвет границы</label>',
                    '$[[mapex#ColorPicker]]',
                    '</div>',
                    '<div class="form-element poly-colors">',
                    '<label>Цвет заливки</label>',
                    '$[[mapex#ColorPicker]]',
                    '</div>',
                    '<div class="form-element line-width">',
                    '$[[mapex#StrokeWidthLayout]]',
                    '</div>',
                    '<div class="form-element poly-opacity">',
                    '$[[mapex#OpacityLayout]]',
                    '</div>',
                    '<div class="form-element">',
                    '<label for="balloonContent">Текст балуна</label>',
                    '<input type="text" id="balloonContent" value="$[properties.balloonContent]"/>',
                    '</div>',
                    '$[[mapex#ActionsButtons]]',
                    '</div>'
                ].join(""),
                {
                    build: function () {
                        this.constructor.superclass.build.call(this);
                        this.properties = this.getData().properties.getAll();
                        // Balloon HTML element
                        var $element = jQuery(this.getParentElement());
                        var _this = this;

                        // Polygon background colorpicker
                        this.$polyColors = $element.find('.poly-colors .mapex-color');
                        this.$polyColors.each(function() {
                            var $this = jQuery(this);
                            var $div = $this.children('div');
                            if (_this.properties.fillColor == $div.attr('data-content')) {
                                $this.addClass('mapex-color-active');
                            }
                        });
                        this.$polyColors.bind('click', this, this.fillColorClick);

                        // Polygon line colorpicker
                        this.$lineColors = $element.find('.line-colors .mapex-color');
                        this.$lineColors.each(function() {
                            var $this = jQuery(this);
                            var $div = $this.children('div');
                            if (_this.properties.strokeColor == $div.attr('data-content')) {
                                $this.addClass('mapex-color-active');
                            }
                        });
                        this.$lineColors.bind('click', this, this.strokeColorClick);

                        // Opacity
                        this.$opacity = $element.find('.poly-opacity select');
                        this.$opacity.val(_this.properties.opacity);

                        // Stroke width
                        this.$width = $element.find('.line-width select');
                        this.$width.val(_this.properties.strokeWidth);

                        // Balloon content
                        this.$balloonContent = $element.find('#balloonContent');

                        // Actions
                        jQuery('#deleteButton').bind('click', this, this.onDeleteClick);
                        jQuery('#saveButton').bind('click', this, this.onSaveClick);
                    },
                    clear: function () {
                        this.constructor.superclass.build.call(this);
                        this.$polyColors.unbind('click', this, this.fillColorClick)
                        this.$lineColors.unbind('click', this, this.strokeColorClick);
                        jQuery('#deleteButton').unbind('click', this, this.onDeleteClick);
                        jQuery('#saveButton').unbind('click', this, this.onSaveClick);
                    },
                    fillColorClick: function(e) {
                        // Fill colorpicker click
                        e.data.properties.fillColor = jQuery(this).children('div').attr('data-content');
                    },
                    strokeColorClick: function(e) {
                        // Stroke colorpicker click
                        e.data.properties.strokeColor = jQuery(this).children('div').attr('data-content');
                    },
                    onDeleteClick: function (e) {
                        // Delete click
                        e.data.properties.element.remove();
                        e.preventDefault();
                    },
                    onSaveClick: function(e) {
                        // Save click
                        var polygon = e.data.properties.element;
                        // Set opacity
                        e.data.properties.opacity = e.data.$opacity.val();
                        polygon.setOpacity(e.data.properties.opacity);
                        // Set stroke width
                        e.data.properties.strokeWidth = e.data.$width.val();
                        polygon.setWidth(e.data.properties.strokeWidth);
                        // Set colors
                        polygon.setColor(e.data.properties.strokeColor, e.data.properties.fillColor);
                        // Set balloon content
                        polygon.setContent(e.data.$balloonContent.val());
                        polygon.closeBalloon();
                    }
                }
            )
        );

        // Add polygons support to map
        Mapex.addMapTools(function(Map) {
            // Default options
            var options = {
                balloonMaxWidth: 300,
                balloonCloseButton: true,
                strokeWidth: 3,
                elements: {}
            };
            if (Map.options.edit) {
                // If map in edit mode set edit mode to polygons options
                options.balloonContentBodyLayout = 'mapex#PolygonBalloonEditLayout';
                options.draggable = true;
            }

            // Create polygons collection
            var polygonsCollection = new Mapex.MapexPolygonCollection(options);

            // Add empty collection to the map
            Map.map.geoObjects.add(polygonsCollection.elements);

            // Add already created polygons to map
            if(Map.options.polygons != null){
                for (var i = 0; i < Map.options.polygons.length; i++) {
                    // Ext.decode(Ext.encode(..))
                    // используется потому, что яндекс.карты изменяют переданный им к конструктор объект
                    // а таким образом создаю его копию, оригинал - не изменится
                    var Polygon = polygonsCollection.createPolygon(Map.options.polygons[i].coords, Ext.decode(Ext.encode(Map.options.polygons[i].params)));
                    if (Map.options.edit) {
                        Polygon.startEditing();
                    }
                }
            }
            /*for (var i in Map.options.polygons) {
             var Polygon = polygonsCollection.createPolygon(Map.options.polygons[i].coords, Map.options.polygons[i].params);
             if (Map.options.edit) {
             Polygon.startEditing();
             }
             }*/

            // If map in view mode exit
            if (!Map.options.edit) {
                return;
            }

            // If map in edit mode set map click listener to adding new polygon
            var mapClickPolygon = function(event) {
                var Polygon = polygonsCollection.createPolygon([[event.get('coordPosition')]], {balloonContent: '', fillColor: 'lightblue', strokeColor: 'blue', opacity: 0.6, strokeWidth: 3});
                Polygon.startEditing(true);
            };

            // Add new button
            var polygonButton = new ymaps.control.Button('<div class="mapex-toolbar-button mapex-toolbar-button-polygon" title="Многоугольник"></div>');

            // Button actions
            polygonButton.events
                .add('select', function(event) {
                    Map.cursor = Map.map.cursors.push('pointer');
                    Map.mapListeners.add('click', mapClickPolygon);
                })
                .add('deselect', function(event) {
                    Map.cursor.remove();
                    Map.mapListeners.remove('click', mapClickPolygon);
                });

            return polygonButton;
        });
    });
});
