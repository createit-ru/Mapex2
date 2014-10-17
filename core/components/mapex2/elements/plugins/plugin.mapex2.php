<?php
$corePath = $modx->getOption('core_path', null, MODX_CORE_PATH).'components/mapex/';
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
        $modx->regClientCSS($modx->config['assets_url'].'components/mapex/css/mapex.css');

        //$modx->regClientStartupScript($modx->config['assets_url'].'components/mapex/js/jquery-1.7.1.min.js');

        $modx->regClientStartupScript('https://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js');
        $modx->regClientStartupScript('http://api-maps.yandex.ru/2.0/?load=package.full&;lang=ru-RU');
        $modx->regClientStartupScript($modx->config['assets_url'].'components/mapex/js/mapex.init.js');
        $modx->regClientStartupScript($modx->config['assets_url'].'components/mapex/js/mapex.storage.js');
        $modx->regClientStartupScript($modx->config['assets_url'].'components/mapex/js/mapex.layouts.js');
        $modx->regClientStartupScript($modx->config['assets_url'].'components/mapex/js/mapex.placemark.js');
        $modx->regClientStartupScript($modx->config['assets_url'].'components/mapex/js/mapex.line.js');
        $modx->regClientStartupScript($modx->config['assets_url'].'components/mapex/js/mapex.polygon.js');
        $modx->regClientStartupScript($modx->config['assets_url'].'components/mapex/js/mapex.route.js');
        $modx->regClientStartupScript($modx->config['assets_url'].'components/mapex/js/mapex.map.js');

        break;
}