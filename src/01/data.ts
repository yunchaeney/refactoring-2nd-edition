export type PlayType = "tragedy" | "comedy";

export interface Play {
  name: string;
  type: PlayType;
}

export const plays: Record<string, Play> = {
  "hamlet" : { "name" :  "Hamlet", "type" : "tragedy" },
  "as-like" : { "name" :  "As You Like It", "type" : "comedy" },
  "othello" : { "name" :  "Othello", "type" : "tragedy" }
}

// Performance 데이터 타입 정의
export interface Performance {
  playId: string;
  audience: number;
}

// Invoice 데이터 타입 정의
export interface Invoice {
  customer: string;
  performances: Performance[];
}

export const invoices:Invoice[] = [
  {
    "customer" : "BigCo",
    "performances" : [
      {
        "playId" : "hamlet",
        "audience" : 55
      },
      {
        "playId" : "as-like",
        "audience" : 35
      },
      {
        "playId" : "othello",
        "audience" : 40
      }
    ]
  }
]