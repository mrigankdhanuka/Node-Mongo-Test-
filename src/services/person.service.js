import Person from '../models/person.model.js';

export const getAllPeople = async () => {
  return Person.find().sort({ createdAt: -1 });
};

export const getPersonById = async (id) => {
  return Person.findById(id);
};

export const createPerson = async (personData) => {
  const person = new Person(personData);
  return person.save();
};

export const updatePerson = async (id, personData) => {
  return Person.findByIdAndUpdate(
    id,
    personData,
    { new: true, runValidators: true }
  );
};

export const deletePerson = async (id) => {
  return Person.findByIdAndDelete(id);
};