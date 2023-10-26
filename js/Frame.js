/**
 * Class representing a frame
 * The frame is adjusted to fit the image that is sent with the call
 * @param {Element} artImg element that needs a frame
 */
var Frame = function(artImg) {
    var height = artImg.height;
    var width = artImg.width;
    var img = "";

    //  the type of frame is chosen according to the image proportions
    if (width < height) {
        if (height-width < 25) {
            img = './img/frame-rectangular.png';
        } else {
            img = './img/frame-high.png';
        }
    } else if (width-height < 25) {
        img = './img/frame-rectangular.png';
    } else img = './img/frame-wide.png';

    this.frame = document.createElement("img");
    this.frame.classList.add("artFrame");
    this.frame.src = img;
    this.frame.style.width = artImg.width + 30 +"px";
    this.frame.style.height = artImg.height + 30 + "px";
}