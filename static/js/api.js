
const s_api = document.getElementById("search_api");

fetch('http://127.0.0.1:3000/api/users?username=1')
    .then(response => response.json())
    .then(data => {
        console.log(data)
        console.log(data[name])
        console.log(s_api)
    })
