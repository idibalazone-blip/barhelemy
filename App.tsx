
import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Splash } from './components/Splash';
import { TopBar, BottomNav } from './components/Navigation';
import { Home } from './pages/Home';
import { Immobilier } from './pages/Immobilier';
import { Restauration } from './pages/Restauration';
import { Localisation } from './pages/Localisation';
import { Profile } from './pages/Profile';
import { Publish } from './pages/Admin';
import { Notifications } from './pages/Notifications';
import { MOCK_USERS, MOCK_LISTINGS, MOCK_NOTIFICATIONS } from './constants';
import { User, Listing, AppNotification } from './types';

function App() {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<User>(MOCK_USERS[2]); // Default to visitor
  const [listings, setListings] = useState<Listing[]>(MOCK_LISTINGS);
  const [notifications, setNotifications] = useState<AppNotification[]>(MOCK_NOTIFICATIONS);
  const [searchQuery, setSearchQuery] = useState("");
  const [language, setLanguage] = useState("fr"); // Default language

  const handleAddListing = (newListing: Listing) => {
    setListings(prev => [newListing, ...prev]);
  };

  const handleAddComment = (listingId: string, text: string) => {
    const newComment = {
      id: Date.now().toString(),
      user: currentUser.name,
      text: text,
      date: new Date().toLocaleDateString('fr-FR')
    };

    setListings(currentListings => 
      currentListings.map(listing => 
        listing.id === listingId 
          ? { ...listing, comments: [...listing.comments, newComment] }
          : listing
      )
    );
  };

  const handleToggleLike = (listingId: string) => {
    setListings(currentListings => 
      currentListings.map(listing => {
        if (listing.id === listingId) {
          const isLikedNow = !listing.isLiked;
          return {
            ...listing,
            isLiked: isLikedNow,
            likes: isLikedNow ? listing.likes + 1 : listing.likes - 1
          };
        }
        return listing;
      })
    );
  };

  const markNotificationsAsRead = () => {
    setNotifications(current => current.map(n => ({ ...n, isRead: true })));
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  if (loading) {
    return <Splash onFinish={() => setLoading(false)} />;
  }

  return (
    <HashRouter>
      <div className="min-h-screen bg-[#F0F2F5] text-gray-900 font-sans">
        <TopBar 
          user={currentUser} 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          unreadCount={unreadCount}
          language={language}
        />
        
        <Routes>
          <Route 
            path="/" 
            element={
              <Home 
                listings={listings} 
                onAddComment={handleAddComment} 
                onToggleLike={handleToggleLike}
                user={currentUser}
                language={language}
              />
            } 
          />
          <Route 
            path="/immobilier" 
            element={
              <Immobilier 
                listings={listings} 
                onAddComment={handleAddComment} 
                onToggleLike={handleToggleLike}
                searchQuery={searchQuery}
                user={currentUser}
                language={language}
              />
            } 
          />
          <Route 
            path="/restauration" 
            element={
              <Restauration 
                listings={listings} 
                onAddComment={handleAddComment} 
                onToggleLike={handleToggleLike}
                searchQuery={searchQuery}
                user={currentUser}
                language={language}
              />
            } 
          />
          <Route 
            path="/localisation" 
            element={<Localisation listings={listings} />} 
          />
          <Route 
            path="/notifications" 
            element={<Notifications notifications={notifications} markAllAsRead={markNotificationsAsRead} />} 
          />
          <Route 
            path="/profile" 
            element={
              <Profile 
                user={currentUser} 
                setUser={setCurrentUser} 
                language={language} 
                setLanguage={setLanguage} 
              />
            } 
          />
          <Route 
            path="/publish" 
            element={<Publish user={currentUser} onAddListing={handleAddListing} />} 
          />
        </Routes>

        <BottomNav language={language} />
      </div>
    </HashRouter>
  );
}

export default App;