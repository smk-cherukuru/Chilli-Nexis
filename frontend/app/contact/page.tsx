export default function Contact() {
  const team = [
    { name: "P VARSHITHA", roll: "234E1A05E1" },
    { name: "ARSAD ARZOO", roll: "234E1A05F8" },
    { name: "CHERUKURU SIVA MANIKANTA", roll: "234E1A05B3" },
    { name: "RANJANI KUMARI", roll: "234E1A05G5" },
    { name: "MANDYAM VENKAT DURGA PRASAD", roll: "234E1A05E2" }
  ];

  return (
    <main className="page-container">
      <div className="glass-panel content-card" style={{ maxWidth: '800px' }}>
        <h1>Meet the Team</h1>
        <p style={{ textAlign: 'center', marginBottom: '2rem' }}>Reach out to our brilliant project contributors.</p>
        
        <div className="team-grid">
          {team.map(member => (
            <div key={member.roll} className="team-member glass-panel">
              <div className="member-icon">🎓</div>
              <h3>{member.name}</h3>
              <p className="member-roll">{member.roll}</p>
              <a 
                href={`https://wa.me/${member.roll}?text=Hello%20from%20Chilli%20Care`} 
                target="_blank" 
                rel="noreferrer" 
                className="whatsapp-btn"
              >
                💬 WhatsApp
              </a>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
