import React from 'react';
import { Calendar, MapPin, DollarSign, Trash2 } from 'lucide-react';

export default function TripsDashboard({ bookings, onCancelBooking, setView }) {
  
  const formatDate = (dateStr) => {
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return new Date(dateStr).toLocaleDateString('en-US', options);
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
      <h2 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '8px', letterSpacing: '-0.5px' }}>My Trips</h2>
      <p style={{ color: 'var(--color-text-medium)', marginBottom: '32px', fontSize: '16px' }}>
        Manage your reservations, view check-in details, and explore your upcoming vacations.
      </p>

      {bookings.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '64px 32px',
          border: '1px dashed var(--color-border)',
          borderRadius: 'var(--radius-md)',
          backgroundColor: 'var(--color-bg-light)'
        }}>
          <span style={{ fontSize: '48px', display: 'block', marginBottom: '16px' }}>🎒</span>
          <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '8px' }}>No trips booked yet</h3>
          <p style={{ color: 'var(--color-text-medium)', marginBottom: '24px' }}>
            Time to dust off your bags and start planning your next getaway!
          </p>
          <button 
            onClick={() => setView('listings')}
            className="gradient-btn"
            style={{ padding: '12px 24px', borderRadius: 'var(--radius-sm)' }}
          >
            Start Exploring Stays
          </button>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
          gap: '24px'
        }}>
          {bookings.map((booking) => {
            const details = booking.listing_details || {};
            return (
              <div 
                key={booking.id}
                style={{
                  border: '1px solid var(--color-border-light)',
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  backgroundColor: 'var(--color-white)',
                  boxShadow: '0 4px 12px var(--color-shadow)',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                {/* Listing Image */}
                <div style={{ height: '180px', position: 'relative' }}>
                  <img 
                    src={details.image || "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=600&q=80"} 
                    alt={details.title || "Stay"} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  />
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    backgroundColor: 'rgba(0,0,0,0.7)',
                    color: 'var(--color-white)',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '11px',
                    fontWeight: '700',
                    textTransform: 'uppercase'
                  }}>
                    {details.type || "Stay"}
                  </div>
                </div>

                {/* Booking Content */}
                <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
                  <div>
                    <h4 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--color-text-dark)', marginBottom: '4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {details.title || "Vacation Stay"}
                    </h4>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', color: 'var(--color-text-medium)' }}>
                      <MapPin size={14} /> {details.location || "Location"}
                    </span>
                  </div>

                  <div style={{ borderTop: '1px solid var(--color-border-light)', borderBottom: '1px solid var(--color-border-light)', padding: '12px 0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
                      <Calendar size={15} color="var(--color-text-medium)" />
                      <span>{formatDate(booking.check_in)} – {formatDate(booking.check_out)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                      <span style={{ color: 'var(--color-text-medium)' }}>Guests</span>
                      <span style={{ fontWeight: '600' }}>{booking.guests_count} guest{booking.guests_count > 1 ? 's' : ''}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                      <span style={{ color: 'var(--color-text-medium)' }}>Total Paid</span>
                      <span style={{ fontWeight: '700', color: 'var(--color-primary)' }}>${parseFloat(booking.total_price).toLocaleString()}</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '8px' }}>
                    <span style={{ fontSize: '12px', color: 'var(--color-text-light)' }}>
                      Booked on {new Date(booking.created_at).toLocaleDateString()}
                    </span>
                    
                    <button 
                      onClick={() => onCancelBooking(booking.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        color: '#d9534f',
                        fontSize: '13px',
                        fontWeight: '600',
                        padding: '6px 12px',
                        borderRadius: 'var(--radius-sm)',
                        transition: 'var(--transition-fast)',
                        border: '1px solid transparent'
                      }}
                      className="btn-hover-bounce"
                      onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(217, 83, 79, 0.08)'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                    >
                      <Trash2 size={14} /> Cancel
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
