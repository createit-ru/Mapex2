<?php

/**
 * Class mapex2MainController
 */
abstract class mapex2MainController extends modExtraManagerController {
	/** @var mapex2 $mapex2 */
	public $mapex2;


	/**
	 * @return void
	 */
	public function initialize() {
		$corePath = $this->modx->getOption('mapex2_core_path', null, $this->modx->getOption('core_path') . 'components/mapex2/');
		require_once $corePath . 'model/mapex2/mapex2.class.php';

		$this->mapex2 = new mapex2($this->modx);
		$this->addCss($this->mapex2->config['cssUrl'] . 'mgr/main.css');
		//$this->addJavascript($this->mapex2->config['jsUrl'] . 'mgr/somefile.js');
		$this->addHtml('
		<script type="text/javascript">
			mapex2.config = ' . $this->modx->toJSON($this->mapex2->config) . ';
			mapex2.config.connector_url = "' . $this->mapex2->config['connectorUrl'] . '";
		</script>
		');

		parent::initialize();
	}


	/**
	 * @return array
	 */
	public function getLanguageTopics() {
		return array('mapex2:default');
	}


	/**
	 * @return bool
	 */
	public function checkPermissions() {
		return true;
	}
}


/**
 * Class IndexManagerController
 */
class IndexManagerController extends mapex2MainController {

	/**
	 * @return string
	 */
	public static function getDefaultController() {
		return 'home';
	}
}