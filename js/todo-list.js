const toDoForm = document.getElementById("todo-form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.getElementById("todo-list");

let toDos = []

const TODOS_KEY ="todos"

// save ToDos to localStorage
function saveToDos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

// delete ToDo
function deleteToDo(event) {
  const li = event.target.parentElement;
  li.remove();
  toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
  saveToDos();
}

// paint ToDo
function paintToDo(newTodo) {
  const li = document.createElement("li");
  li.id = newTodo.id;
  const span = document.createElement("span");
  newTodo = newTodo.text;
  span.innerText = newTodo;

  const button = document.createElement("button");
  button.innerText = "X";
  button.addEventListener("click", deleteToDo);

  li.appendChild(span);
  li.appendChild(button);
  toDoList.appendChild(li);
}

// handleToDoSubmit
function handleToDoSubmit(event) {
  event.preventDefault();
  const newTodo = toDoInput.value;
  toDoInput.value = "";
  
  // newToDoObj 객체를 만들어 text Key에 newTodo를 값으로 가지도록하고,
  // id key에 Date.now()로 생성한 숫자로 id 값을 넣기
  const newTodoObj = {
    id: Date.now(),
    text: newTodo
  }

  // newTodoObj를 newToDo 대신 array에 넣기
	toDos.push(newTodoObj);
  // localstorage: [{"id":1681960584304,"text":"list01"},{"id":1681960585793,"text":"lsit02"}]

  // newToDo를 newTodoObj로 추가하도록 변경
  paintToDo(newTodoObj);

  // paintToDo하고서 위의 newTodo가 들어간 toDos array를 localStorage에 넣기
  saveToDos(); // localStorage에 넣는 기능을 하는 saveToDos 함수 호출
}

toDoForm.addEventListener('submit', handleToDoSubmit);

// 저장한 toDos 가져오기
const savedToDos = localStorage.getItem(TODOS_KEY);

// localStorage에 값이 없으면 toDos가 null일 때도 있으므로, / console.log(savedToDos); => null
// 값이 있으면 saveToDos()에서 String으로 바꾼 localStorage의 값을 Object로 바꿈.
if(savedToDos) { 
  const parsedToDos = JSON.parse(savedToDos); // String -> Object
  toDos = parsedToDos;
  parsedToDos.forEach(element => paintToDo(element));
}
