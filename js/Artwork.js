/**
 * Class representing an artwork
 * An artwork contains a piece of art and a infoboard with information about the artpiece
 * @param {string} url 
 * @param {object} data 
 */
var Artwork = function(url,data) {
    this.data = data;
    var self = this;
    var art = document.getElementsByClassName("art")[0];
    this.frame = null;

    /**
     * Self initiating constructor method 
     * @returns {null}
     */
    (function createArtwork() {
        self.artwork = document.createElement("div");
        self.artwork.classList.add("artwork");
        art.appendChild(self.artwork);
        self.image = document.createElement("img");
        self.image.src = url;
        self.image.classList.add("artImg")  ;      
        self.artwork.appendChild(self.image);
        self.artwork.id = data.title;

        var label = document.createElement("div");
        label.classList.add("popLabel");
        label.innerHTML = self.artwork.id;
        self.artwork.appendChild(label);
        self.artwork.classList.add("artHover");

        addFrame();
        self.addInfo();        
    })();
    
    /**
     * The method adds a frame to the artpiece
     * Checks if the image is loaded and if so, adds a frame to the current image, otherwise is calls on itself to try again until it works
     * @returns {null}
     */
    function addFrame(){
        if(self.image.complete && self.image.naturalHeight !== 0) { 
            self.frame = new Frame(self.image);
            self.frame.frame.classList.add("frameHover");
            self.artwork.appendChild(self.frame.frame);
        } else setTimeout(addFrame,0);
    }
}    

/**
 * Creates a new information board and puts it in the artwork
 * @returns {null}
 */
Artwork.prototype.addInfo = function() {
    this.artInfo = new ArtInfo(this.data); 
    this.artwork.appendChild(this.artInfo.elem);    
}
