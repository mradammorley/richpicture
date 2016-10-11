	function pan(direction) {
		switch (direction) {
			case "left":
				//check to see if we are at the end of the image
				if (currentPanelMarginLeftRatio - horizontalPanRatio >= -0.01) {
					//set new left margin ratio
					newPanelMarginLeftRatio = currentPanelMarginLeftRatio - horizontalPanRatio;
				};
				//keep the vertical settings the same
				newPanelMarginTopRatio = currentPanelMarginTopRatio;
				break;
			case "right":
				//check to see if we are at the end of the image
				if (currentPanelMarginLeftRatio + horizontalPanRatio <= 1.01-panelWidthRatio) {
					//set new left margin ratio
					newPanelMarginLeftRatio = currentPanelMarginLeftRatio + horizontalPanRatio;
				};
				//keep the vertical settings the same
				newPanelMarginTopRatio = currentPanelMarginTopRatio;
				break;
			case "up":
				//check to see if we are at the end of the image
				if (currentPanelMarginTopRatio - verticalPanRatio >= -0.01) {
					//set new top margin ratio
					newPanelMarginTopRatio = currentPanelMarginTopRatio - verticalPanRatio;
				};
				//keep the vertical settings the same
				newPanelMarginLeftRatio = currentPanelMarginLeftRatio;
				break;
			case "down":
				//check to see if we are at the end of the image
				if (currentPanelMarginTopRatio + verticalPanRatio <= 1.01-panelHeightRatio) {
					//set new top margin ratio
					newPanelMarginTopRatio = currentPanelMarginTopRatio + verticalPanRatio;
				};
				//keep the vertical settings the same
				newPanelMarginLeftRatio = currentPanelMarginLeftRatio;
				break;
			default:
				console.log("direction not specified in pan");
		}
		//turn the ratio into a pixel number
		newInnerMarginLeft = -(newPanelMarginLeftRatio*currentInnerWidth);
		newInnerMarginTop = -(newPanelMarginTopRatio*currentInnerHeight);

		//set new inner margins and width using clicked button offset
          $(".richpicture__frame__inner").animate({
            	marginLeft: newInnerMarginLeft,
            	marginTop: newInnerMarginTop
          	}, panSpeed, function(){
            	console.log("pan inner - animation complete");
          });

		//set the current details
		currentPanelMarginLeftRatio = newPanelMarginLeftRatio;
		currentPanelMarginTopRatio = newPanelMarginTopRatio;

	}