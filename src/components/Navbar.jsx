import React, { useState } from 'react';
import { Search, Menu, User, Globe, Briefcase, Compass, LogOut } from 'lucide-react';

export default function Navbar({ currentView, setView, onSearch, activeFilters }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  
  // Search form states
  const [location, setLocation] = useState(activeFilters.location || '');
  const [guests, setGuests] = useState(activeFilters.guests || '');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch({ location, guests: guests ? parseInt(guests) : '' });
    setSearchOpen(false);
  };

  const clearSearch = () => {
    setLocation('');
    setGuests('');
    onSearch({ location: '', guests: '' });
  };

  return (
    <header className="glass" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      height: 'var(--header-height)',
      borderBottom: '1px solid var(--color-border-light)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 80px',
      zIndex: 100,
      boxShadow: '0 1px 12px var(--color-shadow)'
    }}>
      {/* Logo */}
      <div 
        onClick={() => setView('listings')} 
        style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
      >
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', fill: 'var(--color-primary)', height: '32px', width: '32px' }} aria-hidden="true" focusable="false">
          <path d="M16 1c2.008 0 3.463.963 4.751 3.269l.533 1.025c1.954 3.83 6.114 12.54 7.1 14.836l.145.353c.667 1.591.91 2.472.96 3.396l.01.415.001.228c0 4.062-2.877 6.478-6.357 6.478-2.224 0-4.556-1.258-6.708-3.386l-.257-.263-.172-.178-1.085-1.166-.172-.178-.257-.263c-2.152 2.128-4.484 3.386-6.708 3.386-3.48 0-6.357-2.416-6.357-6.478 0-.076.001-.152.002-.228l.01-.415c.05-.924.293-1.805.96-3.396l.145-.353c.986-2.296 5.146-11.006 7.1-14.836l.533-1.025C12.537 1.963 13.992 1 16 1zm0 2c-1.298 0-2.202.651-3.008 2.119l-.514.99C10.512 9.94 6.368 18.618 5.4 20.875c-.564 1.348-.755 2.022-.791 2.678l-.008.238c0 2.784 1.905 4.478 4.357 4.478 1.69 0 3.668-1.01 5.602-2.923l.189-.193.308-.329 1.488-1.597.308-.33.189-.193c1.934 1.914 3.912 2.924 5.602 2.924 2.452 0 4.357-1.694 4.357-4.478l-.008-.238c-.036-.656-.227-1.33-.791-2.678l-.161-.39c-.958-2.227-5.068-10.9-6.071-14.855l-.515-.99C18.202 3.651 17.298 3 16 3zm0 9c2.206 0 4 1.794 4 4 0 1.206-.727 2.298-1.848 2.764l-.152.057V21a2 2 0 0 1-1.85 1.995L16 23a2 2 0 0 1-1.995-1.85L14 21v-2.179c-1.192-.42-2-1.528-2-2.821 0-2.206 1.794-4 4-4zm0 2a2 2 0 0 0-1.995 1.85L14 16a2 2 0 0 0 1.85 1.995L16 18a2 2 0 0 0 1.995-1.85L18 16a2 2 0 0 0-1.85-1.995L16 14z" />
        </svg>
        <span style={{ fontSize: '20px', fontWeight: '800', color: 'var(--color-primary)', letterSpacing: '-0.5px' }}>
          vacaystay
        </span>
      </div>

      {/* Modern Expandable Search Bar */}
      <div 
        onClick={() => setSearchOpen(true)}
        className="btn-hover-bounce"
        style={{
          display: 'flex',
          alignItems: 'center',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-full)',
          padding: '8px 8px 8px 24px',
          boxShadow: '0 1px 2px rgba(0,0,0,0.08)',
          cursor: 'pointer',
          background: 'var(--color-white)',
          minWidth: '320px',
          maxWidth: '480px',
          transition: 'var(--transition-fast)'
        }}
      >
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
          <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--color-text-dark)' }}>Anywhere</span>
          <span style={{ fontSize: '12px', color: 'var(--color-text-medium)' }}>
            {activeFilters.location || 'Add destination'}
          </span>
        </div>
        <div style={{ width: '1px', height: '24px', backgroundColor: 'var(--color-border)', margin: '0 16px' }} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
          <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--color-text-dark)' }}>Guests</span>
          <span style={{ fontSize: '12px', color: 'var(--color-text-medium)' }}>
            {activeFilters.guests ? `${activeFilters.guests} guests` : 'Add guests'}
          </span>
        </div>
        <button style={{
          backgroundColor: 'var(--color-primary)',
          color: 'var(--color-white)',
          padding: '10px',
          borderRadius: 'var(--radius-full)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginLeft: '8px'
        }}>
          <Search size={16} strokeWidth={2.5} />
        </button>
      </div>

      {/* User Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', position: 'relative' }}>
        <button 
          onClick={() => setView(currentView === 'host' ? 'listings' : 'host')}
          style={{
            fontSize: '14px',
            fontWeight: '600',
            padding: '10px 16px',
            borderRadius: 'var(--radius-full)',
            transition: 'var(--transition-fast)',
            color: 'var(--color-text-dark)'
          }}
          className="btn-hover-bounce"
        >
          {currentView === 'host' ? 'Switch to Guest Mode' : 'Switch to Hosting'}
        </button>
        
        <button 
          style={{ padding: '8px', borderRadius: 'var(--radius-full)' }}
          className="btn-hover-bounce"
        >
          <Globe size={18} />
        </button>

        {/* Profile Dropdown Button */}
        <button 
          onClick={() => setShowDropdown(!showDropdown)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            border: '1px solid var(--color-border)',
            padding: '6px 6px 6px 12px',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'var(--color-white)',
            transition: 'var(--transition-fast)',
            boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
          }}
          className="btn-hover-bounce"
        >
          <Menu size={16} color="var(--color-text-medium)" />
          <div style={{
            backgroundColor: 'var(--color-text-medium)',
            color: 'var(--color-white)',
            borderRadius: 'var(--radius-full)',
            width: '30px',
            height: '30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <User size={16} />
          </div>
        </button>

        {/* Dropdown Menu */}
        {showDropdown && (
          <div 
            className="glass"
            style={{
              position: 'absolute',
              top: '110%',
              right: 0,
              width: '240px',
              backgroundColor: 'var(--color-white)',
              borderRadius: 'var(--radius-md)',
              boxShadow: '0 4px 18px rgba(0,0,0,0.12)',
              border: '1px solid var(--color-border-light)',
              padding: '8px 0',
              zIndex: 101,
              animation: 'scaleIn 0.15s ease-out'
            }}
          >
            <div 
              onClick={() => { setView('listings'); setShowDropdown(false); }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                fontSize: '14px',
                cursor: 'pointer',
                fontWeight: currentView === 'listings' ? '600' : '400',
                backgroundColor: currentView === 'listings' ? 'var(--color-bg-light)' : 'transparent'
              }}
            >
              <Compass size={16} /> Explore Stays
            </div>
            <div 
              onClick={() => { setView('trips'); setShowDropdown(false); }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                fontSize: '14px',
                cursor: 'pointer',
                fontWeight: currentView === 'trips' ? '600' : '400',
                backgroundColor: currentView === 'trips' ? 'var(--color-bg-light)' : 'transparent'
              }}
            >
              <Briefcase size={16} /> My Trips
            </div>
            <div 
              onClick={() => { setView('host'); setShowDropdown(false); }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                fontSize: '14px',
                cursor: 'pointer',
                fontWeight: currentView === 'host' ? '600' : '400',
                backgroundColor: currentView === 'host' ? 'var(--color-bg-light)' : 'transparent',
                borderBottom: '1px solid var(--color-border-light)'
              }}
            >
              <User size={16} /> Host Dashboard
            </div>
            <div 
              onClick={() => { clearSearch(); setShowDropdown(false); }}
              style={{
                padding: '12px 16px',
                fontSize: '14px',
                cursor: 'pointer',
                color: 'var(--color-text-medium)'
              }}
            >
              Clear Search Filters
            </div>
          </div>
        )}
      </div>

      {/* Advanced Search Modal Overlay */}
      {searchOpen && (
        <div 
          className="modal-overlay"
          onClick={() => setSearchOpen(false)}
        >
          <div 
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '500px', padding: '32px' }}
          >
            <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '24px' }}>Search for stays</h3>
            <form onSubmit={handleSearchSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: '700', textTransform: 'uppercase' }}>Where</label>
                <input 
                  type="text" 
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Colorado, Malibu, Hawaii" 
                  style={{
                    border: '1px solid var(--color-border)',
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '15px'
                  }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: '700', textTransform: 'uppercase' }}>Who (Guests)</label>
                <input 
                  type="number" 
                  min="1"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  placeholder="Number of guests" 
                  style={{
                    border: '1px solid var(--color-border)',
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '15px'
                  }}
                />
              </div>
              <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                <button 
                  type="button"
                  onClick={clearSearch}
                  style={{
                    flex: 1,
                    border: '1px solid var(--color-border)',
                    padding: '14px',
                    borderRadius: 'var(--radius-sm)',
                    fontWeight: '600',
                    textAlign: 'center'
                  }}
                >
                  Clear All
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
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </header>
  );
}
