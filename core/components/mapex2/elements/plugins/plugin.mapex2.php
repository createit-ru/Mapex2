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
    case 'OnDocFormRender':
        $modx->regClientCSS($assetsUrl.'css/mgr/mapex.default.css');

        $jqueryUrl = $modx->getOption('mapex2_manager_jquery_url', null, '');

        if(!empty($jqueryUrl)) {
            $modx->regClientStartupScript('
        <script type="text/javascript">
            if(typeof jQuery == "undefined"){
                document.write(\'<script type="text/javascript" src="'.$jqueryUrl.'" ></\'+\'script>\');
            };
        </script>
        ', true);
        }

        $mapCenter = $modx->getOption('mapex2_manager_map_default_center', null, '55.751565, 37.617935');
        $mapZoom = $modx->getOption('mapex2_manager_map_default_zoom', null, '10');
        $mapType = $modx->getOption('mapex2_manager_map_default_type', null, 'yandex#map');
        $showInput = intval($modx->getOption('mapex2_manager_show_input', null, true));
        $addPlacemarkOnSearch = intval($modx->getOption('mapex2_manager_add_placemark_on_search', null, false));

        $configScript = '
        <script type="text/javascript">
            mapex2Config = {
                mapCenter: ['.$mapCenter.'],
                mapZoom: '.$mapZoom.',
                mapType: "'.$mapType.'",
                showInput: '.$showInput.',
                addPlacemarkOnSearch: '.$addPlacemarkOnSearch.'
            }
        </script>
        ';
        $modx->regClientStartupScript($configScript, true);

        /* @var mapex2 $mapex2 */
        $mapex2 = $modx->getService('mapex2', 'mapex2', MODX_CORE_PATH . 'components/mapex2/model/mapex2/');
        $modx->regClientStartupScript($mapex2->getYandexMapsApiUrl('2.0', 'ru_RU'));

        //$modx->regClientStartupScript($assetsUrl.'js/mgr/mapex.ym.js');

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