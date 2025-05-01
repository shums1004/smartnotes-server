import { Router } from "express";

const router = Router();
import { register, login } from "./controllers/UserController.js";
import { getAllNotes, getNoteById, createNote, updateNote, deleteNote } from "./controllers/NotesController.js";
import { auth } from "./middleware/authMiddleware.js";

// User routes
router.post("/register", register);
router.post("/login", login);

// Note routes
router.get("/getnotes", auth, getAllNotes);
router.get("/getnote/:id", auth, getNoteById);
router.post("/createnote", auth, createNote);
router.put("/editnote/:id", auth, updateNote);
router.delete("/deletenote/:id", auth, deleteNote);

export default router;