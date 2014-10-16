mapex2.window.CreateItem = function (config) {
	config = config || {};
	if (!config.id) {
		config.id = 'mapex2-item-window-create';
	}
	Ext.applyIf(config, {
		title: _('mapex2_item_create'),
		width: 550,
		autoHeight: true,
		url: mapex2.config.connector_url,
		action: 'mgr/item/create',
		fields: this.getFields(config),
		keys: [{
			key: Ext.EventObject.ENTER, shift: true, fn: function () {
				this.submit()
			}, scope: this
		}]
	});
	mapex2.window.CreateItem.superclass.constructor.call(this, config);
};
Ext.extend(mapex2.window.CreateItem, MODx.Window, {

	getFields: function (config) {
		return [{
			xtype: 'textfield',
			fieldLabel: _('mapex2_item_name'),
			name: 'name',
			id: config.id + '-name',
			anchor: '99%',
			allowBlank: false,
		}, {
			xtype: 'textarea',
			fieldLabel: _('mapex2_item_description'),
			name: 'description',
			id: config.id + '-description',
			height: 150,
			anchor: '99%'
		}, {
			xtype: 'xcheckbox',
			boxLabel: _('mapex2_item_active'),
			name: 'active',
			id: config.id + '-active',
			checked: true,
		}];
	}

});
Ext.reg('mapex2-item-window-create', mapex2.window.CreateItem);


mapex2.window.UpdateItem = function (config) {
	config = config || {};
	if (!config.id) {
		config.id = 'mapex2-item-window-update';
	}
	Ext.applyIf(config, {
		title: _('mapex2_item_update'),
		width: 550,
		autoHeight: true,
		url: mapex2.config.connector_url,
		action: 'mgr/item/update',
		fields: this.getFields(config),
		keys: [{
			key: Ext.EventObject.ENTER, shift: true, fn: function () {
				this.submit()
			}, scope: this
		}]
	});
	mapex2.window.UpdateItem.superclass.constructor.call(this, config);
};
Ext.extend(mapex2.window.UpdateItem, MODx.Window, {

	getFields: function (config) {
		return [{
			xtype: 'hidden',
			name: 'id',
			id: config.id + '-id',
		}, {
			xtype: 'textfield',
			fieldLabel: _('mapex2_item_name'),
			name: 'name',
			id: config.id + '-name',
			anchor: '99%',
			allowBlank: false,
		}, {
			xtype: 'textarea',
			fieldLabel: _('mapex2_item_description'),
			name: 'description',
			id: config.id + '-description',
			anchor: '99%',
			height: 150,
		}, {
			xtype: 'xcheckbox',
			boxLabel: _('mapex2_item_active'),
			name: 'active',
			id: config.id + '-active',
		}];
	}

});
Ext.reg('mapex2-item-window-update', mapex2.window.UpdateItem);