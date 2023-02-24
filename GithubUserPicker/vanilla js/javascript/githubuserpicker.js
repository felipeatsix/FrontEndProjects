function getGithubUser() {
    let username = document.getElementById("username")
    let name = document.getElementById("name")
    let img = document.querySelector("img")
    let input = document.getElementById("input").value
    let status = document.getElementById("status");

    function clearData() {
        img.src = "https://th.bing.com/th/id/OIP.1DLYAqE5UY19idJJOkFQegHaHa?pid=ImgDet&rs=1"
        username.innerHTML = "Username"
        name.innerHTML = "Name"
    }
    if (input === "") {
        alert("You must provide a valid username!")
        clearData();
        return
    }
    else {
        status.innerHTML = `Searching for user "${input}" on Github...`
        fetch(`https://api.github.com/users/${input}`)
            .then((result) => {
                console.log(result)
                if (!result.ok) {
                    throw new Error(`HTTP error! status: ${result.status}`)
                }
                return result.json()
            })
            .then((result) => {
                console.log(result)
                name.innerHTML = result.name
                username.innerHTML = "@" + result.login
                img.src = result.avatar_url
            })
            .then(() => {
                status.innerHTML = ""
            })
            .catch((error) => {
                let errorMessage = "There was a problem with the fetch operation"
                status.innerHTML = `${errorMessage}: ${error}`
                console.error(`${errorMessage}:`, error);
            })
        // Reset input
        document.getElementById("input").value = ""
    }
}