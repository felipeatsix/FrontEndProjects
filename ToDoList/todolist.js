function newElement() {
    var li = document.createElement("li");
    var inputValue = document.getElementById("myInput").value;
    if (inputValue === '') {
        alert("You must write something!");
    }
    else {
        li.innerHTML = inputValue
        document.getElementById("myUL").appendChild(li);
    }
    document.getElementById("myInput").value = "";

    var span = document.createElement("span");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);

    let close = document.getElementsByClassName("close")
    for (var i = 0; i < close.length; i++) {
        close[i].onclick = function () {
            let item = this.parentNode;
            item.remove();
        }
    }
}
function toggleCheck(ev) {
    if (ev.target.tagName === "LI") {
        ev.target.classList.toggle("checked")
    }
}
var list = document.querySelector("ul");
list.addEventListener("click", toggleCheck);