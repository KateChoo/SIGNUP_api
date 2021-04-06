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


const myReq = new XMLHttpRequest();
myReq.onload = function(){
    const d = JSON.parse(this.responseText)
    console.log(d)
};
myReq.onerror = function(err){
    console.log('ERROR!', err);
};
myReq.open('get', 'https://www.tvmaze.com/api', true);
myReq.setRequestHeader('Accept', 'application/json');
myReq.send();
