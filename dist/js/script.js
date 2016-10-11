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
  	
  	//ZOOM
	var panelRolloverColor = '#ff6600';
	var panelRolloverOpacity = '0.2';
	var zoomSpeed = 1000 // 1000 = 1 second

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

	//SCREEN SIZE DEFINITIONS
	var desktopMin = 1025; // the size above which desktop layout should appear
	var mobileMax = 750; // the size below which mobile layout should appear (tablet will be between)



  //DECLARE
  var numPanels = numRows*numCols;
  var rpFrameWidth;
  var rpFrameHeight;
  var rpFrameTop;
  var rpInnerWidth;
  var rpInnerHeight;
  var rpInnerOffset;
  var newInnerMarginLeft;
  var newInnerMarginTop;
  var newInnerWidth;
  var newInnerHeight;
  var rpPanelWidth;
  var rpPanelHeight;
  var clickedBtnOffset
  var zoomState = 0;

  //FUNCTIONS

  function setMainRichPicPath() {
    // Sets the path of the main rich pic as defined in the config
    $('.richpicture__frame__inner ').css('background-image', 'url(' + mainRichPicPath + ')');
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
    $('.richpicture__frame').width(rpFrameWidth).height(rpFrameHeight);
    //set the vertical alignment of the frame
    $('.richpicture__frame').css("top", rpFrameTop);

  };

  //resizes the rp inner when zoomed out
  function resizeRpInner() {
    switch (zoomState) {
      //set the rp image width to the width of the rp frame
      case 0:
        rpInnerWidth = rpFrameWidth;
        break;
      //if the zoom state is 1 (zoomed in) then use the number of columns to work out the size of the image
      case 1:
        rpInnerWidth = rpFrameWidth*numCols;
        break;
      default:
        rpInnerWidth = rpFrameWidth;
    }
    //set the rp frame height based on the ratio set in the config
    rpInnerHeight = rpInnerWidth*innerRatio;
    //set the element to the size calculated
    $('.richpicture__frame__inner').width(rpInnerWidth).height(rpInnerHeight);
  };


  //IMPLEMENT

  // Set the path of the main rich pic image
  setMainRichPicPath();

  //set the frame size when browser window loads or resizes
  resizeRpFrame();  //when it first loads
  $(window).resize(resizeRpFrame);  //when window resizes

  //set the rp inner size when browser window load
  resizeRpInner();  //when it first loads
  $(window).resize(resizeRpInner);  //when window resizes




  //FUNCTIONS

  //Create button Panels
  function createRpPanels() {
    for (i=1; i<=numPanels; i++) {
      $('.richpicture__frame__inner').append('<div class="richpicture__frame__inner__button richpicture__frame__inner__button--' + i + '">&nbsp;</div>');
    };
  }


  //Position buttons

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
        //Hide the buttons
        //Apply the color size and position
        $('.richpicture__frame__inner__button--' + count ).css({
            left:c*rpPanelWidth,
            top:r*rpPanelHeight,
            width:rpPanelWidth,
            height:rpPanelHeight,
            backgroundColor:panelRolloverColor
        }).fadeTo(0,0);
      };
    };
  };

  // Make the buttons and them work
  function activatePanelButtons() {
    //create rollover states
    $('.richpicture__frame__inner__button').mouseover(function(){
      // fade in
      $(this).fadeTo("fast", panelRolloverOpacity);
    });

   //create rollover states
    $('.richpicture__frame__inner__button').mouseout(function(){
      // fade out
      $(this).fadeTo("fast", 0);
    });

    //make the buttons zoom in when clicked
    count = 0;
    for (r=0; r<numRows; r++) {
      for (c=0; c<numCols; c++) {
        count++;
        $('.richpicture__frame__inner__button--' + count ).click(function(){
          //get top left position of button that has been clicked
          clickedBtnOffset = $(this).offset();
          console.log(clickedBtnOffset.top)
          //get current inner offset
          rpInnerOffset = $('.richpicture__frame__inner').offset();
          //set new margins
          newInnerMarginLeft = rpInnerOffset.left-(clickedBtnOffset.left*numCols);
          newInnerMarginTop = rpInnerOffset.top-(clickedBtnOffset.top*numRows);
          //calculate new width and height using the number rows and cols
          newInnerWidth = rpFrameWidth*numCols;
          newInnerHeight = newInnerWidth*innerRatio;
          console.log(newInnerWidth);

          //set new inner margins and width using clicked button offset
          $('.richpicture__frame__inner').animate({
            marginLeft: newInnerMarginLeft,
            marginTop: newInnerMarginTop,
            width: newInnerWidth,
            height: newInnerHeight,
          }, zoomSpeed, function(){
            console.log('zoom inner - animation complete');
          });

          //make the controls appear
          $('.controls').fadeTo(zoomSpeed, 1);


          //change the zoom state
          zoomState = 1;

          $('.richpicture__frame__inner__button').remove();
        });
      };
    };
  };

  //IMPLEMENT

  //Create the panels
  createRpPanels();

  //calculate the panel sizes and positions
  positionRpPanels();  //when it first loads
  $(window).resize(positionRpPanels);  //when window resizes

  //Activate the panel buttons and the zoom function
  activatePanelButtons();




  //FUNCTIONS
  function calculateControlsSize () {
    var controlsSize;
    var controlsOffsetLeft;
    var controlsOffsetTop;
    //check for screen size when setting controls size
    if (rpFrameWidth>=desktopMin ) {

      //Desktop
      controlsSize = rpFrameWidth*controlsSizeDesktop;
      controlsOffsetLeft = rpFrameWidth*controlsOffsetLeftDesktop;
      controlsOffsetTop = $(window).innerHeight()*controlsOffsetTopDesktop;

    } else if (rpFrameWidth>=mobileMax) {
      
      //Tablet
      controlsSize = rpFrameWidth*controlsSizeTablet;
      controlsOffsetLeft = rpFrameWidth*controlsOffsetLeftTablet;
      controlsOffsetTop = $(window).innerHeight()*controlsOffsetTopTablet;

    } else {
      
      //Mobile
      controlsSize = rpFrameWidth*controlsSizeMobile;
      controlsOffsetLeft = rpFrameWidth*controlsOffsetLeftMobile;
      controlsOffsetTop = $(window).innerHeight()*controlsOffsetTopMobile;

    };
    return [controlsSize, controlsOffsetLeft, controlsOffsetTop];
  }

  //Position control buttons
  function setControlsPosition() {
    //calclateControlsSizes() function returns three values in an array, size, left and top
    sizeAndPositionsArr = calculateControlsSize();
    $('.controls').css({
      width:sizeAndPositionsArr[0],
      height:sizeAndPositionsArr[0],
      left:sizeAndPositionsArr[1],
      top:sizeAndPositionsArr[2]
    }).fadeTo(0,0);

  };

  function setControlsSvgButton() {
    //calclateControlsSizes() function returns three values in an array, size, left and top
    sizeAndPositionsArr = calculateControlsSize();
    //The coordinates that were set in the config and add them to the html
    $('.controls').find('svg').attr("viewBox", controlsSvgViewBox);
    $('.controls').find('svg').css({
      width:sizeAndPositionsArr[0],
      height:sizeAndPositionsArr[0]
    });
    //Set the coordinates for the button paths
    $('.controls__up').attr("d", controlsSvgUp);
    $('.controls__down').attr("d", controlsSvgDown);
    $('.controls__left').attr("d", controlsSvgLeft);
    $('.controls__right').attr("d", controlsSvgRight);
    $('.controls__out').attr("d", controlsSvgOut);

  }

  function activateControlsButtons() {
    //create rollover states
    $(".controls").find("path").fadeTo(0,0).css("fill", controlsRolloverColor).mouseover(function(){
      // fade in
      $(this).fadeTo("fast", controlsRolloverOpacity);
    }).mouseout(function(){
      // fade out
      $(this).fadeTo("fast", 0);
    });

  }

  //IMPLEMENT

  // Sets the path of the controls
  $('.controls').css('background-image', 'url(' + controlsGraphicPath + ')');

  // Set the position of the controls
  setControlsPosition();  //when it first loads
  $(window).resize(setControlsPosition);  //when window resizes

  // Set the control svg button shapes
  setControlsSvgButton();
  $(window).resize(setControlsSvgButton);  //when window resizes

  // Set the button functions
  activateControlsButtons();

//outro.js
});