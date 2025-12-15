📁 File StructureThe project is structured with three core files and an asset directory:

/memory-game-project

├── index.html          # Main HTML structure

├── style.css           # Custom CSS for flip animation and fonts

├── flip.js             # Core game logic and interactivity

└── assets/

├── batman.png

├── blackpanther.png

├── captainamerica.png

├── hulk.png

├── ironman.png

├── spiderman.png

├── superman.png

├── thor.png

└── fr.jpg          # The front-face image for the cards


---------------------------------------------------------------------------


💻 Setup and Dependencies:

* This project is a standalone web page and requires no server-side setup.

1. Save the files: Ensure your index.html, style.css, and flip.js files
are saved in the same directory, with the correct paths to the assets
folder.

2. Open: Simply open the index.html file in any modern web browser.

Dependencies:
Tailwind CSS (Browser Script): The HTML includes a link to the
standalone Tailwind CSS browser script for utility class styling.

HTML
<script src = "https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>

Google Font: The Monoton font is imported via the CSS for0 the title.

--------------------------------------------------------------------------

📄 HTML (index.html) Breakdown

The HTML sets up the games structure and the individual card elements.

ID/Class ---------> Description ---------------------------> Tailwind Classes (Example)

memory_game ----> Main container for the entire game.  ----> w-screen h-screen bg-cyan-950 p-10
                  

header ----> Container for the title and restart button. ----> h-[18%]
                  

restart_btn ----> Button to reset and  shuffle the game. ----> bg-gradient-to-r from-indigo-700...
                 

card_container ---->  Grid layout for the memory cards. ----> grid grid-cols-4 h-[82%] gap-3
                  

flip_card ----> Each individual card.Holds the front and back images. The data-framework attribute is crucial  for matching logic. --->
w-[auto] h-[90px]relativehover:scale-95 
                   
                 
.back ----->  The image shown when the card is flipped (the superhero). ----> "src = ""./assets/batman.png"""           

.front -----> The image shown when the card is unflipped (the default card cover). -----> "src = ""./assets/fr.jpg"""      


-----------------------------------------------------------------------------------------------------------

🎨 CSS (style.css and Tailwind) Breakdown

Styling is achieved using a combination of custom CSS 
(primarily for the flip effect) and Tailwind utility classes.

Custom CSS for Card Flip
The magic of the 3D flip effect is handled by a few key CSS properties:

--> .flip_card:

          * transform-style: preserve-3d;: Ensures the children (.front and .back) participate in the 3D space when flipped.

          * transition: transform 0.6s;: Defines the smooth animation duration for the flip.
 
--> .flip_card img:

          * backface-visibility: hidden;: Hides the back side of an image element when it is rotated away from the viewer.

--> .flip_card .back:

          * transform: rotateY(180deg);: Pre-rotates the back image so it is hidden face-down initially.

--> .flip_card.flip:

          * transform: rotateY(180deg);: The active class added by JavaScript to trigger the card flip animation.

-------------------------------------------------------------------------------------------------------------------------------------------

🧠 JavaScript (flip.js) Breakdown:

The JavaScript file contains all the core logic for the game, including flipping,
matching, locking the board, and shuffling.

Core Variables:

Variable ----------> Type ---------> Description

cards -------------> NodeList -----> All elements with the class .flip_card.

hasFlippedCard       Boolean ------> Tracks if the first card of a pair has been flipped (true) or if no cards are flipped (false).

"firstCard, 
secondCard"------>  Element -------> Stores the two card elements currently flipped for comparison.

lockBoard -------> Boolean ------> Prevents players from flipping a third card while the first two are being checked or unflips are in progress.


Key Functions:

Function -----------------> Description ---------------------> Implementation Details

shuffle() ----> Randomizes the order of the cards. -----> Assigns a random order CSS property (1-12) to each card within the flex/grid container. This is run immediately when the page loads (IIFE) and upon restart. 
                            

flipCard() -----> Toggles the .flip class on a card. ------> This is the primary event handler. It assigns the card to firstCard or secondCard, and then
calls checkForMatch() if secondCard is defined.
                                                       
checkForMatch() ------> Compares the two flipped cards. -----> Checks if firstCard.dataset.framework === secondCard. dataset.framework. Calls disableCards() on a match, or unflipCards() on a mismatch.

disableCards() ----> Handles a successful match. -----> Removes the click event listeners from the two matched cards, making them permanently face-up. Calls resetBoard().

unflipCards() -----> Handles a mismatch. -----> Sets lockBoard = true, waits 1000ms (1 second) for the player to see the mismatched cards, removes the .flip class, sets lockBoard = false, and then calls resetBoard().

resetBoard() -----> Resets variables for the next -----> Sets hasFlippedCard to false, firstCard and secondCard to null. turn.

restartBtn.addEventListener() -----> Restart logic. ------> On click, it unflips all cards, resets the board state, re-enables click listeners on all cards (via enableCards()), and then calls shuffle() after a short delay (1500ms) to allow the unflip animation to complete.

------------------------------------------------------------------------------------------------------------------------------------

🎮 How to Play:

--> The game starts with all cards face-down and shuffled.

* Click on any card to flip it over.

* Click on a second card.

* If the cards match (same superhero/data-framework), they will remain face-up.

* If the cards do not match, they will automatically flip back over after 1 second.

* The goal is to find all 8 pairs.

* Click the RESTART button to reset the game and shuffle the cards.
