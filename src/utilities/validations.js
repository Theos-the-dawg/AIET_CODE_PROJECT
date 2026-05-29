exports = {body,validationresult} = require("express-validator");
[
    body("username")
    .trim()
    .toLowerCase()
    .escape(),

 body("username").notEmpty()
 .withMessage("Please enter your username!")
 //.isAlphanumeric()
// .withMessage("username must be alphanumeric")
.isLength({min:5, max:24})
.withMessage("username must have a minimum of 4 characters and maximum of 24"),

body("email")
.trim()
.isEmail()
.notEmpty(),


body("password")
.trim()
.notEmpty()

             





]
 