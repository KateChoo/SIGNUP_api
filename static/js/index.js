fetch('https://reqres.in/api/users')
.then(response => {
    if(!response.ok){
        throw Error("ERROR");
    }
    return response.json();
}) 
.then(data => {
    console.log(data);
    console.log(data.data);
    console.log(data.data[1].email);
    console.log('hello')
    document
        .getElementById("search_api")
        .textContent = (data.data[1].email);
})
.catch(error =>{
    console.log(error);
})
