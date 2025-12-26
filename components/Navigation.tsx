
import React from 'react';
import { Utensils, Building2, Home, User as UserIcon, Search, Settings, PlusSquare, X, Bell, MapPin } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Logo } from './Logo';
import { User } from '../types';
import { TRANSLATIONS } from '../translations';

interface TopBarProps {
  user?: User;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  unreadCount?: number;
  language?: string;
}

export const TopBar: React.FC<TopBarProps> = ({ user, searchQuery, setSearchQuery, unreadCount = 0, language = 'fr' }) => {
  const navigate = useNavigate();
  const t = TRANSLATIONS[language as keyof typeof TRANSLATIONS] || TRANSLATIONS['fr'];

  return (
    <div className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200 px-4 py-2 flex justify-between items-center h-16">
      <div onClick={() => navigate('/')} className="cursor-pointer mr-2">
        <Logo size="md" />
      </div>
      
      {/* Search Bar */}
      <div className="flex-1 mx-2 relative">
        <div className="bg-gray-100 rounded-full flex items-center px-4 py-2">
          <Search size={18} className="text-gray-500" />
          <input 
            type="text" 
            placeholder={t.search_placeholder}
            className="bg-transparent border-none outline-none text-sm ml-2 w-full text-gray-700 placeholder-gray-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="text-gray-500">
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      <div className="flex gap-3 items-center">
        {/* Notification Bell */}
        <button 
          onClick={() => navigate('/notifications')} 
          className="relative text-gray-600 hover:text-teal-600 p-1"
        >
          <Bell size={24} />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center font-bold border-2 border-white">
              {unreadCount}
            </span>
          )}
        </button>

        {user?.role === 'admin' || user?.role === 'member' ? (
          <button 
            onClick={() => navigate('/publish')} 
            className="bg-teal-600 text-white py-2 px-3 rounded-full shadow-md flex items-center gap-2 hover:bg-teal-700 transition-colors"
          >
            <PlusSquare size={18} />
          </button>
        ) : (
          <button onClick={() => navigate('/profile')} className="bg-gray-100 p-2 rounded-full text-black hover:bg-gray-200 hidden sm:block">
            <Settings size={20} />
          </button>
        )}
      </div>
    </div>
  );
};

interface BottomNavProps {
    language?: string;
}

export const BottomNav: React.FC<BottomNavProps> = ({ language = 'fr' }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const t = TRANSLATIONS[language as keyof typeof TRANSLATIONS] || TRANSLATIONS['fr'];

  const isActive = (path: string) => location.pathname === path ? 'text-teal-600' : 'text-gray-500';

  return (
    <div className="fixed bottom-0 w-full bg-white border-t border-gray-200 h-16 flex justify-around items-center z-50 pb-safe">
      <button onClick={() => navigate('/')} className={`flex flex-col items-center w-1/5 ${isActive('/')}`}>
        <Home size={24} />
        <span className="text-[10px]">{t.nav_home}</span>
      </button>
      <button onClick={() => navigate('/immobilier')} className={`flex flex-col items-center w-1/5 ${isActive('/immobilier')}`}>
        <Building2 size={24} />
        <span className="text-[10px]">{t.nav_immo}</span>
      </button>
      <div className="w-1/5 flex justify-center">
        <button onClick={() => navigate('/localisation')} className="flex flex-col items-center -mt-4">
          <div className={`w-14 h-14 rounded-full flex items-center justify-center text-white shadow-lg border-4 border-white transition-transform transform hover:scale-105 ${location.pathname === '/localisation' ? 'bg-teal-600' : 'bg-teal-500'}`}>
            <MapPin size={28} />
          </div>
          <span className={`text-[10px] font-bold mt-1 ${location.pathname === '/localisation' ? 'text-teal-600' : 'text-gray-600'}`}>{t.nav_map}</span>
        </button>
      </div>
      <button onClick={() => navigate('/restauration')} className={`flex flex-col items-center w-1/5 ${isActive('/restauration')}`}>
        <Utensils size={24} />
        <span className="text-[10px]">{t.nav_resto}</span>
      </button>
      <button onClick={() => navigate('/profile')} className={`flex flex-col items-center w-1/5 ${isActive('/profile')}`}>
        <UserIcon size={24} />
        <span className="text-[10px]">{t.nav_profile}</span>
      </button>
    </div>
  );
};