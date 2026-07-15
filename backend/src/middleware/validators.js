import { body } from "express-validator";
import { prisma } from "../../lib/prisma.js";

// Error messages
const emptyErr = 'can\'t be empty.';
const usernameLengthErr = 'must be between 3 and 30 characters.';
const passwordLengthErr = 'must be between 8 and 72 characters.';
const symbolErr = 'can only contain letters, numbers, underscores, and hyphens.';

// Validations
export const validateRegister = [
  body('username')
    .trim()
    .notEmpty().withMessage(`Username ${emptyErr}`)
    .isLength({ min: 3, max: 30 }).withMessage(`Username ${usernameLengthErr}`)
    .matches(/^[a-zA-Z0-9_-]+$/).withMessage(`Username ${symbolErr}`)
    // Check if username already exists
    .custom(async (value) => {
      const user = await prisma.user.findUnique({ where: { username: value } });
      if (user) {
        throw new Error('Username is already taken.');
      }
    }),
  body('password')
    .notEmpty().withMessage(`Password ${emptyErr}`)
    .isLength({ min: 8, max: 72 }).withMessage(`Password ${passwordLengthErr}`),
  // body('passwordConfirm')
  //   .custom((value, {req}) => {
  //     return value === req.body.password;
  //   }).withMessage(`Passwords do not match.`),
];

export const validateLogIn = [
  body('username')
    .trim()
    .notEmpty().withMessage(`Username ${emptyErr}`),
  body('password')
    .notEmpty().withMessage(`Password ${emptyErr}`),
];