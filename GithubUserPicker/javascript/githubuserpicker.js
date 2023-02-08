function getGithubUser() {
    let username = document.getElementById("username")
    let name = document.getElementById("name")
    let img = document.querySelector("img")
    let input = document.getElementById("input").value

    function clearData() {
        img.src = "https://th.bing.com/th/id/OIP.1DLYAqE5UY19idJJOkFQegHaHa?pid=ImgDet&rs=1"
        username.innerHTML = "Username"
        name.innerHTML = "Name"
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
                    name.innerHTML = result.name
                    username.innerHTML = "@" + result.login
                    img.src = result.avatar_url
                }
            })
        // Reset input
        document.getElementById("input").value = ""
    }
}