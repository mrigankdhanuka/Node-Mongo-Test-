import express from 'express';
import { body } from 'express-validator';
import * as personController from '../controllers/person.controller.js';

const router = express.Router();

const personValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters'),
  
  body('age')
    .isInt({ min: 0, max: 150 }).withMessage('Age must be between 0 and 150'),
  
  body('gender')
    .isIn(['Male', 'Female', 'Other']).withMessage('Invalid gender'),
  
  body('mobileNumber')
    .matches(/^\+?[\d\s-]{10,}$/).withMessage('Invalid mobile number')
];

router.get('/', personController.getAllPeople);
router.post('/', personValidation, personController.createPerson);
router.get('/:id', personController.getPersonById);
router.put('/:id', personValidation, personController.updatePerson);
router.delete('/:id', personController.deletePerson);

export default router;