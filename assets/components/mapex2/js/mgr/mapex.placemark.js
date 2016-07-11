/*
 Источник: http://drupal.org/project/yamaps, автор: Васильчук Николай, anonym.tsk@gmail.com
 Портация на MODX: Наумов Алексей (http://www.createit.ru)
 */
Ext.onReady(function(){
    ymaps.ready(function() {
        // Class for one placemark
        Mapex.MapexPlacemark = function(geometry, properties, options) {
            this.placemark = new ymaps.Placemark(geometry, properties, options);
            this.parent = null;

            // Set placemark icon and balloon content
            this.setContent = function(iconContent, balloonContent) {
                this.placemark.properties.set('iconContent', iconContent);
                this.placemark.properties.set('balloonContentHeader', iconContent);
                this.placemark.properties.set('balloonContentBody', balloonContent);
            };

            // Set placemark color
            this.setColor = function(color) {
                var preset = 'twirl#' + color;
                preset += this.placemark.properties.get('iconContent') ? 'StretchyIcon' : 'DotIcon';
                this.placemark.options.set('preset', preset)
            };

            // Close balloon
            this.closeBalloon = function() {
                this.placemark.balloon.close();
            };

            // Open balloon
            this.openBalloon = function() {
                this.placemark.balloon.open();
            };

            // Remove placemark
            this.remove = function() {
                this.getParent().remove(this);
                this.exportParent();
            };

            // Set placemark parent
            this.setParent = function(Parent) {
                this.parent = Parent;
            };

            // Get parent
            this.getParent = function() {
                return this.parent;
            };

            // Export placemark information
            this.export = function() {
                var coords = this.placemark.geometry.getCoordinates();
                var props = this.placemark.properties.getAll();
                return {
                    coords: coords,
                    params: {
                        color: props.color,
                        iconContent: props.iconContent,
                        balloonContentBody: props.balloonContentBody,
                        balloonContentHeader: props.iconContent
                    }
                };
            };

            // Export all placemarks from this map
            this.exportParent = function() {
                var collection = this.getParent();
                if (collection) {
                    var mapId = collection.elements.getMap().container.getElement().parentElement.id;
                    var placemarks = collection.export();
                    Mapex.getStorage(mapId).setPlacemarks(placemarks);
                }
            };

            // Placemark events for export
            this.placemark.events
                .add('dragend', this.exportParent, this)
                .add('propertieschange', this.exportParent, this);

            // Set placemark params
            this.placemark.properties.set('Placemark', this);
            this.setColor(properties.color);
        };

        // Placemarks collection class
        Mapex.MapexPlacemarkCollection = function(options) {
            this.placemarks = [];
            this.elements = new ymaps.GeoObjectCollection();
            this.elements.options.set(options);

            // Add new placemark to collection
            this.add = function(Placemark) {
                Placemark.setParent(this);
                this.placemarks.push(Placemark);
                this.elements.add(Placemark.placemark);
                return Placemark;
            };

            // Create placemark and add to collection
            this.createPlacemark = function(geometry, properties, options) {
                return this.add(new Mapex.MapexPlacemark(geometry, properties, options));
            };

            // Remove placemark
            this.remove = function(Placemark) {
                this.elements.remove(Placemark.placemark);

                for (var i = 0; i < this.placemarks.length; i++) {
                    if (this.placemarks[i] === Placemark) {
                        this.placemarks.splice(i, 1);
                        break;
                    }
                }
            };

            // Each placemarks callback
            this.each = function(callback) {
                for (var i = 0; i < this.placemarks.length; i++) {
                    callback(this.placemarks[i]);
                }
            };

            // Export collection
            this.export = function() {
                var placemarks = [];
                this.each(function(Placemark) {
                    placemarks.push(Placemark.export());
                });
                return placemarks;
            };
        };

        // Edit placemark balloon template
        Mapex.addLayout('mapex#PlacemarkBalloonEditLayout',
            ymaps.templateLayoutFactory.createClass(
                [
                    '<div class="mapex-balloon mapex-placemark-edit">',
                    '<div class="form-element">',
                    '<label for="iconContent">Текст</label>',
                    // TODO XXX
                    '<input type="text" id="iconContent" value="$[properties.iconContent]"/>',
                    '</div>',
                    '<div class="form-element placemark-colors">',
                    '<label>Цвет</label>',
                    '$[[mapex#ColorPicker]]',
                    '</div>',
                    '<div class="form-element">',
                    '<label for="balloonContent">Текст балуна</label>',
                    '<input type="text" id="balloonContent" value="$[properties.balloonContentBody]"/>',
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

                        // Placemark colorpicker
                        this.$placemarkColors = jQuery(this.getParentElement()).find('.placemark-colors .mapex-color');
                        this.$placemarkColors.each(function() {
                            var $this = jQuery(this);
                            var $div = $this.children('div');
                            if (_this.properties.color == $div.attr('data-content')) {
                                $this.addClass('mapex-color-active');
                            }
                        });
                        this.$placemarkColors.bind('click', this, this.colorClick);

                        // Placemark icon and balloon content
                        this.$iconContent = $element.find('#iconContent');
                        this.$balloonContent = $element.find('#balloonContent');

                        // Actions
                        jQuery('#deleteButton').bind('click', this, this.onDeleteClick);
                        jQuery('#saveButton').bind('click', this, this.onSaveClick);
                    },
                    clear: function () {
                        this.constructor.superclass.build.call(this);
                        this.$placemarkColors.unbind('click', this, this.colorClick);
                        jQuery('#deleteButton').unbind('click', this, this.onDeleteClick);
                        jQuery('#saveButton').unbind('click', this, this.onSaveClick);
                    },
                    colorClick: function(e) {
                        // Colorpicker click
                        e.data.properties.color = jQuery(this).children('div').attr('data-content');
                    },
                    onDeleteClick: function (e) {
                        // Delete click
                        e.data.properties.Placemark.remove();
                        e.preventDefault();
                    },
                    onSaveClick: function(e) {
                        // Save click
                        var placemark = e.data.properties.Placemark;
                        // Save content, color and close balloon
                        placemark.setContent(e.data.$iconContent.val(), e.data.$balloonContent.val());
                        placemark.setColor(e.data.properties.color);
                        placemark.closeBalloon();
                    }
                }
            )
        );

        // Add placemarks support to map
        Mapex.addMapTools(function(Map) {
            // Default options

            var options = {
                balloonMaxWidth: 300,
                balloonCloseButton: true
            };
            if (Map.options.edit) {
                // If map in edit mode set edit mode to placemarks options
                options.balloonContentLayout = 'mapex#PlacemarkBalloonEditLayout';
                options.draggable = true;
            }

            // Create new collection
            var placemarksCollection = new Mapex.MapexPlacemarkCollection(options);

            // Add already created elements to collection
            for (var i = 0; i < Map.options.placemarks.length; i++) {
                // Ext.decode(Ext.encode(..))
                // используется потому, что яндекс.карты изменяют переданный им к конструктор объект
                // а таким образом создаю его копию, оригинал - не изменится
                placemarksCollection.add(new Mapex.MapexPlacemark(Map.options.placemarks[i].coords, Ext.decode(Ext.encode(Map.options.placemarks[i].params))));
            }
            // Add collection to the map
            Map.map.geoObjects.add(placemarksCollection.elements);

            // If map in view mode exit
            if (!Map.options.edit) {
                return;
            }

            // If map in edit mode add search form
            var $searchForm = jQuery([
                '<form class="mapex-search-form">',
                '<input type="text" placeholder="Поиск на карте" value=""/>',
                '<input type="submit" value="Найти"/>',
                '</form>'].join(''));

            $searchForm.bind('submit', function (e) {
                var searchQuery = $searchForm.children('input').val();
                // Find one element
                ymaps.geocode(searchQuery, {results: 1}, {results: 100}).then(function (res) {
                    var geoObject = res.geoObjects.get(0);
                    if (!geoObject) {
                        alert('Ничего не найдено!');
                        return;
                    }
                    var coordinates = geoObject.geometry.getCoordinates();
                    // Pan to coordinates
                    Map.map.panTo(coordinates, {
                        checkZoomRange: false,
                        delay: 0,
                        duration: 1000,
                        flying: true
                    });

                    if(mapex2Config.addPlacemarkOnSearch) {
                        var newPlacemark = placemarksCollection.createPlacemark(coordinates, {iconContent: searchQuery, color: 'blue', balloonContentBody: '', balloonContentHeader: ''});
                        newPlacemark.openBalloon();
                    }

                });
                e.preventDefault();
            });
            // Add search form after current map
            $searchForm.insertBefore('#' + Map.mapId);


            // Map click listener to adding new placemark
            var mapClickPlacemark = function(event) {
                var Placemark = placemarksCollection.createPlacemark(event.get("coords"), {iconContent: '', color: 'blue', balloonContentBody: '', balloonContentHeader: ''});
                Placemark.openBalloon();
            };

            // New button
            var pointButton = new ymaps.control.Button({
                data: {
                    content: '<div class="mapex-toolbar-button mapex-toolbar-button-placemark" title="Точка"></div>'
                },
                options: {
                    selectOnClick: true
                }
            });

            // Button events
            pointButton.events
                .add('select', function(event) {
                    Map.cursor = Map.map.cursors.push('pointer');
                    Map.mapListeners.add('click', mapClickPlacemark);
                })
                .add('deselect', function(event) {
                    Map.cursor.remove();
                    Map.mapListeners.remove('click', mapClickPlacemark);
                });

            return pointButton;
        });
    });
});
