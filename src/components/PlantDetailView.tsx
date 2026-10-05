import React, { useState } from 'react';
import { Sun, Droplet, Ruler, ShieldCheck, ChevronDown, ChevronUp, ShoppingBag, Plus, Minus, ArrowLeft, Check, Sparkles, FileText } from 'lucide-react';
import { Plant } from '../data/plants';

interface PlantDetailViewProps {
  plant: Plant;
  onBackToCatalog: () => void;
  onAddToCart: (plant: Plant, quantity: number) => void;
  showAnnotations: boolean;
  onOpenCareCard: (plant: Plant) => void;
}

export const PlantDetailView: React.FC<PlantDetailViewProps> = ({
  plant,
  onBackToCatalog,
  onAddToCart,
  showAnnotations,
  onOpenCareCard,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [isAdditionalInfoOpen, setIsAdditionalInfoOpen] = useState<boolean>(true);
  const [isCareGuideOpen, setIsCareGuideOpen] = useState<boolean>(false);
  const [addedSuccess, setAddedSuccess] = useState<boolean>(false);

  const handleAddToCart = () => {
    onAddToCart(plant, quantity);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2000);
  };

  return (
    <div style={{ maxWidth: '1080px', margin: '0 auto', padding: '24px 16px 60px' }}>
      {/* Wireframe Screen Annotation Tag */}
      {showAnnotations && (
        <div style={{ marginBottom: '16px', display: 'inline-block', backgroundColor: '#fef3c7', color: '#92400e', border: '1px dashed #d97706', padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 600 }}>
          Layar 3 — Detail Tanaman
        </div>
      )}

      {/* Breadcrumb matching Wireframe: 'Katalog / Tanaman Hias / Calathea' */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#6b7280', marginBottom: '20px' }}>
        <button
          onClick={onBackToCatalog}
          style={{ background: 'none', border: 'none', padding: 0, color: '#16a34a', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}
        >
          <ArrowLeft size={14} />
          Katalog
        </button>
        <span>/</span>
        <span style={{ color: '#4b5563' }}>Tanaman Hias</span>
        <span>/</span>
        <span style={{ fontWeight: 600, color: '#111827' }}>{plant.name}</span>
      </div>

      {/* Main Top Section: Photo Left, Info Right */}
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          border: '1.5px solid #e5e7eb',
          padding: '28px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '36px',
          marginBottom: '28px',
        }}
      >
        {/* Left Column: Photo Utama & 3 Thumbnails */}
        <div>
          {/* Foto Utama */}
          <div
            style={{
              width: '100%',
              height: '360px',
              borderRadius: '12px',
              overflow: 'hidden',
              backgroundColor: '#f3f4f6',
              border: '1.5px solid #e5e7eb',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img
              src={plant.images[selectedImageIndex] || plant.images[0]}
              alt={plant.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.3s ease',
              }}
              onError={(e) => {
                // Fallback image in case of network issue
                e.currentTarget.src = 'https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?auto=format&fit=crop&w=800&q=80';
              }}
            />
            {showAnnotations && (
              <div
                style={{
                  position: 'absolute',
                  top: '12px',
                  left: '12px',
                  backgroundColor: 'rgba(255,255,255,0.85)',
                  padding: '3px 8px',
                  borderRadius: '4px',
                  fontSize: '11px',
                  fontWeight: 600,
                  color: '#4b5563',
                  border: '1px solid #d1d5db',
                }}
              >
                Foto utama
              </div>
            )}
          </div>

          {/* Thumbnails below: 1, 2, 3 */}
          <div style={{ display: 'flex', gap: '12px', marginTop: '14px' }}>
            {plant.images.map((img, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedImageIndex(idx)}
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  border: selectedImageIndex === idx ? '2px solid #16a34a' : '1.5px solid #e5e7eb',
                  opacity: selectedImageIndex === idx ? 1 : 0.65,
                  transition: 'all 0.15s ease',
                  position: 'relative',
                }}
              >
                <img
                  src={img}
                  alt={`${plant.name} thumbnail ${idx + 1}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <span
                  style={{
                    position: 'absolute',
                    bottom: '2px',
                    right: '3px',
                    backgroundColor: 'rgba(0,0,0,0.6)',
                    color: '#fff',
                    fontSize: '9px',
                    padding: '1px 4px',
                    borderRadius: '3px',
                  }}
                >
                  {idx + 1}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Title, Price, Badges, Fitur 5 Key Info Summary, Qty, Add to Cart */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#111827', margin: '0 0 6px 0', letterSpacing: '-0.4px' }}>
              {plant.name}
            </h1>
            <div style={{ fontSize: '14px', color: '#6b7280', fontStyle: 'italic', marginBottom: '12px' }}>
              {plant.scientificName}
            </div>

            <div style={{ fontSize: '24px', fontWeight: 800, color: '#15803d', marginBottom: '14px' }}>
              {plant.formattedPrice}
            </div>

            {/* Badges: Cocok 95% & Aman untuk hewan */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '22px' }}>
              <span
                style={{
                  backgroundColor: '#dcfce7',
                  color: '#15803d',
                  padding: '5px 12px',
                  borderRadius: '9999px',
                  fontSize: '12px',
                  fontWeight: 700,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <Sparkles size={13} />
                Cocok {plant.matchScore}% untuk rumahmu
              </span>

              {plant.petSafe && (
                <span
                  style={{
                    backgroundColor: '#e0f2fe',
                    color: '#0369a1',
                    padding: '5px 12px',
                    borderRadius: '9999px',
                    fontSize: '12px',
                    fontWeight: 700,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <ShieldCheck size={13} />
                  Aman untuk hewan
                </span>
              )}
            </div>

            {/* Fitur 5: Key Info Summary (Wireframe Feature 5) */}
            {showAnnotations && (
              <div style={{ fontSize: '11px', color: '#b45309', fontWeight: 600, marginBottom: '6px' }}>
                Fitur 5: Key Info Summary
              </div>
            )}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '8px',
                marginBottom: '24px',
              }}
            >
              {/* Box 1: Cahaya */}
              <div
                style={{
                  border: '1.5px solid #e5e7eb',
                  borderRadius: '10px',
                  padding: '10px 8px',
                  textAlign: 'center',
                  backgroundColor: '#fafafa',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'center', color: '#eab308', marginBottom: '4px' }}>
                  <Sun size={18} />
                </div>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#374151' }}>
                  Cahaya {plant.light.toLowerCase()}
                </div>
                <div style={{ fontSize: '10px', color: '#6b7280' }}>Sinar difus</div>
              </div>

              {/* Box 2: Siram */}
              <div
                style={{
                  border: '1.5px solid #e5e7eb',
                  borderRadius: '10px',
                  padding: '10px 8px',
                  textAlign: 'center',
                  backgroundColor: '#fafafa',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'center', color: '#3b82f6', marginBottom: '4px' }}>
                  <Droplet size={18} />
                </div>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#374151' }}>
                  Siram {plant.watering}
                </div>
                <div style={{ fontSize: '10px', color: '#6b7280' }}>Saat tanah kering</div>
              </div>

              {/* Box 3: Ukuran */}
              <div
                style={{
                  border: '1.5px solid #e5e7eb',
                  borderRadius: '10px',
                  padding: '10px 8px',
                  textAlign: 'center',
                  backgroundColor: '#fafafa',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'center', color: '#16a34a', marginBottom: '4px' }}>
                  <Ruler size={18} />
                </div>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#374151' }}>
                  Ukuran {plant.size.toLowerCase()}
                </div>
                <div style={{ fontSize: '10px', color: '#6b7280' }}>Pot 15-18cm</div>
              </div>

              {/* Box 4: Keamanan Hewan */}
              <div
                style={{
                  border: '1.5px solid #e5e7eb',
                  borderRadius: '10px',
                  padding: '10px 8px',
                  textAlign: 'center',
                  backgroundColor: '#fafafa',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'center', color: '#8b5cf6', marginBottom: '4px' }}>
                  <ShieldCheck size={18} />
                </div>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#374151' }}>
                  {plant.petSafe ? 'Aman hewan' : 'Kurang aman'}
                </div>
                <div style={{ fontSize: '10px', color: '#6b7280' }}>
                  {plant.petSafe ? 'Non-toxic' : 'Oksalat'}
                </div>
              </div>
            </div>
          </div>

          {/* Action Row: Quantity Selector & Green Button "Tambahkan ke keranjang" */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', paddingTop: '16px', borderTop: '1px solid #f3f4f6' }}>
            {/* Quantity Selector: [ - 1 + ] */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                border: '1.5px solid #d1d5db',
                borderRadius: '8px',
                padding: '4px',
                backgroundColor: '#ffffff',
              }}
            >
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                style={{
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: 'none',
                  background: 'none',
                  cursor: 'pointer',
                  color: '#4b5563',
                  borderRadius: '4px',
                }}
              >
                <Minus size={14} />
              </button>
              <span style={{ minWidth: '32px', textAlign: 'center', fontWeight: 700, fontSize: '14px', color: '#111827' }}>
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                style={{
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: 'none',
                  background: 'none',
                  cursor: 'pointer',
                  color: '#4b5563',
                  borderRadius: '4px',
                }}
              >
                <Plus size={14} />
              </button>
            </div>

            {/* Green Primary Button: Tambahkan ke keranjang */}
            <button
              onClick={handleAddToCart}
              style={{
                flex: 1,
                padding: '12px 24px',
                backgroundColor: addedSuccess ? '#15803d' : '#16a34a',
                border: 'none',
                borderRadius: '9999px',
                color: '#ffffff',
                fontSize: '14px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 3px 12px rgba(22, 163, 74, 0.3)',
                transition: 'background-color 0.2s',
              }}
            >
              {addedSuccess ? (
                <>
                  <Check size={18} />
                  <span>Berhasil Ditambahkan!</span>
                </>
              ) : (
                <>
                  <ShoppingBag size={18} />
                  <span>Tambahkan ke keranjang</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Section: Left Column (Deskripsi & Collapsible Detail) vs Right Column (Automated Digital Care Card) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '28px',
        }}
      >
        {/* Left Column: Deskripsi & Fitur 6 Collapsible Detail */}
        <div>
          {/* Deskripsi */}
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              border: '1.5px solid #e5e7eb',
              padding: '20px 24px',
              marginBottom: '16px',
            }}
          >
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#111827', margin: '0 0 10px 0' }}>
              Deskripsi
            </h3>
            <p style={{ fontSize: '13px', color: '#4b5563', lineHeight: '1.7', margin: 0 }}>
              {plant.description}
            </p>
          </div>

          {/* Fitur 6: Collapsible Detail (Informasi Tambahan) */}
          {showAnnotations && (
            <div style={{ fontSize: '11px', color: '#b45309', fontWeight: 600, marginBottom: '6px' }}>
              Fitur 6: Collapsible Detail
            </div>
          )}
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              border: '1.5px solid #e5e7eb',
              overflow: 'hidden',
              marginBottom: '16px',
            }}
          >
            <button
              onClick={() => setIsAdditionalInfoOpen(!isAdditionalInfoOpen)}
              style={{
                width: '100%',
                padding: '16px 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              <div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#111827' }}>
                  Informasi tambahan
                </div>
                <div style={{ fontSize: '11px', color: '#6b7280' }}>
                  Nama ilmiah, asal, detail teknis media tanam
                </div>
              </div>
              <div style={{ color: '#6b7280' }}>
                {isAdditionalInfoOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </div>
            </button>

            {isAdditionalInfoOpen && (
              <div style={{ padding: '0 20px 18px', borderTop: '1px solid #f3f4f6' }}>
                <table style={{ width: '100%', fontSize: '12px', color: '#4b5563', borderCollapse: 'collapse', marginTop: '12px' }}>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
                      <td style={{ padding: '8px 0', fontWeight: 600, width: '140px', color: '#374151' }}>Nama Ilmiah</td>
                      <td style={{ padding: '8px 0', fontStyle: 'italic' }}>{plant.scientificName}</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
                      <td style={{ padding: '8px 0', fontWeight: 600, color: '#374151' }}>Asal Tanaman</td>
                      <td style={{ padding: '8px 0' }}>{plant.origin}</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
                      <td style={{ padding: '8px 0', fontWeight: 600, color: '#374151' }}>Ukuran Pot Cocok</td>
                      <td style={{ padding: '8px 0' }}>{plant.additionalInfo.potSize}</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
                      <td style={{ padding: '8px 0', fontWeight: 600, color: '#374151' }}>Suhu Ideal</td>
                      <td style={{ padding: '8px 0' }}>{plant.additionalInfo.temperature}</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
                      <td style={{ padding: '8px 0', fontWeight: 600, color: '#374151' }}>Media Tanam</td>
                      <td style={{ padding: '8px 0' }}>{plant.additionalInfo.soilType}</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '8px 0', fontWeight: 600, color: '#374151' }}>Toksisitas</td>
                      <td style={{ padding: '8px 0' }}>{plant.additionalInfo.toxicityDetail}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Fitur 7 Automated Digital Care Card */}
        <div>
          {showAnnotations && (
            <div style={{ fontSize: '11px', color: '#b45309', fontWeight: 600, marginBottom: '6px' }}>
              Fitur 7: Automated Digital Care Card
            </div>
          )}
          <div
            style={{
              backgroundColor: '#f0fdf4',
              borderRadius: '14px',
              border: '1.5px solid #86efac',
              padding: '24px',
              boxShadow: '0 4px 12px rgba(22, 163, 74, 0.08)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  backgroundColor: '#16a34a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                }}
              >
                <FileText size={16} />
              </div>
              <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#166534', margin: 0 }}>
                Kartu panduan perawatan digital
              </h3>
            </div>

            <p style={{ fontSize: '13px', color: '#15803d', lineHeight: '1.6', margin: '0 0 16px 0' }}>
              Setelah pesanan dibuat, kamu menerima panduan sesuai kondisi rumahmu dari Plant Finder.
            </p>

            <div
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '10px',
                border: '1px solid #bbf7d0',
                padding: '14px',
                marginBottom: '16px',
                fontSize: '12px',
                color: '#374151',
              }}
            >
              <div style={{ fontWeight: 700, color: '#166534', marginBottom: '6px' }}>
                Preview Personalisasi:
              </div>
              <ul style={{ margin: 0, paddingLeft: '16px', lineHeight: '1.6' }}>
                <li>Jadwal siram otomatis terhubung ke kalender HP</li>
                <li>Panduan penempatan sesuai orientasi jendela kamarmu</li>
                <li>Tips pencegahan hama spesifik untuk {plant.name}</li>
              </ul>
            </div>

            <button
              onClick={() => onOpenCareCard(plant)}
              style={{
                width: '100%',
                padding: '10px 16px',
                backgroundColor: '#16a34a',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                boxShadow: '0 2px 6px rgba(22, 163, 74, 0.25)',
              }}
            >
              <FileText size={15} />
              <span>Buka Kartu Panduan Perawatan Digital</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
