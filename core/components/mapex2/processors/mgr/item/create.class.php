<?php

/**
 * Create an Item
 */
class mapex2ItemCreateProcessor extends modObjectCreateProcessor {
	public $objectType = 'mapex2Item';
	public $classKey = 'mapex2Item';
	public $languageTopics = array('mapex2');
	//public $permission = 'create';


	/**
	 * @return bool
	 */
	public function beforeSet() {
		$name = trim($this->getProperty('name'));
		if (empty($name)) {
			$this->modx->error->addField('name', $this->modx->lexicon('mapex2_item_err_name'));
		}
		elseif ($this->modx->getCount($this->classKey, array('name' => $name))) {
			$this->modx->error->addField('name', $this->modx->lexicon('mapex2_item_err_ae'));
		}

		return parent::beforeSet();
	}

}

return 'mapex2ItemCreateProcessor';