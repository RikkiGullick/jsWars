// Let's make a new baddie!
// First we need to import the game instance (need to fully understand why, but every other file can see it! Presumably this will need to call it or update something in it?)

import Game from "../game/game.js";

// Now let's make the class. Needs to be importable, so will add the 'export default' in front of class.
export default class Enemy2 { 

    // Add all properties the object needs to have, including everything in the constructor, plus any other properties with primitive values that are always the same, like width and height. Let's start with just some real basics. 

    width = 0;
    height = 0;
    $element = null; // This will be our jQuery object. Might need to make a new CSS class for this. 

    // 

    constructor() {
        this.createElement(); // when the constructor function is run by the 'New Enemy2' thing, it will run createElement once. 
    }

    // Here's the function that creates our HTML entity. I've forgotten lots of jQuery! So rather than going to find a div and turn it into a jQuery object, this creates a div and turns it into a jQuery object. addClass then adds a class attribute with entity and enemy2. Had to cheat and look at enemy1 for this bit... 

    createElement() {
        this.$element = $('<div></div>').addClass('entity enemy2');
    }

    // Now, both enemies use this same function. Could I place this in entityManager and pass the class name I want when the constructor runs it? I will try this later.
}