import express from 'express';
import { body } from 'express-validator';
import { registerCaption } from '../controllers/caption.controller.js';

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
    body("vehical.plate")
      .isLength({ min: 5 })
      .withMessage("plate must be atleast 5 character long"),
    body("vehical.capacity")
      .isInt()
      .withMessage("capacity must be at least 1"),
    body("vehical.color")
      .isLength({ min: 3 })
      .withMessage("color must be at least 3 character long"),

    body("vehical.vehicalType")
      .isIn(['motorcycle', 'car', 'auto'])
      .withMessage("vechicalType must be one of the following: motorcycle, car, auto"),
  ],
  registerCaption
);

export default router;
