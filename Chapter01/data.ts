import { Invoice, Play } from './types';

export const plays: Record<string, Play> = {
  hamlet: { name: 'Hamlet', type: 'tragedy' },
  'as-like': { name: 'As You Like It', type: 'comedy' },
  othello: { name: 'Othello', type: 'tragedy' },
};

export const invoices: Invoice[] = [
  {
    customer: '고객A',
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
  {
    customer: '고객B',
    performances: [
      {
        playId: 'hamlet',
        audience: 60,
      },
      {
        playId: 'as-like',
        audience: 25,
      },
      {
        playId: 'othello',
        audience: 50,
      },
    ],
  },
  {
    customer: '고객C',
    performances: [
      {
        playId: 'hamlet',
        audience: 45,
      },
      {
        playId: 'as-like',
        audience: 30,
      },
      {
        playId: 'othello',
        audience: 35,
      },
    ],
  },
];
