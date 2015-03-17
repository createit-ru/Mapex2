<?php

$properties = array();

$tmp = array(
    'tvName' => array(
        'type' => 'textfield',
        'value' => '',
    ),
    'resource' => array(
        'type' => 'textfield',
        'value' => '',
    ),
    'mapId' => array(
        'type' => 'textfield',
        'value' => 'mapexMap',
    ),
    'width' => array(
        'type' => 'textfield',
        'value' => '500px',
    ),
    'height' => array(
        'type' => 'textfield',
        'value' => '400px',
    ),
    'containerCssClass' => array(
        'type' => 'textfield',
        'value' => '',
    ),
    'mapTpl' => array(
        'type' => 'textfield',
        'value' => 'mapex.Map.Tpl',
    ),
    'placemarkTpl' => array(
        'type' => 'textfield',
        'value' => 'mapex.Placemark.Tpl',
    ),
    'polygonTpl' => array(
        'type' => 'textfield',
        'value' => 'mapex.Polygon.Tpl'
    ),
    'polylineTpl' => array(
        'type' => 'textfield',
        'value' => 'mapex.Polyline.Tpl',
    ),
    'routeTpl' => array(
        'type' => 'textfield',
        'value' => 'mapex.Route.Tpl',
    ),
    'controls' => array(
        'type' => 'textfield',
        'value' => 'mapTools,typeSelector,zoomControl,searchControl,miniMap,trafficControl,scaleLine',
    ),
    'includeJs' => array(
        'type' => 'list',
        'options' => array(
            array('text' => '1', 'value' => '1'),
            array('text' => '0', 'value' => '0'),
        ),
        'value' => '1'
    ),
);

foreach ($tmp as $k => $v) {
    $properties[] = array_merge(
        array(
            'name' => $k,
            'desc' => PKG_NAME_LOWER . '_prop_' . $k,
            'lexicon' => PKG_NAME_LOWER . ':properties',
        ), $v
    );
}

return $properties;