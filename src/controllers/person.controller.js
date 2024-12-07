import { StatusCodes } from 'http-status-codes';
import { validationResult } from 'express-validator';
import * as PersonService from '../services/person.service.js';
import { ApiError } from '../utils/api-error.js';

export const getAllPeople = async (req, res, next) => {
  try {
    const people = await PersonService.getAllPeople();
    res.status(StatusCodes.OK).json(people);
  } catch (error) {
    next(error);
  }
};

export const createPerson = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'Validation Error', errors.array());
    }

    const person = await PersonService.createPerson(req.body);
    res.status(StatusCodes.CREATED).json(person);
  } catch (error) {
    next(error);
  }
};

export const getPersonById = async (req, res, next) => {
  try {
    const person = await PersonService.getPersonById(req.params.id);
    if (!person) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Person not found');
    }
    res.status(StatusCodes.OK).json(person);
  } catch (error) {
    next(error);
  }
};

export const updatePerson = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'Validation Error', errors.array());
    }

    const person = await PersonService.updatePerson(req.params.id, req.body);
    if (!person) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Person not found');
    }
    res.status(StatusCodes.OK).json(person);
  } catch (error) {
    next(error);
  }
};

export const deletePerson = async (req, res, next) => {
  try {
    const person = await PersonService.deletePerson(req.params.id);
    if (!person) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Person not found');
    }
    res.status(StatusCodes.OK).json({ message: 'Person deleted successfully' });
  } catch (error) {
    next(error);
  }
};