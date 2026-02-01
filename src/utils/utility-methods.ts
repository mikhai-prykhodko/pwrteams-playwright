/**
 * Get random element from array
 * @param array - Array to get random element from
 * @returns Random element
 */
export function getRandomElement(array: any[]): any {
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * Shuffle array
 * @param array - Array to shuffle
 * @returns Shuffled array
 */
export function shuffleArray(array: any[]): any[] {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

/**
 * Get random days in month
 * @returns Random days in month
 */
export function getDaysInMonthInRandomOrder(maxDayInMonth?: number): number[] {
  let days: number[] = Array.from(
    {length: maxDayInMonth ?? 31},
    (_, i) => i + 1,
  );
  days = shuffleArray(days);
  return days;
}
