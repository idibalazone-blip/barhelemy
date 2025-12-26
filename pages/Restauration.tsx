
import React from 'react';
import { ListingCard } from '../components/ListingCard';
import { Listing, User } from '../types';
import { PublishPrompt } from '../components/PublishPrompt';

interface RestaurationProps {
  listings: Listing[];
  onAddComment: (id: string, text: string) => void;
  onToggleLike: (id: string) => void;
  searchQuery: string;
  user: User;
  language: string;
}

export const Restauration: React.FC<RestaurationProps> = ({ listings, onAddComment, onToggleLike, searchQuery, user, language }) => {
  
  const filteredListings = listings.filter(l => {
    const matchesCategory = l.category === 'RESTAURATION';
    
    // Search logic
    const query = searchQuery.toLowerCase();
    const matchesSearch = 
      l.title.toLowerCase().includes(query) ||
      l.description.toLowerCase().includes(query) ||
      l.location.city.toLowerCase().includes(query) ||
      l.location.address.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pb-20">
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
             <p>Aucun restaurant trouvé pour "{searchQuery}".</p>
           </div>
         )}
       </div>
    </div>
  );
};