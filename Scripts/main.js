
// This is run when DOM is loaded.  Currently, we start the game straigh away.

$(function () {
    var currentGame;
    window.gameSystem.init();
    startGame();

    function startGame() {
        window.gameSystem.start();
    }

});