import React from 'react';
import { AppNotification } from '../types';
import { Bell, CheckCircle, Info, Tag } from 'lucide-react';

interface NotificationsProps {
  notifications: AppNotification[];
  markAllAsRead: () => void;
}

export const Notifications: React.FC<NotificationsProps> = ({ notifications, markAllAsRead }) => {
  
  const getIcon = (type: string) => {
    switch(type) {
      case 'alert': return <Bell className="text-teal-500" size={20} />;
      case 'promo': return <Tag className="text-pink-500" size={20} />;
      default: return <Info className="text-gray-500" size={20} />;
    }
  };

  return (
    <div className="pb-20 min-h-screen bg-gray-50">
      <div className="bg-white p-4 shadow-sm border-b border-gray-200 flex justify-between items-center sticky top-16 z-40">
        <h1 className="text-xl font-bold text-gray-800">Notifications</h1>
        {notifications.some(n => !n.isRead) && (
          <button 
            onClick={markAllAsRead}
            className="text-sm text-teal-600 font-medium hover:underline flex items-center gap-1"
          >
            <CheckCircle size={14} /> Tout lire
          </button>
        )}
      </div>

      <div className="max-w-2xl mx-auto p-4 space-y-3">
        {notifications.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            <Bell size={48} className="mx-auto text-gray-300 mb-3" />
            <p>Aucune notification pour le moment.</p>
          </div>
        ) : (
          notifications.map((notif) => (
            <div 
              key={notif.id} 
              className={`p-4 rounded-lg shadow-sm border flex gap-3 transition-colors ${notif.isRead ? 'bg-white border-gray-100' : 'bg-teal-50 border-teal-100'}`}
            >
              <div className={`mt-1 min-w-[30px] h-[30px] rounded-full flex items-center justify-center ${notif.isRead ? 'bg-gray-100' : 'bg-white'}`}>
                {getIcon(notif.type)}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                   <h3 className={`font-semibold text-sm ${notif.isRead ? 'text-gray-700' : 'text-gray-900'}`}>{notif.title}</h3>
                   <span className="text-[10px] text-gray-400 whitespace-nowrap ml-2">{notif.date}</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{notif.message}</p>
              </div>
              {!notif.isRead && (
                <div className="self-center">
                   <div className="w-2 h-2 rounded-full bg-teal-600"></div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};