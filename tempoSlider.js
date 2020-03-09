
let isDown = false;
// fixedRailEdge is from window edge to edge of rail
let fixedRailEdge = document.getElementById("theRail").offsetLeft;
// fixedSliderEdge is from window edge to left edge of slider at start
let fixedSliderEdge = document.getElementById("theRail").offsetLeft + 16;
// pickWidth is from left edge of slider to mouse pick point
let pickWidth = 0;

let movedX = 0;
let movedSliderEdge = 0;

let postNumber = 0;

let railWidth = 512; // Nominal "theRail" width (32rem)
let availableTravel = 432; // Nominal available travel on the rail (32rem - 3rem (slider length) - 1rem each end)
let travelWidth = 28; // If slider is past right stop, left equals total travel (27rem) plus 1rem on left end

// Nominal rail width is 512px (32rem).  Add 16px (1rem) per side.  Equals 544px
if (document.body.offsetWidth < 544) {
	railWidth = document.body.offsetWidth - 32;
	document.getElementById("theRail").style.width = (railWidth / 16) + "rem";	
	availableTravel = railWidth - 80;
	travelWidth = (railWidth + 1) / 16;
}

document.getElementById("theSlider").addEventListener("mousedown", (event) => {
	isDown = true;
	// event.clietX is from window edge to mouse pick; offsetLeft is from end of rail to left edge of slider
	pickWidth = event.clientX - fixedRailEdge - document.getElementById("theSlider").offsetLeft;
}, true);

window.addEventListener("mouseup", () => {	
	isDown = false;
}, true);

document.getElementById("theSlider").addEventListener("mousemove", (event) => {
	event.preventDefault();
	if (isDown) {
		// movedX is from window edge to mouse pick minus slider edge to mouse pick minus from widow edge to left edge of slider
		movedX = event.clientX - pickWidth - fixedRailEdge;
		movedX = movedX / 16;
		// This is the left side of the slider after it moved
		movedSliderEdge = event.clientX - pickWidth;
		// This if statment keeps the slider on the rail with 1rem left at each end
		if (movedSliderEdge < fixedSliderEdge) {			
			document.getElementById("theSlider").style.left = 1 + "rem";
		} else if (movedSliderEdge > (fixedSliderEdge + availableTravel)) {
			document.getElementById("theSlider").style.left = travelWidth + "rem";
		} else {
			document.getElementById("theSlider").style.left = movedX + "rem";
		}
		// Gathering the positional dimension, converting to match scale and posting it
		postNumber = parseInt((document.getElementById("theSlider").offsetLeft - 16) * 180 / availableTravel);
		document.getElementById("theNumber").textContent = postNumber;
	}
}, true);