const getForm = function() {
  return document.getElementById('user-info');
}

const getInputs = function() {
  return getForm().querySelectorAll('input');
}

const fillErrorSpan = function(input, message) {
  const inputErrorSpan = input.closest('.input-group').querySelector('.error');
  inputErrorSpan.textContent = `${message}`;
}

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
  const errorsDiv = getForm().querySelector('#submit-error');
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

const displayErrors = function(errors) {
  const submitErrorDiv = clearErrorsDiv();

  errors.forEach(err => {
    let errDiv = document.createElement('div');
    errDiv.textContent = err;
    submitErrorDiv.append(errDiv);
  });
}

const checkForm = function(event) {
  const inputs = getInputs();
  let errors = [];

  inputs.forEach(input => {
    let inputValid = input.validity.valid;

    if (input.name === "password-confirm") {
      inputValid = checkPasswordValidity(input);
    }

    if (!inputValid) {
      errors.push(`Invalid ${input.name} field`);
    }
  });

  if (errors.length > 0) {
    event.preventDefault();
    displayErrors(errors);
  } else {
    displayThankYou();
  }
}

const assignListeners = function() {
  const form = getForm();

  if (form) {
    // clear form inputs on page load / reload
    form.reset();
    form.addEventListener('submit', event => checkForm(event));
    // "change" listener will check only when 
    // an input value is changed and the user has unfocused the input
    // "input" listener checks every time 
    // the input is changed, even mid-typing
    getInputs().forEach(input => {
      if (input.type === "password") {
        input.addEventListener('input', checkValidity);
      } else {
        input.addEventListener('change', checkValidity);
      }
    });
  }
}();