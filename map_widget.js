/* ---------------------------------------------
Simple Map Widget

Copyright (c) 2014 Thom Leigh
Licensed under the MIT License (http://opensource.org/licenses/MIT)
------------------------------------------------ */

(function($) {
	$.fn.simpleMap = function(options) {
		return this
				.each(function() {
					var opts = $.extend({
						input_file:"comments.json"
					}, options);
					
					var template = $.templates.map_template;
					var map_container = this;
					var map = new google.maps.Map(map_container, {zoom: 14, center: new google.maps.LatLng(0,0)});
					var markers = [];
					var infowindow = new google.maps.InfoWindow();
						
					$.getJSON( opts.input_file, function(data) {
						var latlngbounds = new google.maps.LatLngBounds();
						for(var i in data.customers) {
							var pos = new google.maps.LatLng(data.customers[i].lat, data.customers[i].lng)
							latlngbounds.extend(pos);							
							var marker = new google.maps.Marker( {
								position : pos
							} );
							markers.push(marker);
							
							marker.contentString = template.render(data.customers[i]);
							marker.setIcon('classic-pip.png');
							marker.customer = data.customers[i];
 
							google.maps.event.addListener(marker, 'click', function() {
								this.customer.idx = 0;
								initInfoWindow(this);
							});
							
							marker.setMap(map);
						}
						
						if(data.customers && data.customers.length) {
							/*var mcOptions = {gridSize: 50, maxZoom: 15};
							var mc = new MarkerClusterer(map, markers, mcOptions);*/
							map.setCenter(latlngbounds.getCenter());
							map.fitBounds(latlngbounds);
						}
					});
					
					function initInfoWindow(marker) {
						var customer = marker.customer;
						console.log(customer);
						marker.contentString = template.render(customer);
						infowindow.setContent(marker.contentString);
						infowindow.open(map,marker);
						var pager = $(map_container).find('.pager');
						pager.click(function() {
							console.log('click');
							var el = $(this);
							var iw = el.parent().parent();
							marker.customer.idx = el.attr('data-rel');
							initInfoWindow(marker);
						});
					}
				});
	};
})(jQuery);


