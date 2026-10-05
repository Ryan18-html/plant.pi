import React, { useState } from 'react';
import { Leaf, Search, ShoppingBag, Info, SlidersHorizontal, BookOpen, Users } from 'lucide-react';

interface NavbarProps {
  currentScreen: 'layar1' | 'layar2' | 'layar3';
  setCurrentScreen: (screen: 'layar1' | 'layar2' | 'layar3') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  cartCount: number;
  openCart: () => void;
  showAnnotations: boolean;
  setShowAnnotations: (show: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentScreen,
  setCurrentScreen,
  searchQuery,
  setSearchQuery,
  cartCount,
  openCart,
  showAnnotations,
  setShowAnnotations,
}) => {
  const [showTipsModal, setShowTipsModal] = useState(false);
  const [showCommunityModal, setShowCommunityModal] = useState(false);

  return (
    <header style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #e5e7eb', position: 'sticky', top: 0, zIndex: 40 }}>
      {/* Top Wireframe Screen Switcher Bar */}
      <div style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #f3f4f6', padding: '6px 16px', fontSize: '12px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontWeight: 600, color: '#374151' }}>Wireframe Navigasi Layar:</span>
            <div style={{ display: 'inline-flex', backgroundColor: '#e5e7eb', borderRadius: '6px', padding: '2px' }}>
              <button
                onClick={() => setCurrentScreen('layar1')}
                style={{
                  padding: '3px 10px',
                  borderRadius: '4px',
                  fontSize: '11px',
                  fontWeight: currentScreen === 'layar1' ? 700 : 500,
                  backgroundColor: currentScreen === 'layar1' ? '#15803d' : 'transparent',
                  color: currentScreen === 'layar1' ? '#ffffff' : '#4b5563',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                Layar 1 — Katalog & Filter
              </button>
              <button
                onClick={() => setCurrentScreen('layar2')}
                style={{
                  padding: '3px 10px',
                  borderRadius: '4px',
                  fontSize: '11px',
                  fontWeight: currentScreen === 'layar2' ? 700 : 500,
                  backgroundColor: currentScreen === 'layar2' ? '#15803d' : 'transparent',
                  color: currentScreen === 'layar2' ? '#ffffff' : '#4b5563',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                Layar 2 — Plant Finder
              </button>
              <button
                onClick={() => setCurrentScreen('layar3')}
                style={{
                  padding: '3px 10px',
                  borderRadius: '4px',
                  fontSize: '11px',
                  fontWeight: currentScreen === 'layar3' ? 700 : 500,
                  backgroundColor: currentScreen === 'layar3' ? '#15803d' : 'transparent',
                  color: currentScreen === 'layar3' ? '#ffffff' : '#4b5563',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                Layar 3 — Detail Tanaman
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer', userSelect: 'none', color: '#4b5563', fontSize: '11px' }}>
              <input
                type="checkbox"
                checked={showAnnotations}
                onChange={(e) => setShowAnnotations(e.target.checked)}
                style={{ accentColor: '#16a34a', cursor: 'pointer' }}
              />
              <span style={{ fontWeight: 600 }}>Tampilkan Label Wireframe</span> (Fitur 1-7)
            </label>
          </div>
        </div>
      </div>

      {/* Main Header / Wireframe Navbar */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
        {/* Brand Logo */}
        <div
          onClick={() => setCurrentScreen('layar1')}
          style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', textDecoration: 'none' }}
        >
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              backgroundColor: '#16a34a',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              boxShadow: '0 2px 4px rgba(22, 163, 74, 0.25)',
            }}
          >
            <Leaf size={20} strokeWidth={2.5} />
          </div>
          <div>
            <div style={{ fontSize: '17px', fontWeight: 800, color: '#111827', letterSpacing: '-0.3px', lineHeight: '1.2' }}>
              LittleSeed
            </div>
            <div style={{ fontSize: '11px', color: '#16a34a', fontWeight: 600, letterSpacing: '0.4px', textTransform: 'uppercase' }}>
              Plants
            </div>
          </div>
        </div>

        {/* Search Bar matching wireframe: 'Cari monstera, lidah mertua, calathea...' */}
        <div style={{ flex: '1', maxWidth: '440px', position: 'relative' }}>
          <div style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', pointerEvents: 'none' }}>
            <Search size={16} />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              if (currentScreen !== 'layar1') setCurrentScreen('layar1');
            }}
            placeholder="Cari monstera, lidah mertua, calathea..."
            style={{
              width: '100%',
              padding: '9px 14px 9px 36px',
              borderRadius: '9999px',
              border: '1px solid #d1d5db',
              fontSize: '13px',
              outline: 'none',
              backgroundColor: '#f9fafb',
              color: '#1f2937',
              transition: 'border-color 0.15s, background-color 0.15s',
              boxSizing: 'border-box',
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = '#16a34a';
              e.currentTarget.style.backgroundColor = '#ffffff';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = '#d1d5db';
              e.currentTarget.style.backgroundColor = '#f9fafb';
            }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                fontSize: '12px',
                color: '#6b7280',
                cursor: 'pointer',
              }}
            >
              ✕
            </button>
          )}
        </div>

        {/* Links: Katalog, Tips, Komunitas & Cart */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <nav style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '13px', fontWeight: 500 }}>
            <button
              onClick={() => setCurrentScreen('layar1')}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: currentScreen === 'layar1' ? '#16a34a' : '#374151',
                fontWeight: currentScreen === 'layar1' ? 700 : 500,
                padding: '4px 0',
                borderBottom: currentScreen === 'layar1' ? '2px solid #16a34a' : '2px solid transparent',
              }}
            >
              Katalog
            </button>
            <button
              onClick={() => setShowTipsModal(true)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#4b5563',
                padding: '4px 0',
              }}
            >
              Tips
            </button>
            <button
              onClick={() => setShowCommunityModal(true)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#4b5563',
                padding: '4px 0',
              }}
            >
              Komunitas
            </button>
          </nav>

          {/* Cart Icon with badge */}
          <button
            onClick={openCart}
            style={{
              position: 'relative',
              background: '#f3f4f6',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              padding: '8px 10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#1f2937',
              transition: 'background 0.15s',
            }}
            title="Keranjang Belanja"
          >
            <ShoppingBag size={18} />
            {cartCount > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '-6px',
                  right: '-6px',
                  backgroundColor: '#16a34a',
                  color: '#ffffff',
                  fontSize: '11px',
                  fontWeight: 700,
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px solid #ffffff',
                }}
              >
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Tips Modal */}
      {showTipsModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 60, padding: '16px' }}>
          <div style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '24px', maxWidth: '480px', width: '100%', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <BookOpen size={20} color="#16a34a" />
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#111827', margin: 0 }}>Tips Rawat Tanaman LittleSeed</h3>
            </div>
            <p style={{ fontSize: '13px', color: '#4b5563', lineHeight: '1.6', margin: '0 0 16px 0' }}>
              1. <strong>Kenali Sinar:</strong> Sinar matahari tidak langsung (bright indirect light) adalah favorit 90% tanaman hias.<br />
              2. <strong>Uji Kelembapan:</strong> Tancapkan jari 2 cm ke dalam tanah sebelum menyiram. Jangan menyiram jika tanah masih basah.<br />
              3. <strong>Sirkulasi Udara:</strong> Udara segar membantu mencegah jamur dan kutu putih.
            </p>
            <button
              onClick={() => setShowTipsModal(false)}
              style={{ width: '100%', padding: '10px', backgroundColor: '#16a34a', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}
            >
              Tutup
            </button>
          </div>
        </div>
      )}

      {/* Community Modal */}
      {showCommunityModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 60, padding: '16px' }}>
          <div style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '24px', maxWidth: '480px', width: '100%', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <Users size={20} color="#16a34a" />
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#111827', margin: 0 }}>Komunitas Plant Parent LittleSeed</h3>
            </div>
            <p style={{ fontSize: '13px', color: '#4b5563', lineHeight: '1.6', margin: '0 0 16px 0' }}>
              Bergabunglah dengan lebih dari 15.000+ pecinta tanaman hias di Indonesia. Bagikan foto monstera, tanya diagnosa daun kuning, dan tukar anakan tanaman (plant swap) gratis setiap bulan!
            </p>
            <button
              onClick={() => setShowCommunityModal(false)}
              style={{ width: '100%', padding: '10px', backgroundColor: '#16a34a', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}
            >
              Mengerti & Kembali
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
