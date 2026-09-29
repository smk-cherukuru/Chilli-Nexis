export default function About() {
  return (
    <main className="page-container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '4rem 2rem' }}>
      
      <div className="glass-panel content-card" style={{ padding: '4rem', marginBottom: '3rem', textAlign: 'left' }}>
        <h1 style={{ fontSize: '3rem', color: '#047857', marginBottom: '1.5rem' }}>About ChilliNexis</h1>
        
        <p style={{ fontSize: '1.2rem', color: '#374151', lineHeight: '1.8', marginBottom: '1.5rem' }}>
          ChilliNexis is an AI-powered chilli disease detection platform designed to support farmers through intelligent plant image analysis.
        </p>
        
        <p style={{ fontSize: '1.2rem', color: '#374151', lineHeight: '1.8', marginBottom: '1.5rem' }}>
          Chilli crops can be affected by various diseases that impact plant growth and crop health. Identifying visible symptoms at an early stage can be challenging without appropriate knowledge and guidance.
        </p>

        <p style={{ fontSize: '1.2rem', color: '#374151', lineHeight: '1.8', marginBottom: '1.5rem' }}>
          ChilliNexis uses Machine Learning and Deep Learning techniques to analyze uploaded chilli leaf images and predict potential diseases. The platform also provides disease-related information to help users better understand the results.
        </p>
        
        <p style={{ fontSize: '1.2rem', color: '#374151', lineHeight: '1.8' }}>
          Our goal is to make AI-based disease identification more accessible through a simple, user-friendly web application.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
        <div className="glass-panel" style={{ padding: '3rem', background: '#f0fdf4' }}>
          <h2 style={{ fontSize: '2rem', color: '#047857', marginBottom: '1rem' }}>Our Mission</h2>
          <p style={{ fontSize: '1.1rem', color: '#4b5563', lineHeight: '1.7' }}>
            To make chilli disease identification easier and more accessible by using Artificial Intelligence to support farmers in understanding plant health.
          </p>
        </div>

        <div className="glass-panel" style={{ padding: '3rem', background: '#f0fdf4' }}>
          <h2 style={{ fontSize: '2rem', color: '#047857', marginBottom: '1rem' }}>Our Vision</h2>
          <p style={{ fontSize: '1.1rem', color: '#4b5563', lineHeight: '1.7' }}>
            To contribute to smarter and more informed chilli farming through accessible AI-powered plant disease analysis.
          </p>
        </div>
      </div>

      <div className="glass-panel" style={{ padding: '4rem', background: 'white' }}>
        <h2 style={{ fontSize: '2.5rem', color: '#047857', marginBottom: '2rem', textAlign: 'center' }}>Our Objectives</h2>
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1.5rem', padding: '0 2rem' }}>
          <li style={{ fontSize: '1.2rem', color: '#374151', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ color: '#10b981', fontSize: '1.5rem' }}>✓</span> Develop an AI-based chilli disease detection system.
          </li>
          <li style={{ fontSize: '1.2rem', color: '#374151', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ color: '#10b981', fontSize: '1.5rem' }}>✓</span> Analyze chilli leaf images using deep learning.
          </li>
          <li style={{ fontSize: '1.2rem', color: '#374151', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ color: '#10b981', fontSize: '1.5rem' }}>✓</span> Identify disease categories supported by the trained model.
          </li>
          <li style={{ fontSize: '1.2rem', color: '#374151', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ color: '#10b981', fontSize: '1.5rem' }}>✓</span> Provide clear and understandable prediction results.
          </li>
          <li style={{ fontSize: '1.2rem', color: '#374151', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ color: '#10b981', fontSize: '1.5rem' }}>✓</span> Share general disease information and prevention guidance.
          </li>
          <li style={{ fontSize: '1.2rem', color: '#374151', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ color: '#10b981', fontSize: '1.5rem' }}>✓</span> Create a simple and accessible user interface.
          </li>
        </ul>
      </div>

    </main>
  );
}
