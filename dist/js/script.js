$(document).ready(function() {

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



  //DECLARE VARS
  var numPanels = numRows*numCols;
  var verticalPanRatio = (1/numRows)/2; //the pan ratio should be half of a row
  var horizontalPanRatio = (1/numCols)/2; //the pan ratio should be half of a column
  var panelWidthRatio = 1/numRows; //this is the width of a panel expressed as a decimal
  var panelHeightRatio = 1/numCols; //this is the height of panel expressed as a decimal
  var rpFrameWidth;
  var rpFrameHeight;
  var rpFrameTop;
  var rpFrameLeft = 0;
  var rpInnerWidth;
  var rpInnerHeight;
  var rpInnerOffset;
  var newInnerMarginLeft;
  var newInnerMarginTop;
  var currentInnerMarginLeft;
  var currentInnerMargintop;
  var newInnerWidth;
  var newInnerHeight;
  var currentInnerWidth;
  var currentInnerHeight;
  var newPanelMarginLeftRatio;
  var newPanelMarginTopRatio;
  var currentPanelMarginLeftRatio;
  var currentPanelMarginTopRatio;
  var rpPanelWidth;
  var rpPanelHeight;
  var clickedBtnOffset
  var zoomState = 0;
  function setMainRichPicPath() {
    //sets the path of the main rich pic as defined in the config
    $(".richpicture__frame__inner").css("background-image", "url(" + mainRichPicPath + ")");
    //sets the path of the detail rich pic as defined in the config and hide it
    $(".richpicture__frame__detail").css("background-image", "url(" + detailRichPicPath + ")").fadeTo(0,0);
  }

  //resizes the frame to the width of the browser window
  function resizeRpFrame() {
    //set the rp frame width to the width of the browser window
    rpFrameWidth = $(window).innerWidth();
    //set the rp frame height based on the ratio set in the config
    rpFrameHeight = rpFrameWidth*frameRatio;
    //calculate the distance from the top of the window to vertically align
    rpFrameTop = ($(window).innerHeight()-rpFrameHeight)/2;
    //set the element to the sizes calculated
    $(".richpicture__frame").width(rpFrameWidth).height(rpFrameHeight);
    //set the vertical alignment of the frame
    $(".richpicture__frame").css("top", rpFrameTop);

  };

  //resizes the rp inner when zoomed out
  function resizeRpInner() {
    switch (zoomState) {
      //set the rp image width to the width of the rp frame
      case 0:
        rpInnerWidth = rpFrameWidth;
        rpInnerHeight = rpInnerWidth*innerRatio;
        break;
      //if the zoom state is 1 (zoomed in) then use the number of columns to work out the size of the image
      case 1:
        //work out the width
        rpInnerWidth = rpFrameWidth*numCols;
        //work out the left margin by turning the ratio back into a number using the new width
        newInnerMarginLeft = -(rpInnerWidth*currentPanelMarginLeftRatio);
        //work out the height
        rpInnerHeight = rpInnerWidth*innerRatio;
        //work out the top margin
        newInnerMarginTop = -(rpInnerHeight*currentPanelMarginTopRatio);
        //set the element margin
        $(".richpicture__frame__inner, .richpicture__frame__detail").css({
          marginLeft: newInnerMarginLeft,
          marginTop: newInnerMarginTop
        });
        break;
      default:
        rpInnerWidth = rpFrameWidth;
        rpInnerHeight = rpInnerWidth*innerRatio;
        break;
    }
    //set the element to the size calculated
    $(".richpicture__frame__inner, .richpicture__frame__detail").width(rpInnerWidth).height(rpInnerHeight);

  };

  function mainSetup() {
    // Set the path of the main rich pic image
    setMainRichPicPath();

    // Set the frame size when browser window loads or resizes
    resizeRpFrame();  //when it first loads
    $(window).resize(resizeRpFrame);  //when window resizes

    // Set the rp inner size when browser window load
    resizeRpInner();  //when it first loads
    $(window).resize(resizeRpInner);  //when window resizes
  }





  //create button Panels
  function createRpPanels() {
    for (i=1; i<=numPanels; i++) {
      $(".richpicture__frame__inner").append("<div class='richpicture__frame__inner__button richpicture__frame__inner__button--" + i + "'>&nbsp;</div>");
    };
  }


  //position buttons

  function positionRpPanels () {
    //calculate panel width
    rpPanelWidth = rpInnerWidth/numCols;
    //set the rp frame height based on the ratio set in the config
    rpPanelHeight = rpInnerHeight/numRows;
    //set the element to the size calculated
    var count = 0;
    for (r=0; r<numRows; r++) {
      for (c=0; c<numCols; c++) {
        count++;
        //hide the buttons
        //apply the color size and position
        $(".richpicture__frame__inner__button--" + count ).css({
            left:c*rpPanelWidth,
            top:r*rpPanelHeight,
            width:rpPanelWidth,
            height:rpPanelHeight,
            backgroundColor:panelRolloverColor
        }).fadeTo(0,0);
      };
    };
  };

  //make the buttons and them work
  function activatePanelButtons() {
    //create rollover states
    $(".richpicture__frame__inner__button").mouseover(function(){
      //fade in
      $(this).fadeTo("fast", panelRolloverOpacity);
    });

   //create rollover states
    $(".richpicture__frame__inner__button").mouseout(function(){
      //fade out
      $(this).fadeTo("fast", 0);
    });

    //make the buttons zoom in when clicked
    count = 0;
    for (r=0; r<numRows; r++) {
      for (c=0; c<numCols; c++) {
        count++;
        $(".richpicture__frame__inner__button--" + count ).click(function(){

          //get top left position of button that has been clicked
          clickedBtnOffset = $(this).offset();
          var clickedBtnOffsetFromFrameTop = clickedBtnOffset.top - rpFrameTop;
          var clickedBtnOffsetFromFrameLeft = clickedBtnOffset.left - rpFrameLeft;

          //work out a decimal representing how far along the picture the button is
          newPanelMarginLeftRatio = clickedBtnOffsetFromFrameLeft/rpFrameWidth;
          newPanelMarginTopRatio = clickedBtnOffsetFromFrameTop/rpFrameHeight;

          console.log("newPanelMarginLeftRatio= "+newPanelMarginLeftRatio);
          console.log("newPanelMarginTopRatio= "+newPanelMarginTopRatio);

          //calculate new width and height using the number rows and cols
          newInnerWidth = rpFrameWidth*numCols;
          console.log("newInnerWidth = " + newInnerWidth);
          newInnerHeight = newInnerWidth*innerRatio;

          //set new margins
          newInnerMarginLeft = -(newInnerWidth*newPanelMarginLeftRatio);
          newInnerMarginTop = -(newInnerHeight*newPanelMarginTopRatio);
          
          console.log("newInnerMarginLeft = " + newInnerMarginLeft);

          //set new inner margins and width using clicked button offset
          $(".richpicture__frame__inner, .richpicture__frame__detail").animate({
            marginLeft: newInnerMarginLeft,
            marginTop: newInnerMarginTop,
            width: newInnerWidth,
            height: newInnerHeight,
          }, zoomSpeed, zoomEase, function(){
            console.log("zoom inner - animation complete");
          });

          //store the current ratios for use by other functions
          currentInnerMarginLeft = newInnerMarginLeft;
          currentInnerMarginTop = newInnerMarginTop;
          currentPanelMarginLeftRatio = newPanelMarginLeftRatio;
          currentPanelMarginTopRatio = newPanelMarginTopRatio;
          currentInnerWidth = newInnerWidth;
          currentInnerHeight = newInnerHeight;


          //make the controls and details appear
          $(".controls").fadeTo(zoomSpeed, 1, zoomEase);

          //make the details appear
          $(".richpicture__frame__detail").fadeTo(zoomSpeed, 1, zoomEase).dequeue();


          //change the zoom state
          zoomState = 1;

          $(".richpicture__frame__inner__button").remove();
        });
      };
    };
  };


  function zoomInSetup() {
    //create the panels
    createRpPanels();

    //calculate the panel sizes and positions
    positionRpPanels();  //when it first loads
    $(window).resize(positionRpPanels);  //when window resizes

    //activate the panel buttons and the zoom function
    activatePanelButtons();
  }

  function zoomOut() {

    //set the vars for the new width and height of the image
    var newInnerWidth = $(window).innerWidth();
    var newInnerHeight = newInnerWidth*frameRatio;

    //set new inner margins and width using clicked button offset
    $(".richpicture__frame__inner, .richpicture__frame__detail").animate({
      marginLeft: 0,
      marginTop: 0,
      width: newInnerWidth,
      height: newInnerHeight,
    }, zoomSpeed, zoomEase, function(){
      console.log("zoom out - animation complete");
    });

    //hide the controls appear
    $(".controls").fadeTo(zoomSpeed, 0, zoomEase);

    //make the details appear
    $(".richpicture__frame__detail").fadeTo(zoomSpeed, 0, zoomEase).dequeue();

    //change the zoom state
    zoomState = 0;

    //set up the panels and zoom functions again
    zoomInSetup();
  };




  //FUNCTIONS
  function calculateControlsSize () {
    var controlsSize;
    var controlsOffsetLeft;
    var controlsOffsetTop;
    //check for screen size when setting controls size
    if (rpFrameWidth>=desktopMin ) {

      //desktop
      controlsSize = rpFrameWidth*controlsSizeDesktop;
      controlsOffsetLeft = rpFrameWidth*controlsOffsetLeftDesktop;
      controlsOffsetTop = $(window).innerHeight()*controlsOffsetTopDesktop;

    } else if (rpFrameWidth>=mobileMax) {
      
      //tablet
      controlsSize = rpFrameWidth*controlsSizeTablet;
      controlsOffsetLeft = rpFrameWidth*controlsOffsetLeftTablet;
      controlsOffsetTop = $(window).innerHeight()*controlsOffsetTopTablet;

    } else {
      
      //mobile
      controlsSize = rpFrameWidth*controlsSizeMobile;
      controlsOffsetLeft = rpFrameWidth*controlsOffsetLeftMobile;
      controlsOffsetTop = $(window).innerHeight()*controlsOffsetTopMobile;

    };
    return [controlsSize, controlsOffsetLeft, controlsOffsetTop];
  }

  //position control buttons
  function setControlsPosition() {
    //calclateControlsSizes() function returns three values in an array, size, left and top
    sizeAndPositionsArr = calculateControlsSize();
    $(".controls").css({
      width:sizeAndPositionsArr[0],
      height:sizeAndPositionsArr[0],
      left:sizeAndPositionsArr[1],
      top:sizeAndPositionsArr[2]
    });

  };

  function setControlsSvgButton() {
    //calclateControlsSizes() function returns three values in an array, size, left and top
    sizeAndPositionsArr = calculateControlsSize();
    //the coordinates that were set in the config and add them to the html
    $(".controls").find("svg").attr("viewBox", controlsSvgViewBox);
    $(".controls").find("svg").css({
      width:sizeAndPositionsArr[0],
      height:sizeAndPositionsArr[0]
    });
    //set the coordinates for the button paths
    $(".controls__up").attr("d", controlsSvgUp);
    $(".controls__down").attr("d", controlsSvgDown);
    $(".controls__left").attr("d", controlsSvgLeft);
    $(".controls__right").attr("d", controlsSvgRight);
    $(".controls__out").attr("d", controlsSvgOut);

  }

  function activateControlsButtons() {
    //create rollover states
    $(".controls").find("path").fadeTo(0,0).css("fill", controlsRolloverColor).mouseover(function(){
      //fade in
      $(this).fadeTo("fast", controlsRolloverOpacity);
    }).mouseout(function(){
      //fade out
      $(this).fadeTo("fast", 0);
    });

    //zoom out button
    $(".controls__out").click(function() {
      //call zoomOut function defined in zoomOut.js
      zoomOut();
    });

    //left button
    $(".controls__left").click(function() {
      //call horizontalPan function defined in pan.js
      pan("left");
    });

    //right button
    $(".controls__right").click(function() {
      //call horizontalPan function defined in pan.js
      pan("right");
    });

    //up button
    $(".controls__up").click(function() {
      //call horizontalPan function defined in pan.js
      pan("up");
    })

    //down button
    $(".controls__down").click(function() {
      //call horizontalPan function defined in pan.js
      pan("down");
    })

  }

  function controlsSetup() {

    //sets the path of the controls
    $(".controls").css("background-image", "url(" + controlsGraphicPath + ")").fadeTo(0,0);

    //set the position of the controls
    setControlsPosition();  //when it first loads
    $(window).resize(setControlsPosition);  //when window resizes

    //set the control svg button shapes
    setControlsSvgButton();
    $(window).resize(setControlsSvgButton);  //when window resizes

    //set the button functions
    activateControlsButtons();

  }

	function pan(direction) {
		var moveStatus = false;
		switch (direction) {
			case "left":
				//check to see if we are at the end of the image
				if (currentPanelMarginLeftRatio - horizontalPanRatio >= -0.01) {
					//set new left margin ratio
					newPanelMarginLeftRatio = currentPanelMarginLeftRatio - horizontalPanRatio;
					//set moveStatus
					moveStatus = true;
					//keep the vertical settings the same
					newPanelMarginTopRatio = currentPanelMarginTopRatio;
				};
				break;
			case "right":
				//check to see if we are at the end of the image
				if (currentPanelMarginLeftRatio + horizontalPanRatio <= 1.01-panelWidthRatio) {
					//set new left margin ratio
					newPanelMarginLeftRatio = currentPanelMarginLeftRatio + horizontalPanRatio;
					//set moveStatus
					moveStatus = true;
					//keep the vertical settings the same
					newPanelMarginTopRatio = currentPanelMarginTopRatio;
				};
				break;
			case "up":
				//check to see if we are at the end of the image
				if (currentPanelMarginTopRatio - verticalPanRatio >= -0.01) {
					//set new top margin ratio
					newPanelMarginTopRatio = currentPanelMarginTopRatio - verticalPanRatio;
					//set moveStatus
					moveStatus = true;
					//keep the vertical settings the same
					newPanelMarginLeftRatio = currentPanelMarginLeftRatio;
				};
				break;
			case "down":
				//check to see if we are at the end of the image
				if (currentPanelMarginTopRatio + verticalPanRatio <= 1.01-panelHeightRatio) {
					//set new top margin ratio
					newPanelMarginTopRatio = currentPanelMarginTopRatio + verticalPanRatio;
					//set moveStatus
					moveStatus = true;
					//keep the vertical settings the same
					newPanelMarginLeftRatio = currentPanelMarginLeftRatio;
				};
				break;
			default:
				console.log("direction not specified in pan");
		}
		if (moveStatus == true) {
			//turn the ratio into a pixel number
			newInnerMarginLeft = -(newPanelMarginLeftRatio*currentInnerWidth);
			newInnerMarginTop = -(newPanelMarginTopRatio*currentInnerHeight);

			//set new inner margins and width using clicked button offset
	          $(".richpicture__frame__inner, .richpicture__frame__detail").animate({
	            	marginLeft: newInnerMarginLeft,
	            	marginTop: newInnerMarginTop
	          	}, panSpeed, panEase, function(){
	          		moveStatus = false;;
	          });

			//set the current details
			currentPanelMarginLeftRatio = newPanelMarginLeftRatio;
			currentPanelMarginTopRatio = newPanelMarginTopRatio;
		}

	}	// INITIALISE RICHPICTURE

	// Set up the Richpicture and frame
	mainSetup();

	// Create and position panel buttons and activate zoom functionality
	zoomInSetup();

	// Create and postion controls
	controlsSetup();//outro.js
});