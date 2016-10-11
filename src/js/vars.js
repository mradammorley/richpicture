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