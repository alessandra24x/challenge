document.addEventListener("DOMContentLoaded", function(event) {
  /**
   * @const {string} name
   * @const {string} lastName
   * @const {number} phone
   * @const {string} email
   * @const {string} submit
   */
  const name = document.getElementById("name");
  const lastName = document.getElementById("last-name");
  const phone = document.getElementById("phone");
  const email = document.getElementById("email");
  const submit = document.getElementById("submit");

  /**
   *
   * @param {string} message
   * @param {string} elementLocation
   * @param {string} color
   */
  function setValidation(message, elementLocation, color) {
    document.getElementById(elementLocation).innerHTML = message;
    document.getElementById(elementLocation).style.color = color;
  }

  /**
   *
   * @param {string} string
   * @param {number} min
   * @param {number} max
   */
  function isStringWithinLenght(string, min, max) {
    return string.length >= min && string.length <= max;
  }

  // Valido el nombre entre 1 y 30 caractares y uso la función trim para evitar que cuenten espacios en blanco
  const isNameValid = name => isStringWithinLenght(name.trim(), 1, 30);

  // LLamando el evento "keyup" voy verificando si el nombre es valido o no
  name.addEventListener("keyup", () => {
    isNameValid(name.value)
      ? setValidation(`Bienvenid@ ${name.value}`, "elementName", "green")
      : setValidation(
          "El nombre no puede estar vacio o contener mas de 30 caracteres",
          "elementName",
          "red"
        );
  });

  // Valido el apellido entre 1 y 30 caractares y uso la función trim para evitar que cuenten espacios en blanco
  const isLastNameValid = lastName =>
    isStringWithinLenght(lastName.trim(), 1, 30);

  // LLamando el evento "keyup" voy verificando si el apellido es valido o no
  lastName.addEventListener("keyup", () => {
    isLastNameValid(lastName.value)
      ? setValidation("!Qué buen apellido!", "elementLastName", "green")
      : setValidation(
          "El apellido no puede estar vacio o contener mas de 30 caracteres",
          "elementLastName",
          "red"
        );
  });

  // Valido el telefono usando un regex que valida si el campo de entrada son solo números
  const isPhoneValid = phone => /^\d+$/.test(phone);

  // LLamando al evento "keyup" voy verificando si el telefono es valido o no
  phone.addEventListener("keyup", () => {
    isPhoneValid(phone.value)
      ? setValidation("Telefono válido", "elementPhone", "green")
      : setValidation(
          "El telefono debe contener solo números",
          "elementPhone",
          "red"
        );
  });

  // Valido el email usando un regex que valida si el campo de entrada corresponde a la sintaxis de un mail
  const isEmailValid = email =>
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    );

  // LLamando al evento "keyup" voy verificando si el email es valido o no
  email.addEventListener("keyup", () => {
    isEmailValid(email.value)
      ? setValidation("Email válido", "elementEmail", "green")
      : setValidation("Ingrese un email válido", "elementEmail", "red");
  });

  // Llamando al evento "click" se envian los datos del formulario si esta todo correctamente validado a través de un método
  // POST, si hay algún error en la validación se le especificará al usuario, de la misma manera se maneja el error a nivel servidor
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
      const user = {
        name: name.value,
        lastName: lastName.value,
        phone: phone.value,
        email: email.value
      };

      const userIdElement = document.getElementById("userId");
      const userId = userIdElement && userIdElement.value;
      const fetchObj = {
        url: userId ? `/user/${userId}` : "/user",
        method: userId ? "PUT" : "POST"
      };
      fetch(fetchObj.url, {
        method: fetchObj.method,
        body: JSON.stringify(user), // data can be `string` or {object}!
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(response => response.json())
        .then(() => {
          setValidation("Completado exitosamente", "elementForm", "green");
          document.getElementById("redirection").innerHTML = "¿Desea Volver?";
        })
        .catch(() =>
          setValidation(
            "Hubo un error al guardar los datos",
            "elementForm",
            "red"
          )
        );
    }
  });
});
