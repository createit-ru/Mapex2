<div id="[[+mapId]]"[[+style]][[+class]]></div>
<script type="text/javascript">
    ymaps.ready(function(){
        [[+mapId]] = new ymaps.Map("[[+mapId]]", {
            center: [[+map.center]],
            zoom: [[+map.zoom]]
        });
        [[+mapId]].setType("[[+map.type]]");
        var [[+mapId]]Controls = "[[+controls]]".split(',');
        for (var i = 0; i < [[+mapId]]Controls.length; i++){
            [[+mapId]].controls.add([[+mapId]]Controls[i]);
        }
        [[+placemarks]]
        [[+polylines]]
        [[+polygons]]
        [[+routes]]
    });
</script>