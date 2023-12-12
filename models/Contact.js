const { Schema } = require("mongoose");
const { model } = require("mongoose");
const { handlerSaveError } = require("./hooks.js");



const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
  },
  email: {
    type: String,
    required: [true, "Set email for contact"],
  },
  phone: {
    type: String,
    required: [true, "Set phone for contact"],
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  avatar: {
    type: String,
    required: [true, "set avatar for contact"],
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
});


contactSchema.post("save", handlerSaveError);
contactSchema.post("findOneAndUpdate", handlerSaveError);


const Contact = model("contact", contactSchema);
 
module.exports = {
  Contact,
};
