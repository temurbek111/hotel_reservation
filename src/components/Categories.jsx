import React from 'react';
import { Tent, Castle, Trees, Waves, Flame, Crown } from 'lucide-react';

const CATEGORIES = [
  { id: 'all', label: 'All stays', icon: null },
  { id: 'cabins', label: 'Cabins', icon: Tent },
  { id: 'mansions', label: 'Mansions', icon: Castle },
  { id: 'treehouses', label: 'Treehouses', icon: Trees },
  { id: 'beachfront', label: 'Beachfront', icon: Waves },
  { id: 'trending', label: 'Trending', icon: Flame },
  { id: 'luxe', label: 'Luxe', icon: Crown },
];

export default function Categories({ selectedCategory, onSelectCategory }) {
  return (
    <div 
      className="glass no-scrollbar"
      style={{
        position: 'fixed',
        top: 'var(--header-height)',
        left: 0,
        right: 0,
        height: '80px',
        borderBottom: '1px solid var(--color-border-light)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 80px',
        gap: '32px',
        overflowX: 'auto',
        zIndex: 99,
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.02)'
      }}
    >
      {CATEGORIES.map((cat) => {
        const IconComponent = cat.icon;
        const isActive = selectedCategory === cat.id;
        
        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px',
              padding: '4px 0 12px 0',
              borderBottom: isActive ? '2px solid var(--color-text-dark)' : '2px solid transparent',
              color: isActive ? 'var(--color-text-dark)' : 'var(--color-text-medium)',
              fontWeight: isActive ? '700' : '500',
              fontSize: '12px',
              transition: 'var(--transition-fast)',
              opacity: isActive ? 1 : 0.75,
              whiteSpace: 'nowrap'
            }}
            className="btn-hover-bounce"
          >
            {IconComponent ? (
              <IconComponent size={24} strokeWidth={isActive ? 2.2 : 1.8} />
            ) : (
              <div style={{ height: '24px', display: 'flex', alignItems: 'center', fontWeight: 'bold' }}>📍</div>
            )}
            <span>{cat.label}</span>
          </button>
        );
      })}
    </div>
  );
}
