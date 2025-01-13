import { Invoice, Play } from './types';

export const plays: Record<string, Play> = {
  hamlet: { name: 'Hamlet', type: 'tragedy' },
  'as-like': { name: 'As You Like It', type: 'comedy' },
  othello: { name: 'Othello', type: 'tragedy' },
};

export const invoices: Invoice[] = [
  {
    customer: 'BigCo',
    performances: [
      {
        playId: 'hamlet',
        audience: 55,
      },
      {
        playId: 'as-like',
        audience: 35,
      },
      {
        playId: 'othello',
        audience: 40,
      },
    ],
  },
];
