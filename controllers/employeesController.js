const Employee = require('../model/Employee');

const getAllEmployees = async (req, res) => {
  const employees = await Employee.find({});
  if (!employees)
    return res.status(204).json({
      message: 'No employees found'
    });
  res.status(200).json(employees);
};

const createNewEmployee = async (req, res) => {
  if (!req?.body?.firstname || !req?.body?.lastname) {
    return res.status(400).json({
      message: 'First and last names are required'
    });
  }

  try {
    const result = await Employee.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname
    });
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};

const updateEmployee = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({
      message: 'ID parameter is required'
    });
  }

  const employee = await Employee.findById(req.body.id);

  if (!employee) {
    return res.status(204).json({
      message: 'No employee matches the ID'
    });
  }

  if (req.body?.firstname) employee.firstname = req.body.firstname;
  if (req.body?.lastname) employee.lastname = req.body.lastname;
  const result = await employee.save();

  res.status(201).json(result);
};

const deleteEmployee = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({
      message: 'ID parameter is required'
    });
  }
  const employee = await Employee.findById(req.body.id);

  if (!employee) {
    return res.status(204).json({
      message: 'No employee matches the ID'
    });
  }

  const result = await employee.remove();
  // const result = await employee.deleteOne();
  res.status(201).json(result);
};

const getEmployee = async (req, res) => {
  if (!req?.params?.id) {
    return res.status(400).json({
      message: 'ID parameter is required'
    });
  }
  const employee = await Employee.findById(req.params.id);
  if (!employee) {
    return res.status(204).json({
      message: 'No employee matches the ID'
    });
  }

  res.status(200).json(employee);
};

module.exports = {
  getAllEmployees,
  createNewEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployee
};
