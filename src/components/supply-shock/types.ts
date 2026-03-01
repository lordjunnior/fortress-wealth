export interface BitcoinStats {
  blockHeight: number;
  nextHalvingBlock: number;
  blocksToHalving: number;
  circulatingSupply: number;
  percentageMined: number;
  estimatedHalvingDate: Date;
}

export interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}
