<?php
/** @noinspection PhpIncludeInspection */
require_once dirname(dirname(dirname(dirname(__FILE__)))) . '/config.core.php';
/** @noinspection PhpIncludeInspection */
require_once MODX_CORE_PATH . 'config/' . MODX_CONFIG_KEY . '.inc.php';
/** @noinspection PhpIncludeInspection */
require_once MODX_CONNECTORS_PATH . 'index.php';
/** @var mapex2 $mapex2 */
$mapex2 = $modx->getService('mapex2', 'mapex2', $modx->getOption('mapex2_core_path', null, $modx->getOption('core_path') . 'components/mapex2/') . 'model/mapex2/');
$modx->lexicon->load('mapex2:default');

// handle request
$corePath = $modx->getOption('mapex2_core_path', null, $modx->getOption('core_path') . 'components/mapex2/');
$path = $modx->getOption('processorsPath', $mapex2->config, $corePath . 'processors/');
$modx->request->handleRequest(array(
	'processors_path' => $path,
	'location' => '',
));