var globalVar;
window.addEventListener("load", () => {
	var editorState="marker";
	var map = L.map('mapid').setView([-34.83634999076386, -56.165848], 12)
	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFya21lZCIsImEiOiJjamxjOW5sMmwyaHlnM3FudGNyODZoZ2l4In0.JccJdeIlOEnkn9RPEYYu0w', {
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a> Designed by <a href="https://github.com/MarkMed/">Mark-Med</a>',
		maxZoom: 20,
		id: 'mapbox.outdoors',
		accessToken: 'pk.eyJ1IjoibWFya21lZCIsImEiOiJjamxjOW5sMmwyaHlnM3FudGNyODZoZ2l4In0.JccJdeIlOEnkn9RPEYYu0w'
	}).addTo(map);

	//Mark Obj
	function mark(id, title, markObj){
		this.id=id;
		this.title=title;
		this.markObj=markObj;
	}

	//Markers List
	var markers=[];

	//Marker Design
	var luxMark=L.icon({
		iconUrl: "Resources/location.svg",
		iconSize: [33, 50],
		iconAnchor: [17, 50],
		popupAnchor:	[0, -38.5]

	});
	var luxPoint=L.icon({
		iconUrl: "Resources/point2.svg",
		iconSize: [10, 10],
		iconAnchor: [10, 10]

	});
	var luxSqr=L.icon({
		iconUrl: "Resources/sqr.svg",
		iconSize: [10, 10],
		iconAnchor: [10, 10]

	});

	//Marker w/ infoPop
	addMarker({latlng:{lat: -34.918113,lng: -56.165848}});

	//Circle
	L.circle([-34.879042, -56.078175], {
		color: 'rgba(243, 200, 96, 1)',
		fillColor: 'rgba(30, 54, 65, 1)',
		fillOpacity: 0.5,
		radius: 190
	}).addTo(map);

	//Polygon
	L.polygon([
		[-34.73422859266736, -56.236165165901184],
		[-34.748794, -56.420600],
		[-34.848761, -56.225709]
	]).addTo(map);

	//Add Marker
	function addMarker(event){
		var title="";
		var idVar;
		var coords=event.latlng;
		var marker=L.marker([coords.lat, coords.lng], {
			icon: luxMark,
			draggable: true,
			title: "New Marker"
		});
		function fixData(){
			setTimeout(()=>{
				marker.bindPopup("<h3>Mark Title</h3><p>Here would be some info about location</p><p><i>Perhaps some meta info</i> and a <a href='google'>link</a></p><p>This represents fixed data added to the marker</p>");
			},300);
		}
		marker.addTo(map);

		//Dragging
		marker.addEventListener("drag", ()=>{
			marker.removeEventListener("popupclose", fixData);
			marker.bindPopup("<p>Lat: "+marker.getLatLng().lat+"</p><p>Long: "+marker.getLatLng().lng+"</p>").openPopup();
		});
		//End dragging
		marker.addEventListener("dragend", ()=>{
			marker.bindPopup("<h3>Moved</h3><p>I have been moved</p><p>Now, I am in Lat: "+marker.getLatLng().lat+" and Long.: "+marker.getLatLng().lng+"</p>");
		});
		marker.addEventListener("dblclick", ()=>{
			console.log("dblclicked :v");
		});
		//Right Click
		marker.addEventListener("contextmenu", ()=>{
			function insertElements(){
				parentHTML.innerHTML="<h3 class='mainPopTitle'>Options</h3><h4 class='popTitle' style=''>"+((!!markers[marker.id])?(markers[marker.id].title):("<i>Not save marker</i>"))+"</h4><p>Latitude: "+marker.getLatLng().lat+"</p><p>Longitude: "+marker.getLatLng().lng+"</p>";
					//Insert child in parents
				parentHTML.appendChild(zoomInBtn);
				parentHTML.appendChild(rename);
				parentHTML.appendChild(takeCoord);
				parentHTML.appendChild(removeBtn);
			};
			//Parent
			var parentHTML=document.createElement("div");
			//Buttons


			var takeCoord=document.createElement("div");
			takeCoord.style.transition = '0.6s';
			var takeCoordBtn=document.createElement("button");
			takeCoordBtn.innerHTML="Take Coords";
			takeCoordBtn.setAttribute("class", "luxBtn");
			var bool=false;
			takeCoordBtn.addEventListener("click", ()=>{
				bool = !bool;
				if(bool){
					var coordsParag=document.createElement("p");
					takeCoordBtn.innerHTML="Hide Coords";
					takeCoord.innerHTML="";
					takeCoord.appendChild(takeCoordBtn);
					takeCoord.appendChild(coordsParag);
					takeCoord.style.margin = '40px 0px';
					coordsParag.innerHTML+="["+marker.getLatLng().lat+", "+marker.getLatLng().lng+"]";
				}
				else{
					takeCoord.innerHTML="";
					takeCoordBtn.innerHTML="Take Coords";
					takeCoord.appendChild(takeCoordBtn);
					takeCoord.style.margin = '0';
				}
				console.log("Executed!");
			});
			takeCoord.appendChild(takeCoordBtn);


			/////////////////////////////////
			var removeBtn=document.createElement("button");
			removeBtn.innerHTML="Remove Marker";
			removeBtn.setAttribute("class", "luxBtn");
			removeBtn.addEventListener("click", ()=>{
				marker.remove();
			});
			/////////////////////////////////
			var zoomInBtn=document.createElement("button");
			zoomInBtn.innerHTML="Zoom in Marker";
			zoomInBtn.setAttribute("class", "luxBtn");
			zoomInBtn.addEventListener("click", ()=>{
				map.panTo(new L.LatLng(marker.getLatLng().lat, marker.getLatLng().lng));
				map.setView([marker.getLatLng().lat, marker.getLatLng().lng], 17, {animate: true});
				marker.closePopup();
			});
			/////////////////////////////////
			var rename=document.createElement("div");
			rename.style.transition = '0.6s';
			var renameBtn=document.createElement("button");
			renameBtn.innerHTML="Rename Mark";
			renameBtn.setAttribute("class", "luxBtn");
			renameBtn.addEventListener("click", ()=>{
				function resertForm(){
					rename.innerHTML="";
					renameBtn.setAttribute("style", "");
					rename.appendChild(renameBtn);
					rename.style.margin="0";
				}
				var inputForm=document.createElement("input");
				var confirmBtn=document.createElement("button");
				var cancelBtn=document.createElement("button");

				inputForm.setAttribute("class", "inputTxt");
				inputForm.setAttribute("placeholder", markers[marker.id].title);

				confirmBtn.setAttribute("class", "luxBtn");
				confirmBtn.innerHTML="Confirm";

				cancelBtn.setAttribute("class", "luxBtn");
				cancelBtn.innerHTML="Cancel";

				rename.innerHTML="";
				rename.appendChild(renameBtn);
				rename.appendChild(inputForm);
				rename.appendChild(confirmBtn);
				rename.appendChild(cancelBtn);
				rename.style.margin="40px 0px";
				renameBtn.setAttribute("style", "border: none; background: transparent; font-size: 12px; color:rgba(255, 254, 219, 1);");
				cancelBtn.addEventListener("click", ()=>{
					resertForm()
				});
				confirmBtn.addEventListener("click", ()=>{
					markers[marker.id].title=inputForm.value;
					resertForm();
					insertElements();
				});
			});
			rename.appendChild(renameBtn);
			insertElements();
			
			//PopUp
			marker.bindPopup(parentHTML).openPopup();
			marker.addEventListener("popupclose", fixData);
		});

		//Regist marker
		var parentDiv=document.createElement("div");
		parentDiv.innerHTML="<h3>New Marker</h3><p>Enter a name for this marker:</p><input class='inputTxt' type='text' placeholder='e.g: Las Vegas Hotel'></input>"
		var regBtn=document.createElement("button");
		regBtn.innerHTML="Save Marker";
		regBtn.setAttribute("class", "luxBtn");
		regBtn.addEventListener("click", (event)=>{
			title=event.target.parentElement.childNodes[2].value;
			saveMarker();
			marker.closePopup();
		});

		parentDiv.appendChild(regBtn);
		marker.bindPopup(parentDiv).openPopup();
		function saveMarker(){
			if(title===""){
				title="Unassigned Name";
			}
			var newMark=new mark(markers.length, title, marker);
			marker.id=markers.length;
			markers.push(newMark);
			markers[marker.id].markObj.options.title=title;
		}
		
	}
	//Add Line
	function addLine(event){
		var coords=event.latlng;
		var coordsArray=[];
		var newCoord=[coords.lat, coords.lng];
		coordsArray.push(newCoord);
		console.log(JSON.stringify(coordsArray));


		var marker=L.marker(newCoord, {
			icon: luxPoint,
			draggable: true
		});		
		marker.addTo(map);

		newCoord=[-34.906346218320856, -56.20427370071412];
		coordsArray.push(newCoord);

		newCoord=[-34.90719967760585, -56.20381236076356];
		coordsArray.push(newCoord);

		newCoord=[-34.90635941621238, -56.20426297187806];
		coordsArray.push(newCoord);

		newCoord=[-34.90691372574081, -56.19877517223359];
		coordsArray.push(newCoord);
		coordsArray=[
			[-34.906346218320856, -56.20427370071412],
			[-34.90805312801996, -56.20346903800965],
			[-34.90708969623714, -56.20071709156037],
			[-34.90691372574081, -56.19877517223359]
		]
		console.log(JSON.stringify(coordsArray));

		var latlngs = coordsArray;
		var polyline = L.polyline(latlngs, {
			color: "rgba(243, 200, 96, 1)",
			weight: 5,
			opacity: 1
		}).addTo(map);
	}
	//Add Square
	function addSqr(event){
		var coords=event.latlng;
		var coordsArray;
		var marker=L.marker([coords.lat, coords.lng], {
			icon: luxSqr,
			draggable: true
		});		
		marker.addTo(map);
	}
	/*	function mapClick(event){
		switch (editorState) {
			case "marker":
				addMarker(event);
			break;
			case "lineD":
				addLine(event);
				console.log('Clicked with Line Editor')
			break;
			case "circleD":
				
			break;
			case "areaD":
				
			break;
			case "sqrD":
				addSqr(event);
				console.log('Clicked with Square Editor')
			break;
			default:
				addMarker(event);
			break;
		}
	}*/
	function addingListeners(evName){
		removingListeners();
		map.addEventListener("click", evName);
	}
	function removingListeners(evName){
		map.removeEventListener("click", addMarker);
		map.removeEventListener("click", addLine);
		map.removeEventListener("click", addSqr);
	}
	addingListeners(addMarker);

	//Trying GeoJSON
	/*var geojsonFeature = {
		"type": "Feature",
		"properties": {
			"name": "Coors Field",
			"amenity": "Baseball Stadium",
			"popupContent": "This is where the Rockies play!"
		},
		"geometry": {
			"type": "Point",
			"coordinates": [-104.99404, 39.75621]
		}
	};
	L.geoJSON(geojsonFeature).addTo(map);*/
		//ZOOM IN CENTER map.fitBounds(polyline.getBounds());

	//Trying Controls
	/*var satellite = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFya21lZCIsImEiOiJjamxjOW5sMmwyaHlnM3FudGNyODZoZ2l4In0.JccJdeIlOEnkn9RPEYYu0w', {id: 'mapbox.satellite', attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a> Designed by <a href="https://github.com/MarkMed/">Mark-Med</a>'});
	var streets = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFya21lZCIsImEiOiJjamxjOW5sMmwyaHlnM3FudGNyODZoZ2l4In0.JccJdeIlOEnkn9RPEYYu0w', {id: 'mapbox.streets', attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a> Designed by <a href="https://github.com/MarkMed/">Mark-Med</a>'});
	var grayscale = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFya21lZCIsImEiOiJjamxjOW5sMmwyaHlnM3FudGNyODZoZ2l4In0.JccJdeIlOEnkn9RPEYYu0w', {id: 'mapbox.light', attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a> Designed by <a href="https://github.com/MarkMed/">Mark-Med</a>'});
	var baseMaps = {
		"Satellite": satellite,
		"Streets": streets,
		"<span id='id1' style='color: gray'>Grayscale</span>": grayscale
	};
	L.control.layers(baseMaps).addTo(map);*/

	//Trying Custom Controls
	var customControl =	L.Control.extend({

		options: {
			position: 'bottomright'
		},
		onAdd: function (map) {
			var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom centered-content');
			container.style.backgroundColor = 'white';
			container.title="GrayScale Map";
			container.innerHTML="<img src='Resources/graymap.png' width='30px' height='30px'/>";
			container.style.width = 'auto';
			container.style.height = 'auto';
			container.style.borderRadius="100%";
			container.style.overflow = 'hidden';
			container.style.cursor = 'pointer';
			container.addEventListener("click", ()=>{
				event.stopPropagation();
				L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFya21lZCIsImEiOiJjamxjOW5sMmwyaHlnM3FudGNyODZoZ2l4In0.JccJdeIlOEnkn9RPEYYu0w', {id: 'mapbox.light', attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a> Designed by <a href="https://github.com/MarkMed/">Mark-Med</a>'}).addTo(map);
			});
			container.addEventListener("dblclick", ()=>{
				event.stopPropagation();
			});
			return container;
		}
	});
	map.addControl(new customControl());
	customControl =	L.Control.extend({

		options: {
			position: 'bottomright'
		},
		onAdd: function (map) {
			var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom centered-content');
			container.style.backgroundColor = 'white';
			container.title="Satellite Map";
			container.innerHTML="<img src='Resources/satmap.png' width='30px' height='30px'/>";
			container.style.width = 'auto';
			container.style.height = 'auto';
			container.style.borderRadius="100%";
			container.style.overflow = 'hidden';
			container.style.cursor = 'pointer';
			container.addEventListener("click", ()=>{
				event.stopPropagation();
				L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFya21lZCIsImEiOiJjamxjOW5sMmwyaHlnM3FudGNyODZoZ2l4In0.JccJdeIlOEnkn9RPEYYu0w', {id: 'mapbox.satellite', attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a> Designed by <a href="https://github.com/MarkMed/">Mark-Med</a>'}).addTo(map);
			});
			container.addEventListener("dblclick", ()=>{
				event.stopPropagation();
			});
			return container;
		}
	});
	map.addControl(new customControl());
	customControl =	L.Control.extend({

		options: {
			position: 'bottomright'
		},
		onAdd: function (map) {
			var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom centered-content');
			container.style.backgroundColor = 'white';
			container.title="Normal Map";
			container.innerHTML="<img src='Resources/normmap.png' width='30px' height='30px'/>";
			container.style.width = 'auto';
			container.style.height = 'auto';
			container.style.borderRadius="100%";
			container.style.overflow = 'hidden';
			container.style.cursor = 'pointer';
			container.addEventListener("click", ()=>{
				event.stopPropagation();
				L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFya21lZCIsImEiOiJjamxjOW5sMmwyaHlnM3FudGNyODZoZ2l4In0.JccJdeIlOEnkn9RPEYYu0w', {id: 'mapbox.outdoors', attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a> Designed by <a href="https://github.com/MarkMed/">Mark-Med</a>'}).addTo(map);
			});
			container.addEventListener("dblclick", ()=>{
				event.stopPropagation();
			});
			return container;
		}
	});
	map.addControl(new customControl());
	///////////////// SE PUEDE MEJORAR? /////////////////
	customControl =	L.Control.extend({

		options: {
			position: 'topright'
		},
		onAdd: function (map) {
			var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom centered-content');
			container.style.backgroundColor = 'white';
			container.title="Line Draw";
			container.setAttribute("active", false);
			container.innerHTML="&#92/&#92";
			container.style.width = '30px';
			container.style.height = '30px';
			container.style.borderRadius="100%";
			container.style.overflow = 'hidden';
			container.style.cursor = 'pointer';
			container.addEventListener("click", ()=>{
				var actiB=container.getAttribute("active");
				if (actiB==="false"){
					container.setAttribute("active", true);
					addingListeners(addLine);
				}
				else{
					container.setAttribute("active", false);
					addingListeners(addMarker);
				}
				event.stopPropagation();
				console.log('Line Darwing Mode Activate');
				editorState="lineD";
			});
			container.addEventListener("dblclick", ()=>{
				event.stopPropagation();
			});
			return container;
		}
	});
	map.addControl(new customControl());
	customControl =	L.Control.extend({

		options: {
			position: 'topright'
		},
		onAdd: function (map) {
			var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom centered-content');
			container.style.backgroundColor = 'white';
			container.title="Circle Draw";
			container.innerHTML="&#9675";
			container.style.width = '30px';
			container.style.height = '30px';
			container.style.fontSize = '20px';
			container.style.borderRadius="100%";
			container.style.overflow = 'hidden';
			container.style.cursor = 'pointer';
			container.addEventListener("click", ()=>{
				event.stopPropagation();
				console.log('Circle Darwing Mode Activate');
			});
			container.addEventListener("dblclick", ()=>{
				event.stopPropagation();
			});
			container.addEventListener("mouseover", ()=>{
				container.innerHTML="&#9679";
			});
			container.addEventListener("mouseleave", ()=>{
				container.innerHTML="&#9675";
			});
			return container;
		}
	});
	map.addControl(new customControl());
	customControl =	L.Control.extend({

		options: {
			position: 'topright'
		},
		onAdd: function (map) {
			var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom centered-content');
			container.style.backgroundColor = 'white';
			container.title="Square Draw";
			container.innerHTML="&#9633";
			container.style.width = '30px';
			container.style.height = '30px';
			container.style.borderRadius="100%";
			container.style.overflow = 'hidden';
			container.style.cursor = 'pointer';
			container.style.fontSize = '20px';
			container.addEventListener("click", ()=>{
				event.stopPropagation();
				console.log('Sqr Darwing Mode Activate');
				editorState="sqrD";
			});
			container.addEventListener("dblclick", ()=>{
				event.stopPropagation();
			});
			container.addEventListener("mouseover", ()=>{
				container.innerHTML="&#9632";
			});
			container.addEventListener("mouseleave", ()=>{
				container.innerHTML="&#9633";
			});
			return container;
		}
	});
	map.addControl(new customControl());
	customControl =	L.Control.extend({

		options: {
			position: 'topright'
		},
		onAdd: function (map) {
			var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom centered-content');
			container.style.backgroundColor = 'white';
			container.title="Area Draw";
			container.setAttribute("active", false);
			container.innerHTML="&#9649";
			container.style.width = '30px';
			container.style.height = '30px';
			container.style.borderRadius="100%";
			container.style.overflow = 'hidden';
			container.style.cursor = 'pointer';
			container.addEventListener("click", ()=>{
				var actiB=container.getAttribute("active");
				if (actiB==="false"){
					container.setAttribute("active", true);
					addingListeners(addSqr);
				}
				else{
					container.setAttribute("active", false);
					addingListeners(addMarker);
				}
				event.stopPropagation();
				editorState="sqrD";
				event.stopPropagation();
				console.log('Area Darwing Mode Activate');
			});
			container.addEventListener("dblclick", ()=>{
				event.stopPropagation();
			});
			container.addEventListener("mouseover", ()=>{
				container.innerHTML="&#9648";
			});
			container.addEventListener("mouseleave", ()=>{
				container.innerHTML="&#9649";
			});
			return container;
		}
	});
	map.addControl(new customControl());

});