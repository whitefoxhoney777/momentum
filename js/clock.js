const clock = document.querySelector(".clock");

function getClock() {
  const date = new Date();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  const clockDate = `${hours}:${minutes}:${seconds}`;
  clock.innerHTML = clockDate;
}

getClock(); // load되자마자 실행되도록 함.(setInterval 지연 1초 있으므로)
setInterval(getClock, 1000);