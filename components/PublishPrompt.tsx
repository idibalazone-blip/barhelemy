
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../types';
import { Camera } from 'lucide-react';
import { TRANSLATIONS } from '../translations';

interface PublishPromptProps {
  user: User;
  language?: string;
}

export const PublishPrompt: React.FC<PublishPromptProps> = ({ user, language = 'fr' }) => {
  const navigate = useNavigate();
  const t = TRANSLATIONS[language as keyof typeof TRANSLATIONS] || TRANSLATIONS['fr'];

  // Only show for logged-in members or admins
  if (user.role === 'user') {
    return null;
  }

  return (
    <div className="bg-white p-3 my-2 shadow-sm sm:rounded-lg border-b border-t border-gray-200 max-w-2xl mx-auto sm:border">
      <div className="flex items-center gap-3">
        <img src={user.avatar} alt="Votre avatar" className="w-10 h-10 rounded-full bg-gray-200" />
        <div 
          onClick={() => navigate('/publish')}
          className="flex-1 bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer rounded-full px-4 py-2 text-sm text-gray-500"
        >
          {t.publish_prompt}
        </div>
        <button
           onClick={() => navigate('/publish')}
           className="flex items-center gap-2 bg-teal-50 text-teal-600 px-3 py-2 rounded-full font-semibold text-sm hover:bg-teal-100 transition-colors"
        >
           <Camera size={16} />
           <span className="hidden sm:inline">{t.publish_button}</span>
        </button>
      </div>
    </div>
  );
};
