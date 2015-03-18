<?php

$properties = array();

$tmp = array(
    'map' => array(
        'type' => 'textfield',
        'value' => '',
    ),
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
        'value' => 'mapex.Map21.Tpl',
    ),
    'placemarkTpl' => array(
        'type' => 'textfield',
        'value' => 'mapex.Placemark21.Tpl',
    ),
    'polygonTpl' => array(
        'type' => 'textfield',
        'value' => 'mapex.Polygon21.Tpl'
    ),
    'polylineTpl' => array(
        'type' => 'textfield',
        'value' => 'mapex.Polyline21.Tpl',
    ),
    'routeTpl' => array(
        'type' => 'textfield',
        'value' => 'mapex.Route21.Tpl',
    ),
    'controls' => array(
        'type' => 'textfield',
        'value' => 'default',
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