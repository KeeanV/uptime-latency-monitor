import React, { useState, useEffect } from 'react';

function App() {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [loading, setLoading] = useState(false);


  const simulateDataLoad = () => {
    setLoading(true);
    setTimeout(() => {
      setDataLoaded(true);
      setLoading(false);
    }, 1500);
  };

  return (
    <div style={styles.appContainer}>
      <header style={styles.header}>
        <h1 style={styles.title}>Uptime Latency Monitor</h1>
      </header>
      <main style={styles.mainContent}>
        <div style={styles.container}>
          <h2 style={styles.subtitle}>Effortlessly monitor website uptime and latency — open source and cloud-ready.</h2>
          <button
            style={styles.button}
            onClick={simulateDataLoad}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Get Started'}
          </button>

          {dataLoaded && (
            <div style={styles.dataDisplay}>
              <h3 style={styles.dataTitle}>Dashboard Placeholder</h3>
              <p style={styles.dataText}>
                Backend successfully logging data to Supabase
              </p>
              <p style={styles.dataText}>
                Example targets:
                <ul style={styles.list}>
                  <li>Google.com - Last Status: 200, Latency: 50ms</li>
                  <li>Example.com - Last Status: 500, Latency: 200ms</li>
                </ul>
              </p>
            </div>
          )}
        </div>
      </main>
      <footer style={styles.footer}>
        <p style={styles.footerText}>Powered by React and Supabase.</p>
      </footer>
    </div>
  );
}

const styles = {
  appContainer: {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f4f7f6',
    minHeight: '100vh',
    color: '#333',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
  },
  header: {
    width: '100%',
    textAlign: 'center',
    marginBottom: '40px',
  },
  title: {
    fontSize: '2.5em',
    color: '#2c3e50',
    marginBottom: '10px',
  },
  mainContent: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  container: {
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    maxWidth: '800px',
    width: '100%',
  },
  subtitle: {
    fontSize: '1.5em',
    color: '#555',
    marginBottom: '30px',
  },
  button: {
    backgroundColor: '#3498db',
    color: 'white',
    padding: '12px 25px',
    border: 'none',
    borderRadius: '5px',
    fontSize: '1.1em',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#2980b9',
  },
  dataDisplay: {
    marginTop: '40px',
    paddingTop: '20px',
    borderTop: '1px solid #eee',
  },
  dataTitle: {
    fontSize: '1.8em',
    color: '#2c3e50',
    marginBottom: '15px',
  },
  dataText: {
    fontSize: '1em',
    color: '#666',
    lineHeight: '1.6',
    marginBottom: '10px',
  },
  list: {
    listStyleType: 'none',
    padding: 0,
    marginTop: '15px',
  },
  footer: {
    width: '100%',
    textAlign: 'center',
    marginTop: '40px',
    color: '#888',
    fontSize: '0.9em',
  },
  footerText: {
    margin: 0,
  }
};

export default App;
