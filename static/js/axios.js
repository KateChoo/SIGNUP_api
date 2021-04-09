    document.getElementById("get_form").addEventListener('submit', getName)
    async function getName(e){
        e.preventDefault();
        //console.log('SUBMITTED')
        //console.dir(document.getElementById("get_form"))
        let username_value = document.getElementById("get_form").elements.username.value
        //console.log(username_value)
        const res = await axios.get(`http://127.0.0.1:3000/api/users?username=${username_value}`);
        console.log(`res.data: ${res.data}`)
        console.log(`res.data.name: ${res.data.name}`)
        output = JSON.stringify(res.data.name)
        document.getElementById("show_name").textContent = `${output} (${res.data.name})`
    }


// axios.get('http://127.0.0.1:3000/api/users?username=1')
// .then(res =>{
//     console.log(res.data.data.name)
// })
// .catch(err =>{
//     console.log("ERROR")
// })
const fetch_name = async()=>{
    try{
        const res = await axios.get('http://127.0.0.1:3000/api/users?username=1')
        console.log(res.data.data.name)
    }catch(e){
        console.log("ERROR", e)
    }
}
// fetch_name()

const fetch_json = async()=>{
    try{
        const config = { headers: {Accept: 'application/json'}}
        const res = await axios.get('http://127.0.0.1:3000/api/users?username=1')
        console.log(res.data.data.name)
        //console.log(res.data.data.name)
    }catch(e){
        console.log("ERROR", e)
    }
}
//fetch_json()

