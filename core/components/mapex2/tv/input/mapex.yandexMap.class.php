<?php

class MapexYandexMapInputRender extends modTemplateVarInputRender {
    public function getTemplate() {
        return $this->modx->getOption('core_path').'components/mapex2/tv/input/tpl/mapex.yandexMap.tpl';
    }

    public function process($value,array $params = array()) {
        return $value;
    }
}
return 'MapexYandexMapInputRender';