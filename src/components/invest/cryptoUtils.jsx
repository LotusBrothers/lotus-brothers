// Crypto investment utilities — MetaMask wallet connection & ETH transactions

export async function connectWallet() {
  if (!window.ethereum) throw new Error("MetaMask is not installed. Please install it from metamask.io");
  const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
  return accounts[0];
}

export async function getWalletAddress() {
  if (!window.ethereum) return null;
  const accounts = await window.ethereum.request({ method: "eth_accounts" });
  return accounts[0] || null;
}

export async function getEthBalance(address) {
  if (!window.ethereum) return "0";
  const { ethers } = await import("ethers");
  const provider = new ethers.BrowserProvider(window.ethereum);
  const balance = await provider.getBalance(address);
  return parseFloat(ethers.formatEther(balance)).toFixed(4);
}

export async function sendInvestment({ toAddress, ethAmount }) {
  if (!window.ethereum) throw new Error("MetaMask is not installed.");
  const { ethers } = await import("ethers");
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  const tx = await signer.sendTransaction({
    to: toAddress,
    value: ethers.parseEther(String(ethAmount)),
  });

  await tx.wait();
  return tx.hash;
}

// Simulated ETH price in USD (in production, fetch from Chainlink or CoinGecko)
export const ETH_PRICE_USD = 3200;

export function usdToEth(usd) {
  return (usd / ETH_PRICE_USD).toFixed(6);
}

export function ethToUsd(eth) {
  return (parseFloat(eth) * ETH_PRICE_USD).toFixed(2);
}