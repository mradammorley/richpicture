
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
    });

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
    $(".controls").find("path").mouseover(function(){
      // fade in
      $(this).fadeTo("fast", rolloverOpacity);
    });

   //create rollover states
    $(".controls").find("path").mouseout(function(){
      // fade out
      $(this).fadeTo("fast", 0);
    });

  }

  //IMPLEMENT

  // Sets the path of the controls
  $('.controls').css('background-image', 'url(' + controlsGraphicPath + ')');

  //set the position of the controls
  setControlsPosition();  //when it first loads
  $(window).resize(setControlsPosition);  //when window resizes

  //Set the control svg button shapes
  setControlsSvgButton();
  $(window).resize(setControlsSvgButton);  //when window resizes

