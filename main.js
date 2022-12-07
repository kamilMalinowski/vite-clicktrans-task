import "./style.css";

// document.querySelector('#app').innerHTML = ``

//Task 1 - textarea
const textarea = document.querySelector(".form__textarea");
const counter = document.querySelector(".form__counter");
const messages = document.querySelector(".form__messages");

textarea.addEventListener("input", (e) => {
  const clicked = e.target.value.length;

  counter.textContent = `${clicked}/255`;

  if (clicked === 255)
    messages.textContent = "You can’t enter more than 255 characters";
  else messages.textContent = "";

  if (clicked === 0) messages.textContent = "Text is required";
});
