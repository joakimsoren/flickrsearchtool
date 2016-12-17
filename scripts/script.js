var page = 1;
var maxPage = 1;

function SubmitSearch(query) {

    if (query.length == 0) {
        ErrorHandler("Input field can't be empty!");
    } else {
        ResetGrid();
        RenderItems(query, 1);
    }
}


function RenderItems(query, page) {

    var url = UrlBuilder(query, page);

    RequestAsync(url,
        function(response) {

            if (response.photos.total > 0) {
                if (response.photos.pages > 1) {
                    document.getElementById("load-more").style.display = "block";
                    maxPage = response.photos.pages;
                }
                var wrapper = document.getElementById("grid");
                for (i = 0; i < response.photos.photo.length; i++) {
                    ImageBuilder(wrapper, 'https://farm' + response.photos.photo[i].farm + '.staticflickr.com/' + response.photos.photo[i].server + '/' + response.photos.photo[i].id + '_' + response.photos.photo[i].secret + '.jpg', response.photos.photo[i].id);
                }

            } else {
                ErrorHandler("No pictures was found!");
            }
        });
}

function RequestAsync(url, Callback) {

    var response = null;
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.send();
    xhr.onreadystatechange = function() {

        if (xhr.readyState == 4) {
            if (xhr.status == 200) //response is done and status is OK
            {
                Callback(JSON.parse(xhr.responseText));
            } else {
                ErrorHandler("Something went wrong making the request...");
            }
        }
    };
    return response;
}

function ImageBuilder(wrapper, imgSource, id) { //Getting the external image id from flickr as id on the img element in grid
    //Create the wrapper
    var imagewrapper = document.createElement("div");
    imagewrapper.className = "image-wrapper";
    //Create the img element with enlarge function
    var image = document.createElement("img");
    image.setAttribute("src", imgSource);
    image.setAttribute("alt", "");
    image.setAttribute("onclick", "EnlargeImage('" + id + "')");
    image.setAttribute("id", id)
    image.className = "grid-img";
    //Create the "add to galery button"
    var gallerybtn = document.createElement("button");
    gallerybtn.className = "btn-add-to-gallery";
    gallerybtn.setAttribute("onclick", "AddToGallery('" + id + "')");
    //Check if image exist in gallery
    if (galleryImages.indexOf("gallery-" + id) > -1) {
        gallerybtn.innerHTML = "ADDED";
    } else {
        gallerybtn.innerHTML = "+ GALLERY";
    }
    //Append everything to appropriate parent
    imagewrapper.appendChild(image);
    imagewrapper.appendChild(gallerybtn);
    wrapper.appendChild(imagewrapper);
}

function ResetGrid() {

    page = 1;
    maxPage = 1;
    document.getElementById("grid").innerHTML = "";
}

function UrlBuilder(query, page) {

    var apiKey = "71ebcc9671fd763181c14d0854bdb428";
    var url = "https://api.flickr.com/services/rest/?format=json&method=flickr.photos.search&nojsoncallback=1&per_page=25&safe_search=1&page=" + page + "&text=" + query + "&api_key=" + apiKey;
    return url;
}

function LoadMore() {

    if (page < maxPage) {
        page++;
        RenderItems(document.getElementById("searchQuery").value, page);
    }
}

function ErrorHandler(msg) {

    var wrapper = document.getElementById("grid");
    document.getElementById("grid").innerHTML = "";
    var errorElement = document.createElement("div");
    errorElement.className = "error-msg";
    errorElement.innerHTML = msg;
    wrapper.appendChild(errorElement);
}