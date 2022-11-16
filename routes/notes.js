const {
  addNote,
  getAllNotes,
  getNormalNotes,
  getDeletedNotes,
  getPinnedNotes,
  getArchivedNotes,
  deleteNote,
  updateNote,
} = require("../controllers/notesHandler");

const router = require("express").Router();

router.post("/addnote", addNote);
router.get("/getallnotes", getAllNotes);
router.get("/getnormalnotes", getNormalNotes);
router.get("/getdeletednotes", getDeletedNotes);
router.get("/getpinnednotes", getPinnedNotes);
router.get("/getarchivednotes", getArchivedNotes);
router.delete("/deletenote/:id", deleteNote);
router.put("/updatenote/:id", updateNote);

module.exports = router;
