//document.getElementById("search_api_btn").addEventListener('click', getName);  //JSON
document.getElementById("get_form").addEventListener('submit', getName);
// document.getElementById("post_form").addEventListener('submit', postName);
// document.getElementById("get_user_btn").addEventListener('click', loadUser);

function getName(e){
    e.preventDefault();
    var xhr = new XMLHttpRequest();
    var name = document.getElementById("search_name").value;
    xhr.open('GET','/api/users?username=' + name, true);
    xhr.onload = function(){
        if(this.status == 200){
        
            console.log(this.responseText)
            var user = JSON.parse(this.responseText)
            //var output = '';
            console.log(user)
            console.log(data['name'])
            //output = this.responseText;
            
        }
        
        //document.getElementById("show_name").innerHTML = user;
    }
    xhr.send();
}

// function postName(e){
//     e.preventDefault();
//     var xhr = new XMLHttpRequest();

//     var name = document.getElementById("search_name").value;
//     var params = 'username=' + name
//     xhr.open('POST','/api/users', true);
//     xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
//     xhr.onload = function(){
//         console.log(this.responseText)
//     }
//     xhr.send();
// }




// function loadUser(){
//     var xhr = new XMLHttpRequest();
//     var name = document.getElementById("search_name").value;

//     xhr.open('GET','/api/users?username=' + name, true);
//     xhr.onload = function(){
//         if(this.status == 200){
//             console.log(this.responseText.data)
//             var user = JSON.parse(this.responseText)
//             var output = '';
//             output = this.responseText;
//         }
//         document.getElementById("user").innerHTML = output;
//     }
//     xhr.send();
// }





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
