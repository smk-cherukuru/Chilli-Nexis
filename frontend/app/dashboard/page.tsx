"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const router = useRouter();
  const [isAuth, setIsAuth] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<any[]>([]);
  
  // Extra features state
  const [language, setLanguage] = useState<'en' | 'te'>('en');
  const [plantAge, setPlantAge] = useState('');
  const [growthStage, setGrowthStage] = useState('Vegetative');
  const [checkedItems, setCheckedItems] = useState<{[key: string]: boolean}>({});

  useEffect(() => {
    const auth = localStorage.getItem("chilli_auth");
    if (auth !== "true") {
      router.push("/login");
    } else {
      setIsAuth(true);
      const savedHistory = localStorage.getItem("chilli_history");
      if (savedHistory) {
        try { setHistory(JSON.parse(savedHistory)); } catch(e) {}
      }
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("chilli_auth");
    router.push("/");
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      setPreview(URL.createObjectURL(file));
      setResult(null);
      setError(null);
      setCheckedItems({});
    }
  };

  const diseaseKnowledge: any = {
    "Chilli Whitefly": {
      description: "Whitefly is an insect pest, not a plant disease, but acts as a major viral vector.",
      status: "Moderate concern",
      statusTe: "మితమైన ఆందోళన",
      symptoms: [
        "Tiny white insects on the underside of leaves",
        "Yellowing, leaf weakening, and reduced plant growth",
        "Sticky residue may occur in some infestations"
      ],
      recommendations: [
        "Inspect the undersides of leaves",
        "Monitor the plant for increasing whitefly populations",
        "Use appropriate integrated pest-management practices",
        "Note: Whiteflies can transmit chilli leaf curl viruses"
      ],
      organic: [
        "Use yellow sticky traps",
        "Spray neem oil or insecticidal soaps",
        "Encourage natural predators"
      ],
      prevention: [
        "Maintain field hygiene",
        "Monitor plants regularly",
        "Use healthy planting material"
      ],
      outlook: "Recovery is highly likely if insect population is controlled early.",
      impact: "Can cause severe yield loss if left unchecked due to transmission of Leaf Curl Virus.",
      checklist: ["Apply Neem Oil", "Place Yellow Sticky Traps", "Check undersides of leaves daily"]
    },
    "Chilli Leaf Curl Virus": {
      description: "A devastating viral disease primarily transmitted by whiteflies.",
      status: "Severe concern",
      statusTe: "తీవ్రమైన ఆందోళన",
      symptoms: [
        "Upward curling and crinkling of leaves",
        "Reduced leaf size and shortened internodes",
        "Stunted growth and fewer flowers or fruits"
      ],
      recommendations: [
        "Remove severely affected plants where advised by local agricultural guidance",
        "Manage whitefly vectors and weeds that may host the virus",
        "Use healthy planting material and follow preventive crop-management practices"
      ],
      organic: [
        "Immediate physical removal of infected plants (do not compost)",
        "Use reflective mulches to deter whiteflies"
      ],
      prevention: [
        "Plant virus-resistant chilli varieties",
        "Control vector insects",
        "Maintain crop hygiene"
      ],
      outlook: "Important: There is no direct cure for a viral infection. Management focuses on reducing spread and limiting damage.",
      impact: "High risk of up to 100% yield loss in infected plants.",
      checklist: ["Uproot infected plant", "Burn or safely discard plant", "Spray field for whiteflies"]
    },
    "Chilli Anthracnose": {
      description: "A fungal infection caused by Colletotrichum species, thriving in warm, wet conditions.",
      status: "Mild to Moderate concern",
      statusTe: "తేలికపాటి ఆందోళన",
      symptoms: [
        "Dark, sunken lesions on chilli fruits",
        "Rotting and fruit damage",
        "In some cases, dieback of tender branches"
      ],
      recommendations: [
        "Remove infected plant material appropriately",
        "Avoid unnecessary wetting of foliage and fruits",
        "Maintain field sanitation and use healthy seeds",
        "Seek locally appropriate disease-management guidance"
      ],
      organic: [
        "Maintain field sanitation",
        "Ensure proper spacing for air circulation",
        "Use healthy seeds"
      ],
      prevention: [
        "Avoid overhead watering",
        "Ensure proper crop rotation",
        "Monitor during wet weather"
      ],
      outlook: "Recovery of the plant is possible, though affected fruits are permanently damaged.",
      impact: "Can cause significant post-harvest losses and fruit rot.",
      checklist: ["Prune affected branches", "Remove rotting fruits", "Adjust watering schedule"]
    },
    "Chilli Yellowish": {
      description: "Yellowing is a symptom, not a specific disease. Several causes can produce similar symptoms.",
      status: "Needs expert inspection",
      statusTe: "నిపుణుల తనిఖీ అవసరం",
      symptoms: [
        "Yellow or pale green leaves",
        "Possible uneven discoloration",
        "Reduced growth in some cases"
      ],
      recommendations: [
        "Check watering and drainage conditions",
        "Review possible nutrient deficiencies",
        "Inspect for pests and other disease symptoms",
        "Seek further diagnosis if yellowing persists"
      ],
      organic: [
        "Apply balanced organic compost",
        "Improve soil aeration",
        "Check for overwatering"
      ],
      prevention: [
        "Test and amend soil regularly",
        "Ensure fields are properly drained",
        "Apply balanced NPK fertilizers"
      ],
      outlook: "High probability of full recovery if the underlying nutrient or water issue is resolved.",
      impact: "Temporary stunted growth, manageable if corrected early.",
      checklist: ["Check soil moisture", "Apply nitrogen-rich fertilizer", "Monitor for 3 days"]
    },
    "Chilli healthy": {
      description: "The plant exhibits normal, healthy growth.",
      status: "Healthy - no supported disease detected",
      statusTe: "ఆరోగ్యకరమైనది",
      symptoms: ["Lush green leaves", "Robust stems", "No visible spotting or curling"],
      recommendations: ["Continue standard maintenance"],
      organic: ["Continue preventive organic sprays bi-weekly"],
      prevention: ["Monitor plants regularly", "Maintain field hygiene", "Use healthy planting material"],
      outlook: "Excellent. The plant is thriving.",
      impact: "Maximum yield potential expected.",
      checklist: ["Standard watering", "Routine checkup"]
    }
  };

  const handlePredict = async () => {
    if (!selectedImage) return;
    setLoading(true);
    setError(null);
    const formData = new FormData();
    formData.append('file', selectedImage);

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://chilli-nexis.onrender.com';
      const response = await fetch(`${API_URL}/predict`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Prediction failed.');

      const data = await response.json();
      setResult(data);

      const newEntry = {
        id: Date.now(),
        date: new Date().toLocaleString(),
        disease: data.disease,
        confidence: data.confidence,
        severity: data.severity,
        all_confidences: data.all_confidences,
        imagePreview: preview 
      };
      const newHistory = [newEntry, ...history].slice(0, 10);
      setHistory(newHistory);
      localStorage.setItem("chilli_history", JSON.stringify(newHistory));

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleChecklist = (task: string) => {
    setCheckedItems(prev => ({ ...prev, [task]: !prev[task] }));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("chilli_history");
  };

  const loadHistoryItem = (item: any) => {
    setResult({
      disease: item.disease,
      confidence: item.confidence,
      severity: item.severity,
      all_confidences: item.all_confidences || { [item.disease]: item.confidence }
    });
    setPreview(item.imagePreview);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrint = () => {
    window.print();
  };

  // Translations
  const t = {
    en: {
      detectResult: "AI Disease Detection Result",
      confidence: "Disease Confidence Analysis",
      healthStatus: "Plant Health Status",
      symptoms: "Symptoms and Disease Description",
      treatments: "Treatment Recommendations",
      organic: "Organic and Natural Solutions",
      prevention: "Prevention Tips",
      outlook: "Plant Recovery Outlook",
      impact: "Estimated Crop Impact",
      checklist: "Care Checklist",
      expert: "Contact Agricultural Expert",
      download: "Download PDF Report",
      ageLabel: "Plant Age (Days):",
      stageLabel: "Growth Stage:"
    },
    te: {
      detectResult: "AI వ్యాధి గుర్తింపు ఫలితం (Detection Result)",
      confidence: "వ్యాధి నిర్ధారణ విశ్లేషణ (Confidence Analysis)",
      healthStatus: "మొక్క ఆరోగ్య స్థితి (Health Status)",
      symptoms: "లక్షణాలు మరియు వివరణ (Symptoms)",
      treatments: "చికిత్స సూచనలు (Recommendations)",
      organic: "సేంద్రీయ పరిష్కారాలు (Organic Solutions)",
      prevention: "నివారణ చిట్కాలు (Prevention Tips)",
      outlook: "కోలుకునే అవకాశాలు (Recovery Outlook)",
      impact: "పంట ప్రభావం అంచనా (Crop Impact)",
      checklist: "సంరక్షణ చెక్‌లిస్ట్ (Care Checklist)",
      expert: "వ్యవసాయ నిపుణుడిని సంప్రదించండి",
      download: "PDF రిపోర్ట్ డౌన్‌లోడ్ చేయండి",
      ageLabel: "మొక్క వయస్సు (రోజులు):",
      stageLabel: "పెరుగుదల దశ:"
    }
  };

  const txt = t[language];
  const activeDisease = result?.disease ? (diseaseKnowledge[result.disease] || diseaseKnowledge["Chilli healthy"]) : null;

  if (!isAuth) return null;

  return (
    <main className="dashboard-container">
      <div className="dashboard-header glass-panel no-print">
        <div>
          <h1 className="title">Farmer Dashboard & Analytics</h1>
          <p>Complete disease-management experience powered by AI.</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button onClick={() => setLanguage(language === 'en' ? 'te' : 'en')} className="btn-secondary" style={{ padding: '0.5rem 1rem' }}>
            {language === 'en' ? 'తెలుగు' : 'English'}
          </button>
          <button onClick={handleLogout} className="btn-secondary">Logout</button>
        </div>
      </div>

      <div className="dashboard-grid">
        {/* Left Widget: Scanner & Questionnaire */}
        <div className="no-print" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div className="glass-panel main-card scanner-widget" style={{ padding: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: '#047857' }}>Plant Scanner</h2>
            <div className="upload-container">
              <label className="upload-box" style={{ minHeight: '300px' }}>
                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                {preview ? (
                  <img src={preview} alt="Preview" className="preview-image" style={{ maxHeight: '280px', objectFit: 'contain' }} />
                ) : (
                  <div className="upload-placeholder">
                    <span className="icon">📸</span>
                    <span style={{ fontSize: '1.2rem' }}>Tap here to select an image</span>
                  </div>
                )}
              </label>
            </div>

            {selectedImage && !loading && !result && (
              <button onClick={handlePredict} className="btn-primary" disabled={loading} style={{ padding: '1.2rem', fontSize: '1.2rem' }}>
                Analyze Image Now
              </button>
            )}

            {loading && (
              <div className="loading" style={{ marginTop: '2rem' }}>
                <div className="spinner" style={{ width: '50px', height: '50px', borderWidth: '5px' }}></div>
                <p style={{ fontSize: '1.1rem', fontWeight: '500', color: '#047857' }}>AI Engine Analyzing...</p>
              </div>
            )}

            {error && <div className="error-box"><p>{error}</p></div>}
          </div>

          <div className="glass-panel main-card" style={{ padding: '2rem', textAlign: 'left' }}>
            <h2 style={{ color: '#047857', marginBottom: '1.5rem' }}>Disease Severity Questionnaire</h2>
            <label style={{ display: 'block', marginBottom: '1rem' }}>
              <span style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>{txt.ageLabel}</span>
              <input type="number" value={plantAge} onChange={e => setPlantAge(e.target.value)} className="input-field" placeholder="e.g. 45" />
            </label>
            <label style={{ display: 'block', marginBottom: '1rem' }}>
              <span style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>{txt.stageLabel}</span>
              <select value={growthStage} onChange={e => setGrowthStage(e.target.value)} className="input-field">
                <option>Seedling</option>
                <option>Vegetative</option>
                <option>Flowering</option>
                <option>Fruiting</option>
              </select>
            </label>
            <p style={{ fontSize: '0.9rem', color: '#6b7280' }}>*This info helps refine the final PDF report context.</p>
          </div>
        </div>

        {/* Right Widget: Comprehensive Results */}
        <div className="glass-panel main-card results-widget" style={{ padding: '2rem', textAlign: 'left', maxWidth: '100%' }}>
          {!result ? (
            <div style={{ textAlign: 'center', color: 'var(--text-sub)', padding: '5rem 0' }}>
              <span style={{ fontSize: '4rem', display: 'block', marginBottom: '1.5rem', opacity: 0.5 }}>📊</span>
              <p style={{ fontSize: '1.2rem' }}>Upload and scan an image to see the complete disease management experience.</p>
            </div>
          ) : (
            <div id="print-area">
              
              {/* 1. AI Disease Detection Result & 3. Health Status */}
              <div style={{ borderBottom: '2px solid #e5e7eb', paddingBottom: '1.5rem', marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.2rem', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '1px' }}>{txt.detectResult}</h2>
                <h1 style={{ fontSize: '3rem', color: '#111827', margin: '0.5rem 0' }}>{result.disease}</h1>
                <div style={{ display: 'inline-block', background: result.disease.includes('healthy') ? '#dcfce7' : '#fee2e2', color: result.disease.includes('healthy') ? '#166534' : '#991b1b', padding: '0.5rem 1rem', borderRadius: '8px', fontWeight: 'bold', fontSize: '1.1rem' }}>
                  {txt.healthStatus}: {language === 'en' ? activeDisease.status : activeDisease.statusTe}
                </div>
              </div>

              {/* 2. Disease Confidence Analysis */}
              <div className="report-section">
                <h3><span className="icon">📊</span> {txt.confidence}</h3>
                {Object.entries(result.all_confidences)
                  .sort(([, a], [, b]) => (b as number) - (a as number))
                  .map(([disease, conf]: any) => (
                  <div key={disease} style={{ marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem', marginBottom: '0.3rem' }}>
                      <span style={{ fontWeight: disease === result.disease ? 'bold' : 'normal' }}>{disease}</span>
                      <span style={{ fontWeight: disease === result.disease ? 'bold' : 'normal' }}>{conf.toFixed(1)}%</span>
                    </div>
                    <div style={{ width: '100%', height: '8px', background: '#e5e7eb', borderRadius: '4px' }}>
                      <div style={{ height: '100%', width: `${conf}%`, background: disease === result.disease ? '#10b981' : '#9ca3af', borderRadius: '4px' }}></div>
                    </div>
                  </div>
                ))}
                <p style={{ fontSize: '0.8rem', color: '#9ca3af', marginTop: '0.5rem' }}>*A confidence score is not the absolute probability that the plant is truly infected, but represents model certainty.</p>
              </div>

              {/* 4. Symptoms and Disease Description */}
              <div className="report-section">
                <h3><span className="icon">🔍</span> {txt.symptoms}</h3>
                <p style={{ marginBottom: '1rem', fontStyle: 'italic', color: '#4b5563' }}>{activeDisease.description}</p>
                <ul className="styled-list">
                  {activeDisease.symptoms.map((s: string, i: number) => <li key={i}>{s}</li>)}
                </ul>
              </div>

              {/* 5. Treatment Recommendations */}
              <div className="report-section warning-box">
                <h3><span className="icon">🛡️</span> {txt.treatments}</h3>
                <ul className="styled-list">
                  {activeDisease.recommendations.map((r: string, i: number) => <li key={i}>{r}</li>)}
                </ul>
                <p style={{ fontSize: '0.85rem', marginTop: '1rem', color: '#854d0e' }}>*Treatment advice should be reviewed against reliable agricultural guidance.</p>
              </div>

              {/* 6. Organic and Natural Solutions */}
              <div className="report-section success-box">
                <h3><span className="icon">🌱</span> {txt.organic}</h3>
                <ul className="styled-list">
                  {activeDisease.organic.map((o: string, i: number) => <li key={i}>{o}</li>)}
                </ul>
              </div>

              {/* 7. Prevention Tips */}
              <div className="report-section">
                <h3><span className="icon">🛑</span> {txt.prevention}</h3>
                <ul className="styled-list">
                  {activeDisease.prevention.map((p: string, i: number) => <li key={i}>{p}</li>)}
                </ul>
              </div>

              {/* 8. Plant Recovery Outlook & 9. Estimated Crop Impact */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
                <div className="report-section" style={{ marginBottom: 0 }}>
                  <h3><span className="icon">📈</span> {txt.outlook}</h3>
                  <p>{activeDisease.outlook}</p>
                </div>
                <div className="report-section" style={{ marginBottom: 0 }}>
                  <h3><span className="icon">🌾</span> {txt.impact}</h3>
                  <p>{activeDisease.impact}</p>
                </div>
              </div>

              {/* 10. Care Checklist */}
              <div className="report-section">
                <h3><span className="icon">✅</span> {txt.checklist}</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                  {activeDisease.checklist.map((task: string, i: number) => (
                    <label key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer', padding: '0.5rem', background: checkedItems[task] ? '#dcfce7' : '#f3f4f6', borderRadius: '8px', transition: '0.2s' }}>
                      <input 
                        type="checkbox" 
                        checked={!!checkedItems[task]}
                        onChange={() => toggleChecklist(task)}
                        style={{ width: '20px', height: '20px' }}
                      />
                      <span style={{ textDecoration: checkedItems[task] ? 'line-through' : 'none', color: checkedItems[task] ? '#166534' : '#111827' }}>{task}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Meta info for print */}
              <div className="print-only" style={{ marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid #ccc', fontSize: '0.9rem', color: '#666' }}>
                <p>Report Generated: {new Date().toLocaleString()}</p>
                {plantAge && <p>Plant Age: {plantAge} days</p>}
                <p>Growth Stage: {growthStage}</p>
                <p>Generated by ChilliNexis AI Agriculture System</p>
              </div>

            </div>
          )}

          {/* 11. Download PDF Action */}
          {result && (
            <div className="no-print" style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
              <button onClick={handlePrint} className="btn-primary" style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
                <span>📄</span> {txt.download}
              </button>
              <button onClick={() => window.open('https://wa.me/919999999999?text=I need agricultural consultation for my Chilli crop.', '_blank')} className="btn-secondary" style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
                <span>👨‍🌾</span> {txt.expert}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* History Tracking Section */}
      <div className="glass-panel no-print" style={{ marginTop: '3rem', padding: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h2 style={{ color: '#047857' }}>Scan History ({history.length})</h2>
          {history.length > 0 && (
            <button onClick={clearHistory} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontWeight: '600', textDecoration: 'underline' }}>
              Clear History
            </button>
          )}
        </div>
        
        {history.length === 0 ? (
          <p style={{ color: '#6b7280', textAlign: 'center', padding: '2rem' }}>No past scans found in local cache.</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.5rem' }}>
            {history.map((item) => (
              <div 
                key={item.id} 
                onClick={() => loadHistoryItem(item)}
                style={{ background: 'white', borderRadius: '12px', padding: '1rem', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', cursor: 'pointer', transition: 'transform 0.2s' }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                {item.imagePreview && (
                  <div style={{ height: '140px', marginBottom: '1rem', borderRadius: '8px', overflow: 'hidden', background: '#f3f4f6' }}>
                    <img src={item.imagePreview} alt="Scanned" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.8rem', color: '#6b7280' }}>{item.date}</span>
                </div>
                <h4 style={{ color: '#111827', margin: '0 0 0.5rem 0' }}>{item.disease}</h4>
                <p style={{ color: '#10b981', fontWeight: 'bold', fontSize: '0.9rem', margin: 0 }}>{item.confidence}% Match</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
