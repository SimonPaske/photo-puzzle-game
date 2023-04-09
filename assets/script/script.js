
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

/**
 * This function randomizes the order of the photos in the game board.
 * It is called when the page loads.
 */
function shuffleArray() {

    for (let i = 0; i < 9; i++) {
        photoArray.sort(() => Math.random() - 0.5);
        let randomIndex = Math.floor(Math.random() * 9);
        let temp = photoArray[i];
        photoArray[i] = photoArray[randomIndex];
        photoArray[randomIndex] = temp;
    }

    for (let i = 0; i < 9; i++) {
        document.getElementById(`square${i}`).src = `assets/images/${chosenFolder}/0${photoArray[i]}.webp`;
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
 *  difference in their indices is 1 or 3. If the clicked square is adjacent, the function swaps the positions
 *  of the clicked square and the empty square in the photoArray array, and updates the emptySquareIndex variable
 *  to the new position of the clicked square.
 */
function squareMoves(squareId) {
    emptySquareIndex = photoArray.indexOf(8);
    
    // Get the index of the clicked square
    const squareIndex = parseInt(squareId.replace("square", ""));
    if (
        emptySquareIndex - 1 === squareIndex ||
        emptySquareIndex + 1 === squareIndex ||
        emptySquareIndex - 3 === squareIndex ||
        emptySquareIndex + 3 === squareIndex
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
    }
}

/**
 * This function replace array to full size picture of finished game
 */
function replacePhotoArray() {
    folderSelect = document.getElementById("folder-select");
    chosenFolder = folderSelect.value;

    document.getElementById("game-container").innerHTML = `<img class="win-photo" src= 'assets/images/${chosenFolder}/${chosenFolder}.webp' alt="${chosenFolder}">`;
}

