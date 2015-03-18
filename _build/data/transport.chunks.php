<?php

$chunks = array();

$tmp = array(
	'mapex.Map.Tpl' => array(
		'file' => 'map',
		'description' => '',
	),
    'mapex.Placemark.Tpl' => array(
        'file' => 'placemark',
        'description' => '',
    ),
    'mapex.Polygon.Tpl' => array(
        'file' => 'polygon',
        'description' => '',
    ),
    'mapex.Polyline.Tpl' => array(
        'file' => 'polyline',
        'description' => '',
    ),
    'mapex.Route.Tpl' => array(
        'file' => 'route',
        'description' => '',
    ),

    'mapex.Map21.Tpl' => array(
        'file' => 'map21',
        'description' => '',
    ),
    'mapex.Placemark21.Tpl' => array(
        'file' => 'placemark21',
        'description' => '',
    ),
    'mapex.Polygon21.Tpl' => array(
        'file' => 'polygon21',
        'description' => '',
    ),
    'mapex.Polyline21.Tpl' => array(
        'file' => 'polyline21',
        'description' => '',
    ),
    'mapex.Route21.Tpl' => array(
        'file' => 'route21',
        'description' => '',
    ),
);

// Save chunks for setup options
$BUILD_CHUNKS = array();

foreach ($tmp as $k => $v) {
	/* @avr modChunk $chunk */
	$chunk = $modx->newObject('modChunk');
	$chunk->fromArray(array(
		'id' => 0,
		'name' => $k,
		'description' => @$v['description'],
		'snippet' => file_get_contents($sources['source_core'] . '/elements/chunks/chunk.' . $v['file'] . '.tpl'),
		'static' => BUILD_CHUNK_STATIC,
		'source' => 1,
		'static_file' => 'core/components/' . PKG_NAME_LOWER . '/elements/chunks/chunk.' . $v['file'] . '.tpl',
	), '', true, true);

	$chunks[] = $chunk;

	$BUILD_CHUNKS[$k] = file_get_contents($sources['source_core'] . '/elements/chunks/chunk.' . $v['file'] . '.tpl');
}

unset($tmp);
return $chunks;