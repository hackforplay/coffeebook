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
