function getGithubUser() {
    let username = document.getElementById("username")
    let name = document.getElementById("name")
    let img = document.querySelector("img")
    let input = document.getElementById("input").value

    function clearData() {
        img.src = ""
        username.innerHTML = ""
        name.innerHTML = ""
    }
    if (input === "") {
        alert("You must provide a valid username")
        clearData();
    }
    else {
        fetch("https://api.github.com/users/" + input)
            .then((result) => result.json())
            .then((result) => {
                if (!result.login) {
                    clearData();
                    alert("User " + input + " " + result.message.toLowerCase())
                }
                else {
                    name.innerHTML = "Name: " + result.name
                    username.innerHTML = "Username: " + result.login
                    img.src = result.avatar_url
                }
            })
        // Reset input
        document.getElementById("input").value = ""
    }
}