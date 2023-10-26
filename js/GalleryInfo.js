/**
 * Class that extends the InfoBoard class and represents a board with the Gallery information
 * Creates the elements that makes up the board provides information about the gallery
 */
var GalleryInfo = function() {
    InfoBoard.call(this);
    var self = this;
    this.createInfoBoard();
    this.elem.classList.add("galleryBoard");

    /**
     * Self initiating constructor method that creates the info board
     * @returns {null}
     */
    (function createGalleryInfo() {
        self.title.innerHTML = "the Art Intitute of Chicago";
    
        var text = document.createElement("p");
        text.innerHTML = "The Art Intitute of Chicago is one of the oldest and largest art museums in the world. Its collection, stewarded by 11 curatorial departents, is encyclopedic, and includes iconic works such as Georges Seurat's <i>A Sunday on La Grande Jatte</i>, Pablo Picasso's <i>The Old Guitarist</i> and Edward Hopper's <i>Nighthawks</i>.";
        self.infoArea.appendChild(text);
    
        var text = document.createElement("p");
        text.innerHTML = " Recognized for its curatorial efforts and popularity among visitors, the museum hosts approximately 1.5 million people annually. And now you have the opportunity to virtually see both their permanent collection of nearly 300,000 works of art as well as borrowed and traveling pieces!";
        self.infoArea.appendChild(text);    
    
        var btnText = document.createElement("p");
        btnText.innerHTML = "You can either enter the gallery as usual or search for a word, name or place and see what you will find.";
        self.infoArea.appendChild(btnText);

        createSearchBar();
    })();

    /**
     * Method that creates a search bar 
     */
    function createSearchBar() {
        var searchBar = document.createElement("div");
        searchBar.id = "searchBar";
        var input = document.createElement("input");
        input.addEventListener("click",function() {document.getElementById("searchBtn").classList.remove("check");})
        input.type = "text";
        input.id = "search";
        input.placeholder = "Monet, cats, statue..";
        input.title = "Search for an artist, place, category, thing etc.";
        searchBar.appendChild(input);
    
        var submit = document.createElement("div");
        submit.id = "searchBtn";
        submit.addEventListener("click",function() {search(input.value)});
        searchBar.appendChild(submit);
        self.infoArea.appendChild(searchBar);  
    }

    /**
     * Saves the search-word in the search-variable and shows the whole lobby
     * @param {string} searchWord 
     */
    function search(searchWord) {
        if(searchWord) {
            document.getElementById("searchBtn").classList.add("check");
            Lobby.search = searchWord;
            Gallery.position = 0;
            Lobby.showLobby();
        }
    }
}
GalleryInfo.prototype = Object.create(InfoBoard.prototype);
GalleryInfo.prototype.constructor = GalleryInfo;