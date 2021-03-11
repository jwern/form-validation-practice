const form = document.getElementById('user-info');
const emailInput = form.querySelector('#mail');

const showErrorMessage = function(invalidInput) {
  const inputErrorSpan = invalidInput.closest('.input-group').querySelector('.error');
  inputErrorSpan.textContent = "An error!";
}

const checkValidity = function() {
  if (!this.validity.valid) {
    showErrorMessage(this);
  }
}

const clearErrorsDiv = function() {
  const errorsDiv = form.querySelector('#submit-error');
  while (errorsDiv.lastChild) {
    errorsDiv.removeChild(errorsDiv.lastChild);
  }

  return errorsDiv;
}

const checkForm = function(event) {
  const inputs = form.querySelectorAll('input');
  const submitErrorDiv = clearErrorsDiv();
  let errors = [];

  inputs.forEach(input => {
    if (!input.validity.valid) {
      errors.push(`Error: invalid ${input.name} input`);
    }
  });

  if (errors) {
    event.preventDefault();
    errors.forEach(err => {
      let errDiv = document.createElement('div');
      errDiv.textContent = err;
      submitErrorDiv.append(errDiv);
    });
  }
}

form.addEventListener('submit', event => checkForm(event));
emailInput.addEventListener('input', checkValidity);