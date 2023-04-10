let countMove = 0;
let emptySquareIndex;

let folderSelect = document.getElementById("folder-select");
let chosenFolder = folderSelect.value;

const photoArray = [];

let startGame = document.getElementById("start-button");
startGame.addEventListener("click", generatePuzzle);

let shuffleButton = document.getElementById("shuffle-button");
shuffleButton.addEventListener("click", shuffleArray);

document.getElementById("folder-select");

folderSelect.addEventListener("change", () => {
  replacePhotoArray();
  showExampleImage(chosenFolder);
  startGame.style.display = "block";
  countMove = 0;
});

function generatePuzzle() {
  fillArray();
  shuffleArray();
  showExampleImage(chosenFolder);

  startGame.style.display = "none";
  document.getElementById("move-counter").textContent = 0;
  countMove = 0;
}

/**
 * This function fills the game board with squares and adds photos to them.
 */
function fillArray() {
  // Clear out any existing images in the game-container
  document.getElementById("game-container").innerHTML = "";

  folderSelect = document.getElementById("folder-select");
  chosenFolder = folderSelect.value;

  // Create 9 squares and add them to the game-container
  for (let i = 0; i < 9; i++) {
    let square = document.createElement("img");
    square.id = `square${i}`;

    square.src = `assets/images/${chosenFolder}/0${photoArray[i]}.webp`;
    document.getElementById("game-container").appendChild(square);

    photoArray[i] = i;
    square.addEventListener("click", () => {
      squareMoves(square.id);
    });
  }
}

/**
 * This function randomizes the order of the photos in the game board.
 * It is called when the page loads.
 */
function shuffleArray() {
  document.getElementById("move-counter").textContent = 0;
  countMove = 0;

  for (let i = 0; i < 9; i++) {
    photoArray.sort(() => Math.random() - 0.5);
    let randomIndex = Math.floor(Math.random() * 9);
    let temp = photoArray[i];
    photoArray[i] = photoArray[randomIndex];
    photoArray[randomIndex] = temp;
  }

  for (let i = 0; i < 9; i++) {
    document.getElementById(
      `square${i}`
    ).src = `assets/images/${chosenFolder}/0${photoArray[i]}.webp`;
  }
}

/**
 * This function counts the square moves
 */
function moveCounter() {
  countMove++; // Increment move counter
  const moveCounter = document.getElementById("move-counter"); // Get move counter element
  if (moveCounter) {
    // Check if element exists
    moveCounter.textContent = countMove; // Update move counter display
  }
}

/**
 *  The function checks if the clicked square is adjacent to the empty square by checking if the
 * difference in their indices is 1 or 3. If the clicked square is adjacent, the function swaps the positions
 *  of the clicked square and the empty square in the photoArray array, and updates the emptySquareIndex variable
 *  to the new position of the clicked square.
 */
function squareMoves(squareId) {
  emptySquareIndex = photoArray.indexOf(8);

  // Get the index of the clicked square
  const squareIndex = parseInt(squareId.replace("square", ""));
  if (
    (emptySquareIndex - 1 === squareIndex && emptySquareIndex % 3 !== 0) || // Check left
    (emptySquareIndex + 1 === squareIndex && emptySquareIndex % 3 !== 2) || // Check right
    emptySquareIndex - 3 === squareIndex || // Check up
    emptySquareIndex + 3 === squareIndex // Check down
  ) {

    // Check if the clicked square is adjacent to the empty square
    // Swap the clicked square with the empty square
    const temp = photoArray[emptySquareIndex];
    photoArray[emptySquareIndex] = photoArray[squareIndex];
    photoArray[squareIndex] = temp;

    // Update emptySquare to the new position of the clicked square
    emptySquareIndex = squareIndex;

    // Update src attributes of squares to reflect new positions
    for (let i = 0; i < 9; i++) {
      document.getElementById(
        `square${i}`
      ).src = `assets/images/${chosenFolder}/0${photoArray[i]}.webp`;
    }
    moveCounter();
  }
  checkWin();
}

/**
 * This function check if the game is finished show the full image of finished puzzle
 */
function checkWin() {
  const correctOrder = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  const currentOrder = photoArray.slice(0, 9);

  if (currentOrder.every((val, index) => val === correctOrder[index])) {
    replacePhotoArray();
    congratsModal();
    startGame.style.display = "block";
  }
}

/**
 * This function replace array to full size picture of finished game
 */
function replacePhotoArray() {
  folderSelect = document.getElementById("folder-select");
  chosenFolder = folderSelect.value;

  document.getElementById(
    "game-container"
  ).innerHTML = `<img class="win-photo" src= 'assets/images/${chosenFolder}/${chosenFolder}.webp' alt="${chosenFolder}">`;
}
/**
 * This code was used from www.w3schools.com
 */
let modalBox = document.getElementById("modal-box");
let modalButton = document.getElementById("modal-button");
let span = document.getElementsByClassName("close")[0];

modalButton.onclick = () => {
  modalBox.style.display = "block";
};

span.onclick = () => {
  modalBox.style.display = "none";
};

window.onclick = (event) => {
  if (event.target == modalBox) {
    modalBox.style.display = "none";
  }
};

/**
 * This function show modal box with congratulation if the player wins the game.
 */
function congratsModal() {
  let congratsModalBox = document.getElementById("congrats-modal");
  let span = congratsModalBox.querySelector(".close");

  congratsModalBox.style.display = "block";

  span.onclick = () => {
    congratsModalBox.style.display = "none";
  };
}

/**
 * This function show the example photo of current puzzle game in the modal box
 */
function showExampleImage(chosenFolder) {
  let containerElement = document.getElementById("modal-box");
  let imgElement = containerElement.querySelector("img");
  if (!imgElement) {
    imgElement = document.createElement("img");
    imgElement.className = "win-photo";
    containerElement.appendChild(imgElement);
  }

  if (chosenFolder === "triangle") {
    imgElement.src = "assets/images/triangle/triangle.webp";
    imgElement.alt = "Triangle Neon Light";
  } else if (chosenFolder === "cubic") {
    imgElement.src = "assets/images/cubic/cubic.webp";
    imgElement.alt = "Cubic Neon Light";
  } else if (chosenFolder === "nature") {
    imgElement.src = "assets/images/nature/nature.webp";
    imgElement.alt = "Nature";
  } else if (chosenFolder === "building") {
    imgElement.src = "assets/images/building/building.webp";
    imgElement.alt = "building";
  } else if (chosenFolder === "colors") {
    imgElement.src = "assets/images/colors/colors.webp";
    imgElement.alt = "colors";
  }
}

/**
 * This function add music file to html with loop play mode. Adds play and stop possibility.
 *
 * this code was used from https://www.w3schools.com
 */
function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.autoplay = false;
  this.sound.setAttribute("loop", "true"); // add loop attribute
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function () {
    this.sound.play();
  };

  this.stop = function () {
    this.sound.pause();
    this.sound.currentTime = 0;
  };
}

// create sound object
var sound = new sound("assets/music/Blue_Dot_Sessions_-_Slow_Rollout.mp3");

// link custom controls to the sound object
let playButton = document.getElementsByClassName("play-button");
playButton.addEventListener("click", sound.play());

let stopButton = document.getElementsByClassName("stop-button");
stopButton.addEventListener("click", sound.stop());
