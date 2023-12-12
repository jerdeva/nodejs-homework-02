const fs = require("fs");
const path = require("path");
const { HttpError } = require("../helpers/HttpError.js");
const { Contact } = require("../models/Contact.js");
const { ctrlWrapper } = require("../decorators/indexDecorators.js");

const avatarsPath = path.resolve("public", "avatars");

const getAllContacts = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, ...filterQueryParams } = req.query;

  const skip = (page - 1) * limit;

  const count = await Contact.countDocuments({ owner });

  const filterQuery = { owner, ...filterQueryParams };

  const result = await Contact.find(filterQuery, "-createdAt -updatedAt", {
    skip,
    limit,
  }).populate("owner", "email subscription");

  res.json({
    result,
    total: count,
    per_page: limit,
  });
};

const getContactsById = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;
  const result = await Contact.findOne({ _id: contactId, owner });
  if (!result) {
    throw HttpError(404, `OOps such contact with id - ${contactId} not found `);
  }
  res.json(result);
};

const postContact = async (req, res, ) => {
  const { _id: owner } = req.user;
  const { path: oldPath, filename } = req.file;
  const newPath = path.join(avatarsPath, filename);
  await fs.rename(oldPath, newPath);

  const avatar = path.join("avatars", filename);
  const result = await Contact.create({ ...req.body, avatar, owner });

  res.status(201).json(result);
};

const deleteContact = async (req, res, ) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;
  const result = await Contact.findOneAndDelete({ _id: contactId, owner });

  if (!result) {
    throw HttpError(404, `OOps such contact with id - ${contactId} not found `);
  }

  res.status(200).json({ message: "contact was success deleted" });
};

const updateContact = async (req, res, ) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;
  const result = await Contact.findOneAndUpdate(
    { _id: contactId, owner },
    req.body
  );

  if (!result) {
    throw HttpError(404, `OOps such contact with id - ${contactId} not found `);
  }

  res.status(200).json(result);
};

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContactsById: ctrlWrapper(getContactsById),
  postContact: ctrlWrapper(postContact),
  deleteContact: ctrlWrapper(deleteContact),
  updateContact: ctrlWrapper(updateContact),
};
