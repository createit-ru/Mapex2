/*
 Источник: http://drupal.org/project/yamaps, автор: Васильчук Николай, anonym.tsk@gmail.com
 Портация на MODX: Наумов Алексей (http://www.createit.ru)
 */
Ext.onReady(function(){
    ymaps.ready(function() {
        // Class for one line
        Mapex.MapexLine = function(geometry, properties, options) {
            this._init(new ymaps.Polyline(geometry, properties, options));
        };
        Mapex.MapexLine.prototype = Mapex.BaseMapexObject;

        // Class for lines collection
        Mapex.MapexLineCollection = function(options) {
            this._init(options);
            this.collectionType = 'line';

            // Create line and add to collection
            this.createLine = function(geometry, properties, options) {
                return this.add(new Mapex.MapexLine(geometry, properties, options));
            };
        };
        Mapex.MapexLineCollection.prototype = Mapex.BaseMapexObjectCollection;

        // Edit line balloon template
        Mapex.addLayout('mapex#LineBalloonEditLayout',
            ymaps.templateLayoutFactory.createClass(
                [
                    '<div class="mapex-balloon mapex-line-edit">',
                    '<div class="form-element line-colors">',
                    '<label>Цвет линии</label>',
                    '$[[mapex#ColorPicker]]',
                    '</div>',
                    '<div class="form-element line-width">',
                    '$[[mapex#StrokeWidthLayout]]',
                    '</div>',
                    '<div class="form-element line-opacity">',
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

                        // Line colorpicker
                        this.$lineColors = $element.find('.line-colors .mapex-color');
                        this.$lineColors.each(function() {
                            // Set colorpicker parameters
                            var $this = jQuery(this);
                            var $div = $this.children('div');
                            if (_this.properties.strokeColor == $div.attr('data-content')) {
                                $this.addClass('mapex-color-active');
                            }
                        });
                        this.$lineColors.bind('click', this, this.strokeColorClick);

                        // Opacity
                        this.$opacity = $element.find('.line-opacity select');
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
                        this.$lineColors.unbind('click', this, this.strokeColorClick);
                        jQuery('#deleteButton').unbind('click', this, this.onDeleteClick);
                        jQuery('#saveButton').unbind('click', this, this.onSaveClick);

                    },
                    strokeColorClick: function(e) {
                        // Click to colorpicker
                        e.data.properties.strokeColor = jQuery(this).children('div').attr('data-content');
                    },
                    onDeleteClick: function (e) {
                        // Delete link click
                        e.data.properties.element.remove();
                        e.preventDefault();
                    },
                    onSaveClick: function(e) {
                        // Save button click
                        var line = e.data.properties.element;
                        // Set opacity
                        e.data.properties.opacity = e.data.$opacity.val();
                        line.setOpacity(e.data.properties.opacity);
                        // Set width
                        e.data.properties.strokeWidth = e.data.$width.val();
                        line.setWidth(e.data.properties.strokeWidth);
                        // Set color
                        line.setColor(e.data.properties.strokeColor);
                        // Set balloon content
                        line.setContent(e.data.$balloonContent.val());
                        // Close balloon
                        line.closeBalloon();
                    }
                }
            )
        );

        // Add lines support to map
        Mapex.addMapTools(function(Map) {
            // Default options
            var options = {
                balloonMaxWidth: 300,
                balloonCloseButton: true,
                strokeWidth: 3,
                elements: {}
            };
            if (Map.options.edit) {
                // If map in edit mode set edit mode to lines options
                options.balloonContentLayout = 'mapex#LineBalloonEditLayout';
                options.draggable = true;
            }

            // Create lines collection
            var linesCollection = new Mapex.MapexLineCollection(options);

            // Add empty collection to the map
            Map.map.geoObjects.add(linesCollection.elements);

            // Add already created lines to map
            if(Map.options.lines != null){
                for (var i = 0; i < Map.options.lines.length; i++) {
                    // Ext.decode(Ext.encode(..))
                    // используется потому, что яндекс.карты изменяют переданный им к конструктор объект
                    // а таким образом создаю его копию, оригинал - не изменится
                    var Line = linesCollection.createLine(Map.options.lines[i].coords, Ext.decode(Ext.encode(Map.options.lines[i].params)));
                    if (Map.options.edit) {
                        Line.startEditing();
                    }
                }
            }

            // If map in view mode exit
            if (!Map.options.edit) {
                return;
            }

            // If map in edit mode set map click listener to adding new line
            var mapClickLine = function(event) {
                var Line = linesCollection.createLine([event.get('coordPosition')], {balloonContent: '', strokeColor: '#006cff', opacity: 0.8, strokeWidth: 3});
                Line.startEditing(true);
            };

            // Add new button
            var lineButton = new ymaps.control.Button('<div class="mapex-toolbar-button mapex-toolbar-button-line" title="Линия"></div>');

            // Button actions
            lineButton.events
                .add('select', function(event) {
                    Map.cursor = Map.map.cursors.push('pointer');
                    Map.mapListeners.add('click', mapClickLine);
                })
                .add('deselect', function(event) {
                    Map.cursor.remove();
                    Map.mapListeners.remove('click', mapClickLine);
                });

            return lineButton;
        });
    });
});
