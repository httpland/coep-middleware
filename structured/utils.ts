/** Return number of digits. */
export function numberOfDigits(input: number): number {
  return Math.abs(Math.trunc(input)).toString().length;
}

export function sliceOf(
  index: number,
  input: string,
): [head: string, tail: string] {
  const head = input.slice(0, index);
  const tail = input.slice(index);

  return [head, tail];
}
