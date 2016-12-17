function RemoveEnlarge() {
    //If gallery is open, don't allow scroll on body
    if (!(document.getElementsByClassName('gallery-wrapper')[0].className.indexOf("visible-gallery") > -1)) {
        document.getElementsByTagName("body")[0].classList.remove("remove-scroll");
    }
    //Remove enlarge wrapper
    var background = document.getElementById("enlarge-background");
    background.style.display = "none";
    //Remove the enlarged image
    var el = document.querySelector('.enlarge');
    el.parentNode.removeChild(el);
}

function EnlargeImage(id) {

    document.getElementsByTagName("body")[0].className = "remove-scroll";
    //Get height for img enlarge bacground
    var height = document.getElementsByTagName("body")[0].offsetHeight;
    var background = document.getElementById("enlarge-background");
    background.style.display = "block";
    background.style.height = height + "px";

    //Create the enlarged image
    var imgsrc = document.getElementById(id).getAttribute("src");

    //Create new image element to get height for center align
    var img = new Image();
    img.src = imgsrc;

    var imgPreview = document.createElement("img");
    imgPreview.setAttribute("src", imgsrc);
    imgPreview.setAttribute("alt", "");
    imgPreview.className = "enlarge";
    imgPreview.style.marginLeft = "-" + ((img.width / 2) + 5) + "px";
    imgPreview.style.marginTop = "-" + ((img.height / 2) + 5) + "px";

    //Append it to the body
    document.getElementsByTagName('body')[0].appendChild(imgPreview);
}