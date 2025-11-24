import React, { useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import { Search, RotateCcw } from 'lucide-react';
import BrainModel from './BrainModel';
import { brainRegions } from './brainData';

function App() {
  const [query, setQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [hoveredRegion, setHoveredRegion] = useState(null);
  const [results, setResults] = useState([]);
  const controlsRef = useRef();

  const handleSearch = (val) => {
    setQuery(val);
    if (!val.trim()) {
      setResults([]);
      return;
    }
    const q = val.toLowerCase();
    const filtered = brainRegions.filter(r => 
      r.cn.includes(q) || 
      r.en.toLowerCase().includes(q) || 
      r.func.includes(q)
    );
    setResults(filtered);
  };

  const handleRegionClick = (region) => {
    setSelectedRegion(region);
    setQuery(region.cn);
    setResults([region]);
  };

  const resetView = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      {/* 3D Canvas */}
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <pointLight position={[-5, -5, -5]} intensity={0.4} />
        <BrainModel 
          selectedRegion={selectedRegion}
          onRegionClick={handleRegionClick}
          onRegionHover={setHoveredRegion}
        />
        <OrbitControls ref={controlsRef} enableDamping dampingFactor={0.05} />
      </Canvas>

      {/* UI Overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        padding: '20px',
        pointerEvents: 'none'
      }}>
        <div style={{ maxWidth: '500px', margin: '0 auto', pointerEvents: 'auto' }}>
          {/* Title */}
          <h1 style={{
            color: 'white',
            fontSize: '32px',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '20px',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
          }}>
            🧠 3D脑区图谱
          </h1>

          {/* Search Bar */}
          <div style={{ position: 'relative', marginBottom: '15px' }}>
            <Search style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#666'
            }} size={20} />
            <input
              type="text"
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="搜索脑区或功能（如：记忆、视觉、frontal）"
              style={{
                width: '100%',
                padding: '12px 12px 12px 45px',
                fontSize: '16px',
                border: '2px solid white',
                borderRadius: '12px',
                outline: 'none',
                backgroundColor: 'rgba(255,255,255,0.95)'
              }}
            />
          </div>

          {/* Reset Button */}
          <button
            onClick={resetView}
            style={{
              padding: '10px 20px',
              backgroundColor: 'rgba(255,255,255,0.95)',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '15px',
              fontWeight: '600'
            }}
          >
            <RotateCcw size={18} />
            重置视角
          </button>

          {/* Results */}
          {results.length > 0 && (
            <div style={{
              backgroundColor: 'rgba(255,255,255,0.95)',
              borderRadius: '12px',
              padding: '15px',
              maxHeight: '400px',
              overflowY: 'auto'
            }}>
              {results.map((r, i) => (
                <div
                  key={i}
                  onClick={() => handleRegionClick(r)}
                  style={{
                    padding: '12px',
                    marginBottom: i < results.length - 1 ? '10px' : 0,
                    borderRadius: '8px',
                    cursor: 'pointer',
                    backgroundColor: selectedRegion?.id === r.id ? '#e0e7ff' : 'white',
                    border: '1px solid #e5e7eb',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = selectedRegion?.id === r.id ? '#e0e7ff' : 'white'}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1f2937' }}>{r.cn}</h3>
                    <span style={{ fontSize: '13px', color: '#6b7280', fontStyle: 'italic' }}>{r.en}</span>
                  </div>
                  <div style={{ marginBottom: '6px' }}>
                    <span style={{ fontSize: '14px', fontWeight: '600', color: '#4b5563' }}>位置：</span>
                    <span style={{ fontSize: '14px', color: '#6b7280' }}>{r.loc}</span>
                  </div>
                  <div>
                    <span style={{ fontSize: '14px', fontWeight: '600', color: '#4b5563' }}>功能：</span>
                    <span style={{ fontSize: '14px', color: '#6b7280' }}>{r.func}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Hover Tooltip */}
      {hoveredRegion && !selectedRegion && (
        <div style={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: 'rgba(0,0,0,0.85)',
          color: 'white',
          padding: '12px 20px',
          borderRadius: '8px',
          pointerEvents: 'none',
          fontSize: '16px',
          fontWeight: '600',
          textAlign: 'center'
        }}>
          {hoveredRegion.cn} | {hoveredRegion.en}
        </div>
      )}

      {/* Instructions */}
      {!selectedRegion && results.length === 0 && (
        <div style={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: 'rgba(255,255,255,0.9)',
          padding: '15px 25px',
          borderRadius: '8px',
          textAlign: 'center',
          pointerEvents: 'none'
        }}>
          <p style={{ margin: 0, color: '#374151', fontWeight: '600' }}>
            🖱️ 点击脑区查看详情 | 拖动旋转 | 滚轮缩放
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
