
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CATEGORIES_IMMO, CATEGORIES_FOOD } from '../constants';
import { User, Listing } from '../types';
import { Camera, MapPin, Phone, MessageCircle, Image as ImageIcon, CheckCircle, UserPlus } from 'lucide-react';

interface PublishProps {
  user: User;
  onAddListing: (listing: Listing) => void;
}

export const Publish: React.FC<PublishProps> = ({ user, onAddListing }) => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form State
  const [category, setCategory] = useState<'IMMOBILIER' | 'RESTAURATION'>('IMMOBILIER');
  const [subCategory, setSubCategory] = useState<string>('');
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Douala');

  // Initialize subcategory default
  useEffect(() => {
    const defaultSub = category === 'IMMOBILIER' ? CATEGORIES_IMMO[0].id : CATEGORIES_FOOD[0].id;
    setSubCategory(defaultSub);
  }, [category]);

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!previewImage) {
      alert("Veuillez prendre ou sélectionner une photo pour l'annonce.");
      return;
    }

    if (!title || !price || !phone) {
      alert("Veuillez remplir les champs obligatoires (Titre, Prix, Téléphone).");
      return;
    }

    const newListing: Listing = {
      id: Date.now().toString(),
      title,
      description,
      price: parseInt(price) || 0,
      currency: 'FCFA',
      category,
      subCategory: subCategory as any,
      image: previewImage,
      location: {
        city,
        address: address || city,
        lat: 4.05, // Mock coordinates
        lng: 9.70
      },
      contact: {
        phone,
        whatsapp: whatsapp || phone,
        email: 'contact@okplace.cm'
      },
      authorId: user.id,
      likes: 0,
      isLiked: false,
      comments: [],
      isAvailable: true
    };

    onAddListing(newListing);
    
    // Redirect to the appropriate feed
    if (category === 'IMMOBILIER') {
      navigate('/immobilier');
    } else {
      navigate('/restauration');
    }
  };

  if (user.role === 'user') { // 'user' is the visitor role
    return (
      <div className="p-10 text-center flex flex-col items-center justify-center h-[calc(100vh-128px)]">
        <UserPlus size={48} className="text-teal-400 mb-4" />
        <h2 className="text-lg font-bold text-gray-800 mb-2">Devenez membre pour publier</h2>
        <p className="text-gray-600 mb-6 max-w-sm">Connectez-vous ou inscrivez-vous pour partager vos annonces sur OK PLACE.</p>
        <button
          onClick={() => navigate('/profile')}
          className="bg-teal-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-teal-700 transition-colors"
        >
          Se connecter / S'inscrire
        </button>
      </div>
    );
  }

  const currentCategories = category === 'IMMOBILIER' ? CATEGORIES_IMMO : CATEGORIES_FOOD;

  return (
    <div className="pb-20 p-4 max-w-lg mx-auto bg-white min-h-screen">
      <h2 className="text-xl font-bold text-teal-600 mb-6 flex items-center gap-2">
        <Camera size={28} />
        Publier une annonce
      </h2>
      
      <form className="space-y-5" onSubmit={handleSubmit}>
        
        {/* Photo Upload Section */}
        <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleImageSelect} 
            className="hidden" 
            accept="image/*" 
            capture="environment"
        />

        <div 
            onClick={triggerFileInput}
            className={`border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer transition-colors relative overflow-hidden h-64 w-full ${previewImage ? 'border-teal-500' : 'border-teal-300 bg-gray-50 hover:bg-teal-50'}`}
        >
            {previewImage ? (
                <>
                  <img src={previewImage} alt="Preview" className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <span className="text-white font-bold bg-black/50 px-3 py-1 rounded-full">Changer la photo</span>
                  </div>
                </>
            ) : (
                <div className="flex flex-col items-center p-8">
                    <div className="mb-2 relative">
                        <Camera size={48} className="text-teal-500" />
                        <ImageIcon size={24} className="absolute -bottom-1 -right-2 text-teal-400 bg-white rounded-full" />
                    </div>
                    <span className="font-bold text-center text-teal-600">Appuyer pour prendre une photo</span>
                    <span className="text-xs text-gray-500 mt-1 text-center">ou sélectionner depuis la galerie</span>
                </div>
            )}
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Type de Publication</label>
          <div className="flex gap-4">
            <button 
              type="button"
              onClick={() => setCategory('IMMOBILIER')}
              className={`flex-1 py-3 rounded-lg font-medium border transition-all ${category === 'IMMOBILIER' ? 'bg-teal-600 text-white border-teal-600 shadow-md transform scale-105' : 'bg-white text-gray-700 border-gray-300'}`}
            >
              Immobilier
            </button>
            <button 
              type="button"
              onClick={() => setCategory('RESTAURATION')}
              className={`flex-1 py-3 rounded-lg font-medium border transition-all ${category === 'RESTAURATION' ? 'bg-teal-600 text-white border-teal-600 shadow-md transform scale-105' : 'bg-white text-gray-700 border-gray-300'}`}
            >
              Restauration
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Catégorie spécifique</label>
          <select 
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg bg-white outline-none focus:border-teal-500"
          >
            {currentCategories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Titre de l'annonce *</label>
          <input 
            type="text" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:border-teal-500" 
            placeholder="Ex: Studio Haut Standing"
            required 
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description détaillée</label>
          <textarea 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg h-24 outline-none focus:border-teal-500" 
            placeholder="Détails, conditions..."
          ></textarea>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Prix *</label>
            <input 
              type="number" 
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:border-teal-500" 
              placeholder="0"
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Devise</label>
            <input type="text" disabled value="FCFA" className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-500" />
          </div>
        </div>

        {/* Contact Information Section */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <Phone size={18} /> Contacts pour l'annonce
          </h3>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Numéro Appel *</label>
              <input 
                type="tel" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:border-teal-500" 
                placeholder="+237 6..."
                required 
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1 flex items-center gap-1"><MessageCircle size={12}/> Numéro WhatsApp</label>
              <input 
                type="tel" 
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:border-teal-500" 
                placeholder="Laisser vide si identique" 
              />
            </div>
          </div>
        </div>

        {/* Location Section */}
        <div className="border-t pt-4 mt-4">
          <h3 className="font-semibold mb-2 flex items-center gap-2 text-gray-800">
            <MapPin size={20} className="text-red-500" />
            Localisation
          </h3>
          
          <div className="grid grid-cols-2 gap-4 mb-3">
             <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Ville</label>
                <select 
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg bg-white"
                >
                    <option value="Douala">Douala</option>
                    <option value="Yaoundé">Yaoundé</option>
                    <option value="Kribi">Kribi</option>
                    <option value="Bafoussam">Bafoussam</option>
                    <option value="Garoua">Garoua</option>
                    <option value="Autre">Autre</option>
                </select>
             </div>
             <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Quartier / Adresse</label>
                <input 
                  type="text" 
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Ex: Akwa, Rue X"
                  className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:border-teal-500"
                />
             </div>
          </div>

          <button type="button" className="w-full py-3 bg-teal-50 text-teal-600 rounded-lg text-sm font-bold mb-3 border border-teal-100 flex justify-center items-center gap-2 hover:bg-teal-100">
            <MapPin size={16} />
            Utiliser ma position GPS
          </button>
        </div>

        <button 
          type="submit" 
          className="w-full bg-teal-600 text-white py-4 rounded-lg font-bold text-lg shadow-lg hover:bg-teal-700 transition-colors mt-6 flex justify-center items-center gap-2"
        >
          <CheckCircle />
          PUBLIER L'ANNONCE
        </button>
      </form>
    </div>
  );
};
