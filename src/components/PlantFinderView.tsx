import React, { useState } from 'react';
import { Leaf, Sun, CloudSun, Cloud, Check, ArrowLeft, ArrowRight, ShieldCheck, Sparkles, Home, Clock } from 'lucide-react';
import { Plant } from '../data/plants';

export interface FinderAnswers {
  placement: string;
  light: 'Rendah' | 'Sedang' | 'Terang';
  petSafe: boolean;
  carePreference: 'Mudah' | 'Sedang' | 'Tinggi';
}

interface PlantFinderViewProps {
  onComplete: (answers: FinderAnswers) => void;
  onCloseOrBack: () => void;
  showAnnotations: boolean;
  initialStep?: number;
}

export const PlantFinderView: React.FC<PlantFinderViewProps> = ({
  onComplete,
  onCloseOrBack,
  showAnnotations,
  initialStep = 2,
}) => {
  // We can default to Step 2 as shown in the wireframe "Layar 2 - Plant Finder (langkah 2 dari 4)"
  const [currentStep, setCurrentStep] = useState<number>(initialStep);

  const [answers, setAnswers] = useState<FinderAnswers>({
    placement: 'Meja',
    light: 'Sedang', // As selected in wireframe
    petSafe: true,
    carePreference: 'Mudah',
  });

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(answers);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      onCloseOrBack();
    }
  };

  return (
    <div style={{ maxWidth: '680px', margin: '30px auto', padding: '0 16px' }}>
      {showAnnotations && (
        <div style={{ marginBottom: '12px', display: 'inline-block', backgroundColor: '#fef3c7', color: '#92400e', border: '1px dashed #d97706', padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 600 }}>
          Layar 2 — Plant Finder (langkah {currentStep} dari 4)
        </div>
      )}

      {/* Main Card matching Wireframe Layar 2 */}
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          border: '1.5px solid #e5e7eb',
          boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
          padding: '32px 36px',
        }}
      >
        {/* Header: Plant Finder with Leaf icon */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '24px' }}>
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: '#16a34a',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
            }}
          >
            <Leaf size={18} strokeWidth={2.5} />
          </div>
          <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#111827', margin: 0, letterSpacing: '-0.3px' }}>
            Plant Finder
          </h2>
        </div>

        {/* 4-Step Progress Bar matching wireframe */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
          {[1, 2, 3, 4].map((step) => {
            const isCompleted = step < currentStep;
            const isCurrent = step === currentStep;
            return (
              <div
                key={step}
                onClick={() => setCurrentStep(step)}
                style={{
                  flex: 1,
                  height: '6px',
                  borderRadius: '9999px',
                  backgroundColor: isCompleted || isCurrent ? '#16a34a' : '#e5e7eb',
                  transition: 'background-color 0.25s ease',
                  cursor: 'pointer',
                }}
                title={`Lompat ke langkah ${step}`}
              />
            );
          })}
        </div>

        {/* Step Counter Label */}
        <div style={{ fontSize: '12px', fontWeight: 700, color: '#16a34a', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: '6px' }}>
          Langkah {currentStep} dari 4
        </div>

        {/* STEP 1: Ruangan & Penempatan */}
        {currentStep === 1 && (
          <div>
            <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#111827', margin: '0 0 20px 0', lineHeight: '1.3' }}>
              Di mana rencana kamu meletakkan tanaman barumu?
            </h1>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '28px' }}>
              {[
                {
                  id: 'Meja',
                  title: 'Meja kerja atau rak dinding',
                  desc: 'Cocok untuk tanaman berukuran kecil dan kompak.',
                  icon: <Home size={18} />,
                },
                {
                  id: 'Lantai',
                  title: 'Sudut lantai ruang tamu atau kamar',
                  desc: 'Cocok untuk tanaman berukuran sedang hingga besar.',
                  icon: <Sparkles size={18} />,
                },
                {
                  id: 'Gantung',
                  title: 'Pot gantung atau ambalan tinggi',
                  desc: 'Cocok untuk tanaman dengan daun menjuntai anggun.',
                  icon: <Leaf size={18} />,
                },
              ].map((item) => {
                const isSelected = answers.placement === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => setAnswers({ ...answers, placement: item.id })}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '14px',
                      padding: '14px 18px',
                      borderRadius: '12px',
                      border: isSelected ? '2px solid #16a34a' : '1.5px solid #e5e7eb',
                      backgroundColor: isSelected ? '#f0fdf4' : '#ffffff',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <div style={{ color: isSelected ? '#16a34a' : '#6b7280' }}>{item.icon}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '14px', fontWeight: isSelected ? 700 : 600, color: isSelected ? '#15803d' : '#1f2937' }}>
                        {item.title}
                      </div>
                      <div style={{ fontSize: '12px', color: '#6b7280' }}>{item.desc}</div>
                    </div>
                    {isSelected && (
                      <div style={{ width: '22px', height: '22px', borderRadius: '50%', backgroundColor: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                        <Check size={14} strokeWidth={3} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 2: Pencahayaan (MATCHING WIREFRAME EXACTLY) */}
        {currentStep === 2 && (
          <div>
            <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#111827', margin: '0 0 20px 0', lineHeight: '1.3' }}>
              Seberapa terang ruangan tempat tanamanmu?
            </h1>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '28px' }}>
              {/* Option 1: Redup */}
              <div
                onClick={() => setAnswers({ ...answers, light: 'Rendah' })}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  padding: '14px 18px',
                  borderRadius: '12px',
                  border: answers.light === 'Rendah' ? '2px solid #16a34a' : '1.5px solid #e5e7eb',
                  backgroundColor: answers.light === 'Rendah' ? '#f0fdf4' : '#ffffff',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                <div style={{ color: answers.light === 'Rendah' ? '#16a34a' : '#6b7280' }}>
                  <Cloud size={20} />
                </div>
                <div style={{ flex: 1, fontSize: '14px', fontWeight: answers.light === 'Rendah' ? 700 : 500, color: answers.light === 'Rendah' ? '#15803d' : '#374151' }}>
                  Redup, jarang kena sinar matahari
                </div>
                {answers.light === 'Rendah' && (
                  <div style={{ width: '22px', height: '22px', borderRadius: '50%', backgroundColor: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                    <Check size={14} strokeWidth={3} />
                  </div>
                )}
              </div>

              {/* Option 2: Sedang (Selected in Wireframe) */}
              <div
                onClick={() => setAnswers({ ...answers, light: 'Sedang' })}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  padding: '14px 18px',
                  borderRadius: '12px',
                  border: answers.light === 'Sedang' ? '2px solid #16a34a' : '1.5px solid #e5e7eb',
                  backgroundColor: answers.light === 'Sedang' ? '#f0fdf4' : '#ffffff',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                <div style={{ color: answers.light === 'Sedang' ? '#16a34a' : '#6b7280' }}>
                  <CloudSun size={20} />
                </div>
                <div style={{ flex: 1, fontSize: '14px', fontWeight: answers.light === 'Sedang' ? 700 : 500, color: answers.light === 'Sedang' ? '#15803d' : '#374151' }}>
                  Sedang, terang tapi tidak langsung
                </div>
                {answers.light === 'Sedang' && (
                  <div style={{ width: '22px', height: '22px', borderRadius: '50%', backgroundColor: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                    <Check size={14} strokeWidth={3} />
                  </div>
                )}
              </div>

              {/* Option 3: Terang */}
              <div
                onClick={() => setAnswers({ ...answers, light: 'Terang' })}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  padding: '14px 18px',
                  borderRadius: '12px',
                  border: answers.light === 'Terang' ? '2px solid #16a34a' : '1.5px solid #e5e7eb',
                  backgroundColor: answers.light === 'Terang' ? '#f0fdf4' : '#ffffff',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                <div style={{ color: answers.light === 'Terang' ? '#16a34a' : '#6b7280' }}>
                  <Sun size={20} />
                </div>
                <div style={{ flex: 1, fontSize: '14px', fontWeight: answers.light === 'Terang' ? 700 : 500, color: answers.light === 'Terang' ? '#15803d' : '#374151' }}>
                  Terang, banyak sinar matahari
                </div>
                {answers.light === 'Terang' && (
                  <div style={{ width: '22px', height: '22px', borderRadius: '50%', backgroundColor: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                    <Check size={14} strokeWidth={3} />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Hewan Peliharaan */}
        {currentStep === 3 && (
          <div>
            <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#111827', margin: '0 0 20px 0', lineHeight: '1.3' }}>
              Apakah kamu memiliki hewan peliharaan (kucing/anjing)?
            </h1>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '28px' }}>
              <div
                onClick={() => setAnswers({ ...answers, petSafe: true })}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  padding: '14px 18px',
                  borderRadius: '12px',
                  border: answers.petSafe ? '2px solid #16a34a' : '1.5px solid #e5e7eb',
                  backgroundColor: answers.petSafe ? '#f0fdf4' : '#ffffff',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                <div style={{ color: answers.petSafe ? '#16a34a' : '#6b7280' }}>
                  <ShieldCheck size={20} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '14px', fontWeight: answers.petSafe ? 700 : 600, color: answers.petSafe ? '#15803d' : '#1f2937' }}>
                    Ya, ada anjing / kucing kesayangan
                  </div>
                  <div style={{ fontSize: '12px', color: '#6b7280' }}>Wajib tanaman 100% aman dan non-toxic bila tergigit.</div>
                </div>
                {answers.petSafe && (
                  <div style={{ width: '22px', height: '22px', borderRadius: '50%', backgroundColor: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                    <Check size={14} strokeWidth={3} />
                  </div>
                )}
              </div>

              <div
                onClick={() => setAnswers({ ...answers, petSafe: false })}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  padding: '14px 18px',
                  borderRadius: '12px',
                  border: !answers.petSafe ? '2px solid #16a34a' : '1.5px solid #e5e7eb',
                  backgroundColor: !answers.petSafe ? '#f0fdf4' : '#ffffff',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                <div style={{ color: !answers.petSafe ? '#16a34a' : '#6b7280' }}>
                  <Leaf size={20} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '14px', fontWeight: !answers.petSafe ? 700 : 600, color: !answers.petSafe ? '#15803d' : '#1f2937' }}>
                    Tidak ada hewan peliharaan
                  </div>
                  <div style={{ fontSize: '12px', color: '#6b7280' }}>Bebas memilih tanaman eksotis jenis apa saja.</div>
                </div>
                {!answers.petSafe && (
                  <div style={{ width: '22px', height: '22px', borderRadius: '50%', backgroundColor: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                    <Check size={14} strokeWidth={3} />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Pengalaman Merawat */}
        {currentStep === 4 && (
          <div>
            <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#111827', margin: '0 0 20px 0', lineHeight: '1.3' }}>
              Bagaimana pengalaman & rutinitas merawatmu?
            </h1>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '28px' }}>
              {[
                {
                  id: 'Mudah' as const,
                  title: 'Pemula sibuk — ingin yang mandiri',
                  desc: 'Jarang disiram pun tetap hidup, tahan banting.',
                  icon: <Clock size={18} />,
                },
                {
                  id: 'Sedang' as const,
                  title: 'Cukup santai — sanggup siram 1-2x seminggu',
                  desc: 'Perawatan wajar dengan kelembapan seimbang.',
                  icon: <Leaf size={18} />,
                },
                {
                  id: 'Tinggi' as const,
                  title: 'Hobi berkebun — suka tantangan',
                  desc: 'Siap mengatur cahaya, pupuk rutin, dan kelembapan tinggi.',
                  icon: <Sparkles size={18} />,
                },
              ].map((item) => {
                const isSelected = answers.carePreference === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => setAnswers({ ...answers, carePreference: item.id })}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '14px',
                      padding: '14px 18px',
                      borderRadius: '12px',
                      border: isSelected ? '2px solid #16a34a' : '1.5px solid #e5e7eb',
                      backgroundColor: isSelected ? '#f0fdf4' : '#ffffff',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <div style={{ color: isSelected ? '#16a34a' : '#6b7280' }}>{item.icon}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '14px', fontWeight: isSelected ? 700 : 600, color: isSelected ? '#15803d' : '#1f2937' }}>
                        {item.title}
                      </div>
                      <div style={{ fontSize: '12px', color: '#6b7280' }}>{item.desc}</div>
                    </div>
                    {isSelected && (
                      <div style={{ width: '22px', height: '22px', borderRadius: '50%', backgroundColor: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                        <Check size={14} strokeWidth={3} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Bottom Navigation Buttons matching wireframe */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '16px', borderTop: '1px solid #f3f4f6' }}>
          <button
            onClick={handlePrev}
            style={{
              padding: '10px 20px',
              backgroundColor: '#ffffff',
              border: '1.5px solid #d1d5db',
              borderRadius: '9999px',
              fontSize: '14px',
              fontWeight: 600,
              color: '#374151',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'background-color 0.15s',
            }}
          >
            <ArrowLeft size={16} />
            {currentStep === 1 ? 'Tutup' : 'Kembali'}
          </button>

          <button
            onClick={handleNext}
            style={{
              padding: '10px 28px',
              backgroundColor: '#16a34a',
              border: 'none',
              borderRadius: '9999px',
              fontSize: '14px',
              fontWeight: 700,
              color: '#ffffff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 3px 10px rgba(22, 163, 74, 0.3)',
              transition: 'background-color 0.15s, transform 0.1s',
            }}
          >
            <span>{currentStep === 4 ? 'Lihat Hasil Tanaman Pilihan' : 'Lanjut'}</span>
            <ArrowRight size={16} />
          </button>
        </div>

        {/* Wireframe Footnote matching exactly: 'Pertanyaan berikutnya: ukuran ruang, hewan peliharaan, pengalaman merawat' */}
        <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '11px', color: '#16a34a', fontWeight: 600 }}>
          {currentStep === 2
            ? 'Pertanyaan berikutnya: ukuran ruang, hewan peliharaan, pengalaman merawat'
            : currentStep === 1
            ? 'Pertanyaan berikutnya: intensitas cahaya ruanganmu'
            : currentStep === 3
            ? 'Pertanyaan berikutnya: pengalaman merawat tanaman'
            : 'Hasil personalisasi instan akan disesuaikan dengan kondisi rumahmu'}
        </div>
      </div>
    </div>
  );
};
