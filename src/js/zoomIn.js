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



