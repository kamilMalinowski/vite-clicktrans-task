import "./style.css";

document.querySelector('#app').innerHTML = `
<main class="main">
  <h1 class="main__title">Hello 
    <span class="primary">click</span><span class="secondary">trans</span>
  </h1>
  <!-- form -->
  <form action="#" class="form">

    <!-- textarea -->
    <div class="form__box">
      <label class="form__label" for="description">
        Description<span class="form__required">*</span>
      </label>
      <textarea class="form__textarea" id="description" name="description" minlength="1" maxlength="255" required></textarea>
      <span class="form__counter">0/255</span>
      <span class="form__messages form__messages--textarea"></span>
    </div>

    <!-- radio button -->
    <div class="form__box">
      <label class="form__label" for="confirmation">
        Send confirmation<span class="form__required">*</span>
      </label>
      <p class="form__wrapper-radio">
        <input class="form__input-radio" type="radio" value="yes" id="yes" name="confirmation" required>
        <span class="form__text-radio">Yes</span>
      </p>
      <p class="form__wrapper-radio">
        <input class="form__input-radio" type="radio" value="no" id="no" name="confirmation" required>
        <span class="form__text-radio">No</span>
      </p>
      <span class="form__messages form__messages--radio"></span>
    </div>

    <!-- select input -->
    <div class="form__box">
      <label class="form__label" for="vat">
        VAT<span class="form__required">*</span>
      </label>
      <select class="form__select" name="vat" id="vat" required>
        <option value="">Choose VAT</option>
        <option value="1.19">19%</option>
        <option value="1.21">21%</option>
        <option value="1.23">23%</option>
        <option value="1.25">25%</option>
      </select>
      <span class="form__messages form__messages--select"></span>
    </div>

    <!-- text input - netto -->
    <div class="form__box">
      <label class="form__label" for="netto">
        Price netto EUR<span class="form__required">*</span>
      </label>
      <input type="text" name="netto" id="netto" class="form__input form__input--netto disabled" autocomplete="off" required disabled> 
      <span class="form__messages form__messages--netto"></span>
    </div>

    <!-- text input - brutto -->
    <div class="form__box">
      <label class="form__label" for="brutto">
        Price brutto EUR
      </label>
      <input type="text" name="brutto" id="brutto" class="form__input form__input--brutto disabled" disabled>
    </div>

    <!-- submit -->
    <div class="form__box">
      <input type="submit" value="SUBMIT" class="form__input form__input--submit">
    </div>

  </form>

  <!-- success section -->
  <div class="success">
    <section class="success__box">
      <h2 class="success__title">Success</h2>
    </section>
  </div>

</main>`

const counter = document.querySelector(".form__counter");
const mgTextarea = document.querySelector(".form__messages--textarea");
const mgRadio = document.querySelector(".form__messages--radio");
const mgSelect = document.querySelector(".form__messages--select");
const mgNetto = document.querySelector(".form__messages--netto");
const inpTextarea = document.querySelector(".form__textarea");
const inpRadio = document.querySelectorAll("[name='confirmation']");
const inpSelect = document.querySelector(".form__select");
const inpNetto = document.querySelector(".form__input--netto");
const inpBrutto = document.querySelector(".form__input--brutto");
const inpSubmit = document.querySelector(".form__input--submit");
const formSection = document.querySelector(".form");
const successSection = document.querySelector(".success");

const requiredMg = "Text is required";
let radioCheck;
let vatNumber;
let validated;

// functions
const grossCalculator = (net, vat) => {
  inpBrutto.value = (Number(net) * Number(vat)).toFixed(2);
};

const checkTextarea = (e) => {
  const clicked = e.target.value.length;
  counter.textContent = `${clicked}/255`;
  clicked === 255
    ? (mgTextarea.textContent = "You can’t enter more than 255 characters")
    : (mgTextarea.textContent = "");
  if (clicked === 0) mgTextarea.textContent = requiredMg;
};

const checkRadio = (e) => {
  radioCheck = e.target.value;
  radioCheck == undefined
    ? (mgRadio.textContent = requiredMg)
    : (mgRadio.textContent = "");
};

const checkSelect = (e) => {
  const clicked = e.target.value;
  inpNetto.classList.remove("disabled");
  inpNetto.removeAttribute("disabled");
  vatNumber = clicked;
  grossCalculator(validated, vatNumber);
  clicked == ""
    ? (mgSelect.textContent = requiredMg)
    : (mgSelect.textContent = "");
};

const checkNetto = (e) => {
  const clicked = e.target.value;
  validated = clicked.replaceAll(",", ".");
  !/^[0-9,.]+$/.test(clicked)
    ? (mgNetto.textContent = "Please, input number")
    : (mgNetto.textContent = "");
  grossCalculator(validated, vatNumber);
};

const checkValidation = (e) => {
  if (inpTextarea.value == "") mgTextarea.textContent = requiredMg;
  if (radioCheck == undefined) mgRadio.textContent = requiredMg;
  if (inpSelect.value == "") mgSelect.textContent = requiredMg;
  if (inpNetto.value == "") mgNetto.textContent = "Please, input number";
};

const checkForm = (e) => {
  e.preventDefault();
  const load = new FormData(formSection);
  // Free fake API for testing and prototyping.
  const url = "https://jsonplaceholder.typicode.com/posts";
  fetch(url, {
    method: "POST",
    body: load,
  })
    .then((res) => res.json())
    .then((data) => console.log([...load], data))
    .catch((err) => console.log(`error: ${err}`));
  successSection.classList.add("visible");
  formSection.classList.add("hidden");
};

// cta
inpTextarea.addEventListener("input", checkTextarea);
inpRadio.forEach((input) => input.addEventListener("input", checkRadio));
inpSelect.addEventListener("input", checkSelect);
inpNetto.addEventListener("input", checkNetto);
inpSubmit.addEventListener("click", checkValidation);
formSection.addEventListener("submit", checkForm);
