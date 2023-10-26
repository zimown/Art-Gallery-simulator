/**
 * Static class representing the art gallery's lobby
 */
var Lobby = {
    /**
     * The search word the user writes
     * @type {string}
     */
    search : null,
    /**
     * The Lobby id, it is always 0
     */
    id : 0,
    main : null,

    /**
     * Creates the lobby and its content in the DOM
     * @returns {null}
     */
    createLobby : function() {
        var headboard = document.createElement("header");
        var hi = document.createElement("h1");
        var nav = document.createElement("nav");
        nav.id = "navigation";
        Lobby.main = document.createElement("main");
        document.getElementsByTagName("body")[0].appendChild(Lobby.main);
        Lobby.main.appendChild(nav);

        headboard.id = "headboard";
        Lobby.main.style.background = "url('./img/lobby.jpg') center no-repeat";
        Lobby.main.style.backgroundSize = "cover";
        Lobby.main.appendChild(headboard);
        hi.innerHTML = "Welcome to a virtual representation of <br>the Art Institute of Chicago";
        headboard.appendChild(hi);

        var pipe = document.createElement("img");
        pipe.classList.add("pipe");
        nav.appendChild(pipe);
    
        var boardContent = document.createElement("div");
        boardContent.id = "lobbyBoard";
        Lobby.board = new GalleryInfo();
        Lobby.board.elem.addEventListener("click",Lobby.showBoard);
        Lobby.board.elem.classList.add("clickable")
        boardContent.appendChild(Lobby.board.elem);
        Lobby.main.appendChild(boardContent);

        Lobby.arrowG = new Arrow(function() {Lobby.showLobby()},"","arrowG");
        boardContent.appendChild(Lobby.arrowG.obj);
        
        var enter = new Arrow(Gallery.nextRoom,"ENTER","arrowE");
        nav.appendChild(enter.obj);
    },

    /**
     * The method is called when the board is clicked and then zoomes in on the galleryBoard
     * @param {Event} e 
     * @returns {null}
     */
    showBoard : function(e) {
        var body = document.getElementsByTagName("body")[0];
        var x = body.offsetHeight/2 - this.offsetTop - this.offsetHeight/1.5;
        body.style.transform = "scale(2.5) translateY(" + x + "px)";
        body.classList.add("show");
        Lobby.arrowG.obj.style.display = "block";
        Lobby.board.elem.style.opacity = "1";
        Lobby.board.elem.style.ba = "1";
        Lobby.board.elem.removeEventListener("click",Lobby.showBoard);
    },

    /**
     * The method zoomes out the picture, showing the whole lobby
     * @param {Event} e 
     * @returns {null}
     */
    showLobby : function(e) {
        var body = document.getElementsByTagName("body")[0];
        body.style.transform = "scale(1) translateY(0px)";
        Lobby.arrowG.obj.style.display = "none";
        setTimeout(function(){Lobby.board.elem.addEventListener("click",Lobby.showBoard)},0);
    },
}
