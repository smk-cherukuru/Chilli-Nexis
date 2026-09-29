export default function Diseases() {
  const diseases = [
    {
      name: "Chilli Whitefly",
      symptoms: "Yellowing of leaves, leaf curling, presence of tiny white insects on the underside of leaves.",
      causes: "Infestation by small white flying insects that feed on plant sap and transmit viral diseases.",
      prevention: "Use yellow sticky traps. Spray neem oil. Ensure proper weed management around the crop field.",
      nextSteps: "Isolate affected plants. Apply insecticidal soaps if infestation is severe.",
      image: "/images/Chilli __Whitefly.jpg"
    },
    {
      name: "Chilli Leaf Curl Virus",
      symptoms: "Severe curling of leaves upwards or downwards, stunted growth, shortened internodes, and reduced fruit size.",
      causes: "Primarily transmitted by whiteflies. The virus disrupts normal plant hormone balance and growth.",
      prevention: "Control whitefly population. Plant virus-resistant chilli varieties. Use reflective mulches.",
      nextSteps: "Remove and safely destroy infected plants immediately to prevent spread. Do not compost them.",
      image: "/images/Chilli__Leaf_Curl_Virus.jpg"
    },
    {
      name: "Chilli Anthracnose",
      symptoms: "Sunken, circular dark spots on fruits and leaves. Pinkish spore masses may appear in wet weather.",
      causes: "Caused by Colletotrichum fungal species. Thrives in warm, wet, and highly humid conditions.",
      prevention: "Avoid overhead watering. Ensure proper crop rotation. Space plants appropriately for air circulation.",
      nextSteps: "Apply copper-based fungicides. Prune and discard affected branches and fruits.",
      image: "/images/Chilli__Anthacnose.jpg"
    },
    {
      name: "Chilli Yellowish",
      symptoms: "General yellowing of the plant foliage, starting from older leaves and moving upwards.",
      causes: "Often indicates nitrogen or nutrient deficiency, poor drainage, or early stages of a viral infection.",
      prevention: "Test and amend soil. Ensure fields are properly drained. Apply balanced NPK fertilizers.",
      nextSteps: "Apply a nitrogen-rich liquid fertilizer. Monitor closely for signs of pest vectors.",
      image: "/images/Chilli __Yellowish.jpg"
    },
    {
      name: "Healthy Plant",
      symptoms: "Lush green leaves, robust stems, steady growth, and no visible spotting or curling.",
      causes: "Optimal soil health, adequate watering, and absence of severe pests and pathogens.",
      prevention: "Maintain current agricultural practices. Perform routine checks.",
      nextSteps: "Continue monitoring and apply preventive organic sprays bi-weekly.",
      image: "/images/Chilli___healthy.jpg"
    }
  ];

  return (
    <main className="page-container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 2rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h1 style={{ fontSize: '3.5rem', color: '#047857', marginBottom: '1rem' }}>Disease Information Page</h1>
        <h2 style={{ fontSize: '2rem', color: '#374151', marginBottom: '1rem' }}>Understanding Chilli Plant Diseases</h2>
        <p style={{ fontSize: '1.2rem', color: '#4b5563', maxWidth: '800px', margin: '0 auto' }}>
          Learn about common chilli plant diseases, their visible symptoms, and general prevention practices.
        </p>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
        {diseases.map((d, i) => (
          <div key={i} className="glass-panel" style={{ display: 'flex', flexWrap: 'wrap', overflow: 'hidden' }}>
            <div style={{ flex: '1', minWidth: '300px', position: 'relative' }}>
              <img src={d.image} alt={d.name} style={{ width: '100%', height: '100%', objectFit: 'cover', minHeight: '300px' }} />
            </div>
            
            <div style={{ flex: '2', padding: '3rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', background: 'white' }}>
              <h2 style={{ fontSize: '2.5rem', color: '#10b981' }}>{d.name}</h2>
              
              <div>
                <h3 style={{ fontSize: '1.2rem', color: '#047857', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '1.5rem' }}>🔍</span> Common symptoms
                </h3>
                <p style={{ color: '#4b5563', lineHeight: '1.6' }}>{d.symptoms}</p>
              </div>

              <div>
                <h3 style={{ fontSize: '1.2rem', color: '#047857', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '1.5rem' }}>🦠</span> Causes or contributing factors
                </h3>
                <p style={{ color: '#4b5563', lineHeight: '1.6' }}>{d.causes}</p>
              </div>

              <div>
                <h3 style={{ fontSize: '1.2rem', color: '#047857', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '1.5rem' }}>🛡️</span> General prevention guidance
                </h3>
                <p style={{ color: '#4b5563', lineHeight: '1.6' }}>{d.prevention}</p>
              </div>

              <div style={{ background: '#f0fdf4', padding: '1.5rem', borderRadius: '12px', marginTop: '1rem', border: '1px solid #bbf7d0' }}>
                <h3 style={{ fontSize: '1.2rem', color: '#047857', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '1.5rem' }}>👉</span> Recommended next steps
                </h3>
                <p style={{ color: '#166534', fontWeight: '500' }}>{d.nextSteps}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
