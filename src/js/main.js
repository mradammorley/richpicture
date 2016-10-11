
  function setMainRichPicPath() {
    //sets the path of the main rich pic as defined in the config
    $(".richpicture__frame__inner").css("background-image", "url(" + mainRichPicPath + ")");
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
        $(".richpicture__frame__inner").css({
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
    $(".richpicture__frame__inner").width(rpInnerWidth).height(rpInnerHeight);

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




