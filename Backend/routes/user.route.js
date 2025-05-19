import express from "express";
import { body } from "express-validator";
import { login, register } from "../controllers/user.controller.js";
const router = express.Router();
router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("  First name must be atleast 3 character long"),
    body("password")
      .isLength({ min: 5 })
      .withMessage("Password must be atleast 5 character long"),
  ],
  register
);
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password")
      .isLength({ min: 5 })
      .withMessage("Password must be atleast 5 character long"),
  ],
  login
)
export default router;
