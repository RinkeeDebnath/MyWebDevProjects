function onButtonClick() {
  changeBgColor();
  generateJoke();
}

function changeBgColor() {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  document.body.style.backgroundColor = `#${randomColor}`;
}

function generateJoke() {
  const xhr = new XMLHttpRequest();

  xhr.open("GET", "https://api.chucknorris.io/jokes/random");

  xhr.onreadystatechange = function () {
    if (this.readyState === 4) {
      if (this.status === 200) {
        const joke = JSON.parse(this.responseText).value;
        document.querySelector("#your-joke").innerHTML = `" ${joke} "`;
      } else {
        document.querySelector(
          "#your-joke"
        ).innerHTML = `" Oops! Something went wrong "`;
      }
    }
  };

  xhr.send();
}

document.querySelector("button").addEventListener("click", onButtonClick);
document.addEventListener("DOMContentLoaded", generateJoke);
