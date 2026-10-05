import React, { useState } from 'react';
import { Search, ChevronDown, Check, X, Sparkles, ShieldCheck, Sun, Droplet, ArrowRight, ShoppingBag } from 'lucide-react';
import { Plant } from '../data/plants';

interface FilterState {
  sizes: ('Kecil' | 'Sedang' | 'Besar')[];
  lights: ('Rendah' | 'Sedang' | 'Terang')[];
  petSafeOnly: boolean;
  careLevels: ('Mudah' | 'Sedang' | 'Tinggi')[];
}

interface CatalogViewProps {
  plants: Plant[];
  onSelectPlant: (plant: Plant) => void;
  onOpenPlantFinder: () => void;
  onAddToCart: (plant: Plant) => void;
  showAnnotations: boolean;
  searchQuery: string;
}

export const CatalogView: React.FC<CatalogViewProps> = ({
  plants,
  onSelectPlant,
  onOpenPlantFinder,
  onAddToCart,
  showAnnotations,
  searchQuery,
}) => {
  // Quick Filter tag: 'Semua' | 'Cocok untuk pemula' | 'Aman untuk hewan' | 'Tahan minim cahaya' | 'Mudah dirawat'
  const [activeQuickTag, setActiveQuickTag] = useState<string>('Semua');

  // Multi-select sidebar filters
  const [filters, setFilters] = useState<FilterState>({
    sizes: ['Sedang'], // default matching the wireframe tags "Sedang x"
    lights: ['Sedang'], // default matching wireframe "Cahaya sedang x"
    petSafeOnly: true, // default matching wireframe "Aman hewan x"
    careLevels: [],
  });

  // Sort option state
  type SortOption = 'Paling cocok' | 'Terpopuler' | 'Termudah dirawat' | 'Harga terendah' | 'Harga tertinggi';
  const [sortBy, setSortBy] = useState<SortOption>('Paling cocok');
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState<boolean>(false);

  // Quick reset
  const handleResetFilters = () => {
    setActiveQuickTag('Semua');
    setFilters({
      sizes: [],
      lights: [],
      petSafeOnly: false,
      careLevels: [],
    });
  };

  const toggleSize = (size: 'Kecil' | 'Sedang' | 'Besar') => {
    setFilters((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size],
    }));
  };

  const toggleLight = (light: 'Rendah' | 'Sedang' | 'Terang') => {
    setFilters((prev) => ({
      ...prev,
      lights: prev.lights.includes(light)
        ? prev.lights.filter((l) => l !== light)
        : [...prev.lights, light],
    }));
  };

  const toggleCareLevel = (care: 'Mudah' | 'Sedang' | 'Tinggi') => {
    setFilters((prev) => ({
      ...prev,
      careLevels: prev.careLevels.includes(care)
        ? prev.careLevels.filter((c) => c !== care)
        : [...prev.careLevels, care],
    }));
  };

  // Filter pipeline
  const filteredPlants = plants
    .filter((plant) => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = plant.name.toLowerCase().includes(q);
        const matchSci = plant.scientificName.toLowerCase().includes(q);
        const matchDesc = plant.description.toLowerCase().includes(q);
        if (!matchName && !matchSci && !matchDesc) return false;
      }

      // Quick Tag
      if (activeQuickTag !== 'Semua') {
        if (!plant.tags.includes(activeQuickTag)) {
          if (activeQuickTag === 'Aman untuk hewan' && !plant.petSafe) return false;
          if (activeQuickTag === 'Mudah dirawat' && plant.careLevel !== 'Mudah') return false;
          if (activeQuickTag === 'Tahan minim cahaya' && plant.light !== 'Rendah') return false;
          if (activeQuickTag === 'Cocok untuk pemula' && !plant.tags.includes('Cocok untuk pemula')) return false;
        }
      }

      // Size
      if (filters.sizes.length > 0 && !filters.sizes.includes(plant.size)) {
        return false;
      }

      // Light
      if (filters.lights.length > 0 && !filters.lights.includes(plant.light)) {
        return false;
      }

      // Pet safe
      if (filters.petSafeOnly && !plant.petSafe) {
        return false;
      }

      // Care level
      if (filters.careLevels.length > 0 && !filters.careLevels.includes(plant.careLevel)) {
        return false;
      }

      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'Paling cocok') return b.matchScore - a.matchScore;
      if (sortBy === 'Terpopuler') return b.popular - a.popular;
      if (sortBy === 'Termudah dirawat') {
        const order = { Mudah: 1, Sedang: 2, Tinggi: 3 };
        return order[a.careLevel] - order[b.careLevel];
      }
      if (sortBy === 'Harga terendah') return a.price - b.price;
      if (sortBy === 'Harga tertinggi') return b.price - a.price;
      return 0;
    });

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px 16px 60px' }}>
      {/* Wireframe Annotation */}
      {showAnnotations && (
        <div style={{ marginBottom: '12px', display: 'inline-block', backgroundColor: '#fef3c7', color: '#92400e', border: '1px dashed #d97706', padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 600 }}>
          Layar 1 — Katalog dengan Plant Finder, filter, dan sort
        </div>
      )}

      {/* Hero: Plant Finder Banner matching wireframe */}
      <div
        style={{
          backgroundColor: '#dcfce7',
          borderRadius: '16px',
          border: '1.5px solid #86efac',
          padding: '28px 32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '24px',
          marginBottom: '28px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ maxWidth: '580px' }}>
          <div style={{ fontSize: '12px', fontWeight: 700, color: '#15803d', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '6px' }}>
            Plant Finder
          </div>
          <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#14532d', margin: '0 0 16px 0', lineHeight: '1.3' }}>
            Jawab 4 pertanyaan, dapatkan tanaman yang pas untuk rumahmu
          </h1>
          <button
            onClick={onOpenPlantFinder}
            style={{
              padding: '10px 22px',
              backgroundColor: '#16a34a',
              color: '#ffffff',
              border: 'none',
              borderRadius: '9999px',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 3px 8px rgba(22, 163, 74, 0.35)',
              transition: 'background-color 0.15s, transform 0.1s',
            }}
          >
            <span>Mulai Plant Finder</span>
            <ArrowRight size={15} />
          </button>
        </div>

        {/* Right Illustration placeholder box matching wireframe 'Ilustrasi' */}
        <div
          style={{
            width: '180px',
            height: '110px',
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            border: '1.5px dashed #86efac',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#15803d',
            flexShrink: 0,
            padding: '12px',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: '28px', marginBottom: '2px' }}>🌿🪴</div>
          <div style={{ fontSize: '11px', fontWeight: 700, color: '#166534' }}>Ilustrasi Plant Finder</div>
        </div>
      </div>

      {/* Fitur 1 & 2: Quick Filter Tags matching wireframe */}
      <div style={{ marginBottom: '24px' }}>
        {showAnnotations && (
          <div style={{ fontSize: '11px', color: '#b45309', fontWeight: 600, marginBottom: '6px' }}>
            Fitur 1: pintu masuk navigasi personal &bull; Fitur 2: Quick Filter tags
          </div>
        )}
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
          {[
            'Semua',
            'Cocok untuk pemula',
            'Aman untuk hewan',
            'Tahan minim cahaya',
            'Mudah dirawat',
          ].map((tag) => {
            const isActive = activeQuickTag === tag;
            return (
              <button
                key={tag}
                onClick={() => {
                  setActiveQuickTag(tag);
                  if (tag === 'Aman untuk hewan') {
                    setFilters((prev) => ({ ...prev, petSafeOnly: true }));
                  }
                }}
                style={{
                  padding: '7px 16px',
                  borderRadius: '9999px',
                  fontSize: '12px',
                  fontWeight: isActive ? 700 : 500,
                  border: isActive ? '1.5px solid #16a34a' : '1px solid #d1d5db',
                  backgroundColor: isActive ? '#16a34a' : '#ffffff',
                  color: isActive ? '#ffffff' : '#374151',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.15s ease',
                }}
              >
                {tag}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Grid: Sidebar (Fitur 3) on Left + Catalog on Right */}
      <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: '28px', alignItems: 'start' }}>
        {/* Sidebar: Fitur 3 Multi Select Filter */}
        <aside
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            border: '1.5px solid #e5e7eb',
            padding: '20px',
          }}
        >
          {showAnnotations && (
            <div style={{ fontSize: '10px', color: '#b45309', fontWeight: 600, marginBottom: '8px' }}>
              Fitur 3: Multi Select Filter
            </div>
          )}

          {/* Filter Header & Reset */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px', paddingBottom: '12px', borderBottom: '1px solid #f3f4f6' }}>
            <span style={{ fontSize: '15px', fontWeight: 800, color: '#111827' }}>Filter</span>
            <button
              onClick={handleResetFilters}
              style={{
                background: 'none',
                border: 'none',
                color: '#16a34a',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                padding: '2px 4px',
              }}
            >
              Reset
            </button>
          </div>

          {/* Ukuran Checkboxes */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#374151', marginBottom: '10px' }}>
              Ukuran
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {(['Kecil', 'Sedang', 'Besar'] as const).map((sz) => (
                <label key={sz} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#4b5563', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={filters.sizes.includes(sz)}
                    onChange={() => toggleSize(sz)}
                    style={{ accentColor: '#16a34a', width: '15px', height: '15px', cursor: 'pointer' }}
                  />
                  <span>{sz}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Kebutuhan Cahaya Checkboxes */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#374151', marginBottom: '10px' }}>
              Kebutuhan cahaya
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {(['Rendah', 'Sedang', 'Terang'] as const).map((lt) => (
                <label key={lt} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#4b5563', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={filters.lights.includes(lt)}
                    onChange={() => toggleLight(lt)}
                    style={{ accentColor: '#16a34a', width: '15px', height: '15px', cursor: 'pointer' }}
                  />
                  <span>{lt}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Keamanan Hewan Checkbox */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#374151', marginBottom: '10px' }}>
              Keamanan hewan
            </div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#4b5563', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={filters.petSafeOnly}
                onChange={(e) => setFilters({ ...filters, petSafeOnly: e.target.checked })}
                style={{ accentColor: '#16a34a', width: '15px', height: '15px', cursor: 'pointer' }}
              />
              <span>Aman untuk kucing dan anjing</span>
            </label>
          </div>

          {/* Tingkat Perawatan Checkboxes */}
          <div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#374151', marginBottom: '10px' }}>
              Tingkat perawatan
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {(['Mudah', 'Sedang', 'Tinggi'] as const).map((cr) => (
                <label key={cr} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#4b5563', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={filters.careLevels.includes(cr)}
                    onChange={() => toggleCareLevel(cr)}
                    style={{ accentColor: '#16a34a', width: '15px', height: '15px', cursor: 'pointer' }}
                  />
                  <span>{cr}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Right Content Area: Active Chips + Sort Options + Products Grid */}
        <div>
          {/* Header Row: Count & Active Chips & Sort Dropdown */}
          <div style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#111827' }}>
                  {filteredPlants.length} tanaman ditemukan
                </div>
              </div>

              {/* Sort Dropdown matching wireframe: 'Urutkan: Paling cocok ▼' */}
              <div style={{ position: 'relative' }}>
                <button
                  onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
                  style={{
                    padding: '8px 14px',
                    borderRadius: '8px',
                    border: '1.5px solid #d1d5db',
                    backgroundColor: '#ffffff',
                    fontSize: '12px',
                    fontWeight: 600,
                    color: '#374151',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <span>Urutkan: <strong style={{ color: '#16a34a' }}>{sortBy}</strong></span>
                  <ChevronDown size={14} />
                </button>

                {/* Dropdown Menu matching wireframe options */}
                {isSortDropdownOpen && (
                  <div
                    style={{
                      position: 'absolute',
                      right: 0,
                      top: '100%',
                      marginTop: '6px',
                      width: '180px',
                      backgroundColor: '#ffffff',
                      borderRadius: '8px',
                      border: '1px solid #e5e7eb',
                      boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                      zIndex: 30,
                      padding: '4px',
                    }}
                  >
                    {[
                      'Paling cocok',
                      'Terpopuler',
                      'Termudah dirawat',
                      'Harga terendah',
                      'Harga tertinggi',
                    ].map((opt) => (
                      <button
                        key={opt}
                        onClick={() => {
                          setSortBy(opt as SortOption);
                          setIsSortDropdownOpen(false);
                        }}
                        style={{
                          width: '100%',
                          textAlign: 'left',
                          padding: '8px 10px',
                          border: 'none',
                          borderRadius: '6px',
                          backgroundColor: sortBy === opt ? '#f0fdf4' : 'transparent',
                          color: sortBy === opt ? '#16a34a' : '#374151',
                          fontSize: '12px',
                          fontWeight: sortBy === opt ? 700 : 500,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}
                      >
                        <span>{opt}</span>
                        {sortBy === opt && <Check size={14} color="#16a34a" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Active filter chips matching wireframe: 'Sedang x', 'Cahaya sedang x', 'Aman hewan x' */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '10px' }}>
              {filters.sizes.map((sz) => (
                <span
                  key={sz}
                  onClick={() => toggleSize(sz)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    backgroundColor: '#f3f4f6',
                    padding: '3px 8px',
                    borderRadius: '4px',
                    fontSize: '11px',
                    fontWeight: 600,
                    color: '#374151',
                    cursor: 'pointer',
                    border: '1px solid #e5e7eb',
                  }}
                  title="Klik untuk menghapus filter"
                >
                  {sz} <X size={11} />
                </span>
              ))}

              {filters.lights.map((lt) => (
                <span
                  key={lt}
                  onClick={() => toggleLight(lt)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    backgroundColor: '#f3f4f6',
                    padding: '3px 8px',
                    borderRadius: '4px',
                    fontSize: '11px',
                    fontWeight: 600,
                    color: '#374151',
                    cursor: 'pointer',
                    border: '1px solid #e5e7eb',
                  }}
                  title="Klik untuk menghapus filter"
                >
                  Cahaya {lt.toLowerCase()} <X size={11} />
                </span>
              ))}

              {filters.petSafeOnly && (
                <span
                  onClick={() => setFilters({ ...filters, petSafeOnly: false })}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    backgroundColor: '#dcfce7',
                    padding: '3px 8px',
                    borderRadius: '4px',
                    fontSize: '11px',
                    fontWeight: 600,
                    color: '#15803d',
                    cursor: 'pointer',
                    border: '1px solid #bbf7d0',
                  }}
                  title="Klik untuk menghapus filter"
                >
                  Aman hewan <X size={11} />
                </span>
              )}

              {filters.careLevels.map((cr) => (
                <span
                  key={cr}
                  onClick={() => toggleCareLevel(cr)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    backgroundColor: '#f3f4f6',
                    padding: '3px 8px',
                    borderRadius: '4px',
                    fontSize: '11px',
                    fontWeight: 600,
                    color: '#374151',
                    cursor: 'pointer',
                    border: '1px solid #e5e7eb',
                  }}
                  title="Klik untuk menghapus filter"
                >
                  Rawat {cr.toLowerCase()} <X size={11} />
                </span>
              ))}
            </div>
          </div>

          {/* Plant Card Grid matching wireframe cards */}
          {filteredPlants.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '48px 24px', backgroundColor: '#f9fafb', borderRadius: '12px', border: '1px dashed #d1d5db' }}>
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>🌱</div>
              <div style={{ fontSize: '15px', fontWeight: 700, color: '#374151', marginBottom: '4px' }}>Tidak ada tanaman yang sesuai filter</div>
              <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '16px' }}>Coba kurangi beberapa filter untuk melihat lebih banyak tanaman.</div>
              <button
                onClick={handleResetFilters}
                style={{ padding: '8px 16px', backgroundColor: '#16a34a', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}
              >
                Reset Semua Filter
              </button>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
              {filteredPlants.map((plant) => (
                <div
                  key={plant.id}
                  onClick={() => onSelectPlant(plant)}
                  style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '12px',
                    border: '1.5px solid #e5e7eb',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.boxShadow = '0 8px 16px -4px rgba(0, 0, 0, 0.08)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {/* Photo area */}
                  <div
                    style={{
                      height: '160px',
                      backgroundColor: '#f3f4f6',
                      overflow: 'hidden',
                      position: 'relative',
                    }}
                  >
                    <img
                      src={plant.images[0]}
                      alt={plant.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?auto=format&fit=crop&w=800&q=80';
                      }}
                    />
                    {/* Wireframe photo label indicator if annotation on */}
                    {showAnnotations && (
                      <span style={{ position: 'absolute', top: '8px', left: '8px', backgroundColor: 'rgba(255,255,255,0.85)', padding: '2px 6px', borderRadius: '4px', fontSize: '9px', fontWeight: 600, color: '#374151' }}>
                        Foto
                      </span>
                    )}

                    {/* Safe for pet icon */}
                    {plant.petSafe && (
                      <span
                        title="Aman untuk kucing & anjing"
                        style={{
                          position: 'absolute',
                          top: '8px',
                          right: '8px',
                          backgroundColor: '#ffffff',
                          padding: '4px',
                          borderRadius: '50%',
                          display: 'flex',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                          color: '#16a34a',
                        }}
                      >
                        <ShieldCheck size={14} />
                      </span>
                    )}
                  </div>

                  {/* Card Body */}
                  <div style={{ padding: '12px' }}>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: '#111827', marginBottom: '2px', lineHeight: '1.2' }}>
                      {plant.name}
                    </div>
                    <div style={{ fontSize: '11px', color: '#6b7280', fontStyle: 'italic', marginBottom: '6px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {plant.scientificName}
                    </div>

                    <div style={{ fontSize: '13px', fontWeight: 800, color: '#16a34a', marginBottom: '8px' }}>
                      {plant.formattedPrice}
                    </div>

                    {/* Match Badge matching wireframe: 'Cocok 95%', 'Cocok 90%', 'Cocok 88%' */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '3px',
                          backgroundColor: '#dcfce7',
                          color: '#15803d',
                          fontSize: '11px',
                          fontWeight: 700,
                          padding: '2px 8px',
                          borderRadius: '9999px',
                        }}
                      >
                        <Sparkles size={11} />
                        Cocok {plant.matchScore}%
                      </span>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onAddToCart(plant);
                        }}
                        style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: '50%',
                          backgroundColor: '#f3f4f6',
                          border: 'none',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          color: '#16a34a',
                          transition: 'background-color 0.15s',
                        }}
                        title="Tambah Cepat ke Keranjang"
                      >
                        <ShoppingBag size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
