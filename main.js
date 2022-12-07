import "./style.css";

// document.querySelector('#app').innerHTML = ``

//Task 1 - textarea
const textarea = document.querySelector(".form__textarea");
const counter = document.querySelector(".form__counter");
const mgTextarea = document.querySelector(".form__messages--textarea");

textarea.addEventListener("input", (e) => {
  const clicked = e.target.value.length;

  counter.textContent = `${clicked}/255`;

  if (clicked === 255)
    mgTextarea.textContent = "You can’t enter more than 255 characters";
  else mgTextarea.textContent = "";

  if (clicked === 0) mgTextarea.textContent = "Text is required";
});
