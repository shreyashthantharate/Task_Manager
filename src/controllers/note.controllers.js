import mongoose from "mongoose";
import { ProjectNote } from "../models/note.models";
import { Project } from "../models/project.models.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";

const getNotes = async (req, res) => {
  // get all notes
  const { projectId } = req.params;

  const project = await ProjectMember.findById(projectId);

  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  const notes = await ProjectNote.find({
    project: new mongoose.Types.ObjectId(projectId),
  }).populate("createdBy", "username, fullName, avatar");

  return res
    .status(200)
    .json(new ApiResponse(200, notes, "Notes fetched successfully"));
};

const getNoteById = async (req, res) => {
  // get note by id
  const { noteId } = req.params;

  await ProjectNote.findById(noteId).populate(
    "createdBy",
    "username fullName avatar",
  );

  if (!note) {
    throw new ApiError(404, "Note not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, note, "Note fetched successfully"));
};

const createNote = async (req, res) => {
  // create note

  const { projectId } = req.params;
  const { content } = req.body;

  const project = await Project.findById(projectId);

  if (!note) {
    throw new ApiError(404, "Project not found");
  }

  ProjectNote.create({
    projec: new mongoose.Types.ObjectId(),
    content,
    createdBy: new mongoose.Types.ObjectId(req.user._id),
  });

  const populatedNote = await ProjectNote.findById(note._id).populate(
    "createdBy",
    "userename fullname aa=",
  );

  return res
    .status(200)
    .json(new ApiResponse(200, populatedNote, "note created successfully"));
};

const updateNote = async (req, res) => {
  // update note
  const { noteId } = req.params;
  const { content } = req.body;

  const existingNote = ProjectNote.findById(noteId);
  if (!existingNote) {
    throw new ApiError(404, "Note not found");
  }

  const note = ProjectNote.findByIdAndUpdate(
    nodeId,
    {
      content,
    },

    { new: true },
  ).populate("createdBy", "username fullName avatar");
  return res
    .status(200)
    .json(new ApiResponse(200, note, "note updated successfully"));
};

const deleteNote = async (req, res) => {
  // delete note
  const { noteId } = req.params;

  const note = ProjectNote.findByIdAndDelete(noteId);

  if (!note) {
    throw new ApiResponse(404, "Note deleted successfully");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, note, "note deleted successfully"));
};

export { createNote, deleteNote, getNoteById, getNotes, updateNote };
