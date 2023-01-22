let mainInput = document.getElementById("mainInput");


document.getElementById("set").addEventListener("click",()=>{
    localStorage.setItem("code",mainInput.value);
    setMatrix();
    makeTable();
})

if (localStorage.length>0){
    mainInput.value = localStorage.getItem("code");
    setMatrix();
    makeTable();
}

function setMatrix(){
window.matrix = [];
let count = 0;
let sub = [];
for(let i = 0;i< mainInput.value.length;++i){
    sub.push(mainInput.value[i]);
    count++;
    if (count == 10){
        window.matrix.push(sub);
        sub = [];
        count = 0;
    }
}
}

function makeTable(){
    let field = document.querySelector(".container");
    field.innerHTML = "";
    for(let i = 0; i < 10; ++i){
    let column = document.createElement("div");
    let head = document.createElement("div");
    column.style.order = i;
    column.draggable="true"
    column.addEventListener("dragstart",(ev)=>{
        current.underDrag = current.drag = +column.style.order;
    })
    column.addEventListener("dragend",(ev)=>{
        let buf = 0;
        for (let i = 0;i< 10;++i){
            if(+document.querySelector(".container").childNodes[i].style.order == current.underDrag){
            buf = i;
            break;
            }
        }
        column.style.order = `${current.underDrag}`;
        document.querySelector(".container").childNodes[buf].style.order = current.drag;
    })
    column.addEventListener("dragenter",(ev)=>{
        column.classList.add("selected");
        current.underDrag = +column.style.order;
    })
    column.addEventListener("dragleave",(ev)=>{
        column.classList.remove("selected");
    })
    head.innerText  = i;
    head.style.color = "white";
    head.style.backgroundColor = "black";
    column.appendChild(head);
    column.classList.add("column");
        for(let j = 0; j< 10; ++j){
            let newCell = document.createElement("div");
            newCell.innerText = matrix[i][j];
            column.appendChild(newCell);
        }
    field.appendChild(column);
    }
}

let current = {
    drag : 0,
    underDrag : 0
}