<?php

/**
 * The base class for mapex2.
 */
class mapex2 {
	/* @var modX $modx */
	public $modx;

    private $colors = array(
        'lightBlue' => '#66c7ff',
        'lightblue' => '#66c7ff',
        'blue' => '#006cff',
        'darkBlue' => '#00339a',
        'darkblue' => '#00339a',
        'night' => '#004056',
        'green' => '#33cc00',
        'darkGreen' => '#1bad03',
        'darkgreen' => '#1bad03',
        'grey' => '#d1d1d1',
        'gray' => '#d1d1d1',
        'black' => '#000000',
        'brown' => '#793e0f',
        'red' => '#ff0000',
        'orange' => '#ffb400',
        'darkOrange' => '#ff6600',
        'darkorange' => '#ff6600',
        'yellow' => '#ffea00',
        'olive' => '#c1c766',
        'violet' => '#b832fd',
        'pink' => '#fd32fb'
    );

	/**
	 * @param modX $modx
	 * @param array $config
	 */
	function __construct(modX &$modx, array $config = array()) {
		$this->modx =& $modx;

		$corePath = $this->modx->getOption('mapex2_core_path', $config, $this->modx->getOption('core_path') . 'components/mapex2/');
		$assetsUrl = $this->modx->getOption('mapex2_assets_url', $config, $this->modx->getOption('assets_url') . 'components/mapex2/');
		$connectorUrl = $assetsUrl . 'connector.php';

		$this->config = array_merge(array(
			'assetsUrl' => $assetsUrl,
			'cssUrl' => $assetsUrl . 'css/',
			'jsUrl' => $assetsUrl . 'js/',
			'imagesUrl' => $assetsUrl . 'images/',
			'connectorUrl' => $connectorUrl,

			'corePath' => $corePath,
			'modelPath' => $corePath . 'model/',
			'chunksPath' => $corePath . 'elements/chunks/',
			'templatesPath' => $corePath . 'elements/templates/',
			'chunkSuffix' => '.chunk.tpl',
			'snippetsPath' => $corePath . 'elements/snippets/',
			'processorsPath' => $corePath . 'processors/'
		), $config);

		$this->modx->addPackage('mapex2', $this->config['modelPath']);
		$this->modx->lexicon->load('mapex2:default');
	}

    /**
     * @param object $map
     * @param string $mapControls
     * @param string $mapId
     * @param string $mapCssClass
     * @param string $mapTpl
     * @param string $placemarkTpl
     * @param string $polygonTpl
     * @param string $polylineTpl
     * @param string $routeTpl
     * @param string $width
     * @param string $height
     * @return string
     */
    function drawMap($map, $mapControls, $mapId, $mapCssClass, $mapTpl, $placemarkTpl, $polygonTpl, $polylineTpl, $routeTpl, $width, $height){

        $controls21 =  trim($mapControls);
        if(!empty($controls21)){
            $controls21 = array_map("trim", explode(",", $mapControls));
            $controls21 = "['".implode("', '", $controls21)."']";
        }
        else {
            $controls21 = '[]';
        }

        $output = array(
            'mapId' => $mapId,
            'style' => $this->getMapCssStyle($width, $height),
            'class' => !empty($mapCssClass) ? ' class="'.$mapCssClass.'"' : '',
            'controls' => $mapControls,
            'controls21' =>  $controls21,
        );

        $output['placemarks'] = $this->DrawMapPlacemarks($mapId, $map->placemarks, $placemarkTpl);

        $output['polylines'] = $this->DrawMapPolylines($mapId, $map->lines, $polylineTpl);
        $output['polygons'] = $this->DrawMapPolygons($mapId, $map->polygons, $polygonTpl);
        $output['routes'] = $this->DrawMapRoutes($mapId, $map->routes, $routeTpl);
        $output['map'] = array(
            'center' => $this->prepareCoords($map->coords->center),
            'zoom' => $map->coords->zoom,
            'type' => $map->type,
        );

        return $this->modx->getChunk($mapTpl, $output);
    }

    private function DrawMapPlacemarks($mapId, $placemarks, $placemarkTpl, $outputSeparator = "\n"){
        $output = array();
        foreach($placemarks as $placemark){
            $output[] = $this->modx->getChunk($placemarkTpl, array(
                'mapId' => $mapId,
                'coords' => $this->prepareCoords($placemark->coords),
                'properties' => json_encode(array(
                    'iconContent' => $placemark->params->iconContent,
                    'balloonContentBody' => $placemark->params->balloonContentBody,
                    'balloonContentHeader' => $placemark->params->balloonContentHeader,
                )),
                'options' => json_encode(array(
                    'preset' => 'twirl#'.$placemark->params->color.(empty($placemark->params->iconContent) ? 'DotIcon' : 'StretchyIcon'),
                )),
                'options21' => json_encode(array(
                    'preset' => 'islands#'.$placemark->params->color.(empty($placemark->params->iconContent) ? 'DotIcon' : 'StretchyIcon'),
                )),
            ));
        }
        return implode($outputSeparator, $output);
    }

    private function DrawMapPolylines($mapId, $lines, $polylineTpl, $outputSeparator = "\n"){
        $output = array();
        foreach($lines as $line){
            $coords = array();

            foreach($line->coords as $c){
                $coords[] = $this->prepareCoords($c);
            }

            $output[] = $this->modx->getChunk($polylineTpl, array(
                'mapId' => $mapId,
                'coords' => '[ '.implode(', ', $coords).' ]',
                'properties' => json_encode(array(
                    'balloonContent' => $line->params->balloonContent,
                )),
                'options' => json_encode(array(
                    'strokeWidth' => $line->params->strokeWidth,
                    'strokeColor' => $this->getColor($line->params->strokeColor),
                    'opacity' => $line->params->opacity,
                )),
            ));
        }
        return implode($outputSeparator, $output);
    }

    private function DrawMapPolygons($mapId, $polygons, $polygonTpl, $outputSeparator = "\n"){
        $output = array();
        foreach($polygons as $polygon){
            $coords = array();
            foreach($polygon->coords as $c){
                $coords2 = array();
                foreach($c as $c2){
                    $coords2[] = $this->prepareCoords($c2);
                }
                $coords[] = '[ '.implode(', ', $coords2).' ]';
            }

            $output[] = $this->modx->getChunk($polygonTpl, array(
                'mapId' => $mapId,
                'coords' => '[ '.implode(', ', $coords).' ]',
                'properties' => json_encode(array(
                    'balloonContent' => $polygon->params->balloonContent,
                )),
                'options' => json_encode(array(
                    'strokeWidth' => $polygon->params->strokeWidth,
                    'strokeColor' => $this->getColor($polygon->params->strokeColor),
                    'fillColor' => $this->getColor($polygon->params->fillColor),
                    'opacity' => $polygon->params->opacity,
                )),
            ));
        }
        return implode($outputSeparator, $output);
    }

    private function DrawMapRoutes($mapId, $routes, $routeTpl, $outputSeparator = "\n"){
        $output = array();
        if(count($routes) > 0){
            $coords = array();
            foreach($routes as $route){
                $coords[] = $this->prepareCoords($route);
            }
            $output[] = $this->modx->getChunk($routeTpl, array('coords' => '[ '.implode(', ', $coords).' ]'));
        }
        return implode($outputSeparator, $output);
    }

    private function getMapCssStyle($width, $height) {
        $style = '';
        if(!empty($width)){
            $style .= 'width:'.$width.';';
        }
        if(!empty($height)){
            $style .= 'height:'.$height.';';
        }
        if(!empty($style)){
            $style = ' style="'.$style.'"';
        }
        return $style;
    }

    private function getColor($color){
        return array_key_exists($color, $this->colors) ? $this->colors[$color] : $color;
    }

    private  function prepareCoords($coords) {
        return '['.str_replace(',','.',$coords[0]).', '.str_replace(',','.',$coords[1]).']';
    }
}