import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Categories from './components/Categories';
import ListingCard from './components/ListingCard';
import ListingModal from './components/ListingModal';
import TripsDashboard from './components/TripsDashboard';
import HostDashboard from './components/HostDashboard';
import { mockListings } from './data/mockListings';

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:8001/api').replace(/\/$/, '');

export default function App() {
  // Navigation & Routing States
  const [view, setView] = useState('listings'); // 'listings', 'trips', 'host'
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeFilters, setActiveFilters] = useState({ location: '', guests: '' });
  
  // Data States
  const [listings, setListings] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [selectedListing, setSelectedListing] = useState(null);
  
  // Favorites State (load from localStorage)
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('favorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Persist Favorites to localStorage
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Fetch listings from Django Backend (with category and query filters)
  const fetchListings = async () => {
    try {
      let url = `${API_BASE_URL}/listings/`;
      const params = new URLSearchParams();
      
      if (selectedCategory && selectedCategory !== 'all') {
        params.append('category', selectedCategory);
      }
      if (activeFilters.location) {
        params.append('location', activeFilters.location);
      }
      if (activeFilters.guests) {
        params.append('guests', activeFilters.guests);
      }
      
      const queryStr = params.toString();
      if (queryStr) {
        url += `?${queryStr}`;
      }

      const res = await fetch(url);
      if (!res.ok) throw new Error('API server returned error');
      const data = await res.json();
      setListings(data);
    } catch (err) {
      console.warn("Django backend offline, falling back to local mock listings data.", err);
      // Fallback: local filtering of mock data
      let filtered = [...mockListings];
      if (selectedCategory && selectedCategory !== 'all') {
        filtered = filtered.filter(l => l.category === selectedCategory);
      }
      if (activeFilters.location) {
        filtered = filtered.filter(l => 
          l.location.toLowerCase().includes(activeFilters.location.toLowerCase())
        );
      }
      if (activeFilters.guests) {
        filtered = filtered.filter(l => l.maxGuests >= parseInt(activeFilters.guests));
      }
      setListings(filtered);
    }
  };

  // Fetch bookings from Django Backend
  const fetchBookings = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/bookings/`);
      if (!res.ok) throw new Error('API server returned error');
      const data = await res.json();
      setBookings(data);
    } catch (err) {
      console.warn("Django backend offline, using mock bookings from localStorage fallback.", err);
      try {
        const savedBookings = localStorage.getItem('mockBookings');
        setBookings(savedBookings ? JSON.parse(savedBookings) : []);
      } catch {
        setBookings([]);
      }
    }
  };

  // Trigger data fetches on mount and state changes
  useEffect(() => {
    fetchListings();
  }, [selectedCategory, activeFilters]);

  useEffect(() => {
    fetchBookings();
  }, [view]);

  // Toggle Favorite
  const toggleFavorite = (id) => {
    setFavorites((prev) => 
      prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]
    );
  };

  // Create Booking API
  const handleBookListing = async (bookingData) => {
    try {
      const res = await fetch(`${API_BASE_URL}/bookings/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData)
      });
      if (!res.ok) throw new Error('Failed to create booking on backend');
      const newBooking = await res.json();
      setBookings(prev => [newBooking, ...prev]);
      alert("Reservation confirmed! Pack your bags.");
      setSelectedListing(null);
      setView('trips');
    } catch (err) {
      console.warn("Django backend offline, saving booking to local mock database.", err);
      // Fallback: LocalStorage Booking
      const listingObj = listings.find(l => l.id === bookingData.listing) || {};
      const newMockBooking = {
        id: `bkg-${Math.floor(Math.random() * 10000)}`,
        listing: bookingData.listing,
        check_in: bookingData.check_in,
        check_out: bookingData.check_out,
        guests_count: bookingData.guests_count,
        total_price: bookingData.total_price,
        guest_name: "Sarah Miller",
        created_at: new Date().toISOString(),
        listing_details: {
          id: listingObj.id,
          title: listingObj.title,
          location: listingObj.location,
          image: listingObj.images ? listingObj.images[0] : null,
          type: listingObj.type,
          price: listingObj.price
        }
      };

      const savedBookingsStr = localStorage.getItem('mockBookings');
      const currentBookings = savedBookingsStr ? JSON.parse(savedBookingsStr) : [];
      const updatedBookings = [newMockBooking, ...currentBookings];
      localStorage.setItem('mockBookings', JSON.stringify(updatedBookings));
      
      setBookings(updatedBookings);
      alert("Reservation confirmed (offline mode)! Pack your bags.");
      setSelectedListing(null);
      setView('trips');
    }
  };

  // Cancel Booking API
  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;

    try {
      const res = await fetch(`${API_BASE_URL}/bookings/${bookingId}/`, {
        method: 'DELETE'
      });
      if (!res.ok) throw new Error('Failed to cancel booking');
      setBookings(prev => prev.filter(b => b.id !== bookingId));
    } catch (err) {
      console.warn("Django backend offline, canceling booking from localStorage.", err);
      // Fallback
      const savedBookingsStr = localStorage.getItem('mockBookings');
      const currentBookings = savedBookingsStr ? JSON.parse(savedBookingsStr) : [];
      const updatedBookings = currentBookings.filter(b => b.id !== bookingId);
      localStorage.setItem('mockBookings', JSON.stringify(updatedBookings));
      setBookings(updatedBookings);
    }
  };

  // Add Listing API (Host Mode)
  const handleAddListing = async (newListingData) => {
    try {
      const res = await fetch(`${API_BASE_URL}/listings/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newListingData)
      });
      if (!res.ok) throw new Error('Failed to create listing on backend');
      const createdListing = await res.json();
      setListings(prev => [createdListing, ...prev]);
      alert("Listing successfully added to the database!");
    } catch (err) {
      console.warn("Django backend offline, adding listing to local mock state.", err);
      // Fallback: generate custom ID and prepend
      const fallbackListing = {
        ...newListingData,
        id: `lst-${Math.floor(Math.random() * 1000)}`
      };
      setListings(prev => [fallbackListing, ...prev]);
      alert("Listing added successfully (offline mode)!");
    }
  };

  // Delete Listing API (Host Mode)
  const handleDeleteListing = async (listingId) => {
    if (!window.confirm("Are you sure you want to remove this property?")) return;

    try {
      const res = await fetch(`${API_BASE_URL}/listings/${listingId}/`, {
        method: 'DELETE'
      });
      if (!res.ok) throw new Error('Failed to delete listing');
      setListings(prev => prev.filter(l => l.id !== listingId));
      alert("Property removed.");
    } catch (err) {
      console.warn("Django backend offline, removing listing from local state.", err);
      setListings(prev => prev.filter(l => l.id !== listingId));
      alert("Property removed (offline mode).");
    }
  };

  // Search Submit Handler
  const handleSearch = (filters) => {
    setActiveFilters(filters);
  };

  return (
    <div className="app-container">
      {/* Fixed Navbar */}
      <Navbar 
        currentView={view} 
        setView={setView} 
        onSearch={handleSearch}
        activeFilters={activeFilters}
      />

      {/* Conditionally Render Category Scrollbar only in Guest Listing View */}
      {view === 'listings' && (
        <Categories 
          selectedCategory={selectedCategory} 
          onSelectCategory={setSelectedCategory} 
        />
      )}

      {/* Main Pages Content container */}
      <main className="main-content">
        {view === 'listings' && (
          <div>
            {listings.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '100px 0' }}>
                <span style={{ fontSize: '48px' }}>🔍</span>
                <h3 style={{ fontSize: '20px', fontWeight: '700', marginTop: '16px' }}>No exact matches</h3>
                <p style={{ color: 'var(--color-text-medium)', marginTop: '8px' }}>
                  Try changing or clearing some of your filters.
                </p>
              </div>
            ) : (
              <div className="grid-listings">
                {listings.map((listing) => (
                  <ListingCard
                    key={listing.id}
                    listing={listing}
                    onSelect={setSelectedListing}
                    isFavorite={favorites.includes(listing.id)}
                    onToggleFavorite={toggleFavorite}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {view === 'trips' && (
          <TripsDashboard 
            bookings={bookings} 
            onCancelBooking={handleCancelBooking} 
            setView={setView}
          />
        )}

        {view === 'host' && (
          <HostDashboard 
            listings={listings} 
            onAddListing={handleAddListing} 
            onDeleteListing={handleDeleteListing}
          />
        )}
      </main>

      {/* Detail Overlay Modal */}
      {selectedListing && (
        <ListingModal
          listing={selectedListing}
          onClose={() => setSelectedListing(null)}
          onBook={handleBookListing}
          isFavorite={favorites.includes(selectedListing.id)}
          onToggleFavorite={toggleFavorite}
        />
      )}
    </div>
  );
}
