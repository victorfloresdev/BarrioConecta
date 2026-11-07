export const formatSoles = (monto) => {
  if (monto === null || monto === undefined) return 'A convenir';
  const num = typeof monto === 'number' ? monto : parseFloat(monto);
  if (isNaN(num)) return 'A convenir';
  return `S/ ${num.toFixed(2)}`;
};

export const formatDistancia = (km) => {
  if (km === null || km === undefined) return '';
  return `A ${km} km`;
};

export const formatTelefono = (tel) => {
  if (!tel) return '';
  const clean = tel.toString().replace(/\D/g, '');
  if (clean.length === 9) {
    return `${clean.slice(0, 3)} ${clean.slice(3, 6)} ${clean.slice(6)}`;
  }
  return tel;
};
