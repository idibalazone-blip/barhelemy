
import React, { useState } from 'react';
import { ListingCard } from '../components/ListingCard';
import { CATEGORIES_IMMO } from '../constants';
import { RealEstateSubCategory, Listing, User } from '../types';
import { PublishPrompt } from '../components/PublishPrompt';

interface ImmobilierProps {
  listings: Listing[];
  onAddComment: (id: string, text: string) => void;
  onToggleLike: (id: string) => void;
  searchQuery: string;
  user: User;
  language: string;
}

export const Immobilier: React.FC<ImmobilierProps> = ({ listings, onAddComment, onToggleLike, searchQuery, user, language }) => {
  const [filter, setFilter] = useState<RealEstateSubCategory | 'All'>('All');

  const filteredListings = listings.filter(l => {
    const matchesCategory = l.category === 'IMMOBILIER';
    const matchesSubCategory = filter === 'All' || l.subCategory === filter;
    
    // Search logic
    const query = searchQuery.toLowerCase();
    const matchesSearch = 
      l.title.toLowerCase().includes(query) ||
      l.description.toLowerCase().includes(query) ||
      l.location.city.toLowerCase().includes(query) ||
      l.location.address.toLowerCase().includes(query);

    return matchesCategory && matchesSubCategory && matchesSearch;
  });

  return (
    <div className="pb-20">
       <div className="bg-white sticky top-16 z-40 shadow-sm border-b border-gray-200">
         <div className="flex overflow-x-auto p-2 gap-2 scrollbar-hide">
            <button 
              onClick={() => setFilter('All')}
              className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap ${filter === 'All' ? 'bg-teal-600 text-white' : 'bg-gray-100 text-gray-700'}`}
            >
              Tout voir
            </button>
            {CATEGORIES_IMMO.map(cat => (
              <button 
                key={cat.id}
                onClick={() => setFilter(cat.id as RealEstateSubCategory)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap ${filter === cat.id ? 'bg-teal-600 text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                {cat.label}
              </button>
            ))}
         </div>
       </div>

       <PublishPrompt user={user} language={language} />

       <div className="max-w-2xl mx-auto">
         {filteredListings.length > 0 ? (
           filteredListings.map(listing => (
             <ListingCard 
               key={listing.id} 
               listing={listing} 
               onAddComment={onAddComment} 
               onToggleLike={onToggleLike}
             />
           ))
         ) : (
           <div className="p-8 text-center text-gray-500 flex flex-col items-center">
             <span className="text-4xl mb-2">🔍</span>
             <p>Aucune annonce trouvée pour "{searchQuery || filter}".</p>
           </div>
         )}
       </div>
    </div>
  );
};