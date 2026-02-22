// Uses localStorage for persistence in a standard CRA app.
// Keys are prefixed to avoid collisions.

const PREFIX = 'niveditha_';

export const storageGet = (key) => {
  try {
    const raw = localStorage.getItem(PREFIX + key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const storageSet = (key, value) => {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value));
  } catch {}
};
