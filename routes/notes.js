const express = require("express");
const jwt = require("jsonwebtoken");
const Note = require("../models/Note");

const router = express.Router();

const JWT_SECRET = "cea_notes_secret";

function authenticate(req, res, next) {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Authentication required" });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}

router.post("/", authenticate, async (req, res) => {
    try {
        const { title, content } = req.body;

        if (!title || !content) {
            return res.status(400).json({ message: "Title and content are required" });
        }

        const note = new Note({
            title,
            content,
            userId: req.userId
        });

        await note.save();

        res.status(201).json(note);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

router.get("/", authenticate, async (req, res) => {
    try {
        const notes = await Note.find({ userId: req.userId });
        res.json(notes);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

router.put("/:id", authenticate, async (req, res) => {
    try {
        const { title, content } = req.body;

        if (!title || !content) {
            return res.status(400).json({ message: "Title and content are required" });
        }

        const note = await Note.findOneAndUpdate(
            { _id: req.params.id, userId: req.userId },
            { title, content },
            { new: true }
        );

        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }

        res.json(note);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

router.delete("/:id", authenticate, async (req, res) => {
    try {
        const note = await Note.findOneAndDelete({
            _id: req.params.id,
            userId: req.userId
        });

        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }

        res.json({ message: "Note deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
