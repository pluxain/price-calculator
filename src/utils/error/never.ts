// This is a TS helper which should make sure the compiler complains
// When we use it with a non never value
export default function never(message: string, culprit: never) {
  throw new Error(`${message}, for ${culprit}`);
}
