
import React from 'react';
import { ListingCard } from '../components/ListingCard';
import { CATEGORIES_IMMO, CATEGORIES_FOOD } from '../constants';
import { Listing, User } from '../types';
import { PublishPrompt } from '../components/PublishPrompt';

interface HomeProps {
  listings: Listing[];
  onAddComment: (id: string, text: string) => void;
  onToggleLike: (id: string) => void;
  user: User;
  language: string;
}

export const Home: React.FC<HomeProps> = ({ listings, onAddComment, onToggleLike, user, language }) => {
  return (
    <div className="pb-20">
      {/* Quick Access Categories */}
      <div className="bg-white p-4 mb-2 shadow-sm">
        <h2 className="font-bold text-gray-700 mb-3 text-sm uppercase">Découvrir</h2>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {[...CATEGORIES_IMMO, ...CATEGORIES_FOOD].sort(() => 0.5 - Math.random()).slice(0, 6).map((cat) => (
             <div key={cat.id} className="flex-shrink-0 flex flex-col items-center w-20">
               <div className="w-14 h-14 bg-teal-50 rounded-full flex items-center justify-center text-teal-600 mb-1 border border-teal-100">
                 {cat.label.charAt(0)}
               </div>
               <span className="text-[10px] text-center text-gray-600 font-medium leading-tight">{cat.label}</span>
             </div>
          ))}
        </div>
      </div>

      <PublishPrompt user={user} language={language} />

      {/* Feed */}
      <div className="max-w-2xl mx-auto">
        {listings.map(listing => (
          <ListingCard 
            key={listing.id} 
            listing={listing} 
            onAddComment={onAddComment}
            onToggleLike={onToggleLike}
          />
        ))}
      </div>
    </div>
  );
};