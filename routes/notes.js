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

router.post("/api/addnote", addNote);
router.get("/api/getallnotes", getAllNotes);
router.get("/api/getnormalnotes", getNormalNotes);
router.get("/api/getdeletednotes", getDeletedNotes);
router.get("/api/getpinnednotes", getPinnedNotes);
router.get("/api/getarchivednotes", getArchivedNotes);
router.delete("/api/deletenote/:id", deleteNote);
router.put("/api/updatenote/:id", updateNote);

module.exports = router;
