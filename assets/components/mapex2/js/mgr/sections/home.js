mapex2.page.Home = function (config) {
	config = config || {};
	Ext.applyIf(config, {
		components: [{
			xtype: 'mapex2-panel-home', renderTo: 'mapex2-panel-home-div'
		}]
	});
	mapex2.page.Home.superclass.constructor.call(this, config);
};
Ext.extend(mapex2.page.Home, MODx.Component);
Ext.reg('mapex2-page-home', mapex2.page.Home);