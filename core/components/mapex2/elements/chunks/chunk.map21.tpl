<div id="[[+mapId]]"[[+style]][[+class]]></div>
<script type="text/javascript">
    ymaps.ready(function(){
        [[+mapId]] = new ymaps.Map("[[+mapId]]", {
            center: [[+map.center]],
            zoom: [[+map.zoom]],
            controls: [[+controls21]]
        });
        [[+mapId]].setType("[[+map.type]]");
[[+placemarks]]
[[+polylines]]
[[+polygons]]
[[+routes]]
    });
</script>