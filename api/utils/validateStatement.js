export const validateStatement = (statement) => {
  if (!statement.actor || !statement.verb || !statement.object) {
    return false;
  }

  return true;
};
