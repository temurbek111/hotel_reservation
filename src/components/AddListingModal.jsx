import React, { useState } from 'react';
import { X } from 'lucide-react';

const AMENITIES_OPTIONS = [
  "Wi-Fi", "Pool", "Ocean view", "Kitchen", "Gym", "Air conditioning", "Fireplace", "Hot tub", "Free parking", "Pet friendly"
];

const CATEGORY_DEFAULT_IMAGES = {
  cabins: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=800&q=80",
  mansions: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80",
  treehouses: "https://images.unsplash.com/photo-1488462237308-ecaa28b729d7?auto=format&fit=crop&w=800&q=80",
  beachfront: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80",
  trending: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
  luxe: "https://images.unsplash.com/photo-1546412414-e1885261b951?auto=format&fit=crop&w=800&q=80",
};

export default function AddListingModal({ onClose, onAdd }) {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('Entire home');
  const [category, setCategory] = useState('cabins');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  const handleAmenityChange = (amenity) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(prev => prev.filter(a => a !== amenity));
    } else {
      setSelectedAmenities(prev => [...prev, amenity]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !price || !location || !description) {
      alert("Please fill in all required fields.");
      return;
    }

    const priceVal = parseFloat(price);
    if (isNaN(priceVal) || priceVal <= 0) {
      alert("Please enter a valid price greater than 0.");
      return;
    }

    // Prepare default image if not provided
    const mainImage = imageUrl.trim() || CATEGORY_DEFAULT_IMAGES[category] || CATEGORY_DEFAULT_IMAGES.cabins;

    const newListing = {
      title,
      type,
      category,
      price: priceVal,
      location,
      description,
      images: [mainImage],
      amenities: selectedAmenities,
      rating: 4.8 + Math.random() * 0.2, // Mock high rating for new listing
      reviews: 0,
      host: {
        name: "Sarah Miller",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
        joined: "June 2018",
        isSuperhost: true
      },
      maxGuests: 4,
      bedrooms: 2,
      beds: 3,
      bathrooms: 2.0
    };

    onAdd(newListing);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '650px', padding: '32px' }}
      >
        <button onClick={onClose} className="modal-close-btn">
          <X size={20} />
        </button>

        <h3 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '24px', letterSpacing: '-0.5px' }}>Create your listing</h3>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {/* Title */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <label style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase' }}>Listing Title *</label>
            <input 
              type="text" 
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Cozy Forest A-Frame with Hot Tub"
              style={{ border: '1px solid var(--color-border)', padding: '12px', borderRadius: 'var(--radius-sm)' }}
            />
          </div>

          {/* Grid: Type, Category, Price */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.2fr 1fr', gap: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase' }}>Type *</label>
              <input 
                type="text" 
                required
                value={type}
                onChange={(e) => setType(e.target.value)}
                placeholder="e.g. Entire cabin"
                style={{ border: '1px solid var(--color-border)', padding: '12px', borderRadius: 'var(--radius-sm)' }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase' }}>Category *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={{ border: '1px solid var(--color-border)', padding: '12px', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--color-white)', height: '100%', cursor: 'pointer' }}
              >
                <option value="cabins">Cabins</option>
                <option value="mansions">Mansions</option>
                <option value="treehouses">Treehouses</option>
                <option value="beachfront">Beachfront</option>
                <option value="trending">Trending</option>
                <option value="luxe">Luxe</option>
              </select>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase' }}>Price per Night *</label>
              <input 
                type="number" 
                required
                min="1"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="$"
                style={{ border: '1px solid var(--color-border)', padding: '12px', borderRadius: 'var(--radius-sm)' }}
              />
            </div>
          </div>

          {/* Location */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <label style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase' }}>Location *</label>
            <input 
              type="text" 
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Portland, Oregon"
              style={{ border: '1px solid var(--color-border)', padding: '12px', borderRadius: 'var(--radius-sm)' }}
            />
          </div>

          {/* Description */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <label style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase' }}>Description *</label>
            <textarea 
              required
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide a detailed description of your property, features, and the surrounding neighborhood."
              style={{ border: '1px solid var(--color-border)', padding: '12px', borderRadius: 'var(--radius-sm)', fontFamily: 'inherit', resize: 'vertical' }}
            />
          </div>

          {/* Custom Image URL */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <label style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase' }}>Custom Image URL (Optional)</label>
            <input 
              type="url" 
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Paste image URL (or leave empty for a category default)"
              style={{ border: '1px solid var(--color-border)', padding: '12px', borderRadius: 'var(--radius-sm)' }}
            />
          </div>

          {/* Amenities checklist */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase' }}>Select Amenities</label>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '10px',
              padding: '6px 0'
            }}>
              {AMENITIES_OPTIONS.map((amenity, idx) => (
                <label key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', cursor: 'pointer' }}>
                  <input 
                    type="checkbox" 
                    checked={selectedAmenities.includes(amenity)}
                    onChange={() => handleAmenityChange(amenity)}
                    style={{ cursor: 'pointer' }}
                  />
                  <span>{amenity}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Submit Buttons */}
          <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
            <button 
              type="button" 
              onClick={onClose}
              style={{
                flex: 1,
                border: '1px solid var(--color-border)',
                padding: '14px',
                borderRadius: 'var(--radius-sm)',
                fontWeight: '600',
                textAlign: 'center'
              }}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="gradient-btn"
              style={{
                flex: 1,
                padding: '14px',
                borderRadius: 'var(--radius-sm)',
                textAlign: 'center'
              }}
            >
              Submit Property
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
