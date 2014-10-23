var data_obj;
var map;
var geocoder;
var marker;

$(function() {
	$('.btn-save').click(saveCustomer);
	$('.btn-clear').click(clearForm);
	$('.btn-addr').click(codeAddress);
	$('.add-comment').click(addComment);
	
	$.getJSON( '../comments.json', function(data) {
		data_obj = data;
		drawCommentsTable();
		drawMap();
	});
});

function drawCommentsTable() {
	var content = $.templates.comment_table_template.render(data_obj);
	$('.comments-table').html(content);
}

function editComment(idx) {
	var customer = data_obj.customers[idx];
	
	for(i in customer) { 
		$('.input-form').find('#' + i + ',#verify_' + i).val(customer[i]);
		$('.input-form').find('#index').val(idx);
	}
	
	$('.comments').html($.templates.comment_template.render(customer));
	
	fillComments(customer.comments);
	
	drawMap();
	document.body.scrollTop='0';
}

function delComment(customer_idx, comment_idx) {
	if(confirm('Are you sure you want to delete this comment?')) {
		data_obj.customers[customer_idx].comments.splice(comment_idx, 1);
		if(data_obj.customers[customer_idx].comments.length == 0) {
			delete data_obj.customers[customer_idx];
		}
		drawCommentsTable();
	}
}

function saveCustomer(){
	var output = {};
	
	
	output.first_name = $('#first_name').val();
	output.last_name = $('#last_name').val();
	output.email = $('#email').val();
	output.date = $('#date').val();
	output.address = $('#address').val();
	output.lat = $('#lat').val();
	output.lng = $('#lng').val();
	output.comments = [];
	objectifyComments(output);
	
	if($('#index').val() >= 0) {
		data_obj.customers[$('#index').val()] = output;
	}
	else {
		data_obj.customers.push(output);
	}
	
	drawCommentsTable();
	clearForm(true);
	$.post( "save.php", {json:JSON.stringify(data_obj)} )
		.done(function() {
			$('.alert-saved').show().fadeOut(2000);
		})
		.fail(function() {
		   alert( "error saving" );
		});
}

function clearForm(skip_prompt) {
	if(skip_prompt || confirm('Are you sure you want to clear this form?')) {
		$('.input-form').find('input,select,textarea').val('');
		$('.comments').html(' ');
		addComment();
	}
}

function objectifyComments(output) {
	$('.comment-section').each(function() {		
		var comment = $(this);
		
		var el = {};
		el.comment = comment.find('.comment').val();
		el.category = comment.find('.category').val();

		output.comments.push(el);
	});
}

function fillComments(arr) {
	for(i in arr) {
		var comment = arr[i];
		
	
		$('#comment_' + i).val(comment.comment);
		if(comment.category) {
			$('#category_' + i).val(comment.category);
		}
	}
}

function addComment() {
	var output = {};
	output.comments = [];
	objectifyComments(output);

	output.comments.push({comment:"",category:""});
	$('.comments').html($.templates.comment_template.render(output));
	fillComments(output.comments);
}

function drawMap() {
	if(!map) {
		
		var latlngbounds = new google.maps.LatLngBounds();
		for(var i in data_obj.customers) {
			var pos = new google.maps.LatLng(data_obj.customers[i].lat, data_obj.customers[i].lng)
			latlngbounds.extend(pos)
		}
		
		var map_container = $('.map-div');
		map = new google.maps.Map(map_container[0], {zoom: 14, center: new google.maps.LatLng(0,0)});
		map.setCenter(latlngbounds.getCenter());
		map.fitBounds(latlngbounds);
		geocoder = new google.maps.Geocoder();
	}
	
	if($('#lat').val() && $('#lng').val()) {
		addMarker(new google.maps.LatLng($('#lat').val(),$('#lng').val()));
	}
}

function codeAddress() {
	var address = $('#address').val();
	geocoder.geocode( {
		"address" : address
	}, geocodeCallback);
}

function addMarker(pos) {
	if(marker) {
		marker.setMap(null);
	}
	marker = new google.maps.Marker( {
		position : pos,
		map: map,
		draggable:true
	} );
	
	google.maps.event.addListener(marker, 'dragend', function() {
			endDragCallback(marker.getPosition())
	});
	
	map.setCenter(marker.getPosition());
	endDragCallback(marker.getPosition());
	
	map.setZoom(13);
}

function geocodeCallback(results, status) {
	if (status == google.maps.GeocoderStatus.OK && results.length) {
		// You should always check that a result was returned, as it is
		// possible to return an empty results object.
		if (status != google.maps.GeocoderStatus.ZERO_RESULTS) {
			$('#address').val(results[0].formatted_address);
			addMarker(results[0].geometry.location);
		}
		else {
			alert('Couldn\'t find anything for that address');
		}
	}
}

function endDragCallback(pos) {
	$('#lat').val(pos.lat());
	$('#lng').val(pos.lng());
}