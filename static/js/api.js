
fetch('http://127.0.0.1:3000/api/users?username=1')
    .then(response => {
        if(!response.ok){
            throw Error("ERROR");
        }
        return response.json();
    }) 
    .then(data => {
        console.log(data);
        console.log(data.data);
        console.log(s_api);
        console.log('hello')
        document
            .getElementById("search_api")
            .textContent = 'hi';
    })
    // .catch(error =>{
    //     console.log(error);
    // })
