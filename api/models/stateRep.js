import { Schema, model, models } from "mongoose";

const stateRepSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

module.exports = models.Staterep || model("Staterep", stateRepSchema);
