var galleryImages = [];

function ShowGallery() {
    var galleryWrapper = document.getElementsByClassName('gallery-wrapper')[0];

    if (galleryWrapper.className.indexOf("visible-gallery") > -1) {
        galleryWrapper.classList.remove("visible-gallery");
        document.getElementsByClassName("btn-gallery")[0].style.marginRight = "0px";
        document.getElementsByTagName("body")[0].classList.remove("remove-scroll");
    } else {

        galleryWrapper.className += " visible-gallery";
        document.getElementsByClassName("btn-gallery")[0].style.marginRight = "380px";
        document.getElementsByTagName("body")[0].className = "remove-scroll";
    }
}

function AddToGallery(id) {
    //Get the gallery wrapper
    var gallery = document.getElementById('gallery');
    //Get img properties from grid
    var image = document.getElementById(id);
    var imgSrc = image.src;
    var imgId = "gallery-" + image.id;
    //Prevent adding image to gallery twice
    if (!(galleryImages.indexOf(imgId) > -1)) {
        //Create img wrapper
        var galleryImgWrapper = document.createElement("div");
        galleryImgWrapper.className = "gallery-img-wrapper";
        galleryImgWrapper.setAttribute("id", "wrapper-" + imgId);
        //Create img element
        var galleryImg = document.createElement("img");
        galleryImg.setAttribute("src", imgSrc);
        galleryImg.setAttribute("alt", "");
        galleryImg.setAttribute("id", imgId)
        galleryImg.setAttribute("onclick", "EnlargeImage('" + imgId + "')");
        galleryImg.setAttribute("data-gridimg", id);
        galleryImg.className = "gallery-img";
        //Create img remove btn
        var galleryRemoveBtn = document.createElement("button");
        galleryRemoveBtn.className = "btn-remove-from-gallery";
        galleryRemoveBtn.setAttribute("onclick", "RemoveFromGallery('" + imgId + "')");
        galleryRemoveBtn.innerHTML = "-";
        //Append everything to gallery wrapper
        gallery.appendChild(galleryImgWrapper);
        galleryImgWrapper.appendChild(galleryImg);
        galleryImgWrapper.appendChild(galleryRemoveBtn);
        HandleGalleryList(imgId);

        var button = image.parentNode.getElementsByTagName("button")[0];
        button.innerHTML = "ADDED";
    }
}

function RemoveFromGallery(id) {
    //Get id for image in grid
    var gridImageId = document.getElementById(id).dataset.gridimg;
    var imageWrapper = document.getElementById("wrapper-" + id);
    //Remove gallery children
    while (imageWrapper.firstChild) {
        imageWrapper.removeChild(imageWrapper.firstChild);
    }
    //Remove img wrapper
    var wrapper = document.querySelector("#wrapper-" + id);
    wrapper.parentNode.removeChild(wrapper);
    HandleGalleryList(id);
    //Manipulate button in grid
    var gridButton = document.getElementById(gridImageId).parentNode.getElementsByTagName("button")[0];
    gridButton.innerHTML = "+ GALLERY"

}

function HandleGalleryList(id) {
    if (galleryImages.indexOf(id) > -1) {
        galleryImages.splice(galleryImages.indexOf(id), 1);
    } else {
        galleryImages.push(id);
    }
    document.getElementById("galleryCount").innerHTML = galleryImages.length;
}