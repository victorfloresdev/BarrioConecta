export const isValidPhone = (phone) => {
  if (!phone) return false;
  const clean = phone.toString().replace(/\D/g, '');
  return clean.length === 9 && clean.startsWith('9');
};

export const isNotEmpty = (str) => {
  return typeof str === 'string' && str.trim().length > 0;
};
