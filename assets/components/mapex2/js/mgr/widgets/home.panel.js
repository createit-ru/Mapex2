mapex2.panel.Home = function (config) {
	config = config || {};
	Ext.apply(config, {
		baseCls: 'modx-formpanel',
		layout: 'anchor',
		/*
		 stateful: true,
		 stateId: 'mapex2-panel-home',
		 stateEvents: ['tabchange'],
		 getState:function() {return {activeTab:this.items.indexOf(this.getActiveTab())};},
		 */
		hideMode: 'offsets',
		items: [{
			html: '<h2>' + _('mapex2') + '</h2>',
			cls: '',
			style: {margin: '15px 0'}
		}, {
			xtype: 'modx-tabs',
			defaults: {border: false, autoHeight: true},
			border: true,
			hideMode: 'offsets',
			items: [{
				title: _('mapex2_items'),
				layout: 'anchor',
				items: [{
					html: _('mapex2_intro_msg'),
					cls: 'panel-desc',
				}, {
					xtype: 'mapex2-grid-items',
					cls: 'main-wrapper',
				}]
			}]
		}]
	});
	mapex2.panel.Home.superclass.constructor.call(this, config);
};
Ext.extend(mapex2.panel.Home, MODx.Panel);
Ext.reg('mapex2-panel-home', mapex2.panel.Home);
