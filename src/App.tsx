import React, { useState } from 'react';
import { PLANTS_DATA, Plant } from './data/plants';
import { Navbar } from './components/Navbar';
import { CatalogView } from './components/CatalogView';
import { PlantFinderView, FinderAnswers } from './components/PlantFinderView';
import { PlantDetailView } from './components/PlantDetailView';
import { CartDrawer, CartItem } from './components/CartDrawer';
import { CareCardModal } from './components/CareCardModal';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'layar1' | 'layar2' | 'layar3'>('layar1');
  const [plants, setPlants] = useState<Plant[]>(PLANTS_DATA);
  // Default selected plant is Calathea to match Layar 3 wireframe
  const [selectedPlant, setSelectedPlant] = useState<Plant>(PLANTS_DATA[0]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [showAnnotations, setShowAnnotations] = useState<boolean>(true);
  const [careCardPlant, setCareCardPlant] = useState<Plant | null>(null);

  // Cart Management
  const handleAddToCart = (plant: Plant, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.plant.id === plant.id);
      if (existing) {
        return prev.map((item) =>
          item.plant.id === plant.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { plant, quantity }];
    });
  };

  const handleUpdateQuantity = (plantId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.plant.id === plantId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveFromCart = (plantId: string) => {
    setCartItems((prev) => prev.filter((item) => item.plant.id !== plantId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Navigating to Plant Detail
  const handleSelectPlant = (plant: Plant) => {
    setSelectedPlant(plant);
    setCurrentScreen('layar3');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Complete Plant Finder
  const handleCompleteFinder = (answers: FinderAnswers) => {
    // Recalculate match scores based on user's answers
    const updated = plants.map((plant) => {
      let score = 70;

      // Light matching
      if (plant.light === answers.light) score += 15;
      else if (answers.light === 'Sedang' && (plant.light === 'Rendah' || plant.light === 'Sedang')) score += 10;

      // Pet safe matching
      if (answers.petSafe) {
        if (plant.petSafe) score += 15;
        else score -= 30; // heavy penalty if owner has pets but plant is toxic
      } else {
        score += 5;
      }

      // Care preference matching
      if (plant.careLevel === answers.carePreference) score += 10;
      else if (answers.carePreference === 'Mudah' && plant.careLevel === 'Mudah') score += 10;

      // Clamp score
      const finalScore = Math.min(99, Math.max(45, score));
      return {
        ...plant,
        matchScore: finalScore,
      };
    });

    setPlants(updated);
    // Find best match and set as selected
    const best = [...updated].sort((a, b) => b.matchScore - a.matchScore)[0];
    if (best) setSelectedPlant(best);

    setCurrentScreen('layar1');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', color: '#111827', fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      {/* Top Navbar */}
      <Navbar
        currentScreen={currentScreen}
        setCurrentScreen={setCurrentScreen}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        cartCount={totalCartCount}
        openCart={() => setIsCartOpen(true)}
        showAnnotations={showAnnotations}
        setShowAnnotations={setShowAnnotations}
      />

      {/* Main View rendering based on current screen */}
      <main>
        {currentScreen === 'layar1' && (
          <CatalogView
            plants={plants}
            onSelectPlant={handleSelectPlant}
            onOpenPlantFinder={() => setCurrentScreen('layar2')}
            onAddToCart={(plant) => handleAddToCart(plant, 1)}
            showAnnotations={showAnnotations}
            searchQuery={searchQuery}
          />
        )}

        {currentScreen === 'layar2' && (
          <PlantFinderView
            onComplete={handleCompleteFinder}
            onCloseOrBack={() => setCurrentScreen('layar1')}
            showAnnotations={showAnnotations}
            initialStep={2} // Starts on Step 2 as shown in the wireframe Layar 2!
          />
        )}

        {currentScreen === 'layar3' && (
          <PlantDetailView
            plant={selectedPlant}
            onBackToCatalog={() => setCurrentScreen('layar1')}
            onAddToCart={handleAddToCart}
            showAnnotations={showAnnotations}
            onOpenCareCard={(p) => setCareCardPlant(p)}
          />
        )}
      </main>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
      />

      {/* Care Card Modal for Fitur 7 */}
      {careCardPlant && (
        <CareCardModal
          plant={careCardPlant}
          onClose={() => setCareCardPlant(null)}
        />
      )}

      {/* Wireframe Reference Bottom Bar */}
      <footer style={{ borderTop: '1px solid #e5e7eb', backgroundColor: '#ffffff', padding: '24px 16px', marginTop: '60px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', fontSize: '12px', color: '#6b7280' }}>
          <div>
            <strong>LittleSeed Plants</strong> &bull; Dibuat sesuai blueprint wireframe (Layar 1: Katalog, Layar 2: Plant Finder, Layar 3: Detail Tanaman).
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <span style={{ color: '#16a34a', fontWeight: 600 }}>Fitur 1–7 Lengkap & Interaktif</span>
            <span>&bull;</span>
            <button
              onClick={() => setCurrentScreen('layar1')}
              style={{ background: 'none', border: 'none', color: '#4b5563', cursor: 'pointer', textDecoration: 'underline' }}
            >
              Katalog
            </button>
            <button
              onClick={() => setCurrentScreen('layar2')}
              style={{ background: 'none', border: 'none', color: '#4b5563', cursor: 'pointer', textDecoration: 'underline' }}
            >
              Plant Finder
            </button>
            <button
              onClick={() => setCurrentScreen('layar3')}
              style={{ background: 'none', border: 'none', color: '#4b5563', cursor: 'pointer', textDecoration: 'underline' }}
            >
              Detail Tanaman
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
