var map;

function initMap() {
	//Initialize a new GMap intance and assing props
	map = new google.maps.Map(document.getElementById('map'), {
		zoom: 7,
		center: {lat: -32.90800020205421, lng: -56.07095246534675},
		mapTypeId: 'roadmap'
	});
}

window.addEventListener("load", () => {
	var marker;
	var markers = [];
	//Add marker in a defined position
	document.getElementById("add-marker").addEventListener("click", () => {
		addMarker({lat: -31.457701, lng: -57.908002});
		marker.setMap(map);
	});
	//Delete the marker with last location loaded
	document.getElementById("remove-marker").addEventListener("click", () => {
		marker=( markers.length>=1 ? ( markers[markers.length-1] ) : ( [] ) ); // Take the last saved location and assign to marker var
		marker.setMap(null);
		markers.pop();
	});

	//Test
	var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	var labelIndex = 0;


	//Add a marker in a clicked position
	var opened=false;
	function addMarker(location) {
		marker = new google.maps.Marker({
			position: location,
			map: map,
			animation: google.maps.Animation.DROP,
			title: location.toString(),
			icon: image,
			label: {
				text: labels[( markers.length>=1 ? ( markers.length ) : ( 0 ) )],				
				fontWeight: 'bold',
				fontSize: '15px',
				fontFamily: '"Cinzel"',
				color: 'rgba(30, 54, 65, 1)'
			}
		});
		markers.push(marker);
		marker.addListener("click", (event)=> {
			opened=!opened;
			opened?infowindow.open(map, marker):infowindow.close();
			console.log(event);
		});
		marker.addListener('click', toggleBounce);
	}
	function toggleBounce() {
		if (marker.getAnimation() !== null) {
			marker.setAnimation(null);
		}
		else {
			marker.setAnimation(google.maps.Animation.BOUNCE);
		}
	}
	map.addListener("click", (event)=> {
		addMarker(event.latLng);
	});
	var image = {
		url: 'Resources/location.svg',
		// This marker is 20 pixels wide by 32 pixels high.
		size: new google.maps.Size(33, 50),
		// The origin for this image is (0, 0).
		origin: new google.maps.Point(0, 0),
		// The anchor for this image is the base of the flagpole at (0, 32).
		anchor: new google.maps.Point(17, 50),
		labelOrigin: new google.maps.Point(17, 16)
	};
	var contentString = 
	'<div class="markerPopUp">'+
		'<div id="siteNotice">'+
		'</div>'+
		'<h1 class="firstHeading">Uluru</h1>'+
		'<div id="bodyContent">'+
			'<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
			'sandstone rock formation in the southern part of the '+
			'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
			'south west of the nearest large town, Alice Springs; 450&#160;km '+
			'(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
			'features of the Uluru - Kata Tjuta National Park. Uluru is '+
			'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
			'Aboriginal people of the area. It has many springs, waterholes, '+
			'rock caves and ancient paintings. Uluru is listed as a World '+
			'Heritage Site.</p>'+
			'<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
			'https://en.wikipedia.org/w/index.php?title=Uluru</a> '+
			'(last visited June 22, 2009).</p>'+
		'</div>'+
	'</div>';
	var infowindow = new google.maps.InfoWindow({
		content: contentString
	});
})

/*			// In the following example, markers appear when the user clicks on the map.
			// The markers are stored in an array.
			// The user can then click an option to hide, show or delete the markers.
			var map;
			var markers = [];

			function initMap() {
				var haightAshbury = {lat: 37.769, lng: -122.446};

				map = new google.maps.Map(document.getElementById('map'), {
					zoom: 12,
					center: haightAshbury,
					mapTypeId: 'terrain'
				});

				// This event listener will call addMarker() when the map is clicked.
				map.addListener('click', function(event) {
					addMarker(event.latLng);
				});
			}

			// Adds a marker to the map and push to the array.
			function addMarker(location) {
				var marker = new google.maps.Marker({
					position: location,
					map: map
				});
				markers.push(marker);
			}

			// Sets the map on all markers in the array.
			function setMapOnAll(map) {
				for (var i = 0; i < markers.length; i++) {
					markers[i].setMap(map);
				}
			}

			// Removes the markers from the map, but keeps them in the array.
			function clearMarkers() {
				setMapOnAll(null);
			}

			// Shows any markers currently in the array.
			function showMarkers() {
				setMapOnAll(map);
			}

			// Deletes all markers in the array by removing references to them.
			function deleteMarkers() {
				clearMarkers();
				markers = [];
			}
*/