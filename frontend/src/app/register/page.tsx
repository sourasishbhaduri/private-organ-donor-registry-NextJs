"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Navbar } from '../../components/Navbar';
import { WalletModal } from '../../components/WalletModal';
import { DonorRegistrationForm } from '../../components/DonorRegistrationForm';
import { WalletState } from '../../types';

export default function RegisterPage() {
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
        
        <div className="saas-card" style={{ padding: '0', overflow: 'hidden' }}>
          {wallet.connected ? (
            <DonorRegistrationForm
              isSubmitting={false}
              onRegister={async (data) => {
                console.log('Registration data:', data);
                return { success: true, commitment: 'mock-commitment', txHash: 'mock-tx' };
              }}
            />
          ) : (
            <div style={{ padding: '60px 40px', textAlign: 'center' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '16px' }}>Connect Wallet to Register</h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
                You need to connect your Midnight Lace Wallet or a Devnet Seed to register as a donor.
              </p>
              <button onClick={() => setIsWalletModalOpen(true)} className="btn-saas-primary">
                Connect Wallet
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
