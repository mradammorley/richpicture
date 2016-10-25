	//CONFIG

	//SIZES
	var formatWidth = 1920;
	var formatHeight = 1080;
	var frameRatio = formatHeight/formatWidth;
	var innerRatio = formatHeight/formatWidth;
	var numRows = 3;
	var numCols = 3;

	//RICHPIC IMAGE LOCATIONS
  	var mainRichPicPath = 'img/main-richpicture.jpg';
  	var detailRichPicPath = 'img/detail-richpicture.png';
  	
  	//ZOOM
	var panelRolloverColor = '#ff6600';
	var panelRolloverOpacity = '0.2';
	var zoomSpeed = 1500; // 1000 = 1 second
	var zoomEase = "swing"; // 1000 = 1 second

	//CONTROLS
	var controlsGraphicPath = 'img/controls.svg';
	var controlsRolloverColor = '#000000';
	var controlsRolloverOpacity = '0.3';
	var controlsSizeDesktop = 0.1; // 0.1 equals 10 percent of the main frame width for both width and height
	var controlsOffsetLeftDesktop = 0.8; // 0.8 equals 80 percent of the main frame width
	var controlsOffsetTopDesktop = 0.8; // 0.8 equals 80 percent of the main frame height
	var controlsSizeTablet = 0.15; // 0.1 equals 10 percent of the main frame width for both width and height
	var controlsOffsetLeftTablet = 0.7; // 0.8 equals 80 percent of the main frame width
	var controlsOffsetTopTablet = 0.7; // 0.8 equals 80 percent of the main frame height
	var controlsSizeMobile = 0.2; // 0.1 equals 10 percent of the main frame width for both width and height
	var controlsOffsetLeftMobile = 0.4; // 0.8 equals 80 percent of the main frame width
	var controlsOffsetTopMobile = 0.7; // 0.8 equals 80 percent of the main frame height
	//The SVG details will be taken from the svg of button shapes created in illustrator
	var controlsSvgViewBox = "0, 0, 500, 500";
	var controlsSvgUp = "M426.78,73.22,323.36,176.64a103.74,103.74,0,0,0-146.72,0L73.22,73.22a250,250,0,0,1,353.56,0Z";
	var controlsSvgDown = "M323.36,323.36,426.78,426.78a250,250,0,0,1-353.56,0L176.64,323.36a103.74,103.74,0,0,0,146.72,0Z";
    var controlsSvgRight = "M426.78,73.22a250,250,0,0,1,0,353.56L323.36,323.36a103.74,103.74,0,0,0,0-146.72Z";
    var controlsSvgLeft = "M176.64,323.36,73.22,426.78a250,250,0,0,1,0-353.56L176.64,176.64a103.74,103.74,0,0,0,0,146.72Z";
    var controlsSvgOut = "M323.36,176.64A103.74,103.74,0,1,1,250,146.25,103.39,103.39,0,0,1,323.36,176.64Z";

    //PAN
	var panSpeed = 1000 // 1000 = 1 second
	var panEase = "swing"; // 1000 = 1 second

	//SCREEN SIZE DEFINITIONS
	var desktopMin = 1025; // the size above which desktop layout should appear
	var mobileMax = 750; // the size below which mobile layout should appear (tablet will be between)



