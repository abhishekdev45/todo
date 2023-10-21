const todoForm = document.getElementById('form');
const todoList = document.getElementById('todoTask');
const doneTask = document.getElementById('doneTask');

todoForm.addEventListener('submit' , (e)=>{
    e.preventDefault();
    const name = document.getElementById('todoName').value;
    const description = document.getElementById('description').value;

    const obj = {
        "name" : name,
        "description" : description
    }

    axios.post("https://crudcrud.com/api/50335b5e340840fdaae29a679002109b/todo" , obj)
     .then((res) => {
        console.log(res.data);
        displayInfo(res.data)
     })
     .catch((err) => {
        console.log(err);
     })
});

function displayInfo(obj){
    const listItem = document.createElement('li');
    listItem.textContent = obj.name + '  :  ' + obj.description;
    const checkBtn = document.createElement('button');

    checkBtn.type = 'button';
    checkBtn.innerHTML = '&#x2713;';
    checkBtn.classList.add('checkBtn')
    checkBtn.addEventListener('click' , function (){
        todoList.removeChild(listItem);
        console.log(obj);
        axios.delete(`https://crudcrud.com/api/50335b5e340840fdaae29a679002109b/todo/${obj._id}`)
         .then((res) => {
            console.log('success')
         })
         .catch((err) => console.log(err));
        axios.post("https://crudcrud.com/api/50335b5e340840fdaae29a679002109b/done" , {
            "name" : obj.name,
            "description" : obj.description
        })
         .then((res) =>{
            const newlistItem = document.createElement('li');
            newlistItem.textContent = res.data.name + '  :  ' + res.data.description;

            doneTask.appendChild(newlistItem);
         })
          .catch((err) => console.log(err));
        
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.type ='button';
    deleteBtn.textContent = 'X';
    deleteBtn.classList.add('deleteBtn');
    deleteBtn.addEventListener('click' , ()=>{
        axios.delete(`https://crudcrud.com/api/50335b5e340840fdaae29a679002109b/todo/${obj._id}`)
         .then((res) => console.log("successfully deleted"))
         .catch((err) => console.log(err));
        todoList.removeChild(listItem)
    })

    listItem.appendChild(checkBtn);
    listItem.appendChild(deleteBtn);
    todoList.appendChild(listItem);

    document.getElementById('todoName').value = '';
    document.getElementById('description').value = '';
}

window.addEventListener("DOMContentLoaded" , () => {
    axios.get("https://crudcrud.com/api/50335b5e340840fdaae29a679002109b/todo")
         .then((res) => {
           for(var i = 0 ; i < res.data.length ; i++){
             console.log(res.data[i]);
             displayInfo(res.data[i]);
           }
          })
          .catch((err) => {
           document.body.innerHTML = document.body.innerHTML +"<h4> something went wrong</h4>";
           console.log(err)
         })
    axios.get("https://crudcrud.com/api/50335b5e340840fdaae29a679002109b/done")
         .then((res) => {
           for(var i = 0 ; i < res.data.length ; i++){
            const newlistItem = document.createElement('li');
            newlistItem.textContent = res.data[i].name + '  :  ' + res.data[i].description;

            doneTask.appendChild(newlistItem);
           }
          })
          .catch((err) => {
           document.body.innerHTML = document.body.innerHTML +"<h4> something went wrong</h4>";
           console.log(err)
         })
 })

 