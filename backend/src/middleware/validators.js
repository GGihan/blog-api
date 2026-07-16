import { body } from "express-validator";
import { prisma } from "../../lib/prisma.js";

// Error messages
const emptyErr = 'can\'t be empty.';
const usernameLengthErr = 'must be between 3 and 30 characters.';
const passwordLengthErr = 'must be between 8 and 72 characters.';
const titleLengthErr = 'must be between 3 and 50 characters.';
const postContentLengthErr = 'must be between 10 and 1000 characters.';
const commentContentLengthErr = 'must be between 3 and 500 characters.';
const symbolErr = 'can only contain letters, numbers, underscores, and hyphens.';
const booleanErr = 'must be a true or false value.';

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

export const validateCreatePost = [
  body('title')
    .trim()
    .notEmpty().withMessage(`Title ${emptyErr}`)
    .isLength({ min: 3, max: 50 }).withMessage(`Title ${titleLengthErr}`),
  body('content')
    .trim()
    .notEmpty().withMessage(`Content ${emptyErr}`)
    .isLength({ min: 10, max: 1000 }).withMessage(`Content ${postContentLengthErr}`),
  body('published')
    .optional()
    .isBoolean().withMessage(`Published ${booleanErr}`),
];

export const validateUpdatePost = [
  body('title')
    .optional()
    .trim()
    .notEmpty().withMessage(`Title ${emptyErr}`)
    .isLength({ min: 3, max: 50 }).withMessage(`Title ${titleLengthErr}`),
  body('content')
    .optional()
    .trim()
    .notEmpty().withMessage(`Content ${emptyErr}`)
    .isLength({ min: 10, max: 1000 }).withMessage(`Content ${postContentLengthErr}`),
  body('published')
    .optional()
    .isBoolean().withMessage(`Published ${booleanErr}`),
];

export const validateId = (req, res, next) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({
      success: false, 
      message: "Invalid ID format.",
    });
  }
  next();
};

export const validateComment = [
  body('content')
    .trim()
    .notEmpty().withMessage(`Content ${emptyErr}`)
    .isLength({ min: 3, max: 500 }).withMessage(`Content ${commentContentLengthErr}`),
];