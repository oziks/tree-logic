export const comesFromSameTree = (a: string, b: string) => {
  const splittedA = a.split(".");
  const splittedB = b.split(".");

  const minLength = Math.min(splittedA.length, splittedB.length);

  return (
    splittedA.slice(0, minLength).join(".") ===
    splittedB.slice(0, minLength).join(".")
  );
};

export const parentPath = (path?: string) => {
  const splitted = path.split(".");
  splitted.pop();

  return splitted.join(".") || null;
};

export const depthPath = (path?: string) => {
  if (!path) {
    return null;
  }

  const splitted = path.split(".");

  return splitted.length - 1 || 0;
};

export const incrementPath = (path: string, depth?: number) => {
  const splitted = path.split(".");

  if (depth > splitted.length) {
    throw Error("Unabled to increment path for this depth.");
  }

  const depthDeducted = depth || splitted.length - 1;
  const depthToIncrement = parseInt(splitted[depthDeducted], 10);

  splitted[depthDeducted] = (depthToIncrement + 1).toString();

  return splitted.join(".");
};

export const decrementPath = (path: string, depth?: number) => {
  const splitted = path.split(".");
  const last = parseInt(splitted.pop(), 10);

  if (last === 0) {
    throw Error("Unabled to decrement a zero level path.");
  }

  splitted.push((last - 1).toString());

  return splitted.join(".");
};
