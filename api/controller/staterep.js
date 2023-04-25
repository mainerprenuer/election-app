import asyncWrapper from "../asyncWrapper";
import StateRep from "../models/stateRep";
import customError from "../customErrors";

const getAll = async (req, res) => {
  const data = await StateRep.find().sort("name");
  res.status(201).json({ data, length: data.length });
};

const create = asyncWrapper(async (req, res) => {
  const data = await StateRep.create(req.body);
  res.status(201).json(req.body);
});

const getSingle = asyncWrapper(async (req, res, next) => {
  const { id: docID } = req.params;
  const doc = await StateRep.findOne({ _id: docID });

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
  const doc = await StateRep.findOneAndDelete({ _id: docID });

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
  const doc = await StateRep.findOneAndUpdate({ _id: docID }, req.body, {
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
  const doc = await StateRep.findOneAndUpdate({ _id: docID }, req.body, {
    new: true,
    runValidators: true,
    overwrite: false,
  });

  if (!doc) {
    return res.status(404).json({ msg: `No question with id: ${docID}` });
  }
  res.status(200).json({ docID });
});

const StateRepKit = {
  getAll,
  create,
  getSingle,
  update,
  deleteAgent,
  edit,
};

export default StateRepKit;
