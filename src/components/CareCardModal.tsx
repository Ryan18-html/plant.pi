import React from 'react';
import { X, FileText, Droplet, Sun, Wind, AlertCircle, CheckCircle2, Download, Printer, QrCode } from 'lucide-react';
import { Plant } from '../data/plants';

interface CareCardModalProps {
  plant: Plant;
  onClose: () => void;
}

export const CareCardModal: React.FC<CareCardModalProps> = ({ plant, onClose }) => {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 80,
        padding: '16px',
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          maxWidth: '560px',
          width: '100%',
          overflow: 'hidden',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2)',
          border: '2px solid #86efac',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            backgroundColor: '#16a34a',
            color: '#ffffff',
            padding: '18px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FileText size={22} />
            <div>
              <div style={{ fontSize: '16px', fontWeight: 800 }}>Kartu Panduan Perawatan Digital</div>
              <div style={{ fontSize: '11px', opacity: 0.9 }}>Automated Care Card &bull; LittleSeed Plants</div>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'rgba(255,255,255,0.2)',
              border: 'none',
              color: '#fff',
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '24px', maxHeight: '75vh', overflowY: 'auto' }}>
          {/* Plant summary bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              padding: '12px 16px',
              backgroundColor: '#f0fdf4',
              borderRadius: '10px',
              border: '1px solid #bbf7d0',
              marginBottom: '20px',
            }}
          >
            <img
              src={plant.images[0]}
              alt={plant.name}
              style={{ width: '50px', height: '50px', borderRadius: '8px', objectFit: 'cover' }}
            />
            <div>
              <div style={{ fontSize: '15px', fontWeight: 800, color: '#14532d' }}>{plant.name}</div>
              <div style={{ fontSize: '12px', color: '#166534', fontStyle: 'italic' }}>{plant.scientificName}</div>
              <div style={{ fontSize: '11px', color: '#15803d', fontWeight: 600 }}>Tingkat Kecocokan: {plant.matchScore}%</div>
            </div>
          </div>

          {/* Guide items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '20px' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '6px', backgroundColor: '#fef3c7', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Sun size={16} />
              </div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#111827' }}>Rekomendasi Penempatan Cahaya</div>
                <div style={{ fontSize: '12px', color: '#4b5563', lineHeight: '1.5' }}>{plant.careCard.placement}</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '6px', backgroundColor: '#dbeafe', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Droplet size={16} />
              </div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#111827' }}>Jadwal Siram Terprogram</div>
                <div style={{ fontSize: '12px', color: '#4b5563', lineHeight: '1.5' }}>{plant.careCard.wateringSchedule}</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '6px', backgroundColor: '#e0e7ff', color: '#4f46e5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Wind size={16} />
              </div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#111827' }}>Kelembapan & Spray Daun</div>
                <div style={{ fontSize: '12px', color: '#4b5563', lineHeight: '1.5' }}>{plant.careCard.mistFrequency}</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '6px', backgroundColor: '#fee2e2', color: '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <AlertCircle size={16} />
              </div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#111827' }}>Pertolongan Pertama (Troubleshooting)</div>
                <div style={{ fontSize: '12px', color: '#4b5563', lineHeight: '1.5' }}>{plant.careCard.troubleshooting}</div>
              </div>
            </div>
          </div>

          <div
            style={{
              padding: '12px',
              backgroundColor: '#f9fafb',
              borderRadius: '8px',
              border: '1px solid #e5e7eb',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: '11px',
              color: '#4b5563',
            }}
          >
            <CheckCircle2 size={16} color="#16a34a" />
            <span>Digital card ini otomatis dikirim ke email atau WhatsApp Anda setiap kali pembelian diverifikasi.</span>
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: '14px 24px', backgroundColor: '#f9fafb', borderTop: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
          <button
            onClick={() => window.print()}
            style={{
              padding: '8px 16px',
              backgroundColor: '#ffffff',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: 600,
              color: '#374151',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Printer size={14} /> Cetak Kartu
          </button>
          <button
            onClick={onClose}
            style={{
              padding: '8px 20px',
              backgroundColor: '#16a34a',
              color: '#ffffff',
              border: 'none',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
