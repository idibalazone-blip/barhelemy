import React, { useState } from 'react';
import { Listing } from '../types';
import { Phone, MessageCircle, Mail, MapPin, Send, MessageSquare, Heart } from 'lucide-react';
import { Logo } from './Logo';

interface ListingCardProps {
  listing: Listing;
  onAddComment?: (id: string, text: string) => void;
  onToggleLike?: (id: string) => void;
}

export const ListingCard: React.FC<ListingCardProps> = ({ listing, onAddComment, onToggleLike }) => {
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentText.trim() && onAddComment) {
      onAddComment(listing.id, commentText);
      setCommentText("");
    }
  };

  // Ensure phone number is clean for the dialer
  const dialNumber = listing.contact.phone.replace(/\s/g, '');

  return (
    <div className="bg-white mb-4 shadow-sm border-t border-b border-gray-200 sm:rounded-lg sm:border">
      {/* Header */}
      <div className="p-3 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center border border-teal-100 overflow-hidden">
          <Logo size="sm" />
        </div>
        <div>
          <h3 className="font-bold text-gray-900 leading-tight">{listing.title}</h3>
          <p className="text-xs text-gray-500 flex items-center gap-1">
            {listing.subCategory} • <MapPin size={10} /> {listing.location.city}, {listing.location.address}
          </p>
        </div>
        <div className="ml-auto text-teal-600 font-bold text-lg">
          {listing.price.toLocaleString()} {listing.currency}
        </div>
      </div>

      {/* Content */}
      <div className="w-full h-64 bg-gray-100 overflow-hidden relative">
        <img src={listing.image} alt={listing.title} className="w-full h-full object-cover" />
        <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded text-xs font-bold text-green-700 shadow-sm">
           {listing.isAvailable ? 'DISPONIBLE' : 'INDISPONIBLE'}
        </div>
      </div>

      <div className="p-3">
        <p className="text-gray-800 text-sm mb-2">{listing.description}</p>
      </div>

      {/* Action Stats - Likes and Comments */}
      <div 
        className="px-3 py-2 flex justify-between items-center text-gray-500 text-xs border-b border-gray-100"
      >
         <button 
            onClick={() => onToggleLike && onToggleLike(listing.id)}
            className="flex items-center gap-1 hover:bg-pink-50 px-2 py-1 rounded-full transition-colors"
         >
           <Heart 
              size={18} 
              className={`transition-all duration-300 ${listing.isLiked ? 'text-pink-500 fill-pink-500 scale-110' : 'text-pink-400'}`} 
           />
           <span className={`font-semibold ${listing.isLiked ? 'text-pink-600' : 'text-gray-500'}`}>
             {listing.likes} {listing.likes > 1 ? 'J\'aimes' : 'J\'aime'}
           </span>
         </button>

         <span 
            className="cursor-pointer font-medium text-teal-600 hover:underline"
            onClick={() => setShowComments(!showComments)}
         >
           {listing.comments.length > 0 ? `${listing.comments.length} commentaires` : 'Soyez le premier à commenter'}
         </span>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="bg-gray-50 border-b border-gray-200">
          <div className="p-3 max-h-60 overflow-y-auto space-y-3">
            {listing.comments.length === 0 ? (
              <p className="text-center text-xs text-gray-400 italic py-2">Aucun commentaire pour l'instant.</p>
            ) : (
              listing.comments.map((comment) => (
                <div key={comment.id} className="bg-white p-2 rounded shadow-sm text-sm">
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-bold text-gray-800 text-xs">{comment.user}</span>
                    <span className="text-[10px] text-gray-400">{comment.date}</span>
                  </div>
                  <p className="text-gray-600 text-xs">{comment.text}</p>
                </div>
              ))
            )}
          </div>
          
          {/* Comment Input */}
          <form onSubmit={handleSubmitComment} className="p-2 border-t border-gray-200 flex gap-2 items-center bg-white">
            <input 
              type="text" 
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Écrire un commentaire..." 
              className="flex-1 text-sm bg-gray-100 border-none rounded-full px-4 py-2 focus:ring-1 focus:ring-teal-500 outline-none"
            />
            <button 
              type="submit" 
              disabled={!commentText.trim()}
              className="p-2 text-teal-600 rounded-full hover:bg-teal-50 disabled:text-gray-300"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-between px-2 py-2">
        <a href={`tel:${dialNumber}`} className="flex-1 flex items-center justify-center gap-2 py-2 rounded-md hover:bg-gray-100 text-gray-600 font-medium transition-colors">
          <Phone size={18} />
          <span className="text-sm">Appeler</span>
        </a>
        <a 
          href={`https://wa.me/${listing.contact.whatsapp}?text=Bonjour, je suis intéressé par ${listing.title}`} 
          target="_blank" 
          rel="noreferrer"
          className="flex-1 flex items-center justify-center gap-2 py-2 rounded-md hover:bg-gray-100 text-gray-600 font-medium transition-colors"
        >
          <MessageCircle size={18} />
          <span className="text-sm">WhatsApp</span>
        </a>
        <button 
          onClick={() => setShowComments(!showComments)}
          className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md font-medium transition-colors ${showComments ? 'text-teal-600 bg-teal-50' : 'text-gray-600 hover:bg-gray-100'}`}
        >
          <MessageSquare size={18} />
          <span className="text-sm">Avis</span>
        </button>
      </div>

      {/* Email / Book Secondary Action */}
      <div className="px-3 pb-3 pt-1 flex gap-2">
        <a href={`mailto:${listing.contact.email}`} className="flex-1 bg-gray-100 text-center py-2 rounded-md text-sm font-semibold text-gray-700 hover:bg-gray-200 transition-colors">
          <Mail className="inline mr-1" size={14}/> Email
        </a>
        <button className="flex-1 bg-teal-600 text-center py-2 rounded-md text-sm font-semibold text-white shadow-sm hover:bg-teal-700 transition-colors">
          Réserver Maintenant
        </button>
      </div>
    </div>
  );
};