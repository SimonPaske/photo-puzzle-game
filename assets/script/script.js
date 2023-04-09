
/**
 * This function fills the game board with squares and adds photos to them.
 */
function fillArray() {

    // Clear out any existing images in the game-container
    document.getElementById("game-container").innerHTML = "";

    // Create 9 squares and add them to the game-container
    for (let i = 0; i < 9; i++) {
        let square = document.createElement("img");
        square.id = `square${i}`;

        square.src = `assets/images/${chosenFolder}/0${photoArray[i]}.webp`;
        document.getElementById("game-container").appendChild(square);
        photoArray[i] = i;
        
    }
}

function fillArray() {

}

function shuffleArray() {

}

function moveCounter() {

}

function squareMoves() {

}

function checkWin() {

}

function replacePhotoArray() {

}

