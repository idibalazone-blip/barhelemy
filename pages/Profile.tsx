
import React, { useState } from 'react';
import { User } from '../types';
import { Settings, ShieldCheck, MapPin, Lock, User as UserIcon, Camera, Bell, ToggleRight, ToggleLeft, Phone, UserPlus, LogIn, Globe, Check, X } from 'lucide-react';
import { MOCK_USERS } from '../constants';
import { useNavigate } from 'react-router-dom';
import { TRANSLATIONS } from '../translations';

interface ProfileProps {
  user: User;
  setUser: (u: User) => void;
  language: string;
  setLanguage: (lang: string) => void;
}

const LANGUAGES = [
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'ru', label: 'Русский', flag: '🇷🇺' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'zh', label: '中文 (Chinois)', flag: '🇨🇳' },
  { code: 'ar', label: 'العربية (Arabe)', flag: '🇸🇦' },
];

export const Profile: React.FC<ProfileProps> = ({ user, setUser, language, setLanguage }) => {
  const navigate = useNavigate();
  const t = TRANSLATIONS[language as keyof typeof TRANSLATIONS] || TRANSLATIONS['fr'];
  
  // State for Auth
  const [isRegistering, setIsRegistering] = useState(false);
  
  // Login Form State
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  // Register Form State
  const [regName, setRegName] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');
  
  const [error, setError] = useState('');

  // Language Modal State
  const [showLangModal, setShowLangModal] = useState(false);

  // Mock Notification Settings State
  const [alertSettings, setAlertSettings] = useState({
    newHouses: true,
    newRestaurants: true,
    promos: false
  });

  const toggleAlert = (key: keyof typeof alertSettings) => {
    setAlertSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleLanguageSelect = (lang: typeof LANGUAGES[0]) => {
    setLanguage(lang.code);
    setShowLangModal(false);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Check for admin
    const adminAccount = MOCK_USERS.find(
      u => u.role === 'admin' && u.username === username && u.password === password
    );

    if (adminAccount) {
      setUser(adminAccount);
      setUsername('');
      setPassword('');
      return;
    }

    // Simulate simple member login (if username is "membre" for demo)
    if (username === 'membre' && password === '1234') {
        setUser({
            id: 'mem1',
            name: 'Membre Test',
            role: 'member',
            avatar: 'https://picsum.photos/id/64/100/100'
        });
        return;
    }

    setError('Identifiant ou mot de passe incorrect.');
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!regName || !regPhone || !regPassword) {
        setError('Veuillez remplir tous les champs.');
        return;
    }

    // Simulate Registration
    const newMember: User = {
        id: Date.now().toString(),
        name: regName,
        role: 'member',
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(regName)}&background=0F766E&color=fff`,
        username: regPhone, // Using phone as username for simplicity
        phone: regPhone
    };

    // Log the user in immediately after registration
    setUser(newMember);
    setIsRegistering(false);
    // Reset form
    setRegName('');
    setRegPhone('');
    setRegPassword('');
  };

  const handleLogout = () => {
    const visitor = MOCK_USERS.find(u => u.role === 'user');
    if (visitor) setUser(visitor);
  };

  const isVisitor = user.role === 'user';
  const currentLangObj = LANGUAGES.find(l => l.code === language) || LANGUAGES[0];

  return (
    <div className="pb-20 bg-gray-50 min-h-screen">
       <div className="bg-white shadow-sm pb-6">
         <div className="h-24 bg-teal-600"></div>
         <div className="px-4 relative flex justify-between items-end -mt-10">
            <img src={user.avatar} alt="Profile" className="w-20 h-20 rounded-full border-4 border-white shadow-md bg-gray-200" />
            {!isVisitor && (
               <button onClick={handleLogout} className="bg-red-50 text-red-600 border border-red-200 px-4 py-1 rounded text-sm font-semibold hover:bg-red-100 transition-colors">
                 {t.profile_logout}
               </button>
            )}
         </div>
         <div className="px-4 mt-3">
            <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
            <p className="text-gray-500 text-sm flex items-center gap-1">
              <MapPin size={12} /> 
              {user.role === 'admin' ? t.profile_admin : user.role === 'member' ? t.profile_member : t.profile_visitor}
            </p>
            {user.role === 'admin' && (
              <span className="inline-block mt-2 bg-teal-100 text-teal-800 text-xs px-2 py-0.5 rounded-full font-bold">
                Mode Admin Actif
              </span>
            )}
            {user.role === 'member' && (
              <span className="inline-block mt-2 bg-purple-100 text-purple-800 text-xs px-2 py-0.5 rounded-full font-bold">
                Membre OK PLACE
              </span>
            )}
         </div>
       </div>

       <div className="mt-4 px-4 space-y-4">
          
          {/* Admin Shortcuts */}
          {user.role === 'admin' && (
            <div className="bg-white p-4 rounded-lg shadow-sm border border-teal-100">
               <h3 className="font-bold text-gray-800 mb-3">{t.action_quick}</h3>
               <button 
                  onClick={() => navigate('/publish')}
                  className="w-full bg-teal-600 text-white py-3 rounded-lg font-bold shadow-md flex items-center justify-center gap-2 hover:bg-teal-700 transition-colors"
                >
                   <Camera size={20} />
                   {t.action_photo}
                </button>
            </div>
          )}

          {/* Auth Section for Visitors */}
          {isVisitor && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                <div className="flex border-b border-gray-100">
                    <button 
                        onClick={() => setIsRegistering(false)}
                        className={`flex-1 py-3 text-sm font-semibold flex items-center justify-center gap-2 transition-colors ${!isRegistering ? 'text-teal-600 border-b-2 border-teal-600 bg-teal-50' : 'text-gray-500 hover:bg-gray-50'}`}
                    >
                        <LogIn size={16} /> {t.auth_login}
                    </button>
                    <button 
                        onClick={() => setIsRegistering(true)}
                        className={`flex-1 py-3 text-sm font-semibold flex items-center justify-center gap-2 transition-colors ${isRegistering ? 'text-teal-600 border-b-2 border-teal-600 bg-teal-50' : 'text-gray-500 hover:bg-gray-50'}`}
                    >
                        <UserPlus size={16} /> {t.auth_register}
                    </button>
                </div>

                <div className="p-5">
                    {error && <div className="text-red-500 text-xs bg-red-50 p-2 rounded mb-3 border border-red-100">{error}</div>}
                    
                    {!isRegistering ? (
                        /* LOGIN FORM */
                        <form onSubmit={handleLogin} className="space-y-3">
                            <p className="text-sm text-gray-600 mb-2">{t.auth_login_desc}</p>
                            <div className="relative">
                                <UserIcon size={16} className="absolute left-3 top-3 text-gray-400" />
                                <input 
                                    type="text" 
                                    placeholder="Identifiant ou Téléphone" 
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                                />
                            </div>
                            <div className="relative">
                                <Lock size={16} className="absolute left-3 top-3 text-gray-400" />
                                <input 
                                    type="password" 
                                    placeholder="Mot de passe" 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                                />
                            </div>
                            <button 
                                type="submit" 
                                className="w-full bg-teal-600 text-white py-2.5 rounded-md font-bold text-sm hover:bg-teal-700 transition-colors shadow-sm"
                            >
                                {t.btn_login}
                            </button>
                            <div className="mt-2 text-center">
                                <span className="text-xs text-gray-400">Admin Demo: admin1 / douala2025</span>
                            </div>
                        </form>
                    ) : (
                        /* REGISTER FORM */
                        <form onSubmit={handleRegister} className="space-y-3">
                             <p className="text-sm text-gray-600 mb-2">{t.auth_register_desc}</p>
                             <div className="relative">
                                <UserIcon size={16} className="absolute left-3 top-3 text-gray-400" />
                                <input 
                                    type="text" 
                                    placeholder="Nom Complet" 
                                    value={regName}
                                    onChange={(e) => setRegName(e.target.value)}
                                    className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                                />
                            </div>
                            <div className="relative">
                                <Phone size={16} className="absolute left-3 top-3 text-gray-400" />
                                <input 
                                    type="tel" 
                                    placeholder="Numéro de Téléphone" 
                                    value={regPhone}
                                    onChange={(e) => setRegPhone(e.target.value)}
                                    className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                                />
                            </div>
                            <div className="relative">
                                <Lock size={16} className="absolute left-3 top-3 text-gray-400" />
                                <input 
                                    type="password" 
                                    placeholder="Créer un mot de passe" 
                                    value={regPassword}
                                    onChange={(e) => setRegPassword(e.target.value)}
                                    className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                                />
                            </div>
                            <button 
                                type="submit" 
                                className="w-full bg-teal-600 text-white py-2.5 rounded-md font-bold text-sm hover:bg-teal-700 transition-colors shadow-sm"
                            >
                                {t.btn_register}
                            </button>
                        </form>
                    )}
                </div>
            </div>
          )}

          {/* Alert Settings */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
             <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                <Bell size={18} className="text-teal-600"/>
                {t.alert_title}
             </h3>
             <p className="text-xs text-gray-500 mb-3">{t.alert_desc}</p>
             
             <div className="space-y-3">
               <div 
                 onClick={() => toggleAlert('newHouses')}
                 className="flex justify-between items-center cursor-pointer p-2 hover:bg-gray-50 rounded"
               >
                  <span className="text-sm text-gray-700 font-medium">{t.alert_immo}</span>
                  {alertSettings.newHouses 
                    ? <ToggleRight className="text-teal-600" size={32} /> 
                    : <ToggleLeft className="text-gray-300" size={32} />}
               </div>
               
               <div 
                 onClick={() => toggleAlert('newRestaurants')}
                 className="flex justify-between items-center cursor-pointer p-2 hover:bg-gray-50 rounded"
               >
                  <span className="text-sm text-gray-700 font-medium">{t.alert_resto}</span>
                  {alertSettings.newRestaurants 
                    ? <ToggleRight className="text-teal-600" size={32} /> 
                    : <ToggleLeft className="text-gray-300" size={32} />}
               </div>

               <div 
                 onClick={() => toggleAlert('promos')}
                 className="flex justify-between items-center cursor-pointer p-2 hover:bg-gray-50 rounded"
               >
                  <span className="text-sm text-gray-700 font-medium">{t.alert_promo}</span>
                  {alertSettings.promos 
                    ? <ToggleRight className="text-teal-600" size={32} /> 
                    : <ToggleLeft className="text-gray-300" size={32} />}
               </div>
             </div>
          </div>

          {/* Settings Menu */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
             <button className="w-full text-left px-4 py-4 border-b border-gray-100 flex items-center gap-3 hover:bg-gray-50">
                <Settings className="text-gray-400" size={20} />
                <span className="text-gray-700">{t.settings_app}</span>
             </button>
             <button className="w-full text-left px-4 py-4 border-b border-gray-100 flex items-center gap-3 hover:bg-gray-50">
                <ShieldCheck className="text-gray-400" size={20} />
                <span className="text-gray-700">{t.settings_sec}</span>
             </button>
             <button 
                onClick={() => setShowLangModal(true)}
                className="w-full text-left px-4 py-4 flex items-center gap-3 hover:bg-gray-50"
             >
                <Globe className="text-gray-400" size={20} />
                <span className="text-gray-700 flex-1">{t.settings_lang}</span>
                <div className="flex items-center gap-2">
                    <span className="text-xl">{currentLangObj.flag}</span>
                    <span className="text-xs text-gray-400 font-medium">{currentLangObj.label}</span>
                </div>
             </button>
          </div>
       </div>

       {/* Language Modal */}
       {showLangModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-teal-600 text-white">
                    <h3 className="font-bold flex items-center gap-2">
                        <Globe size={18} /> {t.settings_lang}
                    </h3>
                    <button onClick={() => setShowLangModal(false)} className="p-1 hover:bg-teal-700 rounded-full">
                        <X size={20} />
                    </button>
                </div>
                <div className="max-h-[60vh] overflow-y-auto">
                    {LANGUAGES.map((lang) => (
                        <button
                            key={lang.code}
                            onClick={() => handleLanguageSelect(lang)}
                            className={`w-full px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0 ${language === lang.code ? 'bg-teal-50' : ''}`}
                        >
                            <div className="flex items-center gap-3">
                                <span className="text-2xl">{lang.flag}</span>
                                <span className={`font-medium ${language === lang.code ? 'text-teal-800' : 'text-gray-700'}`}>
                                    {lang.label}
                                </span>
                            </div>
                            {language === lang.code && (
                                <Check size={18} className="text-teal-600" />
                            )}
                        </button>
                    ))}
                </div>
            </div>
        </div>
       )}
    </div>
  );
};
