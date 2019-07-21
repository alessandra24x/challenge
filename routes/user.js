const express = require("express");

const router = express.Router();
const path = require("path");
const { promisify } = require("util");
const { readFile, writeFile } = require("fs");

const readFilePromisified = promisify(readFile);
const writeFilePromisified = promisify(writeFile);

/**
 * Ruta de la carpeta DATABASE que contiene el archivo de "base de datos" (customer.json).
 * @type {string}
 */
const DATABASE_PATH = path.join(__dirname, "../database/customer.json");

/**
 *
 * @param {string} string
 * @param {number} min
 * @param {number} max
 * @returns {boolean}
 */
const isStringWithinLenght = (string, min, max) =>
  string.length >= min && string.length <= max;

/**
 *
 * @param {string} name
 * @returns {boolean}
 */
const isNameValid = name => isStringWithinLenght(name.trim(), 1, 30);

/**
 *
 * @param {string} lastName
 * @returns {boolean}
 */
const isLastNameValid = lastName =>
  isStringWithinLenght(lastName.trim(), 1, 30);

/**
 *
 * @param {string} phone
 * @returns {boolean}
 */
const isPhoneValid = phone => /^\d+$/.test(phone);

/**
 *
 * @param {string} email
 * @returns {boolean}
 */
const isEmailValid = email =>
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );

/**
 *
 * @param {string} name
 * @param {string} lastName
 * @param {string} phone
 * @param {string} email
 * @return {boolean|object}
 */
function validateUser({ name, lastName, phone, email }) {
  if (
    isNameValid(name) &&
    isLastNameValid(lastName) &&
    isPhoneValid(phone) &&
    isEmailValid(email)
  ) {
    return {
      name,
      lastName,
      phone,
      email
    };
  }

  return false;
}

/**
 * @param {object} user
 * @return {object}
 */
async function saveUser(user) {
  try {
    const newUserData = validateUser(user);

    if (!newUserData) {
      throw new Error("Invalid user Object");
    }

    const fileData = JSON.parse(await readFilePromisified(DATABASE_PATH));
    const userData = fileData.sort((a, b) => a.id > b.id);

    const newUser = user.hasOwnProperty("id")
      ? {
          ...userData
            .splice(userData.findIndex(u => u.id === user.id), 1)
            .pop(),
          ...newUserData
        }
      : {
          id: userData.slice(-1)[0].id + 1,
          ...user
        };
    userData.push(newUser);

    await writeFilePromisified(DATABASE_PATH, JSON.stringify(userData));

    return newUser;
    /**
     * @param {error} e
     * @return {error}
     */
  } catch (e) {
    return e.message;
  }
}

router.get("/list", function(req, res, next) {
  readFilePromisified(DATABASE_PATH)
    .then(data => {
      res.render("userTable", {
        title: "User List",
        userList: JSON.parse(data),
        jsSource: "userList"
      });
    })
    .catch(err => {
      res.status(500).send(err.message);
    });
});

/**
 * Save user route
 */
router.post("/", (req, res) => {
  saveUser(req.body)
    .then(user => {
      res.status(200).send({ user });
    })
    .catch(err => {
      res.status(500).send(err.message);
    });
});

router.put("/:id", (req, res) => {
  saveUser({ id: parseInt(req.params.id), ...req.body })
    .then(user => {
      res.status(200).send({ user });
    })
    .catch(err => {
      res.status(500).send(err.message);
    });
});

router.delete("/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  readFilePromisified(DATABASE_PATH)
    .then(data => {
      return JSON.parse(data);
    })
    .then(json => {
      json.splice(json.findIndex(u => u.id === userId), 1);
      return json;
    })
    .then(file => {
      writeFilePromisified(DATABASE_PATH, JSON.stringify(file))
        .then(() => {
          res.status(200).send({ message: "ok" });
        })
        .catch(err => {
          res.status(500).send(err.message);
        });
    })
    .catch(err => {
      res.status(500).send(err.message);
    });
});

router.get("/form", (req, res) => {
  res.render("form", {
    title: "User Form",
    header: "Nuevo Usuario",
    jsSource: "form"
  });
});

router.get("/form/:id", (req, res) => {
  readFilePromisified(DATABASE_PATH)
    .then(data => {
      const userId = parseInt(req.params.id);
      const user = JSON.parse(data).find(u => u.id === parseInt(userId));
      res.render("form", {
        title: "User Form",
        header: `Editar Usuario #${userId}`,
        jsSource: "form",
        userId,
        ...user
      });
    })
    .catch(err => {
      res.status(500).send(err.message);
    });
});

module.exports = router;
