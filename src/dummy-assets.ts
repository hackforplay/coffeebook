export interface Asset {
  id: string;
  name: string;
  description: string;
  color: string;
  category: number;
}

const names = ['Slime', 'Zombie', 'Egg', 'Penguin Knight', 'Dracula'];
const description = 'Description. '.repeat(5);
const colors = ['red', 'blue', 'green', 'yellow'];
const categories = [0, 1, 2];

export function makeAsset(): Asset {
  return {
    id: `asset-${window.setTimeout(() => {}, 0)}`,
    name: random(names),
    description: description,
    color: random(colors),
    category: random(categories)
  };
}

export function dummyAssets() {
  return Array.from({ length: 200 }).map(() => makeAsset());
}

export function random<T>(table: T[]) {
  const index = (Math.random() * table.length) >> 0;
  return table[index];
}
