"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import { Navbar } from '../../components/Navbar';
import { WalletModal } from '../../components/WalletModal';
import { PrivateVerificationModal } from '../../components/PrivateVerificationModal';
import { WalletState } from '../../types';

export default function VerifyPage() {
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
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{ background: 'rgba(16,185,129,0.1)', color: '#10b981', width: '64px', height: '64px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <ShieldCheck size={32} />
            </div>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '12px' }}>Verify Eligibility</h1>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '500px', margin: '0 auto' }}>
              Hospital staff and verifiers can use this tool to verify a donor's eligibility and registration status using zero-knowledge proofs, without revealing the donor's medical history.
            </p>
          </div>

          {wallet.connected ? (
            <div style={{ background: 'var(--bg-app)', border: '1px solid var(--border-light)', borderRadius: '12px' }}>
              <PrivateVerificationModal
                isVerifying={false}
                onVerify={async (secretId, age, bloodType, clearanceSeed) => {
                  console.log('Verifying', secretId);
                  return { commitment: 'mock', eligible: true, timestamp: new Date() };
                }}
              />
            </div>
          ) : (
            <div style={{ padding: '40px', textAlign: 'center', background: 'var(--bg-app)', borderRadius: '12px', border: '1px dashed var(--border-strong)' }}>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 600, marginBottom: '12px' }}>Connect Verifier Wallet</h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
                You must connect a wallet to submit the zero-knowledge verification proof to the network.
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
