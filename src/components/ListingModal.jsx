import React, { useState, useEffect } from 'react';
import { Star, ShieldAlert, Heart, Calendar, Users, X } from 'lucide-react';

export default function ListingModal({ listing, onClose, onBook, isFavorite, onToggleFavorite }) {
  // Booking states
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guestsCount, setGuestsCount] = useState(1);
  const [nights, setNights] = useState(1);
  
  // Set default dates (today and tomorrow) on mount
  useEffect(() => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const formatDate = (date) => {
      const d = new Date(date);
      let month = '' + (d.getMonth() + 1);
      let day = '' + d.getDate();
      const year = d.getFullYear();

      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;

      return [year, month, day].join('-');
    };

    setCheckIn(formatDate(today));
    setCheckOut(formatDate(tomorrow));
  }, []);

  // Recalculate nights when checkIn or checkOut changes
  useEffect(() => {
    if (checkIn && checkOut) {
      const inDate = new Date(checkIn);
      const outDate = new Date(checkOut);
      const diffTime = outDate - inDate;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays > 0) {
        setNights(diffDays);
      } else {
        setNights(1);
      }
    }
  }, [checkIn, checkOut]);

  const priceVal = parseFloat(listing.price);
  const baseTotal = nights * priceVal;
  const cleaningFee = 45;
  const serviceFee = Math.round(baseTotal * 0.12);
  const grandTotal = baseTotal + cleaningFee + serviceFee;

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (new Date(checkOut) <= new Date(checkIn)) {
      alert("Check-out date must be after Check-in date.");
      return;
    }
    
    // Call parent handler
    onBook({
      listing: listing.id,
      check_in: checkIn,
      check_out: checkOut,
      guests_count: guestsCount,
      total_price: grandTotal
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{ padding: '0 0 40px 0', maxWidth: '980px' }}
      >
        {/* Close Button */}
        <button onClick={onClose} className="modal-close-btn">
          <X size={20} />
        </button>

        {/* Top Header Section */}
        <div style={{ padding: '32px 32px 16px 32px' }}>
          <h2 style={{ fontSize: '26px', fontWeight: '700', marginBottom: '8px' }}>{listing.title}</h2>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: '600' }}>
              <Star size={16} fill="currentColor" color="#f5a623" />
              <span>{listing.rating.toFixed(2)}</span>
              <span style={{ color: 'var(--color-text-medium)', fontWeight: '400' }}>({listing.reviews} reviews)</span>
              <span>•</span>
              <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>{listing.location}</span>
            </div>
            
            <button 
              onClick={() => onToggleFavorite(listing.id)}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: '600', textDecoration: 'underline' }}
            >
              <Heart size={16} fill={isFavorite ? 'var(--color-primary)' : 'none'} color={isFavorite ? 'var(--color-primary)' : 'var(--color-text-dark)'} />
              <span>{isFavorite ? 'Saved' : 'Save'}</span>
            </button>
          </div>
        </div>

        {/* Image Grid Section */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gap: '8px',
          padding: '0 32px',
          height: '350px',
          overflow: 'hidden'
        }}>
          {/* Main big image */}
          <div style={{ height: '100%' }}>
            <img 
              src={listing.images[0]} 
              alt={listing.title} 
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderTopLeftRadius: 'var(--radius-md)', borderBottomLeftRadius: 'var(--radius-md)' }} 
            />
          </div>
          {/* Secondary images grid */}
          <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr', gap: '8px', height: '100%' }}>
            <img 
              src={listing.images[1] || listing.images[0]} 
              alt={listing.title} 
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderTopRightRadius: 'var(--radius-md)' }} 
            />
            <img 
              src={listing.images[2] || listing.images[0]} 
              alt={listing.title} 
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderBottomRightRadius: 'var(--radius-md)' }} 
            />
          </div>
        </div>

        {/* Details and Booking Columns */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.6fr 1fr',
          gap: '64px',
          padding: '32px 32px 0 32px'
        }}>
          {/* Details Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {/* Host info */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--color-border-light)', paddingBottom: '24px' }}>
              <div>
                <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '4px' }}>
                  {listing.type} hosted by {listing.host.name}
                </h3>
                <span style={{ fontSize: '15px', color: 'var(--color-text-medium)' }}>
                  {listing.maxGuests} guests • {listing.bedrooms} bedrooms • {listing.beds} beds • {listing.bathrooms} bathrooms
                </span>
              </div>
              <img 
                src={listing.host.avatar} 
                alt={listing.host.name} 
                style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover' }} 
              />
            </div>

            {/* Description */}
            <div style={{ borderBottom: '1px solid var(--color-border-light)', paddingBottom: '24px' }}>
              <h4 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '12px' }}>About this space</h4>
              <p style={{ fontSize: '15px', color: 'var(--color-text-dark)', lineHeight: '1.6' }}>{listing.description}</p>
            </div>

            {/* Amenities */}
            <div>
              <h4 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px' }}>What this place offers</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                {listing.amenities.map((amenity, index) => (
                  <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '15px' }}>
                    <span style={{ fontSize: '20px' }}>⚡</span>
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Widget Column */}
          <div>
            <div style={{
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
              boxShadow: '0 6px 16px rgba(0,0,0,0.12)',
              padding: '24px',
              position: 'sticky',
              top: '120px',
              backgroundColor: 'var(--color-white)'
            }}>
              {/* Price per night header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '24px' }}>
                <div>
                  <span style={{ fontSize: '22px', fontWeight: '800' }}>${priceVal.toLocaleString()}</span>
                  <span style={{ fontSize: '15px', color: 'var(--color-text-medium)' }}> night</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: '600' }}>
                  <Star size={12} fill="currentColor" color="#f5a623" />
                  <span>{listing.rating.toFixed(2)}</span>
                </div>
              </div>

              {/* Booking Dates Form */}
              <form onSubmit={handleBookingSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{
                  border: '1px solid var(--color-text-light)',
                  borderRadius: 'var(--radius-sm)',
                  overflow: 'hidden'
                }}>
                  {/* Check-in / Out inputs */}
                  <div style={{ display: 'flex', borderBottom: '1px solid var(--color-text-light)' }}>
                    <div style={{ flex: 1, padding: '10px 12px', borderRight: '1px solid var(--color-text-light)' }}>
                      <label style={{ display: 'block', fontSize: '9px', fontWeight: '800', textTransform: 'uppercase', color: 'var(--color-text-dark)' }}>Check-in</label>
                      <input 
                        type="date" 
                        required
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        style={{ width: '100%', fontSize: '13px', marginTop: '2px', backgroundColor: 'transparent' }} 
                      />
                    </div>
                    <div style={{ flex: 1, padding: '10px 12px' }}>
                      <label style={{ display: 'block', fontSize: '9px', fontWeight: '800', textTransform: 'uppercase', color: 'var(--color-text-dark)' }}>Check-out</label>
                      <input 
                        type="date" 
                        required
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        style={{ width: '100%', fontSize: '13px', marginTop: '2px', backgroundColor: 'transparent' }} 
                      />
                    </div>
                  </div>
                  {/* Guest selection dropdown */}
                  <div style={{ padding: '10px 12px' }}>
                    <label style={{ display: 'block', fontSize: '9px', fontWeight: '800', textTransform: 'uppercase', color: 'var(--color-text-dark)' }}>Guests</label>
                    <select
                      value={guestsCount}
                      onChange={(e) => setGuestsCount(parseInt(e.target.value))}
                      style={{ width: '100%', border: 'none', outline: 'none', fontSize: '14px', marginTop: '4px', backgroundColor: 'transparent', cursor: 'pointer' }}
                    >
                      {[...Array(listing.maxGuests).keys()].map((n) => (
                        <option key={n + 1} value={n + 1}>{n + 1} guest{n > 0 ? 's' : ''}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Reserve Button */}
                <button 
                  type="submit"
                  className="gradient-btn"
                  style={{
                    width: '100%',
                    padding: '14px 24px',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '16px',
                    textAlign: 'center',
                    marginTop: '8px'
                  }}
                >
                  Reserve
                </button>
              </form>

              {/* Price Details Breakdown */}
              <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <p style={{ textAlign: 'center', fontSize: '14px', color: 'var(--color-text-medium)' }}>You won't be charged yet</p>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '15px' }}>
                  <span style={{ textDecoration: 'underline', color: 'var(--color-text-dark)' }}>${priceVal.toLocaleString()} x {nights} nights</span>
                  <span>${baseTotal.toLocaleString()}</span>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '15px' }}>
                  <span style={{ textDecoration: 'underline', color: 'var(--color-text-dark)' }}>Cleaning fee</span>
                  <span>${cleaningFee.toLocaleString()}</span>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '15px' }}>
                  <span style={{ textDecoration: 'underline', color: 'var(--color-text-dark)' }}>Service fee</span>
                  <span>${serviceFee.toLocaleString()}</span>
                </div>

                <div style={{ borderTop: '1px solid var(--color-border-light)', paddingTop: '16px', marginTop: '8px', display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: '700' }}>
                  <span>Total before taxes</span>
                  <span>${grandTotal.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
