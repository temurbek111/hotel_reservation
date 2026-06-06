import React, { useState } from 'react';
import { Plus, Home, DollarSign, Star, Trash2 } from 'lucide-react';
import AddListingModal from './AddListingModal';

export default function HostDashboard({ listings, onAddListing, onDeleteListing }) {
  const [showAddModal, setShowAddModal] = useState(false);

  // Filter listings belonging to the mock host "Sarah Miller" (or host objects we add ourselves)
  const hostListings = listings.filter(l => l.host?.name === "Sarah Miller" || !l.host);

  // Calculate some simple stats
  const totalListings = hostListings.length;
  const avgPrice = totalListings > 0 
    ? Math.round(hostListings.reduce((sum, l) => sum + parseFloat(l.price), 0) / totalListings) 
    : 0;

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h2 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '8px', letterSpacing: '-0.5px' }}>Host Dashboard</h2>
          <p style={{ color: 'var(--color-text-medium)', fontSize: '16px' }}>Welcome back, Sarah. Manage your properties and reservations here.</p>
        </div>
        
        <button 
          onClick={() => setShowAddModal(true)}
          className="gradient-btn"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 24px',
            borderRadius: 'var(--radius-sm)',
            fontSize: '15px'
          }}
        >
          <Plus size={18} /> Create Listing
        </button>
      </div>

      {/* Stats Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '24px',
        marginBottom: '40px'
      }}>
        <div style={{ padding: '24px', border: '1px solid var(--color-border-light)', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-white)', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-text-medium)', marginBottom: '12px' }}>
            <span style={{ fontSize: '14px', fontWeight: '600' }}>Active Listings</span>
            <Home size={18} />
          </div>
          <span style={{ fontSize: '28px', fontWeight: '800' }}>{totalListings}</span>
        </div>

        <div style={{ padding: '24px', border: '1px solid var(--color-border-light)', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-white)', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-text-medium)', marginBottom: '12px' }}>
            <span style={{ fontSize: '14px', fontWeight: '600' }}>Average Nightly Rate</span>
            <DollarSign size={18} />
          </div>
          <span style={{ fontSize: '28px', fontWeight: '800' }}>${avgPrice.toLocaleString()}</span>
        </div>

        <div style={{ padding: '24px', border: '1px solid var(--color-border-light)', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-white)', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-text-medium)', marginBottom: '12px' }}>
            <span style={{ fontSize: '14px', fontWeight: '600' }}>Co-hosting Rating</span>
            <Star size={18} fill="currentColor" color="#f5a623" />
          </div>
          <span style={{ fontSize: '28px', fontWeight: '800' }}>4.95 ★</span>
        </div>
      </div>

      {/* Listings Section */}
      <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '16px' }}>Your Properties</h3>
      
      {hostListings.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '64px 32px',
          border: '1px dashed var(--color-border)',
          borderRadius: 'var(--radius-md)',
          backgroundColor: 'var(--color-bg-light)'
        }}>
          <span style={{ fontSize: '48px', display: 'block', marginBottom: '16px' }}>🏡</span>
          <h4 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}>No active properties</h4>
          <p style={{ color: 'var(--color-text-medium)', marginBottom: '24px' }}>Get started by adding your first Airbnb clone listing!</p>
          <button 
            onClick={() => setShowAddModal(true)}
            className="gradient-btn"
            style={{ padding: '12px 24px', borderRadius: 'var(--radius-sm)' }}
          >
            Create Your First Listing
          </button>
        </div>
      ) : (
        <div style={{
          border: '1px solid var(--color-border-light)',
          borderRadius: 'var(--radius-md)',
          overflow: 'hidden',
          boxShadow: '0 4px 12px var(--color-shadow)',
          backgroundColor: 'var(--color-white)'
        }}>
          {/* Table Header */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '3fr 1.5fr 1fr 1fr 0.5fr',
            padding: '16px 24px',
            backgroundColor: 'var(--color-bg-light)',
            borderBottom: '1px solid var(--color-border)',
            fontWeight: '700',
            fontSize: '14px'
          }}>
            <span>Listing Title</span>
            <span>Location</span>
            <span>Category</span>
            <span>Price</span>
            <span style={{ textAlign: 'right' }}>Action</span>
          </div>

          {/* Table Rows */}
          {hostListings.map((listing) => (
            <div 
              key={listing.id}
              style={{
                display: 'grid',
                gridTemplateColumns: '3fr 1.5fr 1fr 1fr 0.5fr',
                padding: '16px 24px',
                borderBottom: '1px solid var(--color-border-light)',
                alignItems: 'center',
                fontSize: '15px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <img 
                  src={listing.images[0]} 
                  alt={listing.title} 
                  style={{ width: '56px', height: '42px', borderRadius: '4px', objectFit: 'cover' }} 
                />
                <span style={{ fontWeight: '600', color: 'var(--color-text-dark)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {listing.title}
                </span>
              </div>
              <span style={{ color: 'var(--color-text-medium)' }}>{listing.location}</span>
              <span style={{ textTransform: 'capitalize', color: 'var(--color-text-medium)' }}>{listing.category}</span>
              <span style={{ fontWeight: '600' }}>${parseFloat(listing.price).toLocaleString()}/night</span>
              <div style={{ textAlign: 'right' }}>
                <button 
                  onClick={() => onDeleteListing(listing.id)}
                  style={{
                    color: '#d9534f',
                    padding: '8px',
                    borderRadius: '50%',
                    transition: 'var(--transition-fast)'
                  }}
                  className="btn-hover-bounce"
                  title="Delete Property"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Listing Modal overlay */}
      {showAddModal && (
        <AddListingModal 
          onClose={() => setShowAddModal(false)}
          onAdd={onAddListing}
        />
      )}
    </div>
  );
}
