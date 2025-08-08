export const isRewards = (token) =>
  token.filePath && token.filePath.includes('Reward');

export const isNatwest = (token) =>
  token.filePath && token.filePath.includes('Natwest');
