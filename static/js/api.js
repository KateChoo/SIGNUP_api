
fetch('http://127.0.0.1:3000/api/users?username=${g.username}')
//fetch('https://reqres.in/api/users')
    .then(response => {
        if(!response.ok){
            throw Error("ERROR");
        }
        return response.json();
    }) 
    .then(data => {
        console.log(data);
        console.log(data.data.name);
        console.log('hello')
        document
            .getElementById("search_api")
            .textContent = (data.data.name);
    })
    // .catch(error =>{
    //     console.log(error);
    // })
