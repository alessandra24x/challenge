const name = document.getElementById("name");
const lastName = document.getElementById("last-name");
const phone = document.getElementById("phone");
const email = document.getElementById("email");
const submit = document.getElementById("submit");

function setValidation(message, elementLocation, color) {
  document.getElementById(elementLocation).innerHTML = message;
  document.getElementById(elementLocation).style.color = color;
}

function isStringWithinLenght(string, min, max) {
  return string.length >= min && string.length <= max;
}

const isNameValid = name => isStringWithinLenght(name.trim(), 1, 30);

name.addEventListener("keyup", () => {
  isNameValid(name.value)
    ? setValidation(`Bienvenid@ ${name.value}`, "elementName", "green")
    : setValidation(
        "El nombre no puede estar vacio o contener mas de 30 caracteres",
        "elementName",
        "red"
      );
});

const isLastNameValid = lastName =>
  isStringWithinLenght(lastName.trim(), 1, 30);

lastName.addEventListener("keyup", () => {
  isLastNameValid(lastName.value)
    ? setValidation("!Qué buen apellido!", "elementLastName", "green")
    : setValidation(
        "El apellido no puede estar vacio o contener mas de 30 caracteres",
        "elementLastName",
        "red"
      );
});

const isPhoneValid = phone => /^\d+$/.test(phone);

phone.addEventListener("keyup", () => {
  isPhoneValid(phone.value)
    ? setValidation("Telefono válido", "elementPhone", "green")
    : setValidation(
        "El telefono debe contener solo números",
        "elementPhone",
        "red"
      );
});

const isEmailValid = email =>
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );

email.addEventListener("keyup", () => {
  isEmailValid(email.value)
    ? setValidation("Email válido", "elementEmail", "green")
    : setValidation("Ingrese un email válido", "elementEmail", "red");
});

submit.addEventListener("click", event => {
  event.preventDefault();

  if (
    name.value === "" ||
    lastName.value === "" ||
    phone.value === "" ||
    email.value === ""
  ) {
    setValidation("Debe llenar todos los campos", "elementForm", "red");
  } else {
    const newUser = {
      name: name.value,
      lastName: lastName.value,
      phone: phone.value,
      email: email.value
    };
    fetch("/user", {
      method: "POST", // or 'PUT'
      body: JSON.stringify(newUser), // data can be `string` or {object}!
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(() =>
      setValidation("Completado exitosamente", "elementForm", "green"),
      document.getElementById('redirection').innerHTML = '¿Desea Volver?'
      )
      .catch(() =>
        setValidation(
          "Hubo un error al guardar los datos",
          "elementForm",
          "red"
        )
      );
  }
});
