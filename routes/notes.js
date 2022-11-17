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

router.post("/notes/addnote", addNote);
router.get("/notes/getallnotes", getAllNotes);
router.get("/notes/getnormalnotes", getNormalNotes);
router.get("/notes/getdeletednotes", getDeletedNotes);
router.get("/notes/getpinnednotes", getPinnedNotes);
router.get("/notes/getarchivednotes", getArchivedNotes);
router.delete("/notes/deletenote/:id", deleteNote);
router.put("/notes/updatenote/:id", updateNote);

module.exports = router;
