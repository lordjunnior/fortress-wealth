import { API_URL, BTC_CONSTANTS } from '../constants';
import { BitcoinStats } from '../types';

/**
 * Calculates the total circulating supply based on block height.
 * Iterates through halving eras to sum up rewards.
 */
const calculateCirculatingSupply = (height: number): number => {
  let supply = 0;
  let subsidy = BTC_CONSTANTS.INITIAL_SUBSIDY;
  let remainingHeight = height;
  let currentHalving = 0;

  while (remainingHeight > 0) {
    const blocksInEra = Math.min(remainingHeight, BTC_CONSTANTS.HALVING_INTERVAL);
    supply += blocksInEra * subsidy;
    remainingHeight -= blocksInEra;
    
    subsidy /= 2;
    currentHalving++;
    
    if (subsidy < 0.00000001) break;
  }

  return supply;
};

export const fetchBitcoinStats = async (): Promise<BitcoinStats> => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch block height');
    }
    
    const heightText = await response.text();
    const currentHeight = parseInt(heightText, 10);

    const currentEra = Math.floor(currentHeight / BTC_CONSTANTS.HALVING_INTERVAL);
    const nextHalvingBlock = (currentEra + 1) * BTC_CONSTANTS.HALVING_INTERVAL;
    const blocksToHalving = nextHalvingBlock - currentHeight;
    
    const timeRemainingMs = blocksToHalving * BTC_CONSTANTS.BLOCK_TIME_MINUTES * 60 * 1000;
    const estimatedHalvingDate = new Date(Date.now() + timeRemainingMs);

    const circulatingSupply = calculateCirculatingSupply(currentHeight);
    const percentageMined = (circulatingSupply / BTC_CONSTANTS.MAX_SUPPLY) * 100;

    return {
      blockHeight: currentHeight,
      nextHalvingBlock,
      blocksToHalving,
      circulatingSupply,
      percentageMined,
      estimatedHalvingDate
    };
  } catch (error) {
    console.error("Error fetching Bitcoin stats:", error);
    throw error;
  }
};
