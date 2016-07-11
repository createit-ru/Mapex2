<div class="mapex-map-wrapper">
    <div id="tv{$tv->id}Map" class="mapex-map"></div>
</div>
<div id="tv{$tv->id}MapInput">
    <textarea id="tv{$tv->id}" name="tv{$tv->id}" class="textfield" rows="5"></textarea>
</div>

<script type="text/javascript">
    // <![CDATA[
    {literal}
    Ext.onReady(function(){
        var fld = MODx.load({
            {/literal}
            xtype: 'textfield'
            ,applyTo: 'tv{$tv->id}'
            ,width: '99%'
            ,id: 'tv{$tv->id}'
            ,enableKeyEvents: true
            ,allowBlank: true
            ,value: '{$tv->value}'
            {literal}
            ,listeners: { 'change': { fn:MODx.fireResourceFormChange, scope:this}}
        });
        Ext.getCmp('modx-panel-resource').getForm().add(fld);
        MODx.makeDroppable(fld);
    });
    {/literal}
    // ]]>
</script>


<script type="text/javascript">
    {literal}
    if(Mapex == undefined){
        var Mapex = {};
    }

    Ext.onReady(function(){
        ymaps.ready(function() {
            // Initialize layouts
            Mapex.initLayouts();

            // Create new map
            {/literal}
            var map = new Mapex.MapexMap('tv{$tv->id}Map', 'tv{$tv->id}', '{$tv->value}');
            map.enableControls();
            map.enableTools();

            if(!mapex2Config.showInput){
                jQuery("#tv{$tv->id}" + "MapInput").hide();
            }
            {literal}

            //map.fitToViewport();
        });
    });
    {/literal}
</script>