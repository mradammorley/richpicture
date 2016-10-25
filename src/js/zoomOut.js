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



