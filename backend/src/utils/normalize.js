export function normalizeSkill(skill) {
  return String(skill || "").trim().toLowerCase();
}

export function normalizeSkillList(skills = []) {
  return [...new Set(skills.map(normalizeSkill).filter(Boolean))];
}
