export interface GameMap {
  id: string;
  name: string;
  color: string;
  authorName: string;
}

export interface User {
  id: string;
  name: string;
  iconUrl: string;
  color: string;
  asset?: {
    name: {
      ja: string;
    };
    iconUrl: string;
  };
}
