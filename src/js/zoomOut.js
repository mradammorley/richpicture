  function zoomOut() {

    //set the vars for the new width and height of the image
    var newInnerWidth = $(window).innerWidth();
    var newInnerHeight = newInnerWidth*frameRatio;

    //set new inner margins and width using clicked button offset
    $(".richpicture__frame__inner").animate({
      marginLeft: 0,
      marginTop: 0,
      width: newInnerWidth,
      height: newInnerHeight,
    }, zoomSpeed, function(){
      console.log("zoom out - animation complete");
    });

    //hide the controls appear
    $(".controls").fadeTo(zoomSpeed, 0);


    //change the zoom state
    zoomState = 0;

    //set up the panels and zoom functions again
    zoomInSetup();
  };



