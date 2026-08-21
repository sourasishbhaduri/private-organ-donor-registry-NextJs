"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Clock, History } from 'lucide-react';
import { Navbar } from '../../components/Navbar';
import { WalletModal } from '../../components/WalletModal';
import { WalletState } from '../../types';

export default function HistoryPage() {
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [wallet, setWallet] = useState<WalletState>({
    connected: false,
    address: null,
    walletName: null,
    tNightBalance: null,
    dustBalance: null,
    network: 'preprod',
    error: null,
  });

  return (
    <div className="app-container">
      <Navbar
        wallet={wallet}
        onConnect={() => setIsWalletModalOpen(true)}
        onDisconnect={() => setWallet({ ...wallet, connected: false, address: null, tNightBalance: null, dustBalance: null })}
        onNetworkChange={(network) => setWallet({ ...wallet, network })}
      />
      <WalletModal
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
        onWalletConnected={(state) => setWallet({ ...wallet, ...state })}
      />

      <main className="main-content" style={{ padding: '40px 20px', maxWidth: '800px', margin: '0 auto' }}>
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', textDecoration: 'none', marginBottom: '24px', fontWeight: 500 }}>
          <ArrowLeft size={18} /> Back to Home
        </Link>
        
        <div className="saas-card" style={{ padding: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
            <div style={{ background: 'rgba(59,130,246,0.1)', color: '#3b82f6', width: '60px', height: '60px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <History size={30} />
            </div>
            <div>
              <h1 style={{ fontSize: '1.8rem', fontWeight: 700 }}>Verification History</h1>
              <p style={{ color: 'var(--text-secondary)' }}>Log of zero-knowledge verifications performed by this wallet.</p>
            </div>
          </div>

          <div style={{ padding: '60px 40px', textAlign: 'center', background: 'var(--bg-app)', borderRadius: '12px', border: '1px dashed var(--border-strong)' }}>
            <Clock size={40} color="var(--text-tertiary)" style={{ margin: '0 auto 16px' }} />
            <h2 style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px' }}>No history found</h2>
            <p style={{ color: 'var(--text-tertiary)' }}>
              Verifications are recorded locally. You have not performed any zero-knowledge verifications yet.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
