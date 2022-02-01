var globalVar;
window.addEventListener("load", () => {
	var map = L.map('mapid').setView([-34.83634999076386, -56.165848], 12);
	var originalLayer=L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFya21lZCIsImEiOiJjamxjOW5sMmwyaHlnM3FudGNyODZoZ2l4In0.JccJdeIlOEnkn9RPEYYu0w', {
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a> Designed by <a href="https://github.com/MarkMed/">Mark-Med</a>',
		maxZoom: 20,
		id: 'mapbox.outdoors',
		accessToken: 'pk.eyJ1IjoibWFya21lZCIsImEiOiJjamxjOW5sMmwyaHlnM3FudGNyODZoZ2l4In0.JccJdeIlOEnkn9RPEYYu0w'
	});
	originalLayer.addTo(map);/**/

	/*L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
	//	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> Designed by <a href="https://github.com/MarkMed/">Mark-Med</a>',
		maxZoom: 20
		//id: 'mapbox.outdoors',
		//accessToken: 'pk.eyJ1IjoibWFya21lZCIsImEiOiJjamxjOW5sMmwyaHlnM3FudGNyODZoZ2l4In0.JccJdeIlOEnkn9RPEYYu0w'
	}).addTo(map);*/

	var mapsProviders=[
		{
			name: 'OpenStreetMap Normal',
			id: 0,
			img: 'Resources/providersImgs/openstrtNormal.png',
			tLayer: L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
				maxZoom: 20
			})

		},
		{
			name: 'OpenStreetMap Gray',
			id: 1,
			img: 'Resources/providersImgs/openstrtGray.png',
			tLayer: L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
				maxZoom: 20
			})

		},
		{
			name: 'Esri.WorldStreetMap',
			id: 2,
			img: 'Resources/providersImgs/EsriWorldStreetMap.png',
			tLayer: L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
				maxZoom: 20
			})

		},
		{
			name: 'Esri.WorldImagery',
			id: 3,
			img: 'Resources/providersImgs/EsriWorldSatelliteMap.png',
			tLayer: L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
				maxZoom: 20
			})

		},
		{
			name: 'Esri.NatGeoWorldMap',
			id: 4,
			img: 'Resources/providersImgs/natgeo.png',
			tLayer: L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}', {
				maxZoom: 20
			})

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
		iconSize: [14, 14],
		iconAnchor: [7, 7]

	});
	var luxCircle=L.icon({
		iconUrl: "Resources/circle.svg",
		iconSize: [16, 16],
		iconAnchor: [8, 8]

	});
	var luxArea=L.icon({
		iconUrl: "Resources/area.svg",
		iconSize: [16, 14],
		iconAnchor: [8, 7]

	});

	/*//Marker w/ infoPop
	addMarker({latlng:{lat: -34.918113,lng: -56.165848}});

	//Circle
	L.circle([-34.879042, -56.078175], {
		color: 'rgba(243, 200, 96, 1)',
		fillColor: 'rgba(30, 54, 65, 1)',
		fillOpacity: 0.5,
		radius: 190
	}).addTo(map);*/

	//Polygon
	/*var latlngs = [
		[ // first polygon
		  [-34.91141405267056, -56.16599321365357],[-34.91977177657637, -56.16571426391602],[-34.91924394550579, -56.16824626922608], [-34.917766000448786, -56.1691689491272], [-34.91558422339099, -56.169383525848396], [-34.91458129028733, -56.170413494110115], [-34.911651599730504, -56.169126033782966]
		]
	];
	var polygon = L.polygon(latlngs, {color: 'blue'});
	polygon.addTo(map)
	globalVar=polygon;*/
	 
	//Add Marker
	function addMarker(event){
		var title="";
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
			parentHTML.style.width="100%";
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
		parentDiv.style.width="100%"
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
	var newLineCoords;
	var polyline;
	function addLine(event){
		var coords=event.latlng;
		var newCoord=[coords.lat, coords.lng];
		newLineCoords.push(newCoord);
		var marker=L.marker(newCoord, {
			icon: luxCircle,
			draggable: true
		});		
		marker.addTo(map);
		if(newLineCoords.length<2){
			drawLine();
		}
		else{
			polyline.addLatLng(newCoord);
		}
		function drawLine(){
			polyline=L.polyline([[coords.lat, coords.lng]], {
				color: "rgba(243, 200, 96, 1)",
				weight: 3,
				opacity: 1
			});
			polyline.addTo(map)
		}
		var markerIndex;
		var lineCoords;
		marker.addEventListener("dragstart", ()=>{
			lineCoords=polyline.getLatLngs();//Obtiene la lista de coords de la linea
			
			markerIndex=lineCoords.map(toStringCoords).indexOf(marker.getLatLng().toString());//Pasa c/ coordenada a string para comparar

			function toStringCoords(val) {
				return val.toString();
			}
		});
		marker.addEventListener("drag", ()=>{
			lineCoords.splice(markerIndex, 1, marker.getLatLng());
			polyline.setLatLngs(lineCoords);
		});
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

		var zoomValuePlus=Math.pow(2, -(map.getZoom()))*150;//Calculate the value thst will be added in the new coord watching the zoom state
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
			parentHTML.innerHTML="<h3 class='mainPopTitle'>Options</h3>";
			parentHTML.style.width="100%";
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
		center.addEventListener("click", ()=>{
			center.bindPopup("<p>Coordinates:<br/>["+center.getLatLng().lat+", "+center.getLatLng().lng+"]</p><p>Radio: "+finalDist+"</p>");
		});
	}
	//Add Square
	function addSqr(event){
		var coords=event.latlng;
		var zoomValuePlus=Math.pow(2, -(map.getZoom()))*100;//Calculate the value thst will be added in the new coord watching the zoom state
		var markerA=L.marker([coords.lat, coords.lng], {
			icon: luxSqr,
			draggable: true
		});		
		markerA.addTo(map);
		var markerB=L.marker([coords.lat+zoomValuePlus, coords.lng], {
			icon: luxSqr,
			draggable: true
		});		
		markerB.addTo(map);
		var markerC=L.marker([coords.lat+zoomValuePlus, coords.lng+zoomValuePlus], {
			icon: luxSqr,
			draggable: true
		});		
		markerC.addTo(map);
		var markerD=L.marker([coords.lat, coords.lng+zoomValuePlus], {
			icon: luxSqr,
			draggable: true
		});		
		markerD.addTo(map);
		
		var sqr=L.polygon([
			[markerA.getLatLng().lat, markerA.getLatLng().lng],
			[markerB.getLatLng().lat, markerB.getLatLng().lng],
			[markerC.getLatLng().lat, markerC.getLatLng().lng],
			[markerD.getLatLng().lat, markerD.getLatLng().lng]
		], 
			{
			color: 'rgba(243, 200, 96, 1)',
			fillColor: 'rgba(30, 54, 65, 0.7)',
			fillOpacity: 0.5
		}).addTo(map);

		var sqrMarkers=[markerA, markerB, markerC, markerD];
		for(var i=0; i<sqrMarkers.length; i++){
			sqrMarkers[i].addEventListener("drag", ()=>{
				sqr.setLatLngs([
					[markerA.getLatLng().lat, markerA.getLatLng().lng],
					[markerB.getLatLng().lat, markerB.getLatLng().lng],
					[markerC.getLatLng().lat, markerC.getLatLng().lng],
					[markerD.getLatLng().lat, markerD.getLatLng().lng]
				]);
			});
		}
		
		sqr.addEventListener("contextmenu", ()=>{
			function insertElements(){
				parentHTML.appendChild(removeBtn);
			};
			//Parent
			var parentHTML=document.createElement("div");
			parentHTML.innerHTML="<h3 class='mainPopTitle'>Options</h3>";
			parentHTML.style.width="100%";
			//Buttons
			/////////////////////////////////
			var removeBtn=document.createElement("button");
			removeBtn.innerHTML="Remove Square";
			removeBtn.setAttribute("class", "luxBtn");
			removeBtn.addEventListener("click", ()=>{
				for(var i=0; i<sqrMarkers.length; i++){
					sqrMarkers[i].remove();
				}
				sqr.remove();
			});
			/////////////////////////////////
			insertElements();
			
			//PopUp
			sqr.bindPopup(parentHTML).openPopup();
		});
	}
	//AddArea
	var poly;
	var polyMarkers=[];
	function addArea(event){
		var coords=event.latlng;
		var marker=L.marker([coords.lat, coords.lng], {
			icon: luxArea,
			draggable: false
		});		
		marker.addTo(map);
		var polyArray=poly.getLatLngs();
		if(polyArray[0].length===0){
			poly.setLatLngs([[marker.getLatLng().lat, marker.getLatLng().lng]]);
			poly.addTo(map);
		}
		else{
			var newCoord2BAded=poly.getLatLngs()[0];
			newCoord2BAded.push([marker.getLatLng().lat, marker.getLatLng().lng]);
			poly.setLatLngs(newCoord2BAded);			
		}
		polyMarkers.push(marker);
		marker.addEventListener("contextmenu", ()=>{
			function insertElements(){
				parentHTML.appendChild(removeMark);
				parentHTML.appendChild(removePoly);
			};
			//Parent
			var parentHTML=document.createElement("div");
			parentHTML.innerHTML="<h3 class='mainPopTitle'>Options</h3>";
			parentHTML.style.width="100%";
			//Buttons
			/////////////////////////////////
			var removePoly=document.createElement("button");
			removePoly.innerHTML="Remove Polygon";
			removePoly.setAttribute("class", "luxBtn");
			removePoly.addEventListener("click", ()=>{
				poly.remove();
				for(var i=0; i<polyMarkers.length; i++){
					polyMarkers[i].remove();
				}
			});
			/////////////////////////////////
			var removeMark=document.createElement("button");
			removeMark.innerHTML="Remove Marker";
			removeMark.setAttribute("class", "luxBtn");
			removeMark.addEventListener("click", ()=>{
				marker.remove();
			});
			/////////////////////////////////
			insertElements();
			
			//PopUp
			marker.bindPopup(parentHTML).openPopup();
		});
	}

	function addingListeners(evName){
		removingListeners();
		map.addEventListener("click", evName);
	}
	function removingListeners(){
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
	var mapViews=[L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFya21lZCIsImEiOiJjamxjOW5sMmwyaHlnM3FudGNyODZoZ2l4In0.JccJdeIlOEnkn9RPEYYu0w', {id: 'mapbox.light', attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a> Designed by <a href="https://github.com/MarkMed/">Mark-Med</a>'}),

	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFya21lZCIsImEiOiJjamxjOW5sMmwyaHlnM3FudGNyODZoZ2l4In0.JccJdeIlOEnkn9RPEYYu0w', {id: 'mapbox.satellite', attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a> Designed by <a href="https://github.com/MarkMed/">Mark-Med</a>'}),

	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFya21lZCIsImEiOiJjamxjOW5sMmwyaHlnM3FudGNyODZoZ2l4In0.JccJdeIlOEnkn9RPEYYu0w', {id: 'mapbox.outdoors', attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a> Designed by <a href="https://github.com/MarkMed/">Mark-Med</a>'})]

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
				for(var i=0; i<mapViews.length; i++){
					map.removeLayer(mapViews[i]);
				}
				originalLayer.removeFrom(map);
				for(var i=0; i<mapsProviders.length; i++){
					map.removeLayer(mapsProviders[i].tLayer);
				}
				mapViews[0].addTo(map);
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
				for(var i=0; i<mapViews.length; i++){
					map.removeLayer(mapViews[i]);
				}
				originalLayer.removeFrom(map);
				for(var i=0; i<mapsProviders.length; i++){
					map.removeLayer(mapsProviders[i].tLayer);
				}
				mapViews[1].addTo(map);
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
				for(var i=0; i<mapViews.length; i++){
					map.removeLayer(mapViews[i]);
				}
				originalLayer.removeFrom(map);
				for(var i=0; i<mapsProviders.length; i++){
					map.removeLayer(mapsProviders[i].tLayer);
				}
				mapViews[2].addTo(map);
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
				/*	var newArray=[];
					coordsArray.push(newArray);
					var newline=[0];
					lines.push(newline);
					polylines=lines[lines.length-1];*/
					newLineCoords=[];//Here will save the coords of the line

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
					poly=L.polygon([[]], {
						color: 'rgba(243, 200, 96, 1)',
						fillColor: 'rgba(30, 54, 65, 0.7)',
						fillOpacity: 0.5,
						weight: 2
					});
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
						provider.setAttribute("providerId", mapsProviders[i].id);

						provider.appendChild(providerImg);
						provider.appendChild(providerName);
						providers.appendChild(provider);
						provider.addEventListener("click", (ev)=>{
							
							originalLayer.removeFrom(map);
							for(var i=0; i<mapViews.length; i++){
								map.removeLayer(mapViews[i]);
							}
							for(var i=0; i<ev.target.parentElement.parentElement.children.length; i++){
								map.removeLayer(mapsProviders[i].tLayer);
							}
							(mapsProviders[ev.target.parentElement.getAttribute("providerId")].tLayer).addTo(map);
						});
					}

					container.appendChild(providers);

				}
				event.stopPropagation();
			});
			container.addEventListener("mouseleave", ()=>{
				setTimeout(()=>{
					container.style.width = '100px';
					container.style.height = '30px';
					setTimeout(()=>{
						container.innerHTML="Map Providers";
						counter=0;
					},200);
				},600);
			});
			container.addEventListener("dblclick", ()=>{
				event.stopPropagation();
			});
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

	(document.getElementsByClassName("luxFX")[0]).addEventListener("click", ()=>{
		map.eachLayer(function (layer) {
			map.removeLayer(layer);
		});
		originalLayer.addTo(map);
	});
	(document.getElementsByClassName("luxFX")[1]).addEventListener("click", ()=>{
		///////////////////////////////////////////////////////		
		function addMMarker(autoCoords, autoTitle, popUpContent){
			var title=autoTitle;
			var coords=autoCoords.latlng;
			var marker=L.marker([coords.lat, coords.lng], {
				icon: luxMark,
				draggable: false,
			});
			marker.bindPopup("<h3>"+autoTitle+"</h3>"+((!!popUpContent)?(popUpContent):("<p>Here would be some info about location</p><p><i>Perhaps some meta info</i> and a <a href='google'>link</a></p><p>This represents fixed data added to the marker</p>"))+"");
			marker.addTo(map);
	
			
			marker.addEventListener("dblclick", (ev)=>{
				ev.preventDefault();
			});
	
			function saveMarker(){
				if(title===""){
					title="Unassigned Name";
				}
				var newMark=new mark(markers.length, title, marker);
				marker.id=markers.length;
				markers.push(newMark);
				markers[marker.id].markObj.options.title=title;
			}
			saveMarker();			
		}
		addMMarker({latlng:{lat: -34.918113,lng: -56.165848}}, "Fac. Ing. Marcos", "<p>La <a href='https://www.fing.edu.uy' target='_blank'>Facultad de Ingeniería de la UdelaR</a>.<br/>Acá sí o sí Marcos (a.k.a. Lolo/Ange) tiene que venir a estudiar.</p><p>Tanto como para él como para su trabajo es importante que curse la FIng.</p><p>Queda lejos (al igual que el trabajo de su padre), pero viviendo más en el centro de Montevideo mojara la posibilidad de asistir a clases. Regresando rápido a la casa, tomando solo un ómnibus o dos como máximo.</p>");
		addMMarker({latlng:{lat: -34.861742833174596,lng: -56.169002652168274}}, "Inst. Sup. Lean", "<p><a href='https://www.linkedin.com/school/arias-balparda/' target='_blank'>Instituto Tecnológico Superior</a>.<br/>Acá de seguro Leandro (a.k.a: Tochy/Lean) podrá seguir su carrera ya que se dictan los cursos que a él le interesa.</p><p>Al vivir en los alrededores, Leandro tiene la gran ventaja de que le queda cerca el estudio. Simplemente sería tomarse un ómnibus o dos como mucho.</p><p>Dentro del area donde a los tres nos queda mejor, el estudio de Leandro es el más cercano a la casa.</p>");
		addMMarker({latlng:{lat: -34.87849394341864,lng: -56.078854948282256}}, "GX. Labs. Marcos", "<p><a href='https://www.genexus.com/en/global' target='_blank'>GeneXus</a> Laboratories.<br/>El trabajo de Marcos.</p><p>Lamentablemente queda muy lejos y se sale del rango de a donde los tres nos queda mejor vivir.</p><p>Sin embargo, al mudarse más al centro de Montevideo, las posibilidades mejoran (se ahorra más dinero y tiempo).</p><p>Sería dos ómnibus como máximo, y gastando un boleto.</p>");
		addMMarker({latlng:{lat: -34.81821845936467,lng: -56.19750916957856}}, "Radesca Miguel", "<p>Talleres de Baterías <a href='https://radesca.com' target='_blank'>Radesca</a>.<br/>Donde trabaja Miguel (a.k.a: Babita/Papá).</p><p>La ventaja que viviendo más al centro tiene a las oficinas de Radesca cerca y clientes cerca (<a href='http://pm1.narvii.com/6322/74a7f8ff4a08667be19b72214cb558af8d610704_00.jpg' target='_blank'>Pontevedra</a> por ejemplo).</p><p>Dependiendo donde vivamos, podría dejar a Leandro en su estudio, o nos podría arrimar a la parada también.</p><p>Al igual que el estudio de Marcos, el trabajo de papá queda en los limites del área donde podríamos vivir.</p>");
		///////////////////////////////////////////////////////
		var center=L.marker([-34.863, -56.16022109985352], {
			icon: luxCircle
		});		
		center.addTo(map);
		center.addEventListener("click", ()=>{
			center.bindPopup("<h4>Punto perfecto para vivir!</h4><p>Las areas de alrededor serían las zonas donde más nos conviene a los tres.</p><p>El círculo de más afuera es el menos conveniente. Viviendo en alguna zona del circula más externo beneficia a uno pero es contraproducente para otro.</p><p>Sin embargo, viviendo más al centro o viviendo en algunas de los círculos más internos, nos beneficiamos los tres!</p><p><i>La circunferencia es para hallar el centro y de ahí ver qué zona nos beneficia.</i></p>");
		});
		function addConcentricCircle( borderColor, colorVar, radiusVar){			
			L.circle([center.getLatLng().lat, center.getLatLng().lng], {
				color: borderColor,
				fillColor: colorVar,
				fillOpacity: 0.5,
				radius: radiusVar
			}).addTo(map);
		}
		addConcentricCircle("rgba(243, 200, 96, 0)", 'rgba(30, 54, 75, 0.7)', 800);
		addConcentricCircle("rgba(243, 200, 96, 0)",'rgba(30, 54, 75, 0.7)', 1600);
		addConcentricCircle("rgba(243, 200, 96, 0)", 'rgba(30, 54, 75, 0.7)', 2800);
		addConcentricCircle("rgba(243, 200, 96, 1)", 'rgba(30, 54, 75, 0)', 6100);
    });
    
	(document.getElementsByClassName("luxFX")[2]).addEventListener("click", ()=>{
		///////////////////////////////////////////////////////		
		function addMMarker(autoCoords, autoTitle, popUpContent){
			var title=autoTitle;
			var coords=autoCoords.latlng;
			var marker=L.marker([coords.lat, coords.lng], {
				icon: luxMark,
				draggable: false,
			});
			marker.bindPopup("<h3>"+autoTitle+"</h3>"+((!!popUpContent)?(popUpContent):("<p>Here would be some info about location</p><p><i>Perhaps some meta info</i> and a <a href='google'>link</a></p><p>This represents fixed data added to the marker</p>"))+"");
			marker.addTo(map);
	
			
			marker.addEventListener("dblclick", (ev)=>{
				ev.preventDefault();
			});
	
			function saveMarker(){
				if(title===""){
					title="Unassigned Name";
				}
				var newMark=new mark(markers.length, title, marker);
				marker.id=markers.length;
				markers.push(newMark);
				markers[marker.id].markObj.options.title=title;
			}
			saveMarker();			
		}
        function errorHandle(errorParam){
            console.error(errorHandle);
        }
        function returnPosition({coords}){
            addMMarker({latlng:{lat: coords.latitude, lng: coords.longitude}}, "Your actual position", "<p>Press again <i>Locate Me</i> to refresh your location</p>");
        }
        function locateMe(){
          if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(returnPosition, errorHandle);
          }
          else {
            console.error("This browser does not support Geolocation API")
          }
        }
        locateMe()

    });
});