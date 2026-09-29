"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem("chilli_auth");
    if (auth === "true") setIsLoggedIn(true);
  }, []);

  return (
    <main className="landing-page">
      {/* Hero Section */}
      <section className="hero" style={{ 
        backgroundImage: `linear-gradient(rgba(4, 120, 87, 0.7), rgba(4, 120, 87, 0.8)), url('/images/background.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        color: 'white'
      }}>
        <div className="hero-content" style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center', padding: '4rem 2rem' }}>
          <h1 style={{ fontSize: '4rem', fontWeight: '800', marginBottom: '1.5rem', lineHeight: '1.1' }}>
            Smarter Chilli Farming Starts with Early Disease Detection
          </h1>
          <p style={{ fontSize: '1.4rem', lineHeight: '1.8', marginBottom: '3rem', opacity: 0.9 }}>
            ChilliNexis uses Artificial Intelligence and Deep Learning to analyze chilli leaf images, identify potential diseases, and provide useful insights to support healthier crops.
          </p>
          <div className="hero-actions" style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link href={isLoggedIn ? "/dashboard" : "/login"} className="btn-primary" style={{ padding: '1.2rem 2.5rem', fontSize: '1.2rem', textDecoration: 'none', background: '#10b981', color: 'white', borderRadius: '12px' }}>
              Detect Disease
            </Link>
            <Link href="/about" className="btn-secondary" style={{ padding: '1.2rem 2.5rem', fontSize: '1.2rem', textDecoration: 'none', border: '2px solid white', color: 'white', borderRadius: '12px' }}>
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Why ChilliNexis? */}
      <section className="why-section container" style={{ padding: '6rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '4rem', color: '#047857' }}>Why ChilliNexis?</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
          
          <div className="glass-panel" style={{ padding: '2.5rem', textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🧠</div>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>AI-Powered Disease Detection</h3>
            <p style={{ color: '#4b5563', lineHeight: '1.6' }}>Analyze uploaded chilli leaf images using a trained deep learning model to identify potential diseases.</p>
          </div>

          <div className="glass-panel" style={{ padding: '2.5rem', textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🌱</div>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>Plant Health Insights</h3>
            <p style={{ color: '#4b5563', lineHeight: '1.6' }}>Understand visible symptoms and receive information about the predicted disease.</p>
          </div>

          <div className="glass-panel" style={{ padding: '2.5rem', textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚡</div>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>Fast Image Analysis</h3>
            <p style={{ color: '#4b5563', lineHeight: '1.6' }}>Get a prediction immediately after uploading a clear image of a chilli leaf.</p>
          </div>

          <div className="glass-panel" style={{ padding: '2.5rem', textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📚</div>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>Disease Knowledge</h3>
            <p style={{ color: '#4b5563', lineHeight: '1.6' }}>Explore disease descriptions, common symptoms, and general prevention guidance.</p>
          </div>

        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works" style={{ background: '#f0fdf4', padding: '6rem 2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '4rem', color: '#047857' }}>How It Works</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            
            <div className="glass-panel" style={{ padding: '2.5rem', background: 'white' }}>
              <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#10b981', marginBottom: '0.5rem' }}>01 — Upload Image</div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Upload a clear photograph</h3>
              <p style={{ color: '#4b5563' }}>Upload a clear photograph of a chilli leaf from your farm.</p>
            </div>

            <div className="glass-panel" style={{ padding: '2.5rem', background: 'white' }}>
              <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#10b981', marginBottom: '0.5rem' }}>02 — AI Analysis</div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Deep Learning patterns</h3>
              <p style={{ color: '#4b5563' }}>The trained deep learning model analyzes the image for patterns associated with known diseases.</p>
            </div>

            <div className="glass-panel" style={{ padding: '2.5rem', background: 'white' }}>
              <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#10b981', marginBottom: '0.5rem' }}>03 — View Results</div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Instant predictions</h3>
              <p style={{ color: '#4b5563' }}>Receive the predicted disease name and model confidence, where available.</p>
            </div>

            <div className="glass-panel" style={{ padding: '2.5rem', background: 'white' }}>
              <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#10b981', marginBottom: '0.5rem' }}>04 — Explore Guidance</div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Read symptoms & prevention</h3>
              <p style={{ color: '#4b5563' }}>Read about symptoms and general prevention practices related to the detected condition.</p>
            </div>

          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section" style={{ padding: '6rem 2rem', textAlign: 'center', background: 'linear-gradient(135deg, #059669 0%, #047857 100%)', color: 'white' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '1.5rem' }}>Give Your Chilli Plants a Healthier Future</h2>
          <p style={{ fontSize: '1.3rem', opacity: 0.9, marginBottom: '3rem' }}>
            Early identification of possible diseases can help farmers investigate problems and take timely action.
          </p>
          <Link href={isLoggedIn ? "/dashboard" : "/login"} style={{ background: 'white', color: '#047857', padding: '1.2rem 3rem', fontSize: '1.2rem', borderRadius: '12px', fontWeight: 'bold', textDecoration: 'none', display: 'inline-block' }}>
            Start Disease Detection
          </Link>
        </div>
      </section>

    </main>
  );
}
