const form = document.getElementById('user-info');
const emailInput = form.querySelector('#mail');
const inputs = form.querySelectorAll('.user-input');

const fillErrorSpan = function(input, message) {
  const inputErrorSpan = input.closest('.input-group').querySelector('.error');
  inputErrorSpan.textContent = `${message}`;
}

// const showEmailErrors = function(invalidInput) {
//   fillErrorSpan(invalidInput, "Please enter a valid email");
// }

// const showZipErrors = function(invalidInput) {
//   fillErrorSpan(invalidInput, "Please enter a 5-digit zip code");
// }

const clearErrorMessages = function(validInput) {
  fillErrorSpan(validInput, "");
}

const selectErrorMessage = function(invalidInput) {
  const errorMessages = {
    email: "Please enter a valid email",
    zipcode: "Please enter a 5-digit zip code",
    country: "Country should only contain letters",
    password: "Password must be a minimum of 8 characters and contain at least one each of a letter, number, and special character",
    "password-confirm": "Passwords must match",
  }

  fillErrorSpan(invalidInput, errorMessages[invalidInput.name]);
}

const checkPasswordValidity = function(input) {
  const userPassword = document.getElementById('pass').value
  return input.value === userPassword;
}

const checkValidity = function() {
  let inputValid = this.validity.valid;

  if (this.name === "password-confirm") {
    inputValid = checkPasswordValidity(this);
  } 
  
  if (!inputValid) {
    selectErrorMessage(this);
  } else {
    clearErrorMessages(this);
  }
}

const clearErrorsDiv = function() {
  const errorsDiv = form.querySelector('#submit-error');
  while (errorsDiv.lastChild) {
    errorsDiv.removeChild(errorsDiv.lastChild);
  }

  return errorsDiv;
}

const displayThankYou = function() {
  const container = document.getElementById('form-container');
  while (container.lastChild) {
    container.removeChild(container.lastChild);
  }

  const thankYouDiv = document.createElement('div');
  const thankYouMessage = document.createElement('p');
  const thankYouImage = document.createElement('img');

  thankYouMessage.textContent = "Thank you for signing up!  Shy Guy will be in touch soon."
  thankYouImage.src = "images/shy_guy_large.png";

  thankYouDiv.append(thankYouMessage);
  thankYouDiv.append(thankYouImage);
  container.append(thankYouDiv);
}

const checkForm = function(event) {
  const inputs = form.querySelectorAll('input');
  const submitErrorDiv = clearErrorsDiv();
  let errors = [];

  inputs.forEach(input => {
    let inputValid = input.validity.valid;

    if (input.name === "password-confirm") {
      inputValid = checkPasswordValidity(input);
    }

    if (!inputValid) {
      errors.push(`Error: invalid ${input.name} input`);
    }
  });

  if (errors.length > 0) {
    event.preventDefault();
    errors.forEach(err => {
      let errDiv = document.createElement('div');
      errDiv.textContent = err;
      submitErrorDiv.append(errDiv);
    });
  } else {
    displayThankYou();
  }
}

form.addEventListener('submit', event => checkForm(event));
// emailInput.addEventListener('input', checkValidity);
inputs.forEach(input => input.addEventListener('input', checkValidity));