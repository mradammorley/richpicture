
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

