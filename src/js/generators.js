/**
 * Generates random characters
 *
 * @param allowedTypes iterable of classes
 * @param maxLevel max character level
 * @returns Character type children (ex. Magician, Bowman, etc)
 */
export function* characterGenerator(allowedTypes, maxLevel) {
  // TODO: write logic here
  while (true) {
    const index = Math.floor(Math.random() * allowedTypes.length);
    yield [allowedTypes[index], maxLevel];
  }
}

export function generateTeam(allowedTypes, maxLevel, characterCount) {
  const gen = characterGenerator(allowedTypes, maxLevel);
  return gen.next(characterCount);
  // TODO: write logic here
}
