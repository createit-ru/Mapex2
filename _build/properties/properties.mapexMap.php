<?php

$properties = array();

$tmp = array(
    'mapTpl' => array(
        'type' => 'textfield',
        'value' => 'mapex.Map',
    ),
    'placemarkTpl' => array(
        'type' => 'textfield',
        'value' => 'mapex.Placemark',
    ),
    'polygoneTpl' => array(
        'type' => 'textfield',
        'value' => 'mapex.Polygone'
    ),
    'polylineTpl' => array(
        'type' => 'textfield',
        'value' => 'mapex.Polyline',
    ),
    'routeTpl' => array(
        'type' => 'textfield',
        'value' => 'mapex.Route',
    ),
    'controls' => array(
        'type' => 'textfield',
        'value' => 'mapTools',
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