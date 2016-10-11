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




