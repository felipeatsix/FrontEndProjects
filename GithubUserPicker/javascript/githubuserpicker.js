function getGithubUser() {
    let username = document.getElementById("username")
    let name = document.getElementById("name")
    let img = document.querySelector("img")
    let input = document.getElementById("input").value

    if (input === "") {
        alert("You must provide a valid username")
    }
    else {
        fetch("https://api.github.com/users/" + input)
            .then((result) => result.json())
            .then((result) => {
                if (!result.login) {
                    alert("User " + input + " " + result.message.toLowerCase())
                }
                else {
                    name.innerHTML = "Name: " + result.name
                    username.innerHTML = "Username: " + result.login
                    img.src = result.avatar_url
                }
            })
    }
}