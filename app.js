var list = document.getElementById("list");
firebase.database().ref('todos').on('child_added',function(data){
    // if (/([^\s])/.test(todoitem.value)) {
        // creat li tag with text node
        var li = document.createElement('li')
        var liText = document.createTextNode(data.val().value)
        li.appendChild(liText)

        // dellet button
        var delbtn = document.createElement("button")
        var delText = document.createTextNode("Delete")
        delbtn.setAttribute("class", "button")
        delbtn.setAttribute("id",data.val().key)
        delbtn.setAttribute("onclick", "deleteitems(this)")
        delbtn.appendChild(delText)

        // edit button
        var editbtn = document.createElement("button");
        var edittext = document.createTextNode("edit");
        editbtn.appendChild(edittext)
        editbtn.setAttribute("id",data.val().key)
        editbtn.setAttribute("onclick", "edititem(this)")

        li.appendChild(delbtn)
        li.appendChild(editbtn)

        list.appendChild(li)
// }
//     else {
//         swal("fill it", " ", "error")
//     }
})
function addtodo() {
    var todoitem = document.getElementById("todoitem");
        var key = firebase.database().ref('todos').push().key
    var todo ={
        value: todoitem.value,
        key: key
    }
    // console.log(todo)
    firebase.database().ref('todos').child(key).set(todo)
    
        todoitem.value = ""
    
}

let foo =(event)=>{
    if(event.keyCode ===13 ){
        addtodo()
    }
}
function deleteitems(e) {
firebase.database().ref('todos').child(e.id).remove()
    e.parentNode.remove()
// console.log(e.id)

}
function edititem(e) {
    var val = prompt("Enter edit value", e.parentNode.firstChild.nodeValue)
    var todoo ={
        value : val,
        key: e.id
    }
    firebase.database().ref('todos').child(e.id).set(todoo)
     e.parentNode.firstChild.nodeValue = val
}

function deleteAll() {
    firebase.database().ref('todos').remove()
    // list.innerHTML = ""
} 