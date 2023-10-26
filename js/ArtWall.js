/**
 * An artwall that displays artworks from the Art Institute of Chicago's API
 * The artworks and their respective info boards can be shown closer and navigated between
 * @param {number} page the page number that should be shown (required) 
 * @param {number} limit the number of artworks that will be shown per page (optional)
 * @param {string} q a search word that the art will be filtered by (optional)
 */
var ArtWall = function(page,limit,q) {
    var self = this;

    /**
     * Boolean that tells if the room if zoomed in on or not
     * @type {boolean} 
     */
    this.zoom = false;
    /**
     * Element representing the artwall, containing all the artworks
     * @type {Element}
     */
    this.art = document.createElement("div");
    this.art.classList.add("art");

    if (q) {
        q = "/search?q=" + q + "&";
    } else q = "?";

    /**
     * Self initiating method that makes a request to attain artworks when a new room is created
     * If the request fails the function calls in itself up to five times to try and solve the issue
     */
    (function requestArtwork(i = 0) {
        let request = new XMLHttpRequest();
        request.open("GET","https://api.artic.edu/api/v1/artworks" + q + "limit=" + limit + "&page=" + page + "&fields=id,title,image_id,place_of_origin,dimensions,artist_title,style_titles,category_titles,classification_title",true);
        request.send(null);
        request.onreadystatechange = function () {
            if (request.readyState == 4) 
                if (request.status == 200) { 
                    createArtwork(request.responseText);
                } else {
                    if (i < 5) {
                        i++;
                        requestArtwork(i)
                    }
                    console.log("Request was unsuccessfull, no art pieces could be found");
                    console.log("Status code: " + request.status);
                    document.innerHTML = "Request was unsuccessfull, no art pieces could be found<br>Status code: " + request.status;
                }
        };
    })();
    

    /**
     * Shows the artworks on the artwall
     * Recieves the response with information about the artworks, creates new instances of Artwork and 
     * @param {JSON} response the request response
     */
    function createArtwork(response) {
        response = JSON.parse(response);
        var art = response.data;

        for (let i = 0; i < art.length;i++) {
            if (art[i].image_id !== null) {
                var url = response.config.iiif_url + "/" + art[i].image_id + "/full/400,/0/default.jpg";
            } else url = "./img/no-picture.png";
            var artwork = new Artwork(url,art[i]);
            self.addEvents(artwork);
            self.addNav(artwork);
        }
    }    
}

/**
 * Adds the navigation to change view/go between artworks
 * @param {object} art the artwork that is showing
 */
ArtWall.prototype.addNav = function(art) {
    var self = this;
    var art = art.artwork;
    var arrowA = new Arrow(function() {self.hideNav(art); self.showArtwork(art);},"","arrowA");
    art.appendChild(arrowA.obj);

    var arrowB = new Arrow(function() {self.showRoom(); self.hideNav();},"","arrowB");
    art.appendChild(arrowB.obj);

    var arrowN = new Arrow(function() {self.showArtwork(art.nextSibling);},"","arrowN");
    art.appendChild(arrowN.obj);

    var arrowP = new Arrow(function() {self.showArtwork(art.previousSibling);},"","arrowP");
    art.appendChild(arrowP.obj);
}

/**
 * Method to show the appropriate arrows to navigate the object
 * @param {object} art the artwork that is shown
 * @param {string} type the part of the artwork that is shown (art/info)
 */
ArtWall.prototype.showNav = function(art,type) {
    if (this.zoom == true) {
        this.hideNav(art,type);
        this.zoom = false;
    }
    if (this.zoom == false) {
        this.zoom = true;
        var arrows = art.getElementsByClassName("arrow");
        switch (type) {
            case "art":
                arrows[1].style.display ="block";
                if (art.nextSibling) arrows[2].style.display ="block";
                if (art.previousSibling) arrows[3].style.display ="block";
                break;
            case "info":
                arrows[0].style.display ="block";
                break;         
        }
    }
}

/**
 * Method that hides the navigation when it's not supposed to be shown/is unnessecary
 */
ArtWall.prototype.hideNav = function() {
    var arrows = this.art.getElementsByClassName("arrow");
    for (let i = 0; i < arrows.length; i++) {
        arrows[i].style.display = "none";
    }
}

/**
 * Method to add eventlisteners to the artworks
 * @param {Element} art the current artwork
 */
ArtWall.prototype.addEvents = function(art) {
    var self = this;
    if (!art.frame) {
        setTimeout(function() {
            self.addEvents(art);
        },0);
    } else {
        art.artInfo.elem.addEventListener("click",function() {self.showArtInfo(art)});
        art.artInfo.elem.classList.add("clickable");
        art.frame.frame.addEventListener("click",function() {self.showArtwork(art.artwork)});
        art.frame.frame.classList.add("clickable");
    }
}

/**
 * zooms in and show a specific artwork
 * @param {Element} art the current artwork
 */
ArtWall.prototype.showArtwork = function(art) {  
    this.showNav(art,"art");
    var body = document.getElementsByTagName("body")[0];
    var x = body.offsetWidth/2-art.offsetLeft-art.offsetWidth/2;
    body.classList.add("show");
    body.style.transform = "scale(4) translate(" + x + "px)";
    art.classList.remove("artHover");
}

/**
 * Zooms in and shows a specific artworks info board
 * @param {*} art the current artwork
 */
ArtWall.prototype.showArtInfo = function(art) {
    this.zoom = true;
    this.showNav(art.artwork,"info");
    var body = document.getElementsByTagName("body")[0];
    var x = body.offsetWidth/2-art.artwork.offsetLeft-art.artwork.offsetWidth/2-art.artInfo.elem.offsetWidth;
    body.style.transform = "scale(11) translate(" + x + "px)";
    body.classList.add("show");    
}

/**
 * Zooms out to show the whole room
 */
ArtWall.prototype.showRoom = function() {
    this.zoom = false;
    var body = document.getElementsByTagName("body")[0];
    body.style.transform = "scale(1) translate(0px)";
    this.art.childNodes.forEach(artwork => {
        artwork.classList.add("artHover");
    });
}
