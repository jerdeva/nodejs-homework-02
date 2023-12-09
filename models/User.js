const { Schema } = require("mongoose");
const { model } = require("mongoose");
const Joi = require("joi");

const { handlerSaveError } = require("./hooks.js");
const { handlePreUpdate } = require("./hooks.js");


const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
      minLength: 6,
    },
    email: {
      type: String,
      required: [true, "Set email for user"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handlerSaveError);
userSchema.pre("findOneAndUpdate", handlePreUpdate);
userSchema.post("findOneAndUpdate", handlerSaveError);

const userSignupSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30),
  email: Joi.string()
    .required()
    .messages({ "any.required": `"email" is a required field` }),
  password: Joi.string()
    .required()
    .messages({ "any.required": `"password" is a required field` }),
});


const userSigninSchema = Joi.object({
  email: Joi.string()
    .required()
    .messages({ "any.required": `"email" is a required field` }),
  password: Joi.string()
    .required()
    .messages({ "any.required": `"password" is a required field` }),
});

const userUpdateSubcsription = Joi.object({
  subscription: Joi.string()
    .required()
    .messages({ "any.required": `"subscription" is a required field` }),
});


const User = model("user", userSchema)


module.exports = {
  User,
  userSigninSchema,
  userSignupSchema,
  userUpdateSubcsription,
};