var images = [
    "../assets/image.jpg",
    "../assets/image2.jpg",
    "../assets/image3.jpg",
    "../assets/image4.jpg",
    "../assets/image5.jpg"
];
var img = document.querySelector("img")
var currentIndex = 0;
var incrementIndex = function () {
    currentIndex = currentIndex + 1;
    if (currentIndex > images.length - 1) {
        currentIndex = 0
    };
    return currentIndex;
}
var decrementIndex = function () {
    currentIndex = currentIndex - 1;
    if (currentIndex < 0) {
        currentIndex = images.length -1
    };
    return currentIndex;
}
var nextButton = document.getElementById("next-button")
nextButton.onclick = function () {
    img.setAttribute('src', images[incrementIndex(currentIndex)]);
}
var prevButton = document.getElementById("prev-button")
prevButton.onclick = function () {
    img.setAttribute('src', images[decrementIndex(currentIndex)]);
}