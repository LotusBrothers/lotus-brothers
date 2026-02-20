import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Wallet, TrendingUp, DollarSign, ArrowRight, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { connectWallet, getWalletAddress, getEthBalance, sendInvestment, usdToEth, ethToUsd, ETH_PRICE_USD } from "@/lib/cryptoInvest";

// Demo escrow address — in production this would be your smart contract
const ESCROW_ADDRESS = "0x742d35Cc6634C0532925a3b8D4C9E4F3b3c75d8e";

const SHARE_PRICE_USD = 1000; // 1 fractional share = $1,000

export default function InvestModal({ project, onClose }) {
  const [step, setStep] = useState("overview"); // overview | amount | confirm | success | error
  const [wallet, setWallet] = useState(null);
  const [balance, setBalance] = useState(null);
  const [shares, setShares] = useState(1);
  const [currency, setCurrency] = useState("ETH");
  const [txHash, setTxHash] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const totalUSD = shares * SHARE_PRICE_USD;
  const totalETH = usdToEth(totalUSD);

  useEffect(() => {
    getWalletAddress().then(addr => {
      if (addr) {
        setWallet(addr);
        getEthBalance(addr).then(setBalance);
      }
    });
  }, []);

  const handleConnectWallet = async () => {
    setLoading(true);
    try {
      const addr = await connectWallet();
      setWallet(addr);
      const bal = await getEthBalance(addr);
      setBalance(bal);
    } catch (e) {
      setErrorMsg(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInvest = async () => {
    setLoading(true);
    setErrorMsg("");
    try {
      const hash = await sendInvestment({ toAddress: ESCROW_ADDRESS, ethAmount: totalETH });
      setTxHash(hash);
      setStep("success");
    } catch (e) {
      setErrorMsg(e.message || "Transaction failed. Please try again.");
      setStep("error");
    } finally {
      setLoading(false);
    }
  };

  const short = addr => addr ? `${addr.slice(0, 6)}…${addr.slice(-4)}` : "";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.97 }}
        transition={{ duration: 0.4 }}
        className="bg-[#0F1E2E] border border-white/10 w-full max-w-md relative"
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-white/8">
          <div>
            <div className="text-[#C4A97D] text-[9px] tracking-[0.35em] uppercase font-light mb-1">Invest with Crypto</div>
            <h3 className="text-white text-lg font-light tracking-wide">{project.title}</h3>
            <p className="text-white/30 text-xs font-light mt-0.5">{project.location}</p>
          </div>
          <button onClick={onClose} className="text-white/25 hover:text-white/60 transition-colors mt-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Project Metrics */}
        <div className="grid grid-cols-3 border-b border-white/8">
          {[
            { label: "Total Raise", value: project.raise || "$18.5M" },
            { label: "Proj. IRR", value: `${project.roi || 24}%` },
            { label: "Funded", value: `${project.raise_pct || 82}%` },
          ].map((m, i) => (
            <div key={m.label} className={`px-5 py-4 ${i < 2 ? "border-r border-white/8" : ""}`}>
              <div className="text-white text-base font-extralight">{m.value}</div>
              <div className="text-white/25 text-[8px] tracking-[0.25em] uppercase mt-0.5">{m.label}</div>
            </div>
          ))}
        </div>

        {/* Body */}
        <div className="p-6">
          <AnimatePresence mode="wait">

            {/* STEP: overview / amount */}
            {(step === "overview" || step === "amount") && (
              <motion.div key="amount" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>

                {/* Wallet status */}
                {!wallet ? (
                  <div className="mb-6 p-4 border border-[#C4A97D]/20 bg-[#C4A97D]/5">
                    <p className="text-white/50 text-xs font-light mb-3">Connect your MetaMask wallet to invest fractional shares.</p>
                    <button
                      onClick={handleConnectWallet}
                      disabled={loading}
                      className="flex items-center gap-2 bg-[#C4A97D] text-[#0F1E2E] text-[10px] tracking-[0.25em] uppercase font-medium px-5 py-2.5 hover:bg-[#d4b98d] transition-colors"
                    >
                      <Wallet className="w-3.5 h-3.5" />
                      {loading ? "Connecting…" : "Connect MetaMask"}
                    </button>
                  </div>
                ) : (
                  <div className="mb-6 flex items-center justify-between p-3 border border-emerald-500/20 bg-emerald-500/5">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-400" />
                      <span className="text-emerald-400 text-xs font-light">{short(wallet)}</span>
                    </div>
                    <span className="text-white/30 text-xs">{balance} ETH</span>
                  </div>
                )}

                {/* Fractional shares selector */}
                <div className="mb-6">
                  <label className="text-white/35 text-[9px] tracking-[0.3em] uppercase font-light block mb-3">
                    Fractional Shares — 1 share = $1,000
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setShares(s => Math.max(0.25, parseFloat((s - 0.25).toFixed(2))))}
                      className="w-9 h-9 border border-white/15 text-white/50 hover:border-[#C4A97D] hover:text-[#C4A97D] transition-colors flex items-center justify-center text-lg"
                    >−</button>
                    <input
                      type="number"
                      min="0.25"
                      step="0.25"
                      value={shares}
                      onChange={e => setShares(Math.max(0.25, parseFloat(e.target.value) || 0.25))}
                      className="flex-1 bg-transparent border border-white/15 text-white text-center py-2.5 text-lg font-extralight focus:outline-none focus:border-[#C4A97D] transition-colors"
                    />
                    <button
                      onClick={() => setShares(s => parseFloat((s + 0.25).toFixed(2)))}
                      className="w-9 h-9 border border-white/15 text-white/50 hover:border-[#C4A97D] hover:text-[#C4A97D] transition-colors flex items-center justify-center text-lg"
                    >+</button>
                  </div>
                </div>

                {/* Currency selector */}
                <div className="mb-6">
                  <label className="text-white/35 text-[9px] tracking-[0.3em] uppercase font-light block mb-3">Pay with</label>
                  <div className="flex gap-2">
                    {["ETH", "USDC", "BTC"].map(c => (
                      <button
                        key={c}
                        onClick={() => setCurrency(c)}
                        className={`flex-1 py-2 text-xs tracking-widest uppercase font-light border transition-all ${
                          currency === c
                            ? "border-[#C4A97D] text-[#C4A97D] bg-[#C4A97D]/8"
                            : "border-white/12 text-white/30 hover:border-white/30"
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                  {currency !== "ETH" && (
                    <p className="mt-2 text-white/25 text-[10px] font-light">* {currency} support coming soon. Transactions currently processed in ETH.</p>
                  )}
                </div>

                {/* Total */}
                <div className="border border-white/8 p-4 mb-6 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/35 font-light">Investment Amount</span>
                    <span className="text-white font-extralight">${totalUSD.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/35 font-light">≈ ETH (@ ${ETH_PRICE_USD.toLocaleString()})</span>
                    <span className="text-[#C4A97D] font-light">{totalETH} ETH</span>
                  </div>
                  <div className="flex justify-between text-sm border-t border-white/8 pt-2 mt-2">
                    <span className="text-white/35 font-light">Fractional Shares</span>
                    <span className="text-white font-extralight">{shares} shares</span>
                  </div>
                </div>

                <button
                  onClick={() => setStep("confirm")}
                  disabled={!wallet}
                  className="w-full flex items-center justify-center gap-2 bg-[#C4A97D] text-[#0F1E2E] text-[10px] tracking-[0.3em] uppercase font-medium py-4 hover:bg-[#d4b98d] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Review Investment <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            )}

            {/* STEP: confirm */}
            {step === "confirm" && (
              <motion.div key="confirm" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}>
                <h4 className="text-white font-light text-base mb-5">Confirm Transaction</h4>
                <div className="space-y-3 mb-6">
                  {[
                    ["From", short(wallet)],
                    ["Project", project.title],
                    ["Shares", `${shares} fractional shares`],
                    ["Amount USD", `$${totalUSD.toLocaleString()}`],
                    ["Amount ETH", `${totalETH} ETH`],
                    ["Network", "Ethereum Mainnet"],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between border-b border-white/6 pb-2">
                      <span className="text-white/30 text-xs font-light">{k}</span>
                      <span className="text-white/70 text-xs font-light">{v}</span>
                    </div>
                  ))}
                </div>
                <p className="text-white/20 text-[10px] font-light leading-relaxed mb-5">
                  By confirming, MetaMask will prompt you to sign this transaction. Gas fees apply. This is a demo — no real funds will be moved on testnet.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setStep("amount")}
                    className="flex-1 border border-white/15 text-white/40 text-[10px] tracking-[0.25em] uppercase font-light py-3 hover:border-white/30 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleInvest}
                    disabled={loading}
                    className="flex-1 flex items-center justify-center gap-2 bg-[#C4A97D] text-[#0F1E2E] text-[10px] tracking-[0.25em] uppercase font-medium py-3 hover:bg-[#d4b98d] transition-colors disabled:opacity-60"
                  >
                    {loading ? <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Sending…</> : "Confirm & Invest"}
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP: success */}
            {step === "success" && (
              <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-4">
                <div className="w-14 h-14 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-5">
                  <CheckCircle className="w-7 h-7 text-emerald-400" />
                </div>
                <h4 className="text-white text-lg font-light mb-2">Investment Confirmed</h4>
                <p className="text-white/35 text-sm font-light mb-5">You now hold <span className="text-[#C4A97D]">{shares} fractional shares</span> in {project.title}.</p>
                {txHash && (
                  <a
                    href={`https://etherscan.io/tx/${txHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#C4A97D]/60 text-[10px] tracking-widest uppercase hover:text-[#C4A97D] transition-colors block mb-6"
                  >
                    View on Etherscan →
                  </a>
                )}
                <button onClick={onClose} className="w-full border border-white/15 text-white/40 text-[10px] tracking-[0.25em] uppercase font-light py-3 hover:border-white/30 transition-colors">
                  Close
                </button>
              </motion.div>
            )}

            {/* STEP: error */}
            {step === "error" && (
              <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-4">
                <div className="w-14 h-14 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-5">
                  <AlertCircle className="w-7 h-7 text-red-400" />
                </div>
                <h4 className="text-white text-lg font-light mb-2">Transaction Failed</h4>
                <p className="text-white/35 text-sm font-light mb-6">{errorMsg}</p>
                <button onClick={() => setStep("confirm")} className="w-full bg-[#C4A97D] text-[#0F1E2E] text-[10px] tracking-[0.25em] uppercase font-medium py-3 hover:bg-[#d4b98d] transition-colors">
                  Try Again
                </button>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}