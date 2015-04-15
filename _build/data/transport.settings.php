<?php

$settings = array();

$tmp = array(
	'manager_map_default_center' => array(
		'xtype' => 'textfield',
		'value' => '55.751565, 37.617935',
		'area' => 'mapex2_manager',
	),
    'manager_map_default_zoom' => array(
        'xtype' => 'textfield',
        'value' => '10',
        'area' => 'mapex2_manager',
    ),
    'manager_map_default_type' => array(
        'xtype' => 'textfield',
        'value' => 'yandex#map',
        'area' => 'mapex2_manager',
    ),
    'manager_jquery_url' => array(
        'xtype' => 'textfield',
        'value' => 'https://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js',
        'area' => 'mapex2_manager',
    ),
    'manager_show_input' => array(
        'xtype' => 'combo-boolean',
        'value' => true,
        'area' => 'mapex2_manager',
    ),
    'manager_add_placemark_on_search' => array(
        'xtype' => 'combo-boolean',
        'value' => false,
        'area' => 'mapex2_manager',
    ),
);

foreach ($tmp as $k => $v) {
	/* @var modSystemSetting $setting */
	$setting = $modx->newObject('modSystemSetting');
	$setting->fromArray(array_merge(
		array(
			'key' => 'mapex2_' . $k,
			'namespace' => PKG_NAME_LOWER,
		), $v
	), '', true, true);

	$settings[] = $setting;
}

unset($tmp);
return $settings;
