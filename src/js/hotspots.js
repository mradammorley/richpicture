	
	function resizeHotspotsContainer() {
		//set the element to the sizes calculated
		$(".richpicture__frame__hotspots").width(currentInnerWidth).height(currentInnerHeight);

	};

	function createHotspots() {
		//loop through hotspots which are config using json in config.js
		for (hscount=0; hscount<numHotspots; hscount++) {
			//add the svg shape of the hotspot
	     	$(".richpicture__frame__hotspots").append('<svg id="hotspots_layer" data-name="hotspots" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5760 3240">' + hotspotData[hscount].svg + '</svg>');
	     	//change the class the shape
	     	$(".richpicture__frame__hotspots #" + hotspotData[hscount].id).addClass("richpicture__frame__hotspots--" + hotspotData[hscount].id);
	    };
	};

	function setUpHotspots() {
		//size the container
		resizeHotspotsContainer();
    	$(window).resize(resizeHotspotsContainer);  //when window resizes

		//create the hotspots
		createHotspots()
	}

