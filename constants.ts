import { Listing, User, AppNotification } from './types';

export const APP_NAME = "OK PLACE";
export const FB_BLUE = "#1877F2";

export const MOCK_USERS: User[] = [
  { 
    id: 'admin1', 
    name: 'Admin Douala', 
    role: 'admin', 
    avatar: 'https://picsum.photos/id/1005/100/100',
    username: 'admin1',
    password: 'douala2025'
  },
  { 
    id: 'admin2', 
    name: 'Admin Yaoundé', 
    role: 'admin', 
    avatar: 'https://picsum.photos/id/1011/100/100',
    username: 'admin2',
    password: 'yaounde2025'
  },
  { 
    id: 'user1', 
    name: 'Visiteur', 
    role: 'user', 
    avatar: 'https://picsum.photos/id/1025/100/100' 
  },
];

export const MOCK_NOTIFICATIONS: AppNotification[] = [
  {
    id: '1',
    title: 'Nouveau Studio à Makepe',
    message: 'Un studio correspondant à vos critères "Immobilier - Douala" vient d\'être publié.',
    date: 'À l\'instant',
    isRead: false,
    type: 'alert'
  },
  {
    id: '2',
    title: 'Promo du Chef !',
    message: '-30% sur tous les plats au Restaurant Le Wouri ce midi.',
    date: 'Il y a 2h',
    isRead: false,
    type: 'promo'
  },
  {
    id: '3',
    title: 'Bienvenue sur OK PLACE',
    message: 'N\'oubliez pas de configurer vos alertes dans votre profil.',
    date: 'Hier',
    isRead: true,
    type: 'system'
  }
];

export const MOCK_LISTINGS: Listing[] = [
  {
    id: '1',
    title: 'Hôtel La Falaise - Chambre Deluxe',
    description: 'Profitez d\'une vue imprenable sur le Wouri. Petit déjeuner inclus, wifi haut débit et piscine.',
    price: 45000,
    currency: 'FCFA',
    category: 'IMMOBILIER',
    subCategory: 'Hotel',
    image: 'https://picsum.photos/id/164/800/600',
    location: { city: 'Douala', address: 'Bonanjo', lat: 4.0511, lng: 9.7679 },
    contact: { phone: '+237600000000', whatsapp: '237600000000', email: 'hotel@okplace.cm' },
    authorId: 'admin1',
    likes: 120,
    isLiked: false,
    comments: [],
    isAvailable: true
  },
  {
    id: '2',
    title: 'Restaurant Le Populaire de Yaoundé',
    description: 'Cuisine locale et plats du jour. Ouvert de 12h à 22h.',
    price: 3500,
    currency: 'FCFA',
    category: 'RESTAURATION',
    subCategory: 'Restaurant',
    image: 'https://picsum.photos/id/292/800/600',
    location: { city: 'Yaoundé', address: 'Biyem-Assi', lat: 3.8480, lng: 11.5021 },
    contact: { phone: '+237600000001', whatsapp: '237600000001', email: 'resto@okplace.cm' },
    authorId: 'admin2',
    likes: 450,
    isLiked: false,
    comments: [],
    isAvailable: true
  },
  {
    id: '3',
    title: 'Villa Duplex à Louer',
    description: '4 chambres, 3 douches, parking sécurisé. Quartier calme.',
    price: 250000,
    currency: 'FCFA',
    category: 'IMMOBILIER',
    subCategory: 'AgentImmo',
    image: 'https://picsum.photos/id/234/800/600',
    location: { city: 'Douala', address: 'Makepe', lat: 4.06, lng: 9.77 },
    contact: { phone: '+237600000002', whatsapp: '237600000002', email: 'immo@okplace.cm' },
    authorId: 'admin1',
    likes: 45,
    isLiked: false,
    comments: [],
    isAvailable: true
  },
  {
    id: '4',
    title: 'Restaurant Le Festin - Kribi',
    description: 'Spécialités de fruits de mer et grillades. Idéal pour vos événements.',
    price: 15000,
    currency: 'FCFA',
    category: 'RESTAURATION',
    subCategory: 'Restaurant',
    image: 'https://picsum.photos/id/431/800/600',
    location: { city: 'Kribi', address: 'Centre Ville', lat: 2.94, lng: 9.91 },
    contact: { phone: '+237600000003', whatsapp: '237600000003', email: 'traiteur@okplace.cm' },
    authorId: 'admin2',
    likes: 89,
    isLiked: false,
    comments: [],
    isAvailable: true
  }
];

export const CATEGORIES_IMMO = [
  { id: 'Hotel', label: 'Hôtels' },
  { id: 'Motel', label: 'Motels' },
  { id: 'Auberge', label: 'Auberges' },
  { id: 'SalleFete', label: 'Salles de fêtes' },
  { id: 'EspaceVert', label: 'Espaces verts' },
  { id: 'SalleReunion', label: 'Salles de réunion' },
  { id: 'AgentImmo', label: 'Agent Immobilier' },
  { id: 'Cinema', label: 'Salles de cinéma' },
];

export const CATEGORIES_FOOD = [
  { id: 'Restaurant', label: 'Restaurants' },
];