export type PlayType = 'tragedy' | 'comedy';

export interface Play {
  name: string;
  type: PlayType;
}

export interface Performance {
  playId: string;
  audience: number;
}

export interface Invoice {
  customer: string;
  performances: Performance[];
}
