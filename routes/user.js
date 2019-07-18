const express = require("express");

const router = express.Router();
const path = require("path");
const { promisify } = require("util");
const { readFile, writeFile } = require("fs");

const readFileAsync = promisify(readFile);
const writeFileAsync = promisify(writeFile);

const DATABASE_PATH = path.join(__dirname, "../database/customer.json");

const isStringWithinLenght = (string, min, max) =>
  string.length >= min && string.length <= max;
const isNameValid = name => isStringWithinLenght(name.trim(), 1, 30);
const isLastNameValid = lastName =>
  isStringWithinLenght(lastName.trim(), 1, 30);
const isPhoneValid = phone => /^\d+$/.test(phone);
const isEmailValid = email =>
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );

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

async function saveUser(user) {
  try {
    const newUserData = validateUser(user);

    if (!newUserData) {
      throw new Error("Invalid user Object");
    }

    const fileData = await readFileAsync(DATABASE_PATH);
    const userData = userData.sort((a, b) => a.id > b.id);
    const newUser = {
      id: userData.slice(-1)[0].id + 1,
      ...user
    };
    userData.push(newUser);

    await writeFileAsync(DATABASE_PATH, JSON.stringify(userData));

    return newUser;
  } catch (e) {
    return e.message;
  }
}

/* GET users listing. */
router.get("/", function(req, res, next) {
  readFileAsync(DATABASE_PATH)
    .then(data => {
      res.render("userTable", {
        title: "User List",
        userList: JSON.parse(data),
        jsSource: "userList"
      });
    })
    .catch(err => {
      res.status(500);
      res.json(err);
    });
});

router.post("/", (req, res) => {
  saveUser(req.body)
    .then(user => {
      res.status(200);
      res.json(user);
    })
    .catch(err => {
      res.status(500);
      res.json(err);
    });
});

router.get("/form", (req, res) => {
  res.render("form", {
    title: "User Form",
    jsSource: "form"
  });
});

module.exports = router;
