
const cordData = [
	["A", "./image/cordA.png"],
	["A7", "./image/cordA7.png"],
	["Am", "./image/cordAm.png"],
	["Am7", "./image/cordAm7.png"],
	["B", "./image/cordB.png"],
	["B7", "./image/cordB7.png"],
	["Bm", "./image/cordBm.png"],
	["Bm7", "./image/cordBm7.png"],
	["C", "./image/cordC.png"],
	["C7", "./image/cordC7.png"],
	["D", "./image/cordD.png"],
	["D7", "./image/cordD7.png"],
	["Dm", "./image/cordDm.png"],
	["Dm7", "./image/cordDm7.png"],
	["Dsus4", "./image/cordDsus4.png"],
	["E", "./image/cordE.png"],
	["E7", "./image/cordE7.png"],
	["Em", "./image/cordEm.png"],
	["Em7", "./image/cordEm7.png"],
	["F", "./image/cordF.png"],
	["Fm", "./image/cordFm.png"],
	["G", "./image/cordG.png"],
	["Gmaj7", "./image/cordGmaj7.png"],
	["G7", "./image/cordG7.png"]
];

let cord = 0;
let isMatch = true;
let selectedCords = [50, 50, 50, 50];
let times = 0;
let timedCord = "";
const metronome = new Audio("./asset/metronomeTicToc.wav");
let play = 0;  // One equals true

const getCord = () => {
	cord = Math.floor(Math.random() * 24);
}

const checkMatch = (note) => {
	let results = true;

	for (let i = 0 ; i < selectedCords.length ; i++ ) {
		if (note === selectedCords[i] ) {	
			results = false;
		}
	}
	return results;
}

const strumPlayer = () => {
	setTimeout( () => {
		document.getElementById("guitarPlayer").src = "./image/player/player1.png";		
	}, (times / 2));
}

const displayCord = () => {
	let count = 0;
	getCord();
	isMatch = checkMatch(cord);

	while (!isMatch) {
		getCord();
		isMatch = checkMatch(cord);

		count++;
		if (count === 5) {
			isMatch = true;
		}
	}

	selectedCords.shift();
	selectedCords.push(cord);

	document.getElementById("whichNote").textContent = cordData[cord][0];
	document.getElementById("fingerCord").src = cordData[cord][1];


	document.getElementById("guitarPlayer").src = "./image/player/player3.png";
	
	strumPlayer();

	if (play) {
		metronome.play();
	}

	document.getElementById("ttOff").addEventListener("click", () => {
		play = 0;
		document.getElementById("ttOn").style.opacity = 0.5;
		document.getElementById("ttOff").style.opacity = 1;
	});
}


document.getElementById("ttOn").addEventListener("click", () => {
	play = 1;
	document.getElementById("ttOn").style.opacity = 1;
	document.getElementById("ttOff").style.opacity = 0.5;
});

document.getElementById("start").addEventListener("click", () => {
	times = document.getElementById("theNumber").textContent;
	times = (60 / times) * 1000;

	timedCord = setInterval(displayCord, times);
});

document.getElementById("stop").addEventListener("click", () => {
	clearInterval(timedCord);
});