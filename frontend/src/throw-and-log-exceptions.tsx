export const throwAndLogExceptions = (e: Error) => {
  console.error(e);
  throw e;
}