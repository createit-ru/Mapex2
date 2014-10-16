<?php

/**
 * Remove an Items
 */
class mapex2ItemRemoveProcessor extends modObjectProcessor {
	public $objectType = 'mapex2Item';
	public $classKey = 'mapex2Item';
	public $languageTopics = array('mapex2');
	//public $permission = 'remove';


	/**
	 * @return array|string
	 */
	public function process() {
		if (!$this->checkPermissions()) {
			return $this->failure($this->modx->lexicon('access_denied'));
		}

		$ids = $this->modx->fromJSON($this->getProperty('ids'));
		if (empty($ids)) {
			return $this->failure($this->modx->lexicon('mapex2_item_err_ns'));
		}

		foreach ($ids as $id) {
			/** @var mapex2Item $object */
			if (!$object = $this->modx->getObject($this->classKey, $id)) {
				return $this->failure($this->modx->lexicon('mapex2_item_err_nf'));
			}

			$object->remove();
		}

		return $this->success();
	}

}

return 'mapex2ItemRemoveProcessor';