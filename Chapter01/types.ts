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

// 1-6 에서 필요한 새로운 타입 정의
export interface EnrichedPerformance extends Performance {
  play: Play;
  amount: number;
  volumeCredits: number;
}

export interface EnrichedInvoice extends Invoice {
  performances: EnrichedPerformance[];
  totalVolumeCredits: number;
  totalAmount: number;
}
