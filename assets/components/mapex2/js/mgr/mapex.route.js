/*
 Источник: http://drupal.org/project/yamaps, автор: Васильчук Николай, anonym.tsk@gmail.com
 Портация на MODX: Наумов Алексей (http://www.createit.ru)
 */
Ext.onReady(function(){
    ymaps.ready(function() {
        // Add routes support to map
        Mapex.addMapTools(function(Map) {
            // Start and end of route
            var firstPoint = null;
            var secondPoint = null;

            // Export route to html element
            var exportRoute = function(start, end) {
                var mapId = Map.map.container.getElement().parentElement.id;
                if (!start || !end) {
                    Mapex.getStorage(mapId).setRoutes([]);
                }
                else {
                    Mapex.getStorage(mapId).setRoutes([start, end]);
                }
            };

            // Write route on map
            var writeRoute = function(start, end, route) {
                ymaps.route([start, end], {mapStateAutoApply: false}).then(
                    function (newRoute) {
                        // If route already added - remove it
                        if (route) {
                            Map.map.geoObjects.remove(route);
                        }
                        // Add new route to map
                        Map.map.geoObjects.add(newRoute);

                        // Create placemarks
                        var points = newRoute.getWayPoints();
                        var pointStart = points.get(0);
                        var pointEnd = points.get(1);
                        pointStart.options.set('preset', 'twirl#carIcon');
                        pointEnd.options.set('preset', 'twirl#houseIcon');

                        if (Map.options.edit) {
                            // If map in edit mode - export route
                            exportRoute(start, end);

                            // Set points edit mode
                            points.options.set('draggable', true);

                            // Rewrite route when point moved
                            points.events.add('dragend', function() {
                                writeRoute(this.start.geometry.getCoordinates(), this.end.geometry.getCoordinates(), newRoute);
                            }, {start: pointStart, end: pointEnd});

                            // Delete route when point clicked
                            points.events.add('click', function() {
                                Map.map.geoObjects.remove(this);
                                firstPoint = secondPoint = null;
                                exportRoute(null, null);
                            }, newRoute);
                        }
                    },
                    function (error) {
                        if (!route) {
                            firstPoint = secondPoint = null;
                        }
                        alert('Error found' + ": " + error.message);
                    }
                );
            };

            // Add already created route to map
            if (Map.options.routes && Map.options.routes.length == 2) {
                firstPoint = Map.options.routes[0];
                secondPoint = Map.options.routes[1];
                writeRoute(firstPoint, secondPoint);
            }

            // If map in view mode - exit
            if (!Map.options.edit) {
                return;
            }

            // If map in edit mode set map click listener to adding route
            var mapClickRoute = function(event) {
                if (!firstPoint) {
                    // First click - create placemark
                    firstPoint = new ymaps.Placemark(event.get('coordPosition'), {}, {
                        balloonCloseButton: true,
                        preset: 'twirl#carIcon'
                    });
                    Map.map.geoObjects.add(firstPoint);
                }
                else if (!secondPoint) {
                    // Second click - remove placemark and add route
                    var first = firstPoint.geometry.getCoordinates();
                    Map.map.geoObjects.remove(firstPoint);
                    secondPoint = event.get('coordPosition');
                    writeRoute(first, secondPoint, null);
                }
                else {
                    // Third click - alert
                    alert('The route is already on this map');
                }
            };

            // Add new button
            var routeButton = new ymaps.control.Button('<div class="mapex-toolbar-button mapex-toolbar-button-route" title="Маршрут"></div>');

            // Button actions
            routeButton.events
                .add('select', function(event) {
                    Map.cursor = Map.map.cursors.push('pointer');
                    Map.mapListeners.add('click', mapClickRoute);
                })
                .add('deselect', function(event) {
                    Map.cursor.remove();
                    Map.mapListeners.remove('click', mapClickRoute);
                });

            return routeButton;
        });
    });
});
