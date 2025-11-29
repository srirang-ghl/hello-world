export function pickRandomNonRepeat<T>(items: T[], lastPicked?: T): T {
  if (items.length === 0) throw new Error("Items array cannot be empty");
  if (items.length === 1) return items[0];

  let availableItems = lastPicked
    ? items.filter(item => item !== lastPicked)
    : items;

  const randomIndex = Math.floor(Math.random() * availableItems.length);
  return availableItems[randomIndex];
}