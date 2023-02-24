function newElement() {
    var li = document.createElement("li")
    var input = document.getElementById("input").value
    if (input === "") {
        alert("Yout must provide a new item");
    }
    else {
        li.innerHTML = input;
        var span = document.createElement("span")
        span.id = "remove"
        span.innerHTML = "\u00D7"
        span.onclick = function (){
            let parent = this.parentNode;
            parent.remove();
        }
        li.appendChild(span);
        document.getElementById("list").appendChild(li);
        document.getElementById("input").value = "";
    }
}
function toggleCheck(ev) {
    if (ev.target.tagName === "LI") {
        ev.target.classList.toggle("checked")
    }
}
document.getElementById("list").addEventListener("click", toggleCheck);