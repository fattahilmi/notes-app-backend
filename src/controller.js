// memuat seluruh fungsi-fungsi handler yang digunakan pada berkas routes

import { nanoid } from 'nanoid';// Importing the nanoid library to generate unique IDs
import notes from './notes.js'; // Assuming notes.js exports an array of note objects
import e from 'express';

const getNotes = (req, res) => {
  return res.status(200).json({
    status: "success",
    message: "Get all notes",
    data: {
      notes
    } 
  });
}

const getNoteById = (req, res) => {
  const noteId = req.params.id;
  const note = notes.find(n => n.id === noteId);
  if (note) {
    return res.status(200).json({
      status: "success",
      message: `Note with id ${noteId} found`,
      data: {
        note
      }
    });
  } else {
    return res.status(404).json({
      status: "fail",
      message: `Note with id ${noteId} not found`
    });
  }
}

const createNote = (req, res) => {
    const { title, tags, body } = req.body; // Assuming the request body contains the note data
    // console.log("Creating note with data:", { title, tags, body });
    const id = nanoid(16); // Generate a unique ID for the note
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;
    
    const newNote = {
      id,
      title,
      tags: tags || [],
      body,
      createdAt,
      updatedAt
    };

    notes.push(newNote);

    const isSuccess = notes.filter((note) => note.id === id).length > 0;
    
    if (isSuccess) {
      return res.status(201).json({
        status: "success",
        message: "Catatan berhasil ditambahkan",
        data: {
          noteId: id
        }
      });
    }
    return res.status(500).json({
      status: "fail",
      message: "Catatan gagal ditambahkan"
    });
    // res.status(201).json({ message: "Note created" });
}

const editNoteById = (req, res) => {
  const noteId = req.params.id;
  const { title, tags, body } = req.body;
  const noteIndex = notes.findIndex(n => n.id === noteId);

  if (noteIndex !== -1) {
    notes[noteIndex] = {
      ...notes[noteIndex],
      title: title || notes[noteIndex].title,
      tags: tags || notes[noteIndex].tags,
      body: body || notes[noteIndex].body,
      updatedAt: new Date().toISOString()
    };
    return res.status(200).json({
      status: "success",
      message: `Note with id ${noteId} updated`,
      data: {
        note: notes[noteIndex]
      }
    });
  } else {
    return res.status(404).json({
      status: "fail",
      message: `Note with id ${noteId} not found`
    });
  }
}

const deleteNoteById = (req, res) => {
  const noteId = req.params.id;
  const noteIndex = notes.findIndex(n => n.id === noteId);
  if (noteIndex === -1) {
    return res.status(404).json({
      status: "fail",
      message: `Note with id ${noteId} not found`
    });
  }
  notes.splice(noteIndex, 1);
  return res.status(200).json({
    status: "success",
    message: `Note with id ${noteId} deleted`
  });
}

export { getNotes, createNote, editNoteById, deleteNoteById, getNoteById };