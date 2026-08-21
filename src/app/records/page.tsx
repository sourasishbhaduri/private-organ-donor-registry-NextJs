"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Navbar } from '../../components/Navbar';
import { WalletModal } from '../../components/WalletModal';
import { PublicLedgerState } from '../../components/PublicLedgerState';
import { WalletState } from '../../types';

export default function RecordsPage() {
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
        
        <PublicLedgerState 
          data={{ totalDonors: 42, bloodGroupCounts: {1: 15, 2: 27}, lastUpdated: new Date() }}
          onRefresh={() => console.log('Refreshing')}
          isLoading={false}
        />
      </main>
    </div>
  );
}
