/**
 * Class representing a infoboard with information about the artpiece
 * @param {String} info 
 */
var ArtInfo = function(info) {
    InfoBoard.call(this);
    this.createInfoBoard();
    this.elem.classList.add("artBoard");
    var self = this;
    this.info = info;

    /**
     * Self initiating constructor method that creates  the board and fills it with the information
     */
    (function createArtInfo() {
        var info = self.info;
        self.title.innerHTML = info.artist_title;
    
        var infoText = {"Title": info.title,"Origin":info.place_of_origin,"Style":info.style_titles,"Art type":info.classification_title,"category":info.category_titles[0],"Dimensions": info.dimensions};
    
        for (var info in infoText) {
            if (infoText[info] == null ||infoText[info].length == 0) {
                infoText[info] = "unknown";
            }
            var text = document.createElement("p");
            text.innerHTML = info + ": " + infoText[info];
            self.infoArea.appendChild(text);
        }
    })();
}
ArtInfo.prototype = Object.create(InfoBoard.prototype);
ArtInfo.prototype.constructor = ArtInfo;