/**
 * 
 * @param {function} action the function to be called when the arrow is clicked (required)
 * @param {string} title title on the arrow (optional)
 * @param {string} classname class name to be able to identify the arrow (optional)
 */
var Arrow = function(action,title,classname) {
    this.obj = document.createElement("div");
    this.obj.classList.add("arrow");

    var text = document.createElement("h2");
    this.obj.classList.add(classname);
    text.innerHTML = title;

    this.obj.addEventListener("click",action);
    this.obj.appendChild(text);
}