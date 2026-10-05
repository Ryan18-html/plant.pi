import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, CheckCircle2, Sparkles, FileText } from 'lucide-react';
import { Plant } from '../data/plants';

export interface CartItem {
  plant: Plant;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (plantId: string, delta: number) => void;
  onRemoveItem: (plantId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [checkoutComplete, setCheckoutComplete] = useState<boolean>(false);

  if (!isOpen) return null;

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.plant.price * item.quantity,
    0
  );

  const formatPrice = (val: number) => {
    return 'Rp ' + val.toLocaleString('id-ID');
  };

  const handleCheckout = () => {
    setCheckoutComplete(true);
    setTimeout(() => {
      onClearCart();
      setCheckoutComplete(false);
      onClose();
    }, 2800);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 90,
        display: 'flex',
        justifyContent: 'flex-end',
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '420px',
          height: '100%',
          backgroundColor: '#ffffff',
          boxShadow: '-4px 0 20px rgba(0,0,0,0.15)',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: '16px 20px',
            borderBottom: '1px solid #e5e7eb',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShoppingBag size={20} color="#16a34a" />
            <h3 style={{ fontSize: '16px', fontWeight: 800, margin: 0, color: '#111827' }}>
              Keranjang Tanaman ({cartItems.reduce((acc, i) => acc + i.quantity, 0)})
            </h3>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', color: '#6b7280', cursor: 'pointer', padding: '4px' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
          {checkoutComplete ? (
            <div style={{ textAlign: 'center', padding: '40px 16px' }}>
              <div
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  backgroundColor: '#dcfce7',
                  color: '#16a34a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                }}
              >
                <CheckCircle2 size={36} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#14532d', marginBottom: '8px' }}>
                Pesanan Berhasil Dibuat!
              </h3>
              <p style={{ fontSize: '13px', color: '#4b5563', lineHeight: '1.6', marginBottom: '16px' }}>
                Kartu Panduan Perawatan Digital sesuai hasil Plant Finder telah dikirim ke nomor kontak Anda.
              </p>
              <div
                style={{
                  padding: '12px',
                  backgroundColor: '#f0fdf4',
                  borderRadius: '8px',
                  border: '1px solid #86efac',
                  fontSize: '12px',
                  color: '#15803d',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  justifyContent: 'center',
                }}
              >
                <FileText size={16} />
                <span>Automated Digital Care Card aktif!</span>
              </div>
            </div>
          ) : cartItems.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 16px', color: '#6b7280' }}>
              <div style={{ fontSize: '36px', marginBottom: '12px' }}>🪴</div>
              <div style={{ fontSize: '15px', fontWeight: 700, color: '#374151', marginBottom: '4px' }}>Keranjang masih kosong</div>
              <div style={{ fontSize: '12px', marginBottom: '16px' }}>Pilih tanaman yang sesuai dari katalog atau gunakan Plant Finder!</div>
              <button
                onClick={onClose}
                style={{
                  padding: '8px 18px',
                  backgroundColor: '#16a34a',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '9999px',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Jelajahi Tanaman
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {cartItems.map((item) => (
                <div
                  key={item.plant.id}
                  style={{
                    display: 'flex',
                    gap: '12px',
                    padding: '12px',
                    backgroundColor: '#fafafa',
                    borderRadius: '10px',
                    border: '1px solid #e5e7eb',
                  }}
                >
                  <img
                    src={item.plant.images[0]}
                    alt={item.plant.name}
                    style={{ width: '60px', height: '60px', borderRadius: '8px', objectFit: 'cover' }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#111827', marginBottom: '2px' }}>
                      {item.plant.name}
                    </div>
                    <div style={{ fontSize: '12px', fontWeight: 800, color: '#16a34a', marginBottom: '6px' }}>
                      {item.plant.formattedPrice}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          border: '1px solid #d1d5db',
                          borderRadius: '6px',
                          backgroundColor: '#fff',
                        }}
                      >
                        <button
                          onClick={() => onUpdateQuantity(item.plant.id, -1)}
                          style={{
                            width: '24px',
                            height: '24px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: 'none',
                            background: 'none',
                            cursor: 'pointer',
                            color: '#4b5563',
                          }}
                        >
                          <Minus size={12} />
                        </button>
                        <span style={{ fontSize: '12px', fontWeight: 700, minWidth: '24px', textAlign: 'center' }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.plant.id, 1)}
                          style={{
                            width: '24px',
                            height: '24px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: 'none',
                            background: 'none',
                            cursor: 'pointer',
                            color: '#4b5563',
                          }}
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.plant.id)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#9ca3af',
                          cursor: 'pointer',
                          padding: '4px',
                        }}
                        title="Hapus dari keranjang"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Bonus banner */}
              <div
                style={{
                  marginTop: '10px',
                  padding: '12px',
                  backgroundColor: '#f0fdf4',
                  borderRadius: '8px',
                  border: '1px dashed #86efac',
                  fontSize: '11px',
                  color: '#15803d',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <Sparkles size={16} />
                <span>
                  <strong>Gratis:</strong> Panduan digital disesuaikan khusus untuk tiap tanaman dalam pesananmu!
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && !checkoutComplete && (
          <div style={{ padding: '16px 20px', borderTop: '1px solid #e5e7eb', backgroundColor: '#ffffff' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px', fontSize: '14px' }}>
              <span style={{ color: '#4b5563', fontWeight: 500 }}>Total Pembayaran:</span>
              <span style={{ color: '#16a34a', fontWeight: 800, fontSize: '16px' }}>{formatPrice(totalAmount)}</span>
            </div>

            <button
              onClick={handleCheckout}
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: '#16a34a',
                color: '#ffffff',
                border: 'none',
                borderRadius: '9999px',
                fontSize: '14px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 3px 10px rgba(22, 163, 74, 0.3)',
              }}
            >
              <span>Lanjut ke Pembayaran</span>
              <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
