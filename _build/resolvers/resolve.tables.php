<?php

if ($object->xpdo) {
	/** @var modX $modx */
	$modx =& $object->xpdo;

	switch ($options[xPDOTransport::PACKAGE_ACTION]) {
		case xPDOTransport::ACTION_INSTALL:
			/*$modelPath = $modx->getOption('mapex2_core_path', null, $modx->getOption('core_path') . 'components/mapex2/') . 'model/';
			$modx->addPackage('mapex2', $modelPath);

			$manager = $modx->getManager();
			$objects = array(
				'mapex2Item',
			);
			foreach ($objects as $tmp) {
				$manager->createObjectContainer($tmp);
			}*/
			break;

		case xPDOTransport::ACTION_UPGRADE:
			break;

		case xPDOTransport::ACTION_UNINSTALL:
			break;
	}
}
return true;
