import memories from "../models/models.js";

export const getAllMemories = (req, res) => {
  memories.find().then((result) => {
    res.send(result);
  });
};

export const createMemory = (req, res) => {
  const memory = req.body;
  memories
    .create(memory)
    .then((result) => res.send(result))
    .catch((err) => res.send(err));
};

export const updateMemory = async (req, res) => {
  try {
    const { id } = req.params;
    const memory = req.body;
    const result = await memories.findByIdAndUpdate(id, memory);
    if (result) {
      res.status(200).send(result);
    } else {
      res.status(404).send("Memory not found");
    }
  } catch (err) {
    res.send(err);
  }
};

export const deleteMemory = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await memories.findByIdAndDelete(id);
    if (result) {
      res.status(200).send("Memory deleted successfully");
    } else {
      res.status(404).send("Memory not found");
    }
  } catch (err) {
    res.send(err);
  }
};