/*
  Assingment 9 - Scrabble with Drag-and-Drop
  COMP.4610: GUI Programming
  Oscar De La Rosa
  Oscar_DeLaRosa@student.uml.edu
*/

var pieces = [
  {"letter":"A", "value":1,  "amount":9},
  {"letter":"B", "value":3,  "amount":2},
  {"letter":"C", "value":3,  "amount":2},
  {"letter":"D", "value":2,  "amount":4},
  {"letter":"E", "value":1,  "amount":12},
  {"letter":"F", "value":4,  "amount":2},
  {"letter":"G", "value":2,  "amount":3},
  {"letter":"H", "value":4,  "amount":2},
  {"letter":"I", "value":1,  "amount":9},
  {"letter":"J", "value":8,  "amount":1},
  {"letter":"K", "value":5,  "amount":1},
  {"letter":"L", "value":1,  "amount":4},
  {"letter":"M", "value":3,  "amount":2},
  {"letter":"N", "value":1,  "amount":6},
  {"letter":"O", "value":1,  "amount":8},
  {"letter":"P", "value":3,  "amount":2},
  {"letter":"Q", "value":10, "amount":1},
  {"letter":"R", "value":1,  "amount":6},
  {"letter":"S", "value":1,  "amount":4},
  {"letter":"T", "value":1,  "amount":6},
  {"letter":"U", "value":1,  "amount":4},
  {"letter":"V", "value":4,  "amount":2},
  {"letter":"W", "value":4,  "amount":2},
  {"letter":"X", "value":8,  "amount":1},
  {"letter":"Y", "value":4,  "amount":2},
  {"letter":"Z", "value":10, "amount":1},
  {"letter":"_", "value":0,  "amount":2}
];

// JavaScript array of objects to determine what letter each piece is.
var gameTiles = [
  {"id": "piece0", "letter": "A"},
  {"id": "piece1", "letter": "B"},
  {"id": "piece2", "letter": "C"},
  {"id": "piece3", "letter": "D"},
  {"id": "piece4", "letter": "E"},
  {"id": "piece5", "letter": "F"},
  {"id": "piece6", "letter": "G"}
];

// JavaScript object to keep track of the game board.
// NOTE: "pX" means NO tile present on that drop zone.
var gameboard = [
  {"id": "drop0",  "tile": "pX"},
  {"id": "drop1",  "tile": "pX"},
  {"id": "drop2",  "tile": "pX"},
  {"id": "drop3",  "tile": "pX"},
  {"id": "drop4",  "tile": "pX"},
  {"id": "drop5",  "tile": "pX"},
  {"id": "drop6",  "tile": "pX"},
  {"id": "drop7",  "tile": "pX"},
  {"id": "drop8",  "tile": "pX"},
  {"id": "drop9",  "tile": "pX"},
  {"id": "drop10", "tile": "pX"},
  {"id": "drop11", "tile": "pX"},
  {"id": "drop12", "tile": "pX"},
  {"id": "drop13", "tile": "pX"},
  {"id": "drop14", "tile": "pX"}
];


/**
 * Determines current word and score
 *
 */
function findWord() {
  var word = "";
  var score = 0;

  // Go through the whole game board and generate a possible word.
  for(var i = 0; i < 15; i++) {
    if(gameboard[i].tile != "pX") {
      word += findLetter(gameboard[i].tile);
      score += findScore(gameboard[i].tile);
    }
  }

  // Factor in the doubling of certain tiles. Since the shouldDouble() function returns 0 or 1,
  score += (score * shouldDouble());

  // Put the score of the dropped tile into the HTML doc.
  $("#score").html(score);

  // If the word is not empty, show it on the screen!
  if(word != "") {
    $("#word").html(word);
    return;
  }

  // Otherwise the word is now blank.
  $("#word").html("____");
}


// Determine whether to double the word score or not.
// Returns 1 for YES or 0 for NO.
function shouldDouble() {
  if(gameboard[2].tile != "pX") {
    return 1;
  }
  if(gameboard[12].tile != "pX") {
    return 1;
  }

  return 0;
}


/**
 *    Given a letter, will return the letter's score based on
 *    the value in the pieces.json file.
 *
 */
function findScore(givenID) {
  // First figure out which letter we have.
  var letter = findLetter(givenID);
  var score = 0;

  // Since each "letter" is actually a spot in an array in the pieces.json file,
  // we gotta look at each object in the array before we can look at stuff.
  for(var i = 0; i < 27; i++) {
    // Get an object to look at.
    var obj = pieces[i];

    // See if this is the right object.
    if(obj.letter == letter) {
      score = obj.value;

      // Need to determine if this piece is a DOUBLE or not.
      score += (score * shouldDoubleLetter(givenID));

      return score;
    }
  }

  // If we get here, then we weren't given a nice valid letter. >:(
  return -1;
}


// Given a tile ID, figures out which dropID this is and whether to double the
// letter score or not.
// Returns 1 for YES or 0 for NO.
function shouldDoubleLetter(givenID) {
  // Figure out which dropID this tile belongs to.
  var dropID = findTilePos(givenID);

  // Is this dropID a double spot or not?
  if(dropID == "drop6" || dropID == "drop8") {
    // YES, return 1.
    return 1;
  }

  // Otherwise, NO, so return 0.
  return 0;
}


// Given a piece ID will return which letter it represents

function findLetter(givenID) {
  // Go through the 7 pieces,
  for(var i = 0; i < 7; i++) {
    // If we found the piece we're looking for, awesome!
    if(gameTiles[i].id == givenID) {
      // Just return its letter!
      return gameTiles[i].letter;
    }
  }

  // If we get here, we weren't given a nice draggable ID like "piece1", so return -1
  return -1;
}


// Give this function a droppable ID and it returns which position in the array it is.
function findBoardPos(givenID) {
  for(var i = 0; i < 15; i++){
    if(gameboard[i].id == givenID) {
      return i;
    }
  }

  // Errors return -1.
  return -1;
}


// Given a tile, figure out which dropID it belongs to.
function findTilePos(givenID) {
  for(var i = 0; i < 15; i++){
    if(gameboard[i].tile == givenID) {
      return gameboard[i].id;
    }
  }

  // Errors return -1.
  return -1;
}


/**
 *    This function loads up the scrabble pieces onto the rack.
 *    It also makes each of them draggable and sets various properties, including
 *    the images location and class / ID.
 *
 *    the tile IDs are in the form "piece#", where # is between 1 and 7.
 *
 */
function loadScrabblePieces() {
  // I'm so used to C++ that I like defining variables at the top of a function. *shrugs*
  var baseUrl = "img/Scrabble_Tile_";   // base URL of the image
  var randomNum = 1;
  var piece = "<img class='pieces' id='piece" + i + "' src='" + baseUrl + randomNum + ".jpg" + "'></img>";
  var pieceID = "";
  var wPiece = "";

  // Load up 7 pieces
  for(var i = 0; i < 7; i++) {
    // Get a random number so we can generate a random tile. There's 27 tiles,
    // so we want a range of 0 to 26. Also make sure not to over use any tiles,
    // so generate multiple random numbers if necessary.
    var loop = true;
    while(loop == true){
      randomNum = getRandomInt(0, 26);

      // Need to make sure we remove words from the pieces data structure.
      if(pieces[randomNum].amount != 0) {
        loop = false;
        pieces[randomNum].amount--;
      }
    }



    // Make the img HTML and img ID so we can easily append the tiles.
    piece = "<img class='pieces' id='piece" + i + "' src='" + baseUrl + pieces[randomNum].letter + ".jpg" + "'></img>";
    pieceID = "#piece" + i;
    gameTiles[i].letter = pieces[randomNum].letter;

    // Reposition the tile on top of the rack, nicely in a row with the other tiles.

    // We first get the rack's location on the screen. Idea from a Stackoverflow post,
    // URL: https://stackoverflow.com/questions/885144/how-to-get-current-position-of-an-image-in-jquery
    var pos = $("#theRack").position();

    // Now figure out where to reposition the board piece.
    // For left, the -200 shifts the tiles over 200px from the edge of the rack. the (50 * i) creates 50px gaps between tiles.
    // For top, the -130 shifts the tiles up 130px from the bottom of the rack.
    var imgLeft = -165 + (50 * i);
    var imgTop = -130;

    // Load onto the page and make draggable.
    // Add the piece to the screen
    $("#rack").append(piece);

    // Move the piece relative to where the rack is located on the screen.
    $(pieceID).css("left", imgLeft).css("top", imgTop).css("position", "relative");

    // Make the piece draggable.
    $(pieceID).draggable();
  }
}


/**
 *    Function will load up targets for the images to be dropped onto.
 *
 */
function loadDroppableTargets() {
  var imgURL = "img/Scrabble_Droppable.png";   // URL of the image
  var drop = "<img class='droppable' id='drop" + i + "' src='" + imgURL + "'></img>";
  var dropID = "#drop" + i;

  for(var i = 0; i < 15; i++) {
    drop = "<img class='droppable' id='drop" + i + "' src='" + imgURL + "'></img>";
    dropID = "#drop" + i;

    // ** The position stuff is similar to the tile function above. **
    // Get board location.
    var pos = $("#the_board").position();

    // Figure out where to put the droppable targets.
    var imgLeft = 0;
    var imgTop = -125;

    // Add the img to the screen.
    $("#board").append(drop);

    // Reposition the img relative to the board.
    $(dropID).css("left", imgLeft).css("top", imgTop).css("position", "relative");

    // Make the img droppable
    $(dropID).droppable({
      // Found this on the jQuery UI doc page, at this URL: https://jqueryui.com/droppable/#default
      // When a tile is placed on a droppable zone, set the gameboard var to hold that tile.
      drop: function(event, ui) {
        // To figure out which draggable / droppable ID was activated, I used this sweet code
        // from stackoverflow:
        // https://stackoverflow.com/questions/5562853/jquery-ui-get-id-of-droppable-element-when-dropped-an-item
        var draggableID = ui.draggable.attr("id");
        var droppableID = $(this).attr("id");

        // Log this stuff for debugging.
        console.log("Tile: " + draggableID + " - dropped on " + droppableID);

        // Mark that a tile was dropped in the gameboard variable.
        gameboard[findBoardPos(droppableID)].tile = draggableID;

        // Figure out what word, if any, the user currently entered.
        findWord();
      },
      // When a tile is moved away, gotta remove it from the game board.
      // Helpful info: https://api.jqueryui.com/droppable/#event-out
      out: function(event, ui) {
        var draggableID = ui.draggable.attr("id");
        var droppableID = $(this).attr("id");

        // See if this is a false alarm - someone moving tiles over this one by mistake.
        // This is necessary to prevent "removing" of tiles by accident if another tile
        // clips one that isn't being removed.
        if(draggableID != gameboard[findBoardPos(droppableID)].tile) {
          // We found that someone did not actually move the tile outside of
          // the drop zone, so this was clearly a mistake (clipping issue likely)
          // So just log it and return to prevent accidently removing a valid tile.
          console.log("FALSE ALARM DETECTED.");
          return;
        }

        // Log this stuff for debugging.
        console.log("Tile: " + draggableID + " - removed from " + droppableID);

        // Mark that a tile was removed in the gameboard variable.
        gameboard[findBoardPos(droppableID)].tile = "pX";

        // Update the word that was just found.
        findWord();
      }
    });
  }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
