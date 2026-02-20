import React, { useState, useEffect } from "react";
import { Wallet, ChevronDown, LogOut } from "lucide-react";
import { connectWallet, getWalletAddress, getEthBalance } from "@/lib/cryptoInvest";

export default function WalletButton({ onConnected }) {
  const [address, setAddress] = useState(null);
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getWalletAddress().then(addr => {
      if (addr) {
        setAddress(addr);
        getEthBalance(addr).then(setBalance);
        onConnected?.(addr);
      }
    });
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        setAddress(accounts[0] || null);
        setBalance(null);
      });
    }
  }, []);

  const handleConnect = async () => {
    setLoading(true);
    try {
      const addr = await connectWallet();
      setAddress(addr);
      const bal = await getEthBalance(addr);
      setBalance(bal);
      onConnected?.(addr);
    } catch (e) {
      alert(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDisconnect = () => {
    setAddress(null);
    setBalance(null);
    setOpen(false);
    onConnected?.(null);
  };

  const short = addr => addr ? `${addr.slice(0, 6)}…${addr.slice(-4)}` : "";

  if (!address) {
    return (
      <button
        onClick={handleConnect}
        disabled={loading}
        className="flex items-center gap-2 border border-[#C4A97D]/50 text-[#C4A97D] text-[10px] tracking-[0.25em] uppercase font-light px-5 py-2.5 hover:bg-[#C4A97D]/10 transition-all"
      >
        <Wallet className="w-3.5 h-3.5" />
        {loading ? "Connecting…" : "Connect Wallet"}
      </button>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 border border-[#C4A97D]/40 text-[#C4A97D] text-[10px] tracking-[0.2em] uppercase font-light px-4 py-2.5 hover:bg-[#C4A97D]/10 transition-all"
      >
        <div className="w-2 h-2 rounded-full bg-emerald-400" />
        <span>{short(address)}</span>
        {balance && <span className="text-white/30">· {balance} ETH</span>}
        <ChevronDown className="w-3 h-3 text-white/30" />
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-1 bg-[#0F1E2E] border border-white/10 w-48 z-50">
          <button
            onClick={handleDisconnect}
            className="w-full flex items-center gap-2 px-4 py-3 text-white/40 text-xs font-light hover:text-white/70 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" /> Disconnect
          </button>
        </div>
      )}
    </div>
  );
}