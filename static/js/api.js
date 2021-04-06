document.getElementById("search_api_btn").addEventListener('click', getName);
document.getElementById("get_form").addEventListener('submit', getName);
function getName(e){
    e.preventDefault();
    var xhr = new XMLHttpRequest();

    var name = document.getElementById("search_name").value;

    xhr.open('GET','/api/users?username=' + name, true);
    xhr.onload = function(){
        console.log(this.responseText)
    }
    xhr.send();
}




// fetch('http://127.0.0.1:3000/api/users?username=${g.username}')
// //fetch('https://reqres.in/api/users')
//     .then(response => {
//         if(!response.ok){
//             throw Error("ERROR");
//         }
//         return response.json();
//     }) 
//     .then(data => {
//         console.log(data);
//         console.log(data.data.name);
//         console.log('hello')
//         document
//             .getElementById("search_api")
//             .textContent = (data.data.name);
//     })
//     // .catch(error =>{
//     //     console.log(error);
//     // })
