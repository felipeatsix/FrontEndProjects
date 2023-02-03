var button = document.getElementById("button");
var list = document.getElementById("todoList");

var toggleCheck = function () {
    let parent = this.parentNode;
    parent.classList.toggle('checked')
};

var deleteItem = function () {
    let parent = this.parentNode;
    parent.remove();
}

var createItem = function (itemName) {
    var item = document.createElement("li");

    var checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.onclick = toggleCheck;

    var label = document.createElement("label");
    label.innerHTML = itemName;

    var button = document.createElement("button");
    button.class = "delete";
    button.innerHTML = "Delete";
    button.onclick = deleteItem;

    item.appendChild(checkBox);
    item.appendChild(label);
    item.appendChild(button);

    return item;
}

button.onclick = function () {
    var input = document.getElementById("input").value
    if (input != "") {
        var newItem = createItem(input);
        list.appendChild(newItem);
        // reset input
        document.getElementById("input").value = ""
    }
    else {
        alert("No item has been provided")
    }
}