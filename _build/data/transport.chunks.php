<?php

$chunks = array();

$tmp = array(
	'mapex.Map' => array(
		'file' => 'map',
		'description' => '',
	),
    'mapex.Placemark' => array(
        'file' => 'placemark',
        'description' => '',
    ),
    'mapex.Polygone' => array(
        'file' => 'polygone',
        'description' => '',
    ),
    'mapex.Polyline' => array(
        'file' => 'polyline',
        'description' => '',
    ),
    'mapex.Route' => array(
        'file' => 'route',
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