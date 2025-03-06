// Buttons:
// Randomize all, clear all
// Randomize P1 D1, P1 D2, P2 D1, P2 D2

let defaultColors = ["Blue", "Green", "Red", "Black", "White"];
let defaultDecks = {
  Blue: [
    "Above the Clouds (4) - JS20",
    "Archaeology (4) - JS20",
    "Bookworms (2) - JS25",
    "Detective (4) - JS22",
    "Faeries (2) - JS22",
    "Inventive (1) - JS22",
    "Inventive (2) - JS25",
    "Pirates - FDN",
    "Soaring (1) - JS25",
    "Soaring (4) - JS25",
    "Spirits (1) - JS20",
    "Under the Sea (1) - JS20",
    "Well-Read (1) - JS20",
    "Wizards (1) - JS20",
    "Wizards (1) - JS25",
    "Wizards - FDN"
  ],
  Green: [
    "Dinner - JS25",
    "Dinosaurs (3) - JS20",
    "Elves - FDN",
    "Elves (4) - JS22",
    "Elves (4) - JS25",
    "Explorers (4) - JS25",
    "Insects (1) - JS22",
    "Gigantic (1) - JS22",
    "Landfall (2) - JS25",
    "Landfall (4) - JS25",
    "Plus One (1) - JS20",
    "Primal - FDN",
    "Multi-Headed (1) - JS22",
    "Tree-Hugging (2) - JS20",
    "Tree-Hugging (3) - JS20",
    "Walls - JS20"
  ],
  Red: [
    "Chandra - JS20",
    "Devilish (3) - JS20",
    "Experimental (2) - JS22",
    "Fiery (1) - JS22",
    "Goblins (1) - JS20",
    "Goblins (4) - JS22",
    "Goblins - FDN",
    "Inferno - FDN",
    "Raid (1) - JS22",
    "Smashing (3) - JS20",
    "Spellcasting (2) - JS20",
    "Zealots (2) - JS25",
    "Zealots (3) - JS25"
  ],
  Black: [
    "Boneyard (2) - JS22", 
    "Clerics (2) - JS25",
    "Clerics (4) - JS25",
    "Discarding (2) - JS20",
    "Ghastly (3) - JS25",
    "Gross (1) - JS22",
    "Icky (2) - JS25",
    "Liliana - JS20",
    "Morbid (1) - JS22",
    "Minions (1) - JS20",
    "Ne'er-Do-Wells (2) - JS25",
    "Undead - FDN",
    "Vampires (3) - JS25",
    "Witchcraft (2) - JS20",
    "Zombies (1) - JS22",
    "Zombies (3) - JS22"
  ],
  White: [
    "Angels (2) - JS25",
    "Armed (3) - JS25",
    "Blink (1) - JS22",
    "Cats (2) - JS22",
    "Constellation (1) - JS22",
    "Enchanted (1) - JS25",
    "Enchanted (2) - JS25",
    "Feathered Friends (1) - JS20",
    "Giddyap - JS25",
    "Healing - FDN",
    "Heavily Armored (2) - JS20",
    "Holy (3) - JS22",
    "Holy (4) - JS22",
    "Legion (4) - JS20",
    "Stalwart (1) - JS25",
    "Teamwork (1) - JS22"
  ],
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