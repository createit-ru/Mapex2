<?php
$map = $modx->getOption('map', $scriptProperties, '');
$tpl = $modx->getOption('tpl', $scriptProperties, 'mapexMapTpl');
if($map == '' || $tpl == ''){
    return '';
}
$placemarkTpl = $modx->getOption('placemarkTpl', $scriptProperties, 'mapexPlacemarkTpl');
$polylineTpl = $modx->getOption('polylineTpl', $scriptProperties, 'mapexPolylineTpl');
$polygoneTpl = $modx->getOption('polygoneTpl', $scriptProperties, 'mapexPolygoneTpl');
$routeTpl = $modx->getOption('routeTpl', $scriptProperties, 'mapexRouteTpl');

// can be: 
// mapTools,typeSelector,zoomControl or smallZoomControl,scaleLine,miniMap,searchControl,trafficControl
$controls = $modx->getOption('controls', $scriptProperties, 'mapTools');

//$map = $modx->fromJSON($map);
$map = json_decode($map);
//print_r($map);

$mapId = $modx->getOption('mapId', $scriptProperties, 'mapexMap');
$width = $modx->getOption('mapWidth', $scriptProperties, '500px');
$height = $modx->getOption('mapHeight', $scriptProperties, '400px');

$includeJs = $modx->getOption('includeJs', $scriptProperties, 1);
if($includeJs){
    $lang = $modx->getOption('lang', $scriptProperties, 'ru-RU');
    $modx->regClientStartupScript('http://api-maps.yandex.ru/2.0-stable/?load=package.full&lang='.$lang);
}

if (!function_exists('mapex_prepare_coords')) {
    function mapex_prepare_coords($coords) {
        return '['.str_replace(',','.',$coords[0]).','.str_replace(',','.',$coords[1]).']';
    }
}

// Placemarks
$placemarks = "";
foreach($map->placemarks as $ob){
    $placemarks .= $modx->getChunk($placemarkTpl, array(
        'mapId' => $mapId,
        'coords' => mapex_prepare_coords($ob->coords),
        'properties' => json_encode(array(
            'iconContent' => $ob->params->iconContent,
            'balloonContentBody' => $ob->params->balloonContentBody,
            'balloonContentHeader' => $ob->params->balloonContentHeader,
        )),
        'options' => json_encode(array(
            'preset' => 'twirl#'.$ob->params->color.(empty($ob->params->iconContent) ? 'DotIcon' : 'StretchyIcon'),
        )),
    ));
}
// colors for lines and polygons 
$colors = array(
    'blue' => '#006cff',
    'lightblue' => '#66c7ff',
    'night' => '#004056',
    'darkblue' => '#00339a',
    'green' => '#33cc00',
    'white' => '#ffffff',
    'red' => '#ff0000',
    'orange' => '#ffb400',
    'darkorange' => '#ff6600',
    'yellow' => '#ffea00',
    'violet' => '#b832fd',
    'pink' => '#fd32fb'
);

// Lines
$polylines = "";
foreach($map->lines as $ob){
    $coords = array();
    foreach($ob->coords as $c){
        $coords[] = mapex_prepare_coords($c);
    }
    $polylines .= $modx->getChunk($polylineTpl, array(
        'mapId' => $mapId,
        'coords' => '[ '.implode(', ', $coords).' ]',
        'properties' => json_encode(array(
            'balloonContent' => $ob->params->balloonContent,
        )),
        'options' => json_encode(array(
            'strokeWidth' => $ob->params->strokeWidth,
            'strokeColor' => array_key_exists($ob->params->strokeColor,$colors) ? $colors[$ob->params->strokeColor] : $ob->params->strokeColor,
            'opacity' => $ob->params->opacity,
        )),
    ));
}
// Polygons
$polygons = "";
foreach($map->polygons as $ob){
    $coords = array();
    foreach($ob->coords as $c){
        $coords2 = array();
        foreach($c as $c2){
            $coords2[] = mapex_prepare_coords($c2);
        }
        $coords[] = '[ '.implode(', ', $coords2).' ]';
    }

    $polygons .= $modx->getChunk($polygoneTpl, array(
        'mapId' => $mapId,
        'coords' => '[ '.implode(', ', $coords).' ]',
        'properties' => json_encode(array(
            'balloonContent' => $ob->params->balloonContent,
        )),
        'options' => json_encode(array(
            'strokeWidth' => $ob->params->strokeWidth,
            'strokeColor' => array_key_exists($ob->params->strokeColor,$colors) ? $colors[$ob->params->strokeColor] : $ob->params->strokeColor,
            'fillColor' => $colors[$ob->params->fillColor],
            'opacity' => $ob->params->opacity,
        )),
    ));
}
// Routes
$routes = "";
if(count($map->routes) > 0){
    $coords = array();
    foreach($map->routes as $r){
        $coords[] = mapex_prepare_coords($r);
    }
    $routes .= $modx->getChunk($routeTpl, array(
        'coords' => '[ '.implode(', ', $coords).' ]',
    ));
}

$style = '';
if($width != '' && $height != ''){
    $style = 'style="width:'.$width.';height:'.$height.';"';
}
// Map
return $modx->getChunk($tpl, array(
    'style' => $style,
    'mapId' => $mapId,
    'map' => array(
        'center' => mapex_prepare_coords($map->coords->center),
        'zoom' => $map->coords->zoom,
        'type' => $map->type,
    ),
    'controls' => $controls,
    'placemarks' => $placemarks,
    'polylines' => $polylines,
    'polygons' => $polygons,
    'routes' => $routes,
));