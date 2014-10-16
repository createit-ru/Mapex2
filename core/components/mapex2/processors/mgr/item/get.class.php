<?php

/**
 * Get an Item
 */
class mapex2ItemGetProcessor extends modObjectGetProcessor {
	public $objectType = 'mapex2Item';
	public $classKey = 'mapex2Item';
	public $languageTopics = array('mapex2:default');
	//public $permission = 'view';


	/**
	 * We doing special check of permission
	 * because of our objects is not an instances of modAccessibleObject
	 *
	 * @return mixed
	 */
	public function process() {
		if (!$this->checkPermissions()) {
			return $this->failure($this->modx->lexicon('access_denied'));
		}

		return parent::process();
	}

}

return 'mapex2ItemGetProcessor';