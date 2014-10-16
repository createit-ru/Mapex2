<?php

/**
 * The home manager controller for mapex2.
 *
 */
class mapex2HomeManagerController extends mapex2MainController {
	/* @var mapex2 $mapex2 */
	public $mapex2;


	/**
	 * @param array $scriptProperties
	 */
	public function process(array $scriptProperties = array()) {
	}


	/**
	 * @return null|string
	 */
	public function getPageTitle() {
		return $this->modx->lexicon('mapex2');
	}


	/**
	 * @return void
	 */
	public function loadCustomCssJs() {
		$this->addCss($this->mapex2->config['cssUrl'] . 'mgr/main.css');
		$this->addCss($this->mapex2->config['cssUrl'] . 'mgr/bootstrap.buttons.css');
		$this->addJavascript($this->mapex2->config['jsUrl'] . 'mgr/misc/utils.js');
		$this->addJavascript($this->mapex2->config['jsUrl'] . 'mgr/widgets/items.grid.js');
		$this->addJavascript($this->mapex2->config['jsUrl'] . 'mgr/widgets/items.windows.js');
		$this->addJavascript($this->mapex2->config['jsUrl'] . 'mgr/widgets/home.panel.js');
		$this->addJavascript($this->mapex2->config['jsUrl'] . 'mgr/sections/home.js');
		$this->addHtml('<script type="text/javascript">
		Ext.onReady(function() {
			MODx.load({ xtype: "mapex2-page-home"});
		});
		</script>');
	}


	/**
	 * @return string
	 */
	public function getTemplateFile() {
		return $this->mapex2->config['templatesPath'] . 'home.tpl';
	}
}