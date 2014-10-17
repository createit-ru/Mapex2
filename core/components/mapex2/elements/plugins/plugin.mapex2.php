<?php
$corePath = $modx->getOption('core_path', null, MODX_CORE_PATH).'components/mapex2/';
$assetsUrl = $modx->getOption('assets_url', null, MODX_CORE_PATH).'components/mapex2/';
switch ($modx->event->name) {
    case 'OnTVInputRenderList':
        $modx->event->output($corePath.'tv/input/');
        break;
    case 'OnTVOutputRenderList':
        $modx->event->output($corePath.'tv/output/');
        break;
    case 'OnTVInputPropertiesList':
        $modx->event->output($corePath.'tv/inputoptions/');
        break;
    case 'OnTVOutputRenderPropertiesList':
        $modx->event->output($corePath.'tv/properties/');
        break;
    case 'OnManagerPageBeforeRender':
        break;
    case 'OnDocFormRender':
        $modx->regClientCSS($assetsUrl.'css/mgr/main.css');

        //$modx->regClientStartupScript($modx->config['assets_url'].'components/mapex2/js/jquery-1.7.1.min.js');

        $modx->regClientStartupScript('https://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js');
        $modx->regClientStartupScript('http://api-maps.yandex.ru/2.0/?load=package.full&;lang=ru-RU');
        $modx->regClientStartupScript($assetsUrl.'js/mgr/mapex.init.js');
        $modx->regClientStartupScript($assetsUrl.'js/mgr/mapex.storage.js');
        $modx->regClientStartupScript($assetsUrl.'js/mgr/mapex.layouts.js');
        $modx->regClientStartupScript($assetsUrl.'js/mgr/mapex.placemark.js');
        $modx->regClientStartupScript($assetsUrl.'js/mgr/mapex.line.js');
        $modx->regClientStartupScript($assetsUrl.'js/mgr/mapex.polygon.js');
        $modx->regClientStartupScript($assetsUrl.'js/mgr/mapex.route.js');
        $modx->regClientStartupScript($assetsUrl.'js/mgr/mapex.map.js');

        break;
}