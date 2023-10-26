/**
 * Class representing a room and it's content
 * A room is created with the DOM and an Artwall is added to the wall
 * @param {number} id the room-number 
 */
var Room = function(id) {
    var self = this;
    /**
     * the room-number
     * @type {number}
     */
    this.id = id;

    /**
     * Self initiating constructor method that creates a room in the DOM
     */
    (function createRoom() {
        var main = document.createElement("main");
        var body = document.getElementsByTagName("body")[0];
        var width = body.offsetWidth;
        main.id = id;
        body.appendChild(main);

        var limit = 5;
        if(width<1200) {
            limit = 3;
        } else if(width<1500) limit = 4;

        var wall = new ArtWall(id,limit,Lobby.search);
        main.appendChild(wall.art);

        self.ceiling = document.createElement("div");
        self.ceiling.classList.add("head");
        main.appendChild(self.ceiling);

        self.floor = document.createElement("div");
        self.floor.classList.add("floor");
        main.appendChild(self.floor);
    })();
}

