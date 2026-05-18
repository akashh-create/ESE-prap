import Employee from "../models/Employee.js";

export async function addEmployee(req, res, next) {
  try {
    const employee = await Employee.create(req.body);
    res.status(201).json({ message: "Employee stored successfully", employee });
  } catch (error) {
    next(error);
  }
}

export async function getEmployees(req, res, next) {
  try {
    const employees = await Employee.find().sort({ performanceScore: -1, experience: -1 });
    res.json(employees);
  } catch (error) {
    next(error);
  }
}

export async function searchEmployees(req, res, next) {
  try {
    const { department, skill, minScore, name } = req.query;
    const filter = {};

    if (department) filter.department = { $regex: department, $options: "i" };
    if (skill) filter.skills = { $regex: skill, $options: "i" };
    if (name) filter.name = { $regex: name, $options: "i" };
    if (minScore) filter.performanceScore = { $gte: Number(minScore) };

    const employees = await Employee.find(filter).sort({ performanceScore: -1 });
    res.json(employees);
  } catch (error) {
    next(error);
  }
}

export async function updateEmployee(req, res, next) {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json({ message: "Employee updated successfully", employee });
  } catch (error) {
    next(error);
  }
}

export async function deleteEmployee(req, res, next) {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json({ message: "Employee removed successfully" });
  } catch (error) {
    next(error);
  }
}
