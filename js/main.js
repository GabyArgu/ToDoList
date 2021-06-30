const add = document.getElementById("agregar"),
tasks = document.getElementById("tareas"),
sectionAdd = document.getElementById("insert-data"),
sectionTasks = document.getElementById("tasks"),
addTaskSection = document.getElementById("addTask");

const correctAlert = document.getElementById("correctAlert"),
wrongAlert = document.getElementById("wrongAlert"),
overlay = document.getElementById("overlay");

const title = document.getElementById("title"),
time = document.getElementById("time"),
priority = document.querySelectorAll("input[name=prioridad]"),
description = document.getElementById("descripcion");

const btn = document.getElementById("submit");
//Dropdown
const select = document.getElementById("order")

let classPriority = "";
let date = "";



//Código para quitar pantalla de carga en forma progresiva - aqui haz la que quieras 
/*----------------------------------------------
window.addEventListener("load", function(){
    overlay.style.filter = "opacity(0%)"
    setTimeout(quiteOverlay, 2000)
})
function quiteOverlay(){
    overlay.classList.add("quite")
    overlay.style.filter = "opacity(90%)"
}----------------------------------------------*/


//Navbar
add.addEventListener("click", function(){
    sectionAdd.classList.remove("quite");
    sectionTasks.classList.add("quite");
    let lastTask = document.querySelectorAll(".task")
    if(lastTask.length>0){
        lastTask[lastTask.length-1].classList.remove("last");
    }    
})
//Identify last element
function lastElement(){
    let lastTask = document.querySelectorAll(".task")
    if(lastTask.length%2===0){}else{
        lastTask[lastTask.length-1].classList.add("last");
    }
}
tasks.addEventListener("click", function(){
    sectionAdd.classList.add("quite");
    sectionTasks.classList.remove("quite")
    lastElement()
})


//Add a task
class taskList {
  constructor(title, time, description) {
    this.title = title;
    if(priority[0].checked){
        this.priority = "Alta"
        this.classPriority = "high"
    } else if(priority[1].checked){
        this.priority = "Media"
        this.classPriority = "medium"
    }else{
        this.priority = "Baja"
        this.classPriority = "low"
    }
    this.description = description
    this.date = time;
  }
}

const addTask = ({ title, date, priority, description, classPriority}) => {
  addTaskSection.innerHTML += `
    <article class="task">
        <div class="top ${classPriority}">
            <h3>${priority}</h3>
            <h3>${date}</h3>
        </div>
        <div class="contain">
            <h2>${title}</h2>
            <h4>${description}</h4>
        </div>
    </article>
  `;
};

const validate = (title, description) => {
  return title.trim() && description.trim();
};

const clearInput = () => {
  title.value = null;
  description.value = null;
  time.value = "";
};

let re = /([01]?[0-9]|2[0-3]):([0-5][0-9])/;    
let data = [];
let dataM = []

btn.addEventListener("click", () => {
    if (validate(title.value, description.value) && re.test(time.value)){
        correctAlert.classList.remove("quite")
        const tasklist = new taskList(
            title.value,
            time.value,
            description.value
        );
        addTask(tasklist);
        clearInput();
        data.push(tasklist)
    }else{
        wrongAlert.classList.remove("quite")
    }
    overlay.classList.remove("quite")
    correctAlert.style.opacity = "1"
    wrongAlert.style.opacity = "1"
    setTimeout(disappear, 3000)
});

function disappear(){
    correctAlert.style.opacity = "0"
    correctAlert.classList.add("quite")
    wrongAlert.style.opacity = "0"
    wrongAlert.classList.add("quite")
    overlay.classList.add("quite")
}

//Filters
function deleteAllData(){
    let lastTask = document.querySelectorAll(".task")
    lastTask.forEach(array => {
        let padre = array.parentNode;
        padre.removeChild(array)
    });
}

function reorganiceTime(){
    dataM.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    //Add new data
    for (let i = 0; i < dataM.length; i++) {
        addTask(dataM[i])           
    }
}

select.addEventListener("click", function(){
    deleteAllData()
    dataM = []
    switch (select.selectedIndex) {
        case 0:
            dataM = data.filter(priority => priority.classPriority === "high");
            reorganiceTime()
            dataM = data.filter(priority => priority.classPriority === "medium");
            reorganiceTime()
            dataM = data.filter(priority => priority.classPriority === "low");
            reorganiceTime()
            break;
        case 1:
            dataM = data.filter(priority => priority.classPriority === "low");
            reorganiceTime()
            dataM = data.filter(priority => priority.classPriority === "medium");
            reorganiceTime()
            dataM = data.filter(priority => priority.classPriority === "high");
            reorganiceTime()
            break;
        case 2:
            dataM = data.filter(priority => priority.classPriority === "high");
            reorganiceTime()
            break;
        case 3:
            dataM = data.filter(priority => priority.classPriority === "medium");
            reorganiceTime()
            break;
        case 4:
            dataM = data.filter(priority => priority.classPriority === "low");
            reorganiceTime()
            break;
    }
    lastElement()
})