import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, Wallet, TrendingUp, DollarSign, ArrowRight, ArrowLeft,
  CheckCircle, AlertCircle, Loader2, Shield, Clock, Info
} from "lucide-react";
import {
  connectWallet, getWalletAddress, getEthBalance,
  sendInvestment, usdToEth, ETH_PRICE_USD
} from "./cryptoUtils";

const ESCROW_ADDRESS = "0x742d35Cc6634C0532925a3b8D4C9E4F3b3c75d8e";
const SHARE_PRICE_USD = 1000;

const STEPS = [
  { id: "wallet",  label: "Connect Wallet" },
  { id: "amount",  label: "Select Amount"  },
  { id: "review",  label: "Review"         },
  { id: "confirm", label: "Confirm"        },
];

function StepIndicator({ currentStep }) {
  const idx = STEPS.findIndex(s => s.id === currentStep);
  return (
    <div className="flex items-center gap-0 mb-8">
      {STEPS.map((step, i) => {
        const done    = i < idx;
        const active  = i === idx;
        const future  = i > idx;
        return (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center gap-1.5">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-medium transition-all duration-300 ${
                done   ? "bg-emerald-500/20 border border-emerald-500/40 text-emerald-400" :
                active ? "bg-[#C4A97D]/15 border border-[#C4A97D]/60 text-[#C4A97D]" :
                         "bg-white/5 border border-white/10 text-white/20"
              }`}>
                {done ? <CheckCircle className="w-3.5 h-3.5" /> : <span>{i + 1}</span>}
              </div>
              <span className={`text-[8px] tracking-[0.2em] uppercase font-light whitespace-nowrap hidden sm:block transition-colors ${
                active ? "text-[#C4A97D]" : done ? "text-white/40" : "text-white/15"
              }`}>{step.label}</span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`flex-1 h-px mx-2 mb-4 transition-all duration-500 ${i < idx ? "bg-emerald-500/30" : "bg-white/8"}`} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

function MetricPill({ label, value, accent }) {
  return (
    <div className="bg-white/4 border border-white/6 px-3 py-2.5 text-center">
      <div className={`text-sm font-light ${accent ? "text-[#C4A97D]" : "text-white"}`}>{value}</div>
      <div className="text-white/25 text-[8px] tracking-[0.22em] uppercase mt-0.5">{label}</div>
    </div>
  );
}

export default function InvestModal({ project, onClose }) {
  const [step, setStep]       = useState("wallet");
  const [wallet, setWallet]   = useState(null);
  const [balance, setBalance] = useState(null);
  const [shares, setShares]   = useState(1);
  const [currency, setCurrency] = useState("ETH");
  const [txHash, setTxHash]   = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const totalUSD = shares * SHARE_PRICE_USD;
  const totalETH = usdToEth(totalUSD);

  // Auto-detect connected wallet on open
  useEffect(() => {
    getWalletAddress().then(addr => {
      if (addr) {
        setWallet(addr);
        getEthBalance(addr).then(setBalance);
        setStep("amount"); // skip wallet step if already connected
      }
    });
  }, []);

  const short = addr => addr ? `${addr.slice(0, 6)}…${addr.slice(-4)}` : "";

  const handleConnectWallet = async () => {
    setLoading(true);
    setErrorMsg("");
    try {
      const addr = await connectWallet();
      const bal  = await getEthBalance(addr);
      setWallet(addr);
      setBalance(bal);
      setStep("amount");
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

  const raiseBarPct = project.raise_pct || 82;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.97 }}
        transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
        className="bg-[#0A1628] border border-white/10 w-full max-w-lg relative overflow-hidden"
      >
        {/* Subtle top accent */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C4A97D]/40 to-transparent" />

        {/* Header */}
        <div className="flex items-start justify-between px-6 pt-6 pb-5 border-b border-white/7">
          <div>
            <div className="text-[#C4A97D] text-[9px] tracking-[0.38em] uppercase font-light mb-1">Crypto Investment</div>
            <h3 className="text-white text-lg font-light tracking-wide">{project.title}</h3>
            <p className="text-white/30 text-xs font-light mt-0.5">{project.location} · {project.asset_type}</p>
          </div>
          <button onClick={onClose} className="text-white/20 hover:text-white/50 transition-colors mt-0.5">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Project stats bar */}
        <div className="grid grid-cols-4 border-b border-white/6">
          {[
            { label: "Total Raise",  value: project.raise || "$18.5M" },
            { label: "Proj. IRR",    value: `${project.roi || 24}%`, accent: true },
            { label: "Funded",       value: `${raiseBarPct}%` },
            { label: "Hold Period",  value: project.hold_period || "5 yrs" },
          ].map((m, i) => (
            <div key={m.label} className={`px-4 py-3 ${i < 3 ? "border-r border-white/6" : ""}`}>
              <div className={`text-sm font-light ${m.accent ? "text-[#C4A97D]" : "text-white/80"}`}>{m.value}</div>
              <div className="text-white/22 text-[8px] tracking-[0.22em] uppercase mt-0.5">{m.label}</div>
            </div>
          ))}
        </div>

        {/* Raise progress bar */}
        <div className="px-6 py-3 bg-white/2 border-b border-white/6">
          <div className="flex justify-between text-[9px] text-white/25 font-light mb-1.5">
            <span>Capital Raise Progress</span>
            <span className={raiseBarPct === 100 ? "text-emerald-400" : "text-[#C4A97D]"}>{raiseBarPct}% funded</span>
          </div>
          <div className="h-1 bg-white/6 rounded-full overflow-hidden">
            <motion.div
              className={`h-full rounded-full ${raiseBarPct === 100 ? "bg-emerald-400/70" : "bg-gradient-to-r from-[#C4A97D]/50 to-[#C4A97D]"}`}
              initial={{ width: 0 }}
              animate={{ width: `${raiseBarPct}%` }}
              transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
            />
          </div>
        </div>

        {/* Wizard body */}
        <div className="px-6 py-6">

          {/* Step indicator — only during wizard steps */}
          {!["success","error"].includes(step) && <StepIndicator currentStep={step} />}

          <AnimatePresence mode="wait">

            {/* ── STEP 1: Connect Wallet ── */}
            {step === "wallet" && (
              <motion.div key="wallet" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.25 }}>
                <div className="text-center py-4">
                  <div className="w-14 h-14 rounded-full bg-[#C4A97D]/10 border border-[#C4A97D]/20 flex items-center justify-center mx-auto mb-5">
                    <Wallet className="w-6 h-6 text-[#C4A97D]" />
                  </div>
                  <h4 className="text-white text-base font-light mb-2">Connect Your Wallet</h4>
                  <p className="text-white/35 text-sm font-light leading-relaxed mb-6 max-w-xs mx-auto">
                    Connect MetaMask to invest fractional shares starting at $1,000.
                  </p>

                  {errorMsg && (
                    <div className="mb-4 px-4 py-3 bg-red-500/8 border border-red-500/20 text-red-400 text-xs font-light text-left flex items-start gap-2">
                      <AlertCircle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                      {errorMsg}
                    </div>
                  )}

                  <button
                    onClick={handleConnectWallet}
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 bg-[#C4A97D] text-[#080E16] text-[10px] tracking-[0.3em] uppercase font-semibold py-4 hover:bg-[#d4b98d] transition-colors disabled:opacity-50"
                  >
                    {loading ? <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Connecting…</> : <><Wallet className="w-3.5 h-3.5" /> Connect MetaMask</>}
                  </button>

                  <p className="mt-4 text-white/18 text-[10px] font-light flex items-center justify-center gap-1.5">
                    <Shield className="w-3 h-3" /> MetaMask required · Transactions signed locally
                  </p>
                </div>
              </motion.div>
            )}

            {/* ── STEP 2: Select Amount ── */}
            {step === "amount" && (
              <motion.div key="amount" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.25 }}>

                {/* Wallet badge */}
                <div className="flex items-center justify-between p-3 bg-emerald-500/6 border border-emerald-500/18 mb-6">
                  <div className="flex items-center gap-2.5">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-emerald-400 text-xs font-light">{short(wallet)}</span>
                  </div>
                  <span className="text-white/30 text-xs font-light">{balance} ETH available</span>
                </div>

                {/* Shares selector */}
                <div className="mb-5">
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-white/35 text-[9px] tracking-[0.3em] uppercase font-light">Fractional Shares</label>
                    <span className="text-white/22 text-[9px] font-light">1 share = $1,000</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setShares(s => Math.max(0.25, parseFloat((s - 0.25).toFixed(2))))}
                      className="w-10 h-10 border border-white/12 text-white/40 hover:border-[#C4A97D]/60 hover:text-[#C4A97D] transition-all text-xl flex items-center justify-center"
                    >−</button>
                    <input
                      type="number" min="0.25" step="0.25" value={shares}
                      onChange={e => setShares(Math.max(0.25, parseFloat(e.target.value) || 0.25))}
                      className="flex-1 bg-white/4 border border-white/10 text-white text-center py-2.5 text-2xl font-extralight focus:outline-none focus:border-[#C4A97D]/50 transition-colors"
                    />
                    <button
                      onClick={() => setShares(s => parseFloat((s + 0.25).toFixed(2)))}
                      className="w-10 h-10 border border-white/12 text-white/40 hover:border-[#C4A97D]/60 hover:text-[#C4A97D] transition-all text-xl flex items-center justify-center"
                    >+</button>
                  </div>
                  {/* Quick-pick */}
                  <div className="flex gap-2 mt-3">
                    {[1, 2, 5, 10].map(n => (
                      <button key={n} onClick={() => setShares(n)}
                        className={`flex-1 py-1.5 text-[9px] tracking-widest uppercase font-light border transition-all ${shares === n ? "border-[#C4A97D]/50 text-[#C4A97D] bg-[#C4A97D]/8" : "border-white/8 text-white/25 hover:border-white/20"}`}
                      >{n}x</button>
                    ))}
                  </div>
                </div>

                {/* Currency */}
                <div className="mb-5">
                  <label className="text-white/35 text-[9px] tracking-[0.3em] uppercase font-light block mb-2.5">Pay with</label>
                  <div className="flex gap-2">
                    {["ETH", "USDC", "BTC"].map(c => (
                      <button key={c} onClick={() => setCurrency(c)}
                        className={`flex-1 py-2 text-xs tracking-widest uppercase font-light border transition-all ${currency === c ? "border-[#C4A97D]/60 text-[#C4A97D] bg-[#C4A97D]/8" : "border-white/10 text-white/28 hover:border-white/25"}`}
                      >{c}</button>
                    ))}
                  </div>
                  {currency !== "ETH" && (
                    <p className="mt-2 text-white/22 text-[10px] font-light flex items-center gap-1.5">
                      <Info className="w-3 h-3 flex-shrink-0" /> {currency} coming soon — processed as ETH equivalent.
                    </p>
                  )}
                </div>

                {/* Live total */}
                <div className="bg-white/3 border border-white/8 p-4 mb-6 space-y-2.5">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/30 font-light">Investment ({shares} shares)</span>
                    <span className="text-white font-extralight">${totalUSD.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/30 font-light">≈ ETH <span className="text-white/15">(@ ${ETH_PRICE_USD.toLocaleString()})</span></span>
                    <span className="text-[#C4A97D] font-light">{totalETH} ETH</span>
                  </div>
                  <div className="pt-2 mt-1 border-t border-white/6 flex justify-between">
                    <span className="text-white/20 text-xs font-light">Est. projected return ({project.roi || 24}% IRR)</span>
                    <span className="text-emerald-400/70 text-xs font-light">
                      +${Math.round(totalUSD * (project.roi || 24) / 100).toLocaleString()}/yr est.
                    </span>
                  </div>
                </div>

                <button onClick={() => setStep("review")}
                  className="w-full flex items-center justify-center gap-2 bg-[#C4A97D] text-[#080E16] text-[10px] tracking-[0.3em] uppercase font-semibold py-4 hover:bg-[#d4b98d] transition-colors"
                >
                  Review Investment <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            )}

            {/* ── STEP 3: Review ── */}
            {step === "review" && (
              <motion.div key="review" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.25 }}>
                <h4 className="text-white font-light text-sm tracking-wide mb-5">Review Your Investment</h4>

                {/* Project context */}
                <div className="grid grid-cols-2 gap-2 mb-5">
                  <MetricPill label="Project"       value={project.title} />
                  <MetricPill label="Location"      value={project.location} />
                  <MetricPill label="Total Raise"   value={project.raise || "$18.5M"} />
                  <MetricPill label="Proj. IRR"     value={`${project.roi || 24}%`} accent />
                  <MetricPill label="Capital Raised" value={`${raiseBarPct}%`} />
                  <MetricPill label="Hold Period"   value={project.hold_period || "5 yrs"} />
                </div>

                {/* Transaction summary */}
                <div className="border border-[#C4A97D]/15 bg-[#C4A97D]/4 p-4 mb-5 space-y-2.5">
                  <div className="text-[#C4A97D] text-[9px] tracking-[0.3em] uppercase font-light mb-3">Transaction Summary</div>
                  {[
                    ["From Wallet",      short(wallet)],
                    ["Fractional Shares", `${shares} shares`],
                    ["USD Amount",       `$${totalUSD.toLocaleString()}`],
                    ["ETH Amount",       `${totalETH} ETH`],
                    ["Network",          "Ethereum Mainnet"],
                    ["Est. Annual Return", `+$${Math.round(totalUSD * (project.roi || 24) / 100).toLocaleString()}`],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between border-b border-white/5 pb-2">
                      <span className="text-white/28 text-xs font-light">{k}</span>
                      <span className="text-white/65 text-xs font-light">{v}</span>
                    </div>
                  ))}
                </div>

                <p className="text-white/18 text-[10px] font-light leading-relaxed mb-5 flex items-start gap-1.5">
                  <Shield className="w-3 h-3 mt-0.5 flex-shrink-0 text-white/25" />
                  MetaMask will prompt you to sign this transaction. Gas fees apply. This is a demo — no real funds are moved.
                </p>

                <div className="flex gap-3">
                  <button onClick={() => setStep("amount")}
                    className="flex-1 flex items-center justify-center gap-1.5 border border-white/12 text-white/35 text-[10px] tracking-[0.22em] uppercase font-light py-3 hover:border-white/25 transition-colors"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Back
                  </button>
                  <button onClick={() => setStep("confirm")}
                    className="flex-1 flex items-center justify-center gap-2 bg-[#C4A97D] text-[#080E16] text-[10px] tracking-[0.25em] uppercase font-semibold py-3 hover:bg-[#d4b98d] transition-colors"
                  >
                    Proceed <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* ── STEP 4: Confirm (send tx) ── */}
            {step === "confirm" && (
              <motion.div key="confirm" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.25 }}>
                <div className="text-center py-2 mb-6">
                  <div className="w-14 h-14 rounded-full bg-[#C4A97D]/10 border border-[#C4A97D]/20 flex items-center justify-center mx-auto mb-4">
                    <DollarSign className="w-6 h-6 text-[#C4A97D]" />
                  </div>
                  <h4 className="text-white text-base font-light mb-1">Ready to Invest</h4>
                  <p className="text-white/30 text-sm font-light">
                    <span className="text-white">${totalUSD.toLocaleString()}</span> · {shares} shares in {project.title}
                  </p>
                </div>

                {/* Final breakdown */}
                <div className="bg-white/3 border border-white/8 divide-y divide-white/5 mb-5">
                  {[
                    ["Amount",     `$${totalUSD.toLocaleString()} USD`],
                    ["≈ ETH",      `${totalETH} ETH`],
                    ["Gas (est.)", "~$5–15 USD"],
                    ["Settlement", "Ethereum Mainnet"],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between px-4 py-2.5">
                      <span className="text-white/28 text-xs font-light">{k}</span>
                      <span className="text-white/65 text-xs font-light">{v}</span>
                    </div>
                  ))}
                </div>

                {errorMsg && (
                  <div className="mb-4 px-4 py-3 bg-red-500/8 border border-red-500/20 text-red-400 text-xs font-light flex items-start gap-2">
                    <AlertCircle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                    {errorMsg}
                  </div>
                )}

                <div className="flex gap-3">
                  <button onClick={() => setStep("review")} disabled={loading}
                    className="flex-1 flex items-center justify-center gap-1.5 border border-white/12 text-white/35 text-[10px] tracking-[0.22em] uppercase font-light py-3 hover:border-white/25 transition-colors disabled:opacity-40"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Back
                  </button>
                  <button onClick={handleInvest} disabled={loading}
                    className="flex-1 flex items-center justify-center gap-2 bg-[#C4A97D] text-[#080E16] text-[10px] tracking-[0.28em] uppercase font-semibold py-3 hover:bg-[#d4b98d] transition-colors disabled:opacity-60"
                  >
                    {loading
                      ? <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Sending…</>
                      : <><CheckCircle className="w-3.5 h-3.5" /> Confirm &amp; Invest</>
                    }
                  </button>
                </div>
              </motion.div>
            )}

            {/* ── SUCCESS ── */}
            {step === "success" && (
              <motion.div key="success" initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-4">
                <motion.div
                  initial={{ scale: 0 }} animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 18, delay: 0.1 }}
                  className="w-16 h-16 rounded-full bg-emerald-500/12 border border-emerald-500/25 flex items-center justify-center mx-auto mb-5"
                >
                  <CheckCircle className="w-8 h-8 text-emerald-400" />
                </motion.div>
                <h4 className="text-white text-xl font-light mb-2">Investment Confirmed</h4>
                <p className="text-white/35 text-sm font-light leading-relaxed mb-2">
                  You now hold <span className="text-[#C4A97D]">{shares} fractional shares</span> in {project.title}.
                </p>
                <p className="text-white/20 text-xs font-light mb-6">
                  Est. annual return: <span className="text-emerald-400/70">+${Math.round(totalUSD * (project.roi || 24) / 100).toLocaleString()}</span>
                </p>
                {txHash && (
                  <a href={`https://etherscan.io/tx/${txHash}`} target="_blank" rel="noopener noreferrer"
                    className="inline-block text-[#C4A97D]/55 text-[10px] tracking-widest uppercase hover:text-[#C4A97D] transition-colors mb-6"
                  >
                    View on Etherscan →
                  </a>
                )}
                <button onClick={onClose}
                  className="w-full border border-white/12 text-white/35 text-[10px] tracking-[0.25em] uppercase font-light py-3 hover:border-white/25 transition-colors"
                >
                  Close
                </button>
              </motion.div>
            )}

            {/* ── ERROR ── */}
            {step === "error" && (
              <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-4">
                <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-5">
                  <AlertCircle className="w-8 h-8 text-red-400" />
                </div>
                <h4 className="text-white text-xl font-light mb-2">Transaction Failed</h4>
                <p className="text-white/35 text-sm font-light mb-6 leading-relaxed">{errorMsg}</p>
                <div className="flex gap-3">
                  <button onClick={onClose}
                    className="flex-1 border border-white/12 text-white/30 text-[10px] tracking-[0.22em] uppercase font-light py-3 hover:border-white/22 transition-colors"
                  >Dismiss</button>
                  <button onClick={() => { setErrorMsg(""); setStep("confirm"); }}
                    className="flex-1 bg-[#C4A97D] text-[#080E16] text-[10px] tracking-[0.25em] uppercase font-semibold py-3 hover:bg-[#d4b98d] transition-colors"
                  >Try Again</button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}