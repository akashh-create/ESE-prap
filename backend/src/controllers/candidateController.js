import Candidate from "../models/Candidate.js";

export async function addCandidate(req, res, next) {
  try {
    const { name, email, skills, experience, bio, projects } = req.body;

    if (!name || !email || !Array.isArray(skills) || skills.length === 0 || experience === undefined) {
      return res.status(400).json({
        message: "Name, email, at least one skill, and experience are required"
      });
    }

    const candidate = await Candidate.create({
      name,
      email,
      skills,
      experience,
      bio,
      projects
    });

    res.status(201).json(candidate);
  } catch (error) {
    next(error);
  }
}

export async function getCandidates(req, res, next) {
  try {
    const search = req.query.search?.trim();
    const filter = search
      ? {
          $or: [
            { name: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } },
            { skills: { $regex: search, $options: "i" } }
          ]
        }
      : {};

    const candidates = await Candidate.find(filter).sort({ createdAt: -1 });
    res.json(candidates);
  } catch (error) {
    next(error);
  }
}
