export const cleanUserName = (name = "") => {
  return name
    .replace(/[@#]/g, "")
    .replace(/-/g, " ")
    .replace(/\s+/g, " ")
    .trim();
};
