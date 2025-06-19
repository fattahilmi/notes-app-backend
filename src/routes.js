import { Router } from "express";
import { getNotes, createNote, editNoteById, deleteNoteById, getNoteById } from "./controller.js";

const router = Router();

// Define routes
router.get("/notes", getNotes);
router.get("/notes/:id", getNoteById);
router.post("/notes", createNote);
router.put("/notes/:id", editNoteById);
router.delete("/notes/:id", deleteNoteById);

export default router;