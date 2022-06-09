// Simple sum function
export const sumNumbers = (a, b) => {
  return a + b;
}

// Modify object to add a new property
export const addPropertyToObject = (obj, key, value) => {
  obj[key] = value;
  return obj;
}

// Mock data with spy method

export const randomBetween = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


