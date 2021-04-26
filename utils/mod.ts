export const validateDeno = () => {
  const [major, minor] = Deno.version.deno.split(".");
  return +major >= 1 && +minor >= 9;
}
