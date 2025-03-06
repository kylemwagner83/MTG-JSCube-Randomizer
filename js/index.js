// Buttons:
// Randomize all, clear all
// Randomize P1 D1, P1 D2, P2 D1, P2 D2

let defaultColors = ["blue", "green", "red", "black", "white"];
let defaultDecks = {
  blue: ["d1", "d2", "d3"],
  green: ["d4", "d5"],
  red: ["d6", "d7", "d8"],
  black: ["d9", "d10", "d11"],
  white: ["d12", "d13"],
};

// Radio buttons:
// Prevent monocolor, allow monocolor, enforce monocolor
// clear picks on selection change

// if prevent monocolor: remove first color from 'allowedcolors' for second pick
// if allow monocolor: don't remove first color from 'allowedcolors' for second pick
// if enforce monocolor: remove all OTHER colors from allowedcolors for second pick

// Function to get the selected radio button value
function getSelectedColorOption() {
  const radioButtons = document.getElementsByName("colorOption");
  for (const radioButton of radioButtons) {
    if (radioButton.checked) {
      return radioButton.value;
    }
  }
  return null; // No radio button is selected
}

// Example usage
let colorOption = getSelectedColorOption();
// console.log("Selected color option:", colorOption);

// Add event listener to update the variable when the selection changes
document.querySelectorAll('input[name="colorOption"]').forEach((radio) => {
  radio.addEventListener("change", () => {
    colorOption = getSelectedColorOption();
    // console.log("Updated color option:", colorOption);
    clearAllPicks(); // Clear all picks when color option changes
  });
});

// Function to clear all deck picks
function clearAllPicks() {
  for (let pick in picks) {
    picks[pick] = "";
    document.getElementById(pick).value = "";
  }
}

const picks = {
  p1d1: "",
  p1d2: "",
  p2d1: "",
  p2d2: "",
};

let p1AllowedColors = defaultColors;
let p2AllowedColors = defaultColors;





/**
 * Updates allowed colors for both players based on the selected color option and current picks.
 */
function updateAllowedColors() {
  const colorOption = getSelectedColorOption();

  // Reset allowed colors to default
  p1AllowedColors = [...defaultColors];
  p2AllowedColors = [...defaultColors];

  // Update allowed colors based on the selected color option
  if (colorOption === "prevent") {
    if (picks.p1d1) {
      p1AllowedColors = p1AllowedColors.filter(color => color !== picks.p1d1.split(" ")[0]);
    }
    if (picks.p1d2) {
      p1AllowedColors = p1AllowedColors.filter(color => color !== picks.p1d2.split(" ")[0]);
    }
    if (picks.p2d1) {
      p2AllowedColors = p2AllowedColors.filter(color => color !== picks.p2d1.split(" ")[0]);
    }
    if (picks.p2d2) {
      p2AllowedColors = p2AllowedColors.filter(color => color !== picks.p2d2.split(" ")[0]);
    }
  } else if (colorOption === "enforce") {
    if (picks.p1d1) {
      p1AllowedColors = [picks.p1d1.split(" ")[0]];
    }
    if (picks.p1d2) {
      p1AllowedColors = [picks.p1d2.split(" ")[0]];
    }
    if (picks.p2d1) {
      p2AllowedColors = [picks.p2d1.split(" ")[0]];
    }
    if (picks.p2d2) {
      p2AllowedColors = [picks.p2d2.split(" ")[0]];
    }
  }
}

/**
 * Generates a random deck for a player.
 * @param {number} pnum - The player number (1 or 2).
 */
function generateRandomDeck(pnum) {
  updateAllowedColors();
  let availableDecks = [];
  for (const [color, outerValue] of Object.entries(defaultDecks)) {
    for (const value of outerValue) {
      availableDecks.push(color + " " + value);
    }
  }
  // Remove disallowed colors/decks from available decks
  let playerAllowedColors = pnum === 1 ? p1AllowedColors : p2AllowedColors;
  let availableDecksForPlayer = availableDecks.filter((deck) =>
    playerAllowedColors.includes(deck.split(" ")[0])
  );

  // Remove picks from available decks
  let allPicks = Object.values(picks);
  availableDecksForPlayer = availableDecksForPlayer.filter(
    (deck) => !allPicks.includes(deck)
  );

  let randomIndex = Math.floor(Math.random() * availableDecksForPlayer.length);
  return availableDecksForPlayer[randomIndex];
}

/**
 * Randomizes the deck pick for a player and updates the corresponding input box.
 * @param {number} playerNum - The player number (1 or 2).
 * @param {string} pickId - The ID of the pick (e.g., 'p1d1', 'p1d2').
 */
function randomizeDeckPick(playerNum, pickId) {
  const randomDeck = generateRandomDeck(playerNum);
  
  const inputElement = document.getElementById(pickId);
  inputElement.value = randomDeck;
  picks[pickId] = randomDeck;

  // Manually trigger the change event
  const event = new Event('change');
  inputElement.dispatchEvent(event);
}

function randomizeAllDecks() {
  // Reset allowed colors to default
  p1AllowedColors = [...defaultColors];
  p2AllowedColors = [...defaultColors];
  picks.p1d1 = "";
  picks.p1d2 = "";
  picks.p2d1 = "";
  picks.p2d2 = "";
  randomizeDeckPick(1, "p1d1");
  randomizeDeckPick(1, "p1d2");
  randomizeDeckPick(2, "p2d1");
  randomizeDeckPick(2, "p2d2");
}

// Add event listener to update allowed colors when a pick changes
document.addEventListener("DOMContentLoaded", () => {
  const pickInputs = document.querySelectorAll('input[name="pick"]');
  // console.log("Pick inputs found:", pickInputs.length);
  pickInputs.forEach((input) => {
    // console.log("Adding event listener to:", input);
    input.addEventListener("change", () => {
      // console.log("Pick changed:", input.value);
      updateAllowedColors();
      // console.log("Updated P1 Allowed Colors:", p1AllowedColors);
      // console.log("Updated P2 Allowed Colors:", p2AllowedColors);
    });
  });
});