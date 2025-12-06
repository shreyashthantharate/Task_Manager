import { Router } from "express";
import {
  createNote,
  getNoteById,
  getNotes,
} from "../controllers/note.controllers";
import { AvailableUserRoles, UserRolesEnum } from "../utils/constants.js";
import { validateProjectPermission } from "../middlewares/auth.middleware.js";

const router = Router();

router
  .route("/:projectId")
  .get(
    validateProjectPermission([UserRolesEnum.ADMIN, UserRolesEnum.MEMBER]),
    getNotes,
  )
  .post(validateProjectPermission([UserRolesEnum.ADMIN]), createNote);

router
  .route("/:projectId/n/:noteId")
  .get(validateProjectPermission(AvailableUserRoles), getNoteById)
  .put(validateProjectPermission([UserRolesEnum.ADMIN]), updateNote)
  .delete(validateProjectPermission([UserRolesEnum.ADMIN]));

export default router;
