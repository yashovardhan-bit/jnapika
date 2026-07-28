import img1 from '../assets/imageone.jpeg';
import img2 from '../assets/giftcard1.jpeg';
import img3 from '../assets/giftcard2.jpeg';
import img4 from '../assets/pencilart1.jpeg';
import img5 from '../assets/bouquet1.jpeg';
import img6 from '../assets/letter1.jpeg';

export const CATEGORIES = [
  {
    id: 'all',
    name: 'All Gifts',
    icon: 'Sparkles',
    count: '20+ Items',
    description: 'Explore our complete handcrafted collection',
    badge: 'Popular'
  },
  {
    id: 'personalized',
    name: 'Personalized Gifts',
    icon: 'Sparkles',
    count: '16 Items',
    description: 'Custom letters, photo frames, photo cards & personalized keepsakes',
    image: img6,
    badge: 'Custom'
  },
  {
    id: 'vintageletters',
    name: 'Vintage Letters',
    icon: 'Heart',
    count: '12 Items',
    description: 'Wax-sealed handwritten letters & sentimental love scrolls',
    image: img6,
    badge: 'Romantic'
  },

  {
    id: 'photoframe',
    name: 'Photo Frames',
    icon: 'Sun',
    count: '15 Items',
    description: 'Personalized wooden frames & glowing photo displays',
    image: img1,
    badge: 'Best Seller'
  },
  {
    id: 'photocards',
    name: 'Photo Cards',
    icon: 'Crown',
    count: '10 Items',
    description: 'Custom Polaroid style mini photo cards & reels',
    image: img3,
    badge: 'Trending'
  },
  {
    id: 'giftcard',
    name: 'Gift Cards',
    icon: 'Cake',
    count: '8 Items',
    description: 'Artistic handcrafted surprise gift cards & vouchers',
    image: img2,
    badge: 'Popular'
  },
  {
    id: 'birthdaybook',
    name: 'Birthday Book',
    icon: 'Crown',
    count: '14 Items',
    description: 'Keepsake memory journals & milestone photo books',
    image: img1,
    badge: 'Special'
  },
  {
    id: 'bouquet',
    name: 'Bouquets',
    icon: 'Users',
    count: '10 Items',
    description: 'Handmade satin ribbon roses & everlasting flower bunches',
    image: img5,
    badge: 'Cute'
  },
  {
    id: 'pencilart',
    name: 'Pencil Art',
    icon: 'Sun',
    count: '9 Items',
    description: 'Custom portrait sketches & hand-drawn charcoal art',
    image: img4,
    badge: 'New'
  }
];

// Alias for backward compatibility
export const OCCASIONS = CATEGORIES;

export const SEARCH_KEYWORDS = [
  'Gift Cards',
  'Birthday',
  'Letters',
  'Photo Frame',
  'Photo Cards',
  'Bouquet',
  'Pencil Art',
  'Anniversary',
  'Explosion Box'
];

export const PRODUCTS = [
  {
    id: 'prod-1',
    name: 'Handwritten Vintage Letter',
    category: 'vintageletters',
    price: 349,
    originalPrice: 499,
    rating: 5.0,
    reviewsCount: 142,
    isBestseller: true,
    isNew: false,
    isPersonalized: true,
    offerBadge: 'Handmade',
    image: img6,
    description: 'A deeply personal letter written on aged parchment paper, sealed with real red sealing wax & twine ribbon.',
    material: 'Aged Parchment Paper + Red Sealing Wax',
    deliveryTime: '24 Hours'
  },
  {
    id: 'prod-2',
    name: 'Memory Photo Frame',
    category: 'photoframe',
    price: 899,
    originalPrice: 1199,
    rating: 5.0,
    reviewsCount: 126,
    isBestseller: true,
    isNew: false,
    isPersonalized: true,
    offerBadge: 'Bestseller',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=800&auto=format&fit=crop',
    description: 'Elegant handcrafted wooden frame personalized with your favorite photo and custom engraved text.',
    material: 'Natural Pine Wood + Glass Cover',
    deliveryTime: '24-48 Hours'
  },
  {
    id: 'prod-3',
    name: 'Polaroid Mini Photo Cards Set',
    category: 'photocards',
    price: 299,
    originalPrice: 449,
    rating: 4.9,
    reviewsCount: 98,
    isBestseller: true,
    isNew: true,
    isPersonalized: true,
    offerBadge: 'Pack of 12',
    image: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=800&auto=format&fit=crop',
    description: 'Set of 12 glossy Polaroid-style prints with custom captions and fairy light wooden clips.',
    material: '300GSM Glossy Photo Paper',
    deliveryTime: '24 Hours'
  },
  {
    id: 'prod-4',
    name: 'Birthday Celebration Gift Card',
    category: 'giftcard',
    price: 199,
    originalPrice: 299,
    rating: 4.8,
    reviewsCount: 64,
    isBestseller: false,
    isNew: false,
    isPersonalized: true,
    offerBadge: 'Cute Design',
    image: img2,
    description: 'Pop-up handcrafted birthday card with custom handwritten message space and secret voucher holder.',
    material: 'Textured Craft Cardboard',
    deliveryTime: '24 Hours'
  },
  {
    id: 'prod-5',
    name: 'Custom Birthday Memory Book',
    category: 'birthdaybook',
    price: 799,
    originalPrice: 1099,
    rating: 5.0,
    reviewsCount: 87,
    isBestseller: true,
    isNew: true,
    isPersonalized: true,
    offerBadge: 'Milestone',
    image: img1,
    description: 'Personalized scrapbook journal loaded with photo slots, quotes, and birthday memory prompts.',
    material: 'Hardbound Kraft Paper Cover',
    deliveryTime: '48 Hours'
  },
  {
    id: 'prod-6',
    name: 'Satin Ribbon Rose Bouquet',
    category: 'bouquet',
    price: 599,
    originalPrice: 799,
    rating: 4.9,
    reviewsCount: 110,
    isBestseller: true,
    isNew: false,
    isPersonalized: false,
    offerBadge: 'Forever Flower',
    image: img5,
    description: 'Everlasting handcrafted rose bouquet made from silky pink satin ribbon that never fades.',
    material: 'Premium Satin Ribbon & Floral Wire',
    deliveryTime: '24 Hours'
  },
  {
    id: 'prod-7',
    name: 'Hand-drawn Charcoal Sketch',
    category: 'pencilart',
    price: 999,
    originalPrice: 1499,
    rating: 5.0,
    reviewsCount: 75,
    isBestseller: true,
    isNew: true,
    isPersonalized: true,
    offerBadge: 'Original Art',
    image: img4,
    description: 'Hyper-realistic custom portrait drawn by student artists from your reference photograph.',
    material: 'Derwent Graphite on Fabriano Paper',
    deliveryTime: '48-72 Hours'
  },
  {
    id: 'prod-8',
    name: 'Love Scroll in Glass Bottle',
    category: 'vintageletters',
    price: 399,
    originalPrice: 599,
    rating: 4.9,
    reviewsCount: 52,
    isBestseller: false,
    isNew: true,
    isPersonalized: true,
    offerBadge: 'Romantic',
    image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=800&auto=format&fit=crop',
    description: 'Miniature parchment letter tied with golden thread inside a corked glass bottle filled with red hearts.',
    material: 'Glass Bottle + Parchment Scroll',
    deliveryTime: '24 Hours'
  },
  {
    id: 'prod-9',
    name: 'Glowing LED Wooden Frame',
    category: 'photoframe',
    price: 1099,
    originalPrice: 1499,
    rating: 5.0,
    reviewsCount: 118,
    isBestseller: true,
    isNew: false,
    isPersonalized: true,
    offerBadge: 'Warm LED',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=800&auto=format&fit=crop',
    description: 'Custom acrylic photo panel mounted on warm LED glowing wooden base with USB power cable.',
    material: 'Acrylic + Beechwood LED Base',
    deliveryTime: '48 Hours'
  },
  {
    id: 'prod-10',
    name: 'Custom Accordion Photo Card',
    category: 'photocards',
    price: 349,
    originalPrice: 499,
    rating: 4.8,
    reviewsCount: 43,
    isBestseller: false,
    isNew: true,
    isPersonalized: true,
    offerBadge: 'Folding',
    image: img3,
    description: 'Compact folding card that opens into an 8-photo memory stream with ribbon tie.',
    material: 'Matt Linen Paper',
    deliveryTime: '24 Hours'
  },
  {
    id: 'prod-11',
    name: 'Anniversary Special Gift Card',
    category: 'giftcard',
    price: 249,
    originalPrice: 349,
    rating: 4.9,
    reviewsCount: 88,
    isBestseller: false,
    isNew: false,
    isPersonalized: true,
    offerBadge: 'Sweet Love',
    image: img2,
    description: 'Handmade heart-themed pop-up card for anniversaries and special partner surprises.',
    material: 'Heavy Cardstock',
    deliveryTime: '24 Hours'
  },
  {
    id: 'prod-12',
    name: 'Mini Pencil Portrait Frame',
    category: 'pencilart',
    price: 649,
    originalPrice: 899,
    rating: 4.9,
    reviewsCount: 39,
    isBestseller: false,
    isNew: false,
    isPersonalized: true,
    offerBadge: 'Compact',
    image: img4,
    description: 'Small 4x6 inch detailed pencil sketch presented in a desk-top wooden photo frame.',
    material: 'Pine Frame + Pencil Sketch',
    deliveryTime: '48 Hours'
  },
  {
    id: 'prod-13',
    name: 'Explosion Surprise Gift Box',
    category: 'birthdaybook',
    price: 1149,
    originalPrice: 1499,
    rating: 5.0,
    reviewsCount: 160,
    isBestseller: true,
    isNew: false,
    isPersonalized: true,
    offerBadge: 'Surprise',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=800&auto=format&fit=crop',
    description: 'Multi-layer handmade surprise box with 20+ photo slots, secret pockets, and center gift compartment.',
    material: '300GSM Craft Board',
    deliveryTime: '24-48 Hours'
  },
  {
    id: 'prod-14',
    name: 'Mini Dried Flower Bouquet',
    category: 'bouquet',
    price: 449,
    originalPrice: 649,
    rating: 4.8,
    reviewsCount: 71,
    isBestseller: false,
    isNew: true,
    isPersonalized: false,
    offerBadge: 'Aesthetic',
    image: img5,
    description: 'Aesthetic mini bunch of preserved baby breath flowers and dried lavender with jute wrap.',
    material: 'Natural Dried Flowers & Jute',
    deliveryTime: '24 Hours'
  },
  {
    id: 'prod-15',
    name: 'Personalized Photo Mug',
    category: 'photoframe',
    price: 399,
    originalPrice: 599,
    rating: 5.0,
    reviewsCount: 96,
    isBestseller: true,
    isNew: false,
    isPersonalized: true,
    offerBadge: 'Hot Deal',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop',
    description: 'High quality ceramic mug printed with HD photo and custom quotes.',
    material: 'Premium Ceramic',
    deliveryTime: '24 Hours'
  }
];

export const HERO_SLIDES = [
  {
    id: 1,
    title: 'Make Every Moment Special',
    subtitle: 'Personalized gifts, handwritten letters, and custom photo frames crafted with love for all of life\'s special moments.',
    primaryCta: 'Explore Products',
    secondaryCta: 'Shop Categories',
    bgImage: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=1600&auto=format&fit=crop'
  }
];

export const REVIEWS = [
  {
    id: 1,
    name: 'Priya Sharma',
    role: 'Verified Student Buyer',
    rating: 5,
    comment: 'The handwritten vintage letter was so emotional and beautiful! Jnapika delivered it right to our hostel in 24 hours.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 2,
    name: 'Rahul Mehta',
    role: 'Verified Buyer',
    rating: 5,
    comment: 'The charcoal sketch framed art turned out way beyond expectations. Incredible student artistry!',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 3,
    name: 'Ananya Verma',
    role: 'Verified Student Buyer',
    rating: 5,
    comment: 'Ordered the Polaroid mini photo cards with fairy lights for my bestie\'s birthday. She absolutely loved it!',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop'
  }
];

export const INSTAGRAM_POSTS = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=600&auto=format&fit=crop',
    likes: '342',
    caption: 'Explosion box hamper'
  },
  {
    id: 2,
    image: img6,
    likes: '518',
    caption: 'Wax sealed vintage letters'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=600&auto=format&fit=crop',
    likes: '429',
    caption: 'Memories scrapbook'
  },
  {
    id: 4,
    image: img3,
    likes: '289',
    caption: 'Polaroid mini cards'
  },
  {
    id: 5,
    image: img5,
    likes: '390',
    caption: 'Satin ribbon rose bouquet'
  },
  {
    id: 6,
    image: img4,
    likes: '450',
    caption: 'Custom pencil portrait sketch'
  }
];

export const STORE_INFO = {
  name: 'Jnapika',
  ownerWhatsApp: '919876543210',
  ownerPhone: '+91 98765 43210',
  ownerEmail: 'orders@jnapika.com',
  location: 'Campus Student Center, Block B, Room 104',
  instagram: 'https://instagram.com/jnapika.gifts',
  facebook: 'https://facebook.com/jnapika.official',
  twitter: 'https://twitter.com/jnapika_gifts',
  pinterest: 'https://pinterest.com/jnapika_keepsakes',
  motto: 'To make your loved ones happier with handcrafted gifts and timeless memories.'
};
