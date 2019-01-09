$(document).ready(init);
function init(){
    $("#clickSearch").click(toggleSearch);
}
function toggleSearch(){
    $("#inputSearch").toggle();
}