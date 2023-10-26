/**
 * Class representing a information board
 */
var InfoBoard = function() {
}

/**
 * Creates a new infoboard containing an area for the information and a background image showing a board
 */
InfoBoard.prototype.createInfoBoard = function() {
    this.elem = document.createElement("div");
    this.elem.style.backgroundImage = "url('./img/info-sign2.png')";
    this.elem.classList.add("infoBoard");
    this.infoArea = document.createElement("div");
    this.infoArea.classList.add("infoArea");
    this.title = document.createElement("h1");
    this.infoArea.appendChild(this.title);
    this.elem.appendChild(this.infoArea);
}
