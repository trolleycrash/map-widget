<html>
<head>
<link rel="stylesheet" href="map_widget.css">
</head>
<body>
<script src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false"></script>
<script src="//code.jquery.com/jquery-1.11.1.min.js"></script>
<script src="jsrender.min.js"></script>
<script id="map_template" src="map_template.jst"></script>
<script src="markerclusterer_compiled.js"></script>
<script src="map_widget.js"></script>

<div id="map_widget"></div>
<script>
$(function() {
	$('#map_widget').simpleMap();
});
</script>
</body>
</html>

<?php
