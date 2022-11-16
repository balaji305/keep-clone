const notesModel = require("../models/Notes");

exports.addNote = async (req, res) => {
  try {
    const newNote = await notesModel.create({
      user: req.body.user,
      title: req.body.title,
      body: req.body.body,
      id: req.body.id,
      isArchived: req.body.isArchived,
      isPinned: req.body.isPinned,
      isDeleted: req.body.isDeleted,
    });
    res.status(201).json({
      status: "success",
      data: { newNote },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getAllNotes = async (req, res) => {
  try {
    const notes = await notesModel.find({}, { _id: 0, __v: 0 });
    if (notes.length > 0) {
      res.status(200).json(notes);
    } else {
      res.status(200).json();
    }
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getDeletedNotes = async (req, res) => {
  try {
    const { userName: user } = req.query;
    const notes = await notesModel.find(
      { user, isDeleted: true },
      { _id: 0, __v: 0 }
    );
    if (notes.length > 0) {
      res.status(200).json(notes);
    } else {
      res.status(200).json();
    }
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getArchivedNotes = async (req, res) => {
  try {
    const { userName: user } = req.query;
    const notes = await notesModel.find(
      { user, isArchived: true, isDeleted: false },
      { _id: 0, __v: 0 }
    );
    if (notes.length > 0) {
      res.status(200).json(notes);
    } else {
      res.status(200).json();
    }
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getPinnedNotes = async (req, res) => {
  try {
    const { userName: user } = req.query;
    const notes = await notesModel.find(
      { user, isArchived: false, isPinned: true, isDeleted: false },
      { _id: 0, __v: 0 }
    );
    if (notes.length > 0) {
      res.status(200).json(notes);
    } else {
      res.status(200).json();
    }
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getNormalNotes = async (req, res) => {
  try {
    const { userName: user } = req.query;
    const notes = await notesModel.find(
      { user, isArchived: false, isPinned: false, isDeleted: false },
      { _id: 0, __v: 0 }
    );
    if (notes.length > 0) {
      res.status(200).json(notes);
    } else {
      res.status(200).json();
    }
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    const delNote = await notesModel.deleteOne({ id: req.params.id });
    if (delNote !== 0) {
      res.status(201).json({
        status: "success",
        result: `${req.params.id} Deleted`,
      });
    } else {
      res.status(201).json({
        status: "success",
        result: "No id found",
      });
    }
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.updateNote = async (req, res) => {
  try {
    const upNote = await notesModel.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (upNote != null) {
      res.status(201).json({
        status: "success",
        result: `${req.params.id} Updated`,
      });
    } else {
      res.status(201).json({
        status: "success",
        result: "No id found",
      });
    }
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};
