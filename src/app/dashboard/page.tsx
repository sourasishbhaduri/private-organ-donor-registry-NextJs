"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Activity, Heart, Shield } from 'lucide-react';
import { Navbar } from '../../components/Navbar';
import { WalletModal } from '../../components/WalletModal';
import { WalletState } from '../../types';

export default function DashboardPage() {
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
            <div style={{ background: 'var(--primary-ring)', color: 'var(--primary)', width: '60px', height: '60px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Activity size={30} />
            </div>
            <div>
              <h1 style={{ fontSize: '1.8rem', fontWeight: 700 }}>Donor Dashboard</h1>
              <p style={{ color: 'var(--text-secondary)' }}>Manage your registration and view your network status.</p>
            </div>
          </div>

          {!wallet.connected ? (
             <div style={{ padding: '40px', textAlign: 'center', background: 'var(--bg-app)', borderRadius: '12px', border: '1px dashed var(--border-strong)' }}>
               <h2 style={{ fontSize: '1.3rem', fontWeight: 600, marginBottom: '12px' }}>Wallet Disconnected</h2>
               <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
                 Please connect your wallet to access your dashboard.
               </p>
               <button onClick={() => setIsWalletModalOpen(true)} className="btn-saas-primary">
                 Connect Wallet
               </button>
             </div>
          ) : (
            <div style={{ display: 'grid', gap: '20px' }}>
              <div style={{ padding: '24px', background: 'rgba(16,185,129,0.05)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                <Shield size={32} color="#10b981" />
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '4px' }}>Wallet Connected</h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Address: <span className="font-mono">{wallet.address}</span></p>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                <div style={{ padding: '24px', background: 'var(--bg-app)', borderRadius: '12px', border: '1px solid var(--border-light)' }}>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Balance</h4>
                  <div style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--primary)' }}>
                    {wallet.tNightBalance ? (Number(wallet.tNightBalance) / 1e6).toFixed(2) : '0.00'} <span style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>tNIGHT</span>
                  </div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-tertiary)', marginTop: '4px' }}>
                    DUST: {wallet.dustBalance ? Number(wallet.dustBalance).toLocaleString() : '0'}
                  </div>
                </div>
                
                <div style={{ padding: '24px', background: 'var(--bg-app)', borderRadius: '12px', border: '1px solid var(--border-light)' }}>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Network</h4>
                  <div style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--text-main)', textTransform: 'capitalize' }}>
                    {wallet.network}
                  </div>
                  <div style={{ marginTop: '12px' }}>
                    <Link href="/register" className="btn-saas-secondary" style={{ width: '100%', justifyContent: 'center' }}>
                      Register New Commitment
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
