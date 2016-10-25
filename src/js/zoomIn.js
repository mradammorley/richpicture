
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

