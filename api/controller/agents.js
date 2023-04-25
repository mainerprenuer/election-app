import asyncWrapper from "../asyncWrapper";
import Agents from "../models/agent";
import customError from "../customErrors";
import multer from "multer";

const getAll = asyncWrapper(async (req, res, next) => {
  const data = await Agents.find().sort("name");
  res.status(201).json({ data, length: data.length });
});

const create = asyncWrapper(async (req, res) => {
  const data = await Agents.create(req.body);
  const Storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });

  const upload = multer({ storage: Storage }).single("Tesing image");
  res.status(201).json(req.body);
});

const getSingle = asyncWrapper(async (req, res, next) => {
  const { id: docID } = req.params;
  const doc = await Agents.findOne({ _id: docID });

  if (!doc) {
    return next(
      customError.createCustomError(
        `No article found with the id: ${docID}`,
        404
      )
    );
  } else {
    return res.status(201).json({ doc });
  }
});

const deleteAgent = asyncWrapper(async (req, res, next) => {
  const { id: docID } = req.params;
  const doc = await Agents.findOneAndDelete({ _id: docID });

  if (!doc) {
    return next(
      customError.createCustomError(
        `No article found with the id: ${docID}`,
        404
      )
    );
  } else {
    return res.status(201).json({ doc });
  }
});

const update = asyncWrapper(async (req, res, next) => {
  const { id: docID } = req.params;
  const doc = await Agents.findOneAndUpdate({ _id: docID }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!doc) {
    return next(
      customError.createCustomError(
        `No article found with the id: ${docID}`,
        404
      )
    );
  }
  res.status(200).json({ docID });
});

const edit = asyncWrapper(async (req, res) => {
  const { id: docID } = req.params;
  const doc = await Agents.findOneAndUpdate({ _id: docID }, req.body, {
    new: true,
    runValidators: true,
    overwrite: false,
  });

  if (!doc) {
    return res.status(404).json({ msg: `No question with id: ${docID}` });
  }
  res.status(200).json({ docID });
});

const AgentsKit = {
  getAll,
  create,
  getSingle,
  update,
  deleteAgent,
  edit,
};

export default AgentsKit;
