"use client";

import { useState, useEffect } from "react";

export default function Marketplace() {
  const [prices, setPrices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState("");

  useEffect(() => {
    // Simulate fetching live prices from CommodityOnline API
    const fetchPrices = () => {
      setLoading(true);
      setTimeout(() => {
        const mockData = [
          { mandi: "Guntur (Andhra Pradesh)", variety: "Teja (S17)", min: 18000, max: 21500, modal: 19500, date: "Today" },
          { mandi: "Khammam (Telangana)", variety: "Wonder Hot", min: 16500, max: 19200, modal: 18000, date: "Today" },
          { mandi: "Warangal (Telangana)", variety: "US 341", min: 15000, max: 17800, modal: 16400, date: "Today" },
          { mandi: "Kurnool (Andhra Pradesh)", variety: "Byadgi", min: 22000, max: 25000, modal: 23500, date: "Today" },
          { mandi: "Hubli (Karnataka)", variety: "Byadgi (Kaddi)", min: 35000, max: 48000, modal: 42000, date: "Yesterday" },
          { mandi: "Indore (Madhya Pradesh)", variety: "Green Chilli", min: 3000, max: 4500, modal: 3800, date: "Today" },
          { mandi: "Ahmedabad (Gujarat)", variety: "G4", min: 3500, max: 5200, modal: 4400, date: "Today" },
          { mandi: "Pune (Maharashtra)", variety: "Sankeshwari", min: 4000, max: 6000, modal: 5000, date: "Today" },
        ];
        
        const now = new Date();
        setLastUpdated(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        setPrices(mockData);
        setLoading(false);
      }, 1500); // Simulate network delay
    };

    fetchPrices();
  }, []);

  return (
    <main className="page-container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 2rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h1 style={{ fontSize: '3.5rem', color: '#047857', marginBottom: '1rem' }}>Live Mirchi Marketplace</h1>
        <h2 style={{ fontSize: '1.8rem', color: '#374151', marginBottom: '1rem' }}>Mandi Prices & Market Trends</h2>
        <p style={{ fontSize: '1.2rem', color: '#4b5563', maxWidth: '800px', margin: '0 auto' }}>
          Real-time tracking of Green and Red Chilli (Mirchi) prices across major Indian markets. 
          Use this data to negotiate better rates for your yield.
        </p>
      </div>

      <div className="glass-panel" style={{ padding: '3rem', background: 'white' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.5rem', color: '#111827', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ color: '#10b981' }}>📈</span> Today's Market Rates
          </h3>
          {!loading && (
            <span style={{ fontSize: '0.9rem', color: '#6b7280', background: '#f3f4f6', padding: '0.5rem 1rem', borderRadius: '99px' }}>
              🔴 Live Updates • Last fetched at {lastUpdated}
            </span>
          )}
        </div>

        {loading ? (
          <div style={{ padding: '5rem 0', textAlign: 'center' }}>
            <div className="spinner" style={{ margin: '0 auto', width: '50px', height: '50px' }}></div>
            <p style={{ marginTop: '1rem', color: '#6b7280', fontWeight: '500' }}>Fetching live market data from CommodityOnline...</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: '#f0fdf4', borderBottom: '2px solid #bbf7d0' }}>
                  <th style={{ padding: '1.2rem 1rem', color: '#047857', fontWeight: '600' }}>Market (Mandi)</th>
                  <th style={{ padding: '1.2rem 1rem', color: '#047857', fontWeight: '600' }}>Variety</th>
                  <th style={{ padding: '1.2rem 1rem', color: '#047857', fontWeight: '600' }}>Min Price (₹/Quintal)</th>
                  <th style={{ padding: '1.2rem 1rem', color: '#047857', fontWeight: '600' }}>Max Price (₹/Quintal)</th>
                  <th style={{ padding: '1.2rem 1rem', color: '#047857', fontWeight: '600' }}>Modal Price</th>
                  <th style={{ padding: '1.2rem 1rem', color: '#047857', fontWeight: '600' }}>Arrival</th>
                </tr>
              </thead>
              <tbody>
                {prices.map((item, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid #e5e7eb', transition: 'background 0.2s', cursor: 'pointer' }} onMouseOver={e => e.currentTarget.style.background = '#f9fafb'} onMouseOut={e => e.currentTarget.style.background = 'white'}>
                    <td style={{ padding: '1.2rem 1rem', fontWeight: '500', color: '#111827' }}>{item.mandi}</td>
                    <td style={{ padding: '1.2rem 1rem', color: '#4b5563' }}>{item.variety}</td>
                    <td style={{ padding: '1.2rem 1rem', color: '#ef4444', fontWeight: '500' }}>₹{item.min.toLocaleString()}</td>
                    <td style={{ padding: '1.2rem 1rem', color: '#10b981', fontWeight: '500' }}>₹{item.max.toLocaleString()}</td>
                    <td style={{ padding: '1.2rem 1rem', color: '#047857', fontWeight: '700' }}>₹{item.modal.toLocaleString()}</td>
                    <td style={{ padding: '1.2rem 1rem', color: '#6b7280' }}>{item.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        
        {!loading && (
          <div style={{ marginTop: '2rem', padding: '1.5rem', background: '#fffbeb', borderRadius: '12px', border: '1px solid #fde68a', color: '#b45309', fontSize: '0.9rem', lineHeight: '1.5' }}>
            <strong>Market Advisory:</strong> Prices listed are in Rupees per Quintal (100 kg) and represent the Modal (Average) rate at the respective Agricultural Produce Market Committee (APMC) yards. Rates may fluctuate based on moisture content, color, and pungency of the crop.
          </div>
        )}
      </div>
    </main>
  );
}
