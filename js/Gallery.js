/**
 * Static class representing the Art Gallery of Chicago
 * The class first shows the gallery and 
 */
var Gallery = {
    /**
     * The last shown room-id
     * @type {number}
     */
    position : 0,
    /**
     * The object that is representing the current room
     * @type {object}
     */
    room : null,

    /**
     * Initiates the Gallery by calling for the methods to create the lobby
     * @returns {null}
     */
    galleryInit : function() {
        Lobby.createLobby();
        Gallery.showLobby();
    },

    /**
     * Shows the lobby and if there's another room showing it is removed
     * @returns {null}
     */
    showLobby : function() {
        if (Gallery.position !== 0) {
            document.getElementsByTagName("body")[0].removeChild(document.getElementById(Gallery.room.id));
            Gallery.position--;
        } 
        Lobby.main.style.display = "grid";
        Gallery.room = Lobby;
    },

    /**
     * The method creates a new Room-object and adds arrows to navigate through the Gallery
     * @returns {null}
     */
    showRoom : function() {
        Gallery.room = new Room(Gallery.position);
        var arrowL = new Arrow(Gallery.previousRoom,"BACK","arrowL");
        var arrowR = new Arrow(Gallery.nextRoom,"NEXT","arrowR");
        var arrowH = new Arrow(Gallery.showLobby,"LOBBY","arrowH");
        var pipe = document.createElement("img");

        if (Gallery.position == 1) arrowL.obj.style.visibility = "hidden";
        Gallery.room.floor.appendChild(arrowL.obj);
        Gallery.room.floor.appendChild(arrowR.obj);
        pipe.classList.add("pipe");
        Gallery.room.ceiling.appendChild(pipe);
        Gallery.room.ceiling.appendChild(arrowH.obj);
    },

    /**
     * Shows the next room and hides the Lobby if it was shown before and otherwise the shown room is removed
     * @param {Event} e 
     * @returns {null}
     */
    nextRoom : function(e) {
        var id = Gallery.room.id;
        Gallery.position++;        
        Gallery.showRoom();

        if (id == 0) {
            Lobby.main.style.display = "none";
        } else {
            setTimeout(function() {document.getElementsByTagName("body")[0].removeChild(document.getElementById(id)),100});
        }
    },

    /**
     * Shows the previous room, if the first room is the one showing the method won't do anything otherwise the shown room is removed
     * @param {Event} e 
     * @returns {null}
     */
    previousRoom : function(e) {
        if (Gallery.position == 1) return;
        document.getElementsByTagName("body")[0].removeChild(document.getElementById(Gallery.room.id));
        Gallery.position--;
        Gallery.showRoom();
    }
}
window.addEventListener("load",Gallery.galleryInit);