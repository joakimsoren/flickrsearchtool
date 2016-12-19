
var searchQuery= document.getElementById('searchQuery');

searchQuery.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode == 13) {
        SubmitSearch(this.value);
    }
});

