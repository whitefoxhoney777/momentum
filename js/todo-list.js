const toDoForm = document.getElementById("todo-form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.getElementById("todo-list");

let toDos = []

const TODOS_KEY ="todos"

// ToDos를 localStorage에 넣어 저장하기
function saveToDos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

// deleteTodo
function deleteToDo(event) {
  const li = event.target.parentElement;
  li.remove();
  //toDos = toDos.filter((toDos) => toDos.id !== li.id); // toDos => toDos 배열 요소의 아이디와 클릭한 요소의 id가 같지않으면 남겨두기
  // console.log('todo.id: ', typeof toDos.id, 'li.id: ', typeof li.id);
  // li.id 타입이 number가 아니라 string이므로 비교 불가. 타입 변환하여 숫자로 바꿔 filter() 적용해야 함.
  toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
  // 삭제후 데이터베이스를 업데이트해야 함.
  saveToDos(); // 로컬 스토리지에 저장
}

// HTML Markup 하지 않고 스크립트로 요소 생성하고 값 넣기
function paintToDo(newTodo) {
  const li = document.createElement("li"); // li 생성
  li.id = newTodo.id; // => Object인 newToDoObj의 id
  const span = document.createElement("span"); // span 생성
  newTodo = newTodo.text; // Object인 newToDoObj의 text
  span.innerText = newTodo; // 인자로 던져 파라미터로 들어온 newTodo를 span에 텍스트로 넣음
  console.log("li.id: ", typeof li.id);

  const button = document.createElement("button"); // button 생성
  button.innerText = "X"; // button 요소에 'X' 텍스트 넣기
  button.addEventListener("click", deleteToDo); // button 클릭시 deleteToDo 함수 호출

	// 위 기능들 다 한 후 DOM에 붙이기
  li.appendChild(span); // li 내부에 span을 넣음(추가)
  li.appendChild(button); // li 내부에 button 넣음(추가)
  toDoList.appendChild(li); // ul(toDoList)에 텍스트를 넣은 li를 넣음
}

// form 내부 input 입력후 엔터하면 submit 처리되는데, submit시 처리될 기능 
function handleToDoSubmit(event) {
  event.preventDefault();
  const newTodo = toDoInput.value;
  toDoInput.value = "";
  // toDoInput의 값을 비웠다고 해서 newTodo가 비워지는게 아니라는 점에 주의!
  // toDoInput.value를 새로운 변수 newTodo에 복사하기 때문이다.
  // 이후 toDoInput에 무엇을 하든 newTodo에는 아무런 영향이 없다.
  console.log("newTodo: ", newTodo, "toDoInput.value: ", toDoInput.value); // 입력한 값, toDoInput은 비워서 아무 값도 없음.
  
  // newToDoObj 객체를 만들어 text Key에 newTodo를 값으로 가지도록하고,
  // id key에 Date.now()로 생성한 숫자로 id 값을 넣는다.
  const newTodoObj = {
    id: Date.now(),
    text: newTodo
  }

  // newTodoObj를 newTodo 대신 array에 넣는다.
	toDos.push(newTodoObj);
	console.log(toDos); 
  // localstorage: [{"id":1681960584304,"text":"list01"},{"id":1681960585793,"text":"lsit02"}]
  // console: (2) [{…}, {…}]   0: {id: 1681960584304, text: 'list01'} 1: {id: 1681960585793, text: 'lsit02'}

  // 페인트 (요소 생성)
  // => 마찬가지로 newToDo를 newTodoObj로 추가하도록 변경한다.
  paintToDo(newTodoObj);

  // paintToDo하고서 위의 newTodo가 들어간 toDos array를 이제 localStorage에 넣자.
  saveToDos(); // localStorage에 넣는 기능을 하는 saveToDos 함수 호출
}

toDoForm.addEventListener('submit', handleToDoSubmit);

// 저장한 toDos 가져오기
const savedToDos = localStorage.getItem(TODOS_KEY);
console.log("savedToDos: ", savedToDos); // ["c","d"] - String

// localStorage에 값이 없으면 toDos가 null일 때도 있으므로, / console.log(savedToDos); => null
// 값이 있으면 saveToDos()에서 String으로 바꾼 localStorage의 값을 Object로 바꾼다. / if(savedToDos)는 if(savedToDos !== null)과 동일
if(savedToDos) { 
  const parsedToDos = JSON.parse(savedToDos); // String -> Object

  toDos = parsedToDos; // 상단의 디폴트로 값이 없는 빈 배열 toDos에 값이 있으면 parsedToDos로 업데이트시킨다.
  console.log("toDos: ", toDos); // ['c', 'd'] - Object

  // 보통 array 각각의 item을 가지고 무언가를 한다.
  // 텍스트, 색상 변경 등, 하지만 가장 중요한 것은 이 array에 있는 각각의 item에 대해 function을 실행한다는 것이다.
  parsedToDos.forEach(element => paintToDo(element));
}