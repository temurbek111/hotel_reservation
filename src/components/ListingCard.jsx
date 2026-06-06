import React, { useState } from 'react';
import { Star, Heart, ChevronLeft, ChevronRight } from 'lucide-react';

export default function ListingCard({ listing, onSelect, isFavorite, onToggleFavorite }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = (e) => {
    e.stopPropagation();
    if (listing.images && listing.images.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % listing.images.length);
    }
  };

  const prevImage = (e) => {
    e.stopPropagation();
    if (listing.images && listing.images.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + listing.images.length) % listing.images.length);
    }
  };

  return (
    <div 
      onClick={() => onSelect(listing)}
      className="card-hover-effect"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        cursor: 'pointer',
        width: '100%'
      }}
    >
      {/* Listing Image Carousel / Card Media */}
      <div style={{
        position: 'relative',
        aspectRatio: '20/19',
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        boxShadow: '0 4px 10px rgba(0,0,0,0.04)',
        backgroundColor: '#eaeaea'
      }}>
        {listing.images && listing.images.length > 0 ? (
          <img 
            src={listing.images[currentImageIndex]} 
            alt={listing.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.6s cubic-bezier(0.2, 0, 0, 1)'
            }}
          />
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-medium)' }}>No Image</div>
        )}

        {/* Favorite Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(listing.id);
          }}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            zIndex: 5,
            transition: 'transform 0.15s ease'
          }}
          className="btn-hover-bounce"
        >
          <Heart 
            size={24} 
            fill={isFavorite ? 'var(--color-primary)' : 'rgba(0, 0, 0, 0.45)'} 
            stroke={isFavorite ? 'var(--color-primary)' : 'var(--color-white)'}
            strokeWidth={2}
          />
        </button>

        {/* Superhost Badge */}
        {listing.host?.isSuperhost && (
          <span 
            className="superhost-badge"
            style={{
              position: 'absolute',
              top: '16px',
              left: '16px',
              zIndex: 5,
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            Superhost
          </span>
        )}

        {/* Carousel Arrow Buttons */}
        {listing.images && listing.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255,255,255,0.9)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
                transition: 'var(--transition-fast)'
              }}
            >
              <ChevronLeft size={16} color="var(--color-text-dark)" />
            </button>
            <button
              onClick={nextImage}
              style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255,255,255,0.9)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
                transition: 'var(--transition-fast)'
              }}
            >
              <ChevronRight size={16} color="var(--color-text-dark)" />
            </button>
          </>
        )}

        {/* Carousel Dots indicator */}
        {listing.images && listing.images.length > 1 && (
          <div style={{
            position: 'absolute',
            bottom: '12px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '6px',
            zIndex: 5
          }}>
            {listing.images.map((_, idx) => (
              <div 
                key={idx}
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: currentImageIndex === idx ? 'var(--color-white)' : 'rgba(255,255,255,0.5)',
                  transition: 'background-color 0.2s ease'
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Listing Text Details */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <span style={{ fontSize: '15px', fontWeight: '700', color: 'var(--color-text-dark)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '80%' }}>
            {listing.location}
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '14px', fontWeight: '500' }}>
            <Star size={14} fill="currentColor" color="#f5a623" />
            <span>{listing.rating.toFixed(2)}</span>
          </div>
        </div>
        
        <span style={{ fontSize: '14px', color: 'var(--color-text-medium)' }}>
          {listing.type} • {listing.category}
        </span>
        
        <div style={{ display: 'flex', gap: '4px', fontSize: '14px', marginTop: '2px' }}>
          <span style={{ fontWeight: '700', color: 'var(--color-text-dark)' }}>
            ${parseFloat(listing.price).toLocaleString()}
          </span>
          <span style={{ color: 'var(--color-text-medium)' }}>night</span>
        </div>
      </div>
    </div>
  );
}
