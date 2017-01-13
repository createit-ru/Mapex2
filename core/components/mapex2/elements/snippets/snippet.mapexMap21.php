<?php

/* @var array $scriptProperties */
/* @var mapex2 $mapex2 */
$mapex2 = $modx->getService('mapex2', 'mapex2', MODX_CORE_PATH . 'components/mapex2/model/mapex2/');

$map = $modx->getOption('map', $scriptProperties, '');

if(empty($map)) {
    $tvName = $modx->getOption('tvName', $scriptProperties, '');
    if(empty($tvName)) {
        return '';
    }
    $resource = intval($modx->getOption('resource', $scriptProperties, 0));
    if($resource == $modx->resource->get('id') || $resource == 0) {
        $resource = $modx->resource;
    }
    else {
        $resource = $modx->getObject('modResource', $resource);
    }
    if(empty($resource)) {
        return '';
    }
    $map = $resource->getTVValue($tvName);
}
if(empty($map)) {
    return '';
}

/* templates */
$mapTpl = $modx->getOption('mapTpl', $scriptProperties, 'mapex.Map.Tpl');
$placemarkTpl = $modx->getOption('placemarkTpl', $scriptProperties, 'mapex.Placemark.Tpl');
$polygonTpl = $modx->getOption('polygonTpl', $scriptProperties, 'mapex.Polygon.Tpl');
$polylineTpl = $modx->getOption('polylineTpl', $scriptProperties, 'mapex.Polyline.Tpl');
$routeTpl = $modx->getOption('routeTpl', $scriptProperties, 'mapex.Route.Tpl');

$map = json_decode($map);

// Map controls, can be: smallMapDefaultSet, mediumMapDefaultSet (default), largeMapDefaultSet
// or individual: geolocationControl, searchControl, routeEditor, trafficControl, typeSelector, fullscreenControl, zoomControl, rulerControl
$controls = $modx->getOption('controls', $scriptProperties, '');

$mapId = $modx->getOption('mapId', $scriptProperties, 'mapexMap');
$width = $modx->getOption('width', $scriptProperties, '500px');
$height = $modx->getOption('height', $scriptProperties, '400px');

$includeJs = $modx->getOption('includeJs', $scriptProperties, 1);
if(!empty($includeJs)) {
    $lang = $modx->getOption('lang', $scriptProperties, 'ru-RU');
    $modx->regClientStartupScript('https://api-maps.yandex.ru/2.1/?lang='.$lang);
}

$mapCss = $modx->getOption('containerCssClass', $scriptProperties, '');

return $mapex2->drawMap($map, $controls, $mapId, $mapCss, $mapTpl, $placemarkTpl, $polygonTpl, $polylineTpl, $routeTpl, $width, $height);
