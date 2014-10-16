var mapex2 = function (config) {
	config = config || {};
	mapex2.superclass.constructor.call(this, config);
};
Ext.extend(mapex2, Ext.Component, {
	page: {}, window: {}, grid: {}, tree: {}, panel: {}, combo: {}, config: {}, view: {}, utils: {}
});
Ext.reg('mapex2', mapex2);

mapex2 = new mapex2();