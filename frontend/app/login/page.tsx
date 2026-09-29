"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Read from Next.js exposed env variables
    const validUser = process.env.NEXT_PUBLIC_ADMIN_USER || "admin";
    const validPass = process.env.NEXT_PUBLIC_ADMIN_PASS || "12345678";

    if (username === validUser && password === validPass) {
      localStorage.setItem("chilli_auth", "true");
      router.push("/dashboard");
    } else {
      setError("Invalid credentials. Please check your username or password.");
    }
  };

  return (
    <main className="page-container" style={{ 
      backgroundImage: `url('/images/background.jpg')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 'calc(100vh - 70px)'
    }}>
      <div className="glass-panel main-card" style={{ padding: '4rem 3rem' }}>
        <img src="/images/Chilli Care Logo.png" alt="Logo" style={{ height: '80px', margin: '0 auto 1.5rem', display: 'block' }} />
        <h1 className="title" style={{ fontSize: '2rem' }}>Farmer Login</h1>
        <p className="subtitle">Securely access your dashboard</p>
        
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <input 
              type="text" 
              className="input-field" 
              placeholder="Username" 
              value={username} 
              onChange={e => setUsername(e.target.value)} 
              required
            />
          </div>
          <div>
            <input 
              type="password" 
              className="input-field" 
              placeholder="Password" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              required
            />
          </div>
          {error && <div className="error-box">{error}</div>}
          <button type="submit" className="btn-primary">Login to Dashboard</button>
        </form>
      </div>
    </main>
  );
}
