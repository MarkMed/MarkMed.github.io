var globalVar;
window.addEventListener("load", () => {
	var map = L.map('mapid').setView([-34.83634999076386, -56.165848], 12);
	/*L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFya21lZCIsImEiOiJjamxjOW5sMmwyaHlnM3FudGNyODZoZ2l4In0.JccJdeIlOEnkn9RPEYYu0w', {
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a> Designed by <a href="https://github.com/MarkMed/">Mark-Med</a>',
		maxZoom: 20,
		id: 'mapbox.outdoors',
		accessToken: 'pk.eyJ1IjoibWFya21lZCIsImEiOiJjamxjOW5sMmwyaHlnM3FudGNyODZoZ2l4In0.JccJdeIlOEnkn9RPEYYu0w'
	}).addTo(map);*/

	L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
	//	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> Designed by <a href="https://github.com/MarkMed/">Mark-Med</a>',
		maxZoom: 20
		//id: 'mapbox.outdoors',
		//accessToken: 'pk.eyJ1IjoibWFya21lZCIsImEiOiJjamxjOW5sMmwyaHlnM3FudGNyODZoZ2l4In0.JccJdeIlOEnkn9RPEYYu0w'
	}).addTo(map);

	var mapsProviders=[
		{
			name: 'OpenStreetMap Normal',
			url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
			img: 'Resources/providersImgs/openstrtNormal.png'

		},
		{
			name: 'OpenStreetMap Gray',
			url: 'http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png',
			img: 'Resources/providersImgs/openstrtGray.png'

		},
		{
			name: 'Esri.WorldStreetMap',
			url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
			img: 'Resources/providersImgs/EsriWorldStreetMap.png'

		},
		{
			name: 'Esri.WorldImagery',
			url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
			img: 'Resources/providersImgs/EsriWorldSatelliteMap.png'

		},
		{
			name: 'Esri.NatGeoWorldMap',
			url: 'https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}',
			img: 'Resources/providersImgs/natgeo.png'

		}

	];

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
	var luxSqr=L.icon({
		iconUrl: "Resources/sqr.svg",
		iconSize: [10, 10],
		iconAnchor: [5, 5]

	});
	var luxCircle=L.icon({
		iconUrl: "Resources/circle.svg",
		iconSize: [13, 13],
		iconAnchor: [6.5, 6.5]

	});
	var luxArea=L.icon({
		iconUrl: "Resources/area.svg",
		iconSize: [14, 11],
		iconAnchor: [7, 5.5]

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
		});
		function fixData(){
			setTimeout(()=>{
				marker.bindPopup("<h3>"+((!!markers[marker.id])?(markers[marker.id].title):("<i>Not save marker</i>"))+"</h3><p>Here would be some info about location</p><p><i>Perhaps some meta info</i> and a <a href='google'>link</a></p><p>This represents fixed data added to the marker</p>");
			},10);
		}
		marker.addTo(map);

		//Dragging
		marker.addEventListener("dragstart", ()=>{
			marker.removeEventListener("popupclose", fixData);
		});
		marker.addEventListener("drag", ()=>{
			marker.bindPopup("<p>Lat: "+marker.getLatLng().lat+"</p><p>Long: "+marker.getLatLng().lng+"</p>").openPopup();
		});
		//End dragging
		marker.addEventListener("dragend", ()=>{
			marker.bindPopup("<h3>Moved</h3><p>I have been moved</p><p>Now, I am in Lat: "+marker.getLatLng().lat+" and Long.: "+marker.getLatLng().lng+"</p>");
			marker.addEventListener("popupclose", fixData);
			
		});
		marker.addEventListener("dblclick", ()=>{
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
			renameBtn.setAttribute("class", "luxBtn");
			if(!!markers[marker.id]){
				renameBtn.innerHTML="Rename Mark";
			}
			else{				
				renameBtn.innerHTML="Regist Mark";
			}
			renameBtn.addEventListener("click", ()=>{				
				if(!!markers[marker.id]){
					
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
					renameBtn.setAttribute("style", "border: none; background: transparent; font-size: 12px; color:rgba(255, 254, 219, 1); cursor: initial;");
					cancelBtn.addEventListener("click", ()=>{
						resertForm(true)
					});
					confirmBtn.addEventListener("click", ()=>{
						markers[marker.id].title=inputForm.value;
						resertForm(true);
						insertElements();
					});
				}
				else{		
					rename.innerHTML="<h4>Regist Marker</h4><p>Enter a name for this marker:</p><input class='inputTxt' type='text' placeholder='e.g: Las Vegas Hotel'></input>"
					var regBtn=document.createElement("button");
					regBtn.innerHTML="Save Marker";
					regBtn.setAttribute("class", "luxBtn");
					regBtn.addEventListener("click", (event)=>{
						marker.addEventListener("popupclose", fixData);
						title=event.target.parentElement.childNodes[2].value;
						saveMarker();
						resertForm(false);
						renameBtn.setAttribute("style", "border: none; background: transparent; font-size: 12px; color:rgba(255, 254, 219, 1);");
						renameBtn.innerHTML="Marker successfully saved!";
						insertElements();
						setTimeout(()=>{
							marker.closePopup();
						},500);
					});
					rename.appendChild(regBtn);
					rename.style.margin="40px 0px";
				}
				function resertForm(boolVal){
					rename.innerHTML="";
					if(boolVal){
						renameBtn.setAttribute("style", "");
					}
					rename.appendChild(renameBtn);
					rename.style.margin="0";
				}
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
			marker.addEventListener("popupclose", fixData);
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
	//AddLine
	var coordsArray=[];
	var lines=[0];
	var polylines;
	function addLine(event){
		var coords=event.latlng;		
		var newCoord=[coords.lat, coords.lng];
		coordsArray[coordsArray.length-1].push(newCoord);

		var marker=L.marker(newCoord, {
			icon: luxCircle,
			draggable: true
		});		
		marker.addTo(map);
		marker.id=coordsArray[coordsArray.length-1].length-1;
		drawPoli();

		marker.addEventListener("click", ()=>{
			alert(marker.id);
		});
		marker.addEventListener("drag", ()=>{		
			coordsArray[coordsArray.length-1][marker.id]=[marker.getLatLng().lat, marker.getLatLng().lng];
			drawPoli();
		});
		/*marker.addEventListener("contextmenu", ()=>{
			function insertElements(){
				parentHTML.appendChild(removeBtn);
			};
			//Parent
			var parentHTML=document.createElement("div");
			//Buttons
			/////////////////////////////////
			var removeBtn=document.createElement("button");
			removeBtn.innerHTML="Remove Marker";
			removeBtn.setAttribute("class", "luxBtn");
			removeBtn.addEventListener("click", ()=>{
				console.log(coordsArray[coordsArray.length-1]);
				coordsArray[coordsArray.length-1].splice(coordsArray[coordsArray.length-1][marker.id], 1);
				marker.remove();
				drawPoli();
			});
			/////////////////////////////////
			insertElements();
			
			//PopUp
			marker.bindPopup(parentHTML).openPopup();
			//marker.addEventListener("popupclose", fixData);
		});*/
		function drawPoli(){
			var polyline = L.polyline(coordsArray[coordsArray.length-1], {
				color: "rgba(243, 200, 96, 1)",
				weight: 3,
				opacity: 1
			});
			polylines.push(polyline);//Registra en el array
			if(polylines.length>2){//Elimina 1er lugar
				polylines.splice(0, 1);
				polylines[0].remove();//Elimina del mapa
				polylines[1].addTo(map);//Agrega al mapa
			}


			polyline.addEventListener("contextmenu", ()=>{
				polyline.remove();
			});
		}
	}
	//AddCircle
	function addCircle(event){
		var coords=event.latlng;		
		var newCoord=[coords.lat, coords.lng];

		function getDistance(origin, destination) {
			// return distance in meters
			var lon1 = toRadian(origin[1]),
			lat1 = toRadian(origin[0]),
			lon2 = toRadian(destination[1]),
			lat2 = toRadian(destination[0]);

			var deltaLat = lat2 - lat1;
			var deltaLon = lon2 - lon1;

			var a = Math.pow(Math.sin(deltaLat/2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(deltaLon/2), 2);
			var c = 2 * Math.asin(Math.sqrt(a));
			var EARTH_RADIUS = 6371;
			return c * EARTH_RADIUS * 1000;
			function toRadian(value) {
				return value*Math.PI/180;
			}
		}//Thx StackOverflow \^u^/
		var center=L.marker(newCoord, {
			icon: luxCircle,
			draggable: true
		});		
		center.addTo(map);

		var initialDist=getDistance(newCoord, [coords.lat+0.2, coords.lng]);
		var zoomValuePlus=Math.pow(2, -(map.getZoom()))*150;
		var coord2=[coords.lat, coords.lng+zoomValuePlus];
		var finalDist=getDistance(newCoord, coord2);
		var radMarker=L.marker(coord2, {
			icon: luxCircle,
			draggable: true
		});		
		radMarker.addTo(map);
		var circle=L.circle(newCoord, {
			color: 'rgba(243, 200, 96, 1)',
			fillColor: 'rgba(30, 54, 65, 0.7)',
			fillOpacity: 0.5,
			radius: finalDist
		}).addTo(map);/**/
		function radiusChange(){
			circle.setRadius(getDistance([center.getLatLng().lat, center.getLatLng().lng], [radMarker.getLatLng().lat, radMarker.getLatLng().lng]));
		}
		radMarker.addEventListener("drag", ()=>{
			radiusChange();
		});
		var centerFixCoords;
		var radFixCoords;
		center.addEventListener("dragstart", ()=>{
			centerFixCoords=[center.getLatLng().lat, center.getLatLng().lng];
			radFixCoords=[radMarker.getLatLng().lat, radMarker.getLatLng().lng];
		});
		center.addEventListener("drag", ()=>{
			circle.setLatLng([center.getLatLng().lat, center.getLatLng().lng]);
			radMarker.setLatLng([(radFixCoords[0]+(center.getLatLng().lat-centerFixCoords[0])), (radFixCoords[1]+(center.getLatLng().lng-centerFixCoords[1]))]);
		});
		center.addEventListener("contextmenu", ()=>{
			function insertElements(){
				parentHTML.appendChild(removeBtn);
			};
			//Parent
			var parentHTML=document.createElement("div");
			//Buttons
			/////////////////////////////////
			var removeBtn=document.createElement("button");
			removeBtn.innerHTML="Remove Circle";
			removeBtn.setAttribute("class", "luxBtn");
			removeBtn.addEventListener("click", ()=>{
				center.remove();
				radMarker.remove();
				circle.remove();
			});
			/////////////////////////////////
			insertElements();
			
			//PopUp
			center.bindPopup(parentHTML).openPopup();
		});
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
	//Add Circle
	function addArea(event){
		var coords=event.latlng;
		var coordsArray;
		var marker=L.marker([coords.lat, coords.lng], {
			icon: luxArea,
			draggable: true
		});		
		marker.addTo(map);
	}
	function addingListeners(evName){
		removingListeners();
		map.addEventListener("click", evName);
	}
	function removingListeners(evName){
		map.removeEventListener("click", addMarker);
		map.removeEventListener("click", addLine);
		map.removeEventListener("click", addCircle);
		map.removeEventListener("click", addSqr);
		map.removeEventListener("click", addArea);
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
					disableStyle(event);
					var newArray=[];
					coordsArray.push(newArray);
					var newline=[0];
					lines.push(newline);
					polylines=lines[lines.length-1];

				}
				else{
					container.setAttribute("active", false);
					addingListeners(addMarker);
					container.style.opacity = '';
				}
				event.stopPropagation();
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
			container.setAttribute("active", false);
			container.innerHTML="&#9675";
			container.style.width = '30px';
			container.style.height = '30px';
			container.style.fontSize = '20px';
			container.style.borderRadius="100%";
			container.style.overflow = 'hidden';
			container.style.cursor = 'pointer';
			container.addEventListener("click", ()=>{
				var actiB=container.getAttribute("active");
				if (actiB==="false"){
					container.setAttribute("active", true);
					addingListeners(addCircle);
					disableStyle(event);
				}
				else{
					container.setAttribute("active", false);
					addingListeners(addMarker);
					container.style.opacity = '';
				}
				event.stopPropagation();
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
			container.setAttribute("active", false);
			container.innerHTML="&#9633";
			container.style.width = '30px';
			container.style.height = '30px';
			container.style.borderRadius="100%";
			container.style.overflow = 'hidden';
			container.style.cursor = 'pointer';
			container.style.fontSize = '20px';
			container.addEventListener("click", ()=>{
				var actiB=container.getAttribute("active");
				if (actiB==="false"){
					container.setAttribute("active", true);
					addingListeners(addSqr);
					disableStyle(event);
				}
				else{
					container.setAttribute("active", false);
					addingListeners(addMarker);
					container.style.opacity = '';
				}
				event.stopPropagation();
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
					addingListeners(addArea);
					disableStyle(event);
				}
				else{
					container.setAttribute("active", false);
					addingListeners(addMarker);
					container.style.opacity = '';
				}
				event.stopPropagation();
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

	customControl =	L.Control.extend({

		options: {
			position: 'bottomleft'
		},
		onAdd: function (map) {
			var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom centered-content');
			container.style.backgroundColor = 'white';
			container.title="Change Provider";
			container.innerHTML="Map Providers";
			container.style.width = '100px';
			container.style.height = '30px';
			container.style.transition = '0.6s';
			container.style.borderRadius="50px";
			container.style.overflow = 'hidden';
			container.style.cursor = 'pointer';
			var counter=0;
			container.addEventListener("click", ()=>{
				counter++
				if(counter===1){

					container.style.width = '400px';
					container.style.height = '210px';
					var providers=document.createElement("div");//List
					providers.setAttribute("style", "width: 100%; height: 70%; margin-top: 10px; overflow-x: scroll; overflow-y: hidden; display: flex; justify-content: flex-start; flex-direction: row; align-items: center;");
					for(var i=0; i<mapsProviders.length; i++){
						var provider=document.createElement("div");//Item
						provider.setAttribute("style", "width: 100px; height: 100%; margin: 0px 10px; display: flex; justify-content: space-around; flex-direction: column; align-items: center;");
						var providerName=document.createElement("p");
						providerName.innerHTML=mapsProviders[i].name;
						var providerImg=document.createElement("img");
						providerImg.setAttribute("src", mapsProviders[i].img);
						providerImg.setAttribute("style", "width: 90px; height: 90px; margin: 0px 10px; background-color:blue; border-radius: 100%");
						providerImg.setAttribute("providerUrl", mapsProviders[i].url);

						provider.appendChild(providerImg);
						provider.appendChild(providerName);
						providers.appendChild(provider);
						provider.addEventListener("click", ()=>{
							console.log(providerImg.getAttribute("providerUrl"));
							/*L.tileLayer(providerImg.getAttribute("providerUrl"), {
								maxZoom: 20
							}).addTo(map);*/
						});
					}

					container.appendChild(providers);

				}
				event.stopPropagation();
			});
		/*	container.addEventListener("mouseleave", ()=>{
				setTimeout(()=>{
					container.style.width = '100px';
					container.style.height = '30px';
					setTimeout(()=>{
						container.innerHTML="Map Providers";
					},200);
				},800);
				counter=0;
			});
			container.addEventListener("dblclick", ()=>{
				event.stopPropagation();
			});*/
			return container;
		}
	});
	map.addControl(new customControl());

	function disableStyle(event){
		var currentElement=event.target;
		var allElements=currentElement.parentElement.childNodes;
		for(var i=0; i<allElements.length; i++){
			allElements[i].style.opacity = '';
		}
		currentElement.style.opacity = '1';
	}
});