export interface Package {
  id: string;
  title: string;
  category: string;
  destination: string;
  country: string; // Added country field
  duration: string;
  nights: number;
  days: number;
  coverImage: string;
  heroImage: string;
  shortDescription: string;
  highlights: string[];
  inclusions: string[];
  itinerary: {
    day: number;
    title: string;
    description: string;
  }[];
  pricing: {
    standard: number;
    deluxe: number;
    premium: number;
  };
  originalPricing?: { // Added for discount functionality
    standard?: number;
    deluxe?: number;
    premium?: number;
  };
  promoCode?: string; // Added promo code field
  discount?: number; // Added discount percentage field
  priceUnit: string;
}

export const packages: Package[] = [
  {
    id: 'bangkok-pattaya-delight',
    title: 'Bangkok & Pattaya Delight',
    category: 'International',
    destination: 'Thailand',
    country: 'Thailand',
    duration: '5 Nights 6 Days',
    nights: 5,
    days: 6,
    coverImage: 'https://images.unsplash.com/photo-1672826947970-c8462da30c48?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYW5na29rJTIwdGVtcGxlJTIwZ29sZGVuJTIwdGhhaWxhbmR8ZW58MXx8fHwxNzc0MDcwMjc2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    heroImage: 'https://images.unsplash.com/photo-1672826947970-c8462da30c48?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYW5na29rJTIwdGVtcGxlJTIwZ29sZGVuJTIwdGhhaWxhbmR8ZW58MXx8fHwxNzc0MDcwMjc2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    shortDescription: 'Experience the vibrant culture of Bangkok and the stunning beaches of Pattaya',
    highlights: [
      'Grand Palace & Wat Phra Kaew',
      'Coral Island with water sports',
      'Alcazar Show in Pattaya',
      'Chao Phraya River Cruise',
      'Safari World & Marine Park'
    ],
    inclusions: [
      '5 Nights Hotel Accommodation',
      'Daily Breakfast',
      'Return Airfare',
      'Private Airport Transfers',
      'All Sightseeing Tours',
      'Visa Assistance'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Bangkok',
        description: 'Welcome to Bangkok! Upon arrival at Suvarnabhumi Airport, meet our representative and transfer to your hotel. Check-in and relax. Evening at leisure to explore nearby markets. Overnight stay in Bangkok.'
      },
      {
        day: 2,
        title: 'Bangkok City Tour',
        description: 'After breakfast, visit the magnificent Grand Palace and Wat Phra Kaew (Temple of the Emerald Buddha). Explore Wat Pho with its giant reclining Buddha. Evening enjoy a scenic Chao Phraya River cruise with dinner. Return to hotel.'
      },
      {
        day: 3,
        title: 'Safari World & Marine Park',
        description: 'Full day excursion to Safari World and Marine Park. Enjoy the safari drive through African-style wildlife park. Watch amazing shows including orangutan boxing, dolphin show, and sea lion performance. Return to hotel in evening.'
      },
      {
        day: 4,
        title: 'Bangkok to Pattaya',
        description: 'After breakfast, check out and drive to Pattaya (approx 2 hours). Check in to hotel. Afternoon visit Coral Island by speedboat. Enjoy water sports, beach activities, and swimming. Evening watch the spectacular Alcazar Cabaret Show. Overnight in Pattaya.'
      },
      {
        day: 5,
        title: 'Pattaya - Leisure Day',
        description: 'Day at leisure to enjoy Pattaya beaches or optional activities like Nong Nooch Tropical Garden, Art in Paradise, or Sanctuary of Truth. Evening explore Walking Street. Overnight in Pattaya.'
      },
      {
        day: 6,
        title: 'Departure',
        description: 'After breakfast, check out and transfer to Bangkok airport for your return flight home with wonderful memories of Thailand.'
      }
    ],
    pricing: {
      standard: 29999,
      deluxe: 34999,
      premium: 39999
    },
    priceUnit: 'per person'
  },
  {
    id: 'phuket-island-escape',
    title: 'Phuket Island Escape',
    category: 'International',
    destination: 'Thailand',
    country: 'Thailand',
    duration: '4 Nights 5 Days',
    nights: 4,
    days: 5,
    coverImage: 'https://images.unsplash.com/photo-1706010651369-8083d3a153f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaHVrZXQlMjBiZWFjaCUyMGlzbGFuZCUyMHN1bnNldHxlbnwxfHx8fDE3NzQwNzAyNzZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    heroImage: 'https://images.unsplash.com/photo-1706010651369-8083d3a153f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaHVrZXQlMjBiZWFjaCUyMGlzbGFuZCUyMHN1bnNldHxlbnwxfHx8fDE3NzQwNzAyNzZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    shortDescription: 'Discover the tropical paradise of Phuket with pristine beaches and island hopping',
    highlights: [
      'Phi Phi Island by speedboat',
      'James Bond Island tour',
      'Phuket City & Temples',
      'Patong Beach nightlife',
      'Big Buddha viewpoint'
    ],
    inclusions: [
      '4 Nights Hotel Accommodation',
      'Daily Breakfast',
      'Return Airfare',
      'Private Airport Transfers',
      'Island Tour with lunch',
      'Visa Assistance'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Phuket',
        description: 'Arrive at Phuket International Airport. Transfer to hotel and check-in. Rest of the day at leisure to relax on the beach or explore nearby areas. Overnight in Phuket.'
      },
      {
        day: 2,
        title: 'Phi Phi Island Tour',
        description: 'Early morning departure for full day Phi Phi Island tour by speedboat. Visit Maya Bay, Pileh Lagoon, Viking Cave, and Monkey Beach. Snorkeling in crystal clear waters. Lunch included. Return to hotel in evening.'
      },
      {
        day: 3,
        title: 'Phuket City & Big Buddha',
        description: 'Half day Phuket city tour visiting Chalong Temple, Big Buddha viewpoint with panoramic views, and cashew nut factory. Afternoon free for shopping or beach activities. Evening optional visit to Patong Beach and Bangla Road.'
      },
      {
        day: 4,
        title: 'James Bond Island',
        description: 'Full day excursion to Phang Nga Bay and James Bond Island by longtail boat. Visit Panak Island caves, Hong Island lagoon, and the famous James Bond Island. Canoeing through caves and mangrove forests. Lunch included. Return to hotel.'
      },
      {
        day: 5,
        title: 'Departure',
        description: 'After breakfast, free time until transfer to airport for your onward journey with beautiful memories of Phuket.'
      }
    ],
    pricing: {
      standard: 34999,
      deluxe: 39999,
      premium: 44999
    },
    priceUnit: 'per person'
  },
  {
    id: 'krabi-phuket-honeymoon',
    title: 'Krabi & Phuket Honeymoon',
    category: 'Honeymoon',
    destination: 'Thailand',
    country: 'Thailand',
    duration: '6 Nights 7 Days',
    nights: 6,
    days: 7,
    coverImage: 'https://images.unsplash.com/photo-1773378999010-c6281fa0efce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrcmFiaSUyMGxpbWVzdG9uZSUyMGNsaWZmcyUyMGJlYWNofGVufDF8fHx8MTc3NDA3MDI3N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    heroImage: 'https://images.unsplash.com/photo-1773378999010-c6281fa0efce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrcmFiaSUyMGxpbWVzdG9uZSUyMGNsaWZmcyUyMGJlYWNofGVufDF8fHx8MTc3NDA3MDI3N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    shortDescription: 'A romantic getaway combining Krabi\'s limestone cliffs with Phuket\'s beaches',
    highlights: [
      '4 Island tour by longtail boat',
      'Romantic beach dinner',
      'Couples spa session',
      'Private island hopping',
      'Sunset cruise'
    ],
    inclusions: [
      '6 Nights Honeymoon Suite',
      'Daily Breakfast & 3 Dinners',
      'Return Airfare',
      'Private Transfers',
      'Couples Spa & Activities',
      'Visa Assistance'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Krabi',
        description: 'Arrive at Krabi Airport. Welcome with flower garlands. Transfer to your romantic beachfront resort. Check-in to honeymoon suite. Welcome drink and fruit basket. Evening at leisure. Romantic dinner at resort.'
      },
      {
        day: 2,
        title: 'Krabi 4 Island Tour',
        description: 'After breakfast, embark on the famous 4 Island tour by traditional longtail boat. Visit Phra Nang Cave Beach, Tup Island, Chicken Island, and Poda Island. Swimming, snorkeling, and beach activities. Picnic lunch on the beach. Return to resort.'
      },
      {
        day: 3,
        title: 'Leisure Day & Couples Spa',
        description: 'Day at leisure to enjoy resort amenities and beautiful beaches. Afternoon indulge in a relaxing couples spa session with Thai massage and aromatherapy. Evening romantic candlelight dinner by the beach.'
      },
      {
        day: 4,
        title: 'Krabi to Phuket',
        description: 'After breakfast, check out and private transfer to Phuket (approx 3 hours). Check in to beachfront resort. Afternoon at leisure. Evening sunset cruise with dinner and live music. Overnight in Phuket.'
      },
      {
        day: 5,
        title: 'Private Phi Phi Island',
        description: 'Exclusive private speedboat tour to Phi Phi Islands. Visit secluded beaches, snorkel in pristine waters, and enjoy a romantic lunch on the beach. Visit Maya Bay and Viking Cave. Return to resort for couple dinner.'
      },
      {
        day: 6,
        title: 'Phuket - Leisure Day',
        description: 'Day free to relax at the resort or explore Phuket. Optional activities include shopping in Phuket Town, visit to Big Buddha, or water sports. Evening at leisure or optional cultural show.'
      },
      {
        day: 7,
        title: 'Departure',
        description: 'After breakfast, check out. Free time until transfer to Phuket airport. Depart with cherished honeymoon memories.'
      }
    ],
    pricing: {
      standard: 39000,
      deluxe: 49000,
      premium: 59000
    },
    priceUnit: 'per couple'
  },
  {
    id: 'royal-rajasthan-heritage',
    title: 'Royal Rajasthan Heritage Tour',
    category: 'Domestic',
    destination: 'Rajasthan',
    country: 'India',
    duration: '4 Nights 5 Days',
    nights: 4,
    days: 5,
    coverImage: 'https://images.unsplash.com/photo-1673807095855-7c6e499c2cd5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYWlwdXIlMjBwaW5rJTIwcGFsYWNlJTIwcmFqYXN0aGFufGVufDF8fHx8MTc3NDA3MDI3N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    heroImage: 'https://images.unsplash.com/photo-1673807095855-7c6e499c2cd5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYWlwdXIlMjBwaW5rJTIwcGFsYWNlJTIwcmFqYXN0aGFufGVufDF8fHx8MTc3NDA3MDI3N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    shortDescription: 'Explore the pink city Jaipur with majestic forts, palaces, and vibrant culture',
    highlights: [
      'Amber Fort elephant ride',
      'City Palace & Jantar Mantar',
      'Hawa Mahal photo stop',
      'Jal Mahal sunset view',
      'Traditional Rajasthani dinner'
    ],
    inclusions: [
      '4 Nights Hotel Stay',
      'Daily Breakfast & 2 Dinners',
      'AC Vehicle for transfers',
      'All Monument entries',
      'Professional guide',
      'Cultural performances'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Jaipur',
        description: 'Arrive in Jaipur. Transfer to hotel and check-in. Afternoon visit to Birla Mandir and Albert Hall Museum. Evening visit to Chokhi Dhani for traditional Rajasthani village experience with cultural performances and dinner. Overnight in Jaipur.'
      },
      {
        day: 2,
        title: 'Amber Fort & City Tour',
        description: 'Morning visit to majestic Amber Fort with optional elephant ride. Visit Jaigarh Fort for panoramic city views. Afternoon explore City Palace, Jantar Mantar observatory, and photo stop at iconic Hawa Mahal. Evening shopping at Johari Bazaar.'
      },
      {
        day: 3,
        title: 'Jaipur Heritage Walk',
        description: 'Morning heritage walk through old city markets. Visit Galtaji Temple (Monkey Temple). Afternoon at leisure or optional activities like block printing workshop, cooking class, or gem museum. Evening sunset view at Jal Mahal (Water Palace).'
      },
      {
        day: 4,
        title: 'Day Trip to Pushkar',
        description: 'Full day excursion to holy city of Pushkar. Visit the famous Brahma Temple, only one of its kind in the world. Walk around sacred Pushkar Lake. Explore colorful local markets. Visit Savitri Temple for sunset views. Return to Jaipur.'
      },
      {
        day: 5,
        title: 'Departure',
        description: 'After breakfast, free time for last-minute shopping at Bapu Bazaar. Check out and transfer to airport/railway station for your onward journey with royal memories of Rajasthan.'
      }
    ],
    pricing: {
      standard: 23000,
      deluxe: 28000,
      premium: 33000
    },
    priceUnit: 'per person'
  },
  {
    id: 'royal-desert-triangle',
    title: 'Royal Desert Triangle',
    category: 'Domestic',
    destination: 'Rajasthan',
    country: 'India',
    duration: '4 Nights 5 Days',
    nights: 4,
    days: 5,
    coverImage: 'https://images.unsplash.com/photo-1769248784103-6b83a5cda87d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYWlzYWxtZXIlMjBkZXNlcnQlMjBmb3J0JTIwZ29sZGVufGVufDF8fHx8MTc3NDA3MDI3OHww&ixlib=rb-4.1.0&q=80&w=1080',
    heroImage: 'https://images.unsplash.com/photo-1769248784103-6b83a5cda87d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYWlzYWxtZXIlMjBkZXNlcnQlMjBmb3J0JTIwZ29sZGVufGVufDF8fHx8MTc3NDA3MDI3OHww&ixlib=rb-4.1.0&q=80&w=1080',
    shortDescription: 'Journey through golden dunes covering Jodhpur, Bikaner, and Jaisalmer',
    highlights: [
      'Mehrangarh Fort Jodhpur',
      'Camel safari in Sam dunes',
      'Jaisalmer Fort & Havelis',
      'Desert camping experience',
      'Karni Mata Temple Bikaner'
    ],
    inclusions: [
      '4 Nights Accommodation',
      'Daily Breakfast & Dinners',
      'AC Vehicle throughout',
      'Desert camp stay',
      'Camel safari',
      'All transfers & sightseeing'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Jodhpur',
        description: 'Arrive in Jodhpur, the Blue City. Check in to hotel. Afternoon visit the magnificent Mehrangarh Fort, one of India\'s largest forts. Explore Jaswant Thada marble memorial. Evening stroll through the blue houses of old city. Overnight in Jodhpur.'
      },
      {
        day: 2,
        title: 'Jodhpur to Jaisalmer via Bikaner',
        description: 'After breakfast, drive to Jaisalmer with enroute visit to Bikaner. Visit the famous Karni Mata Temple (Rat Temple) and Junagarh Fort. Continue drive to Jaisalmer. Check in to hotel. Evening at leisure. Overnight in Jaisalmer.'
      },
      {
        day: 3,
        title: 'Jaisalmer Fort & Havelis',
        description: 'Morning explore the Golden Fort of Jaisalmer, a living fort with shops and houses. Visit Patwon Ki Haveli, Nathmal Ki Haveli, and Salim Singh Ki Haveli. Afternoon visit Gadisar Lake. Evening drive to Sam Sand Dunes for camel safari and desert camp.'
      },
      {
        day: 4,
        title: 'Desert Experience',
        description: 'Morning at leisure at desert camp or return to hotel. Optional activities include parasailing, quad biking, or visiting abandoned village of Kuldhara. Afternoon free. Evening cultural program with Rajasthani folk dance and music. Bonfire dinner at camp.'
      },
      {
        day: 5,
        title: 'Departure',
        description: 'After breakfast, check out and transfer to Jaisalmer railway station or airport for your onward journey with golden memories of the desert.'
      }
    ],
    pricing: {
      standard: 16999,
      deluxe: 21999,
      premium: 26999
    },
    priceUnit: 'per person'
  },
  {
    id: 'royal-rajasthan-grand',
    title: 'Royal Rajasthan Grand Tour',
    category: 'Domestic',
    destination: 'Rajasthan',
    country: 'India',
    duration: '6 Nights 7 Days',
    nights: 6,
    days: 7,
    coverImage: 'https://images.unsplash.com/photo-1663457910329-c77b02e110a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYWphc3RoYW4lMjBwYWxhY2UlMjBoZXJpdGFnZSUyMGluZGlhfGVufDF8fHx8MTc3NDA3MDI3NXww&ixlib=rb-4.1.0&q=80&w=1080',
    heroImage: 'https://images.unsplash.com/photo-1663457910329-c77b02e110a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYWphc3RoYW4lMjBwYWxhY2UlMjBoZXJpdGFnZSUyMGluZGlhfGVufDF8fHx8MTc3NDA3MDI3NXww&ixlib=rb-4.1.0&q=80&w=1080',
    shortDescription: 'Complete Rajasthan circuit covering Jaipur, Pushkar, Jodhpur, and Jaisalmer',
    highlights: [
      'Amber Fort & City Palace',
      'Pushkar Holy Lake',
      'Mehrangarh Fort views',
      'Jaisalmer golden fort',
      'Desert camping & safari'
    ],
    inclusions: [
      '6 Nights Hotel Stay',
      'Daily Breakfast',
      'AC Vehicle throughout',
      'All monument entries',
      'Professional guide',
      'Desert camp with activities'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Jaipur',
        description: 'Arrive in Jaipur. Transfer to hotel. Evening visit to Birla Mandir and light & sound show at Amber Fort. Welcome dinner at rooftop restaurant with city views. Overnight in Jaipur.'
      },
      {
        day: 2,
        title: 'Jaipur Sightseeing',
        description: 'Full day Jaipur tour. Visit Amber Fort with elephant/jeep ride, City Palace, Jantar Mantar, Hawa Mahal, and Jal Mahal. Evening shopping at local bazaars. Overnight in Jaipur.'
      },
      {
        day: 3,
        title: 'Jaipur to Pushkar',
        description: 'After breakfast, drive to Pushkar (3 hours). Check in to hotel. Visit Brahma Temple and Pushkar Lake. Explore colorful markets. Climb to Savitri Temple for panoramic views. Evening aarti at the ghats. Overnight in Pushkar.'
      },
      {
        day: 4,
        title: 'Pushkar to Jodhpur',
        description: 'Morning at leisure in Pushkar. Drive to Jodhpur (4 hours). Check in to hotel. Afternoon visit Mehrangarh Fort and Jaswant Thada. Evening explore Clock Tower market and try local street food. Overnight in Jodhpur.'
      },
      {
        day: 5,
        title: 'Jodhpur to Jaisalmer',
        description: 'After breakfast, drive to Jaisalmer (5-6 hours). Check in to hotel. Afternoon at leisure. Evening visit Gadisar Lake for sunset. Walk around the Golden Fort illuminated at night. Overnight in Jaisalmer.'
      },
      {
        day: 6,
        title: 'Jaisalmer & Desert',
        description: 'Morning explore Jaisalmer Fort, Patwon Ki Haveli, and other havelis. Afternoon drive to Sam Sand Dunes. Enjoy camel safari at sunset. Cultural program with folk dance and music. BBQ dinner under stars at desert camp.'
      },
      {
        day: 7,
        title: 'Departure from Jaisalmer',
        description: 'Morning return to Jaisalmer city from camp. Free time for last-minute shopping. Check out and transfer to airport/railway station for onward journey.'
      }
    ],
    pricing: {
      standard: 24999,
      deluxe: 31999,
      premium: 38999
    },
    priceUnit: 'per person'
  },
  {
    id: 'do-dham-yatra',
    title: 'Do Dham Yatra',
    category: 'Pilgrimage',
    destination: 'Uttarakhand',
    country: 'India',
    duration: '5 Nights 6 Days',
    nights: 5,
    days: 6,
    coverImage: 'https://images.unsplash.com/photo-1736914309887-6403a7a7b9b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrZWRhcm5hdGglMjB0ZW1wbGUlMjBoaW1hbGF5YSUyMHBpbGdyaW1hZ2V8ZW58MXx8fHwxNzc0MDcwMjc4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    heroImage: 'https://images.unsplash.com/photo-1736914309887-6403a7a7b9b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrZWRhcm5hdGglMjB0ZW1wbGUlMjBoaW1hbGF5YSUyMHBpbGdyaW1hZ2V8ZW58MXx8fHwxNzc0MDcwMjc4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    shortDescription: 'Sacred pilgrimage to Kedarnath and Badrinath, two of the Char Dhams',
    highlights: [
      'Kedarnath Temple darshan',
      'Badrinath Temple visit',
      'Helicopter option available',
      'Mana Village - last Indian village',
      'Scenic Himalayan journey'
    ],
    inclusions: [
      '5 Nights Accommodation',
      'Daily Breakfast & Dinner',
      'AC Vehicle (except hills)',
      'Kedarnath helicopter (optional)',
      'All transfers',
      'Experienced guide'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Haridwar to Guptkashi',
        description: 'Pick up from Haridwar railway station/airport. Drive to Guptkashi (approx 7-8 hours) via Devprayag (confluence of Alaknanda and Bhagirathi). Check in to hotel. Evening visit local Shiva temple. Overnight in Guptkashi.'
      },
      {
        day: 2,
        title: 'Kedarnath Darshan',
        description: 'Early morning drive to Gaurikund (30 km). Trek or take pony/helicopter to Kedarnath (16 km trek or 10 min helicopter ride). Darshan at Kedarnath Temple, one of the 12 Jyotirlingas. Visit Bhairav Temple. Return to Guptkashi by evening. Overnight.'
      },
      {
        day: 3,
        title: 'Guptkashi to Badrinath',
        description: 'After breakfast, drive to Badrinath (190 km, 7-8 hours) via Chopta meadows. Stop at Joshimath. Arrive Badrinath by evening. Attend evening aarti at Badrinath Temple. Overnight in Badrinath.'
      },
      {
        day: 4,
        title: 'Badrinath Sightseeing',
        description: 'Early morning darshan at Badrinath Temple (dedicated to Lord Vishnu). Visit Tapt Kund hot springs, Brahma Kapal, and Mana Village (last Indian village before Tibet border). Visit Vyas Gufa and Ganesh Gufa. Return to hotel. Overnight in Badrinath.'
      },
      {
        day: 5,
        title: 'Badrinath to Rudraprayag',
        description: 'After breakfast, drive to Rudraprayag (160 km). Visit Rudraprayag confluence. Stop at Karnaprayag if time permits. Check in to hotel. Evening free to relax or visit local market. Overnight in Rudraprayag.'
      },
      {
        day: 6,
        title: 'Rudraprayag to Haridwar',
        description: 'After breakfast, drive back to Haridwar (165 km, 5-6 hours). Drop at railway station/airport for onward journey. Tour ends with divine blessings.'
      }
    ],
    pricing: {
      standard: 21999,
      deluxe: 26999,
      premium: 31999
    },
    priceUnit: 'per person'
  },
  {
    id: 'char-dham-yatra',
    title: 'Char Dham Yatra',
    category: 'Pilgrimage',
    destination: 'Uttarakhand',
    country: 'India',
    duration: '9 Nights 10 Days',
    nights: 9,
    days: 10,
    coverImage: 'https://images.unsplash.com/photo-1733767697183-a7aa3968859d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1dHRhcmFraGFuZCUyMGhpbWFsYXlhJTIwbW91bnRhaW5zJTIwdGVtcGxlfGVufDF8fHx8MTc3NDA3MDI3NXww&ixlib=rb-4.1.0&q=80&w=1080',
    heroImage: 'https://images.unsplash.com/photo-1733767697183-a7aa3968859d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1dHRhcmFraGFuZCUyMGhpbWFsYXlhJTIwbW91bnRhaW5zJTIwdGVtcGxlfGVufDF8fHx8MTc3NDA3MDI3NXww&ixlib=rb-4.1.0&q=80&w=1080',
    shortDescription: 'Complete pilgrimage covering all four holy shrines of Uttarakhand',
    highlights: [
      'Yamunotri Temple',
      'Gangotri Temple',
      'Kedarnath Temple',
      'Badrinath Temple',
      'Complete spiritual journey'
    ],
    inclusions: [
      '9 Nights Hotel Stay',
      'Daily Breakfast & Dinner',
      'All transfers by vehicle',
      'Helicopter options available',
      'Experienced guide',
      'All permits & taxes'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival Haridwar',
        description: 'Arrive at Haridwar. Check in to hotel. Evening visit Har Ki Pauri for Ganga Aarti. Take holy dip in river Ganga. Visit Mansa Devi and Chandi Devi temples if time permits. Overnight in Haridwar.'
      },
      {
        day: 2,
        title: 'Haridwar to Barkot',
        description: 'After breakfast, drive to Barkot (210 km, 7 hours) via Mussoorie. Stop at Kempty Falls. Arrive Barkot and check in. Rest and prepare for tomorrow\'s trek. Overnight in Barkot.'
      },
      {
        day: 3,
        title: 'Yamunotri Darshan',
        description: 'Early drive to Janki Chatti. Trek or take pony to Yamunotri (6 km). Darshan at Yamunotri Temple (source of Yamuna). Take holy bath in Surya Kund and Jamuna Bai Kund. Cook rice in hot water as prasad. Return to Barkot.'
      },
      {
        day: 4,
        title: 'Barkot to Uttarkashi',
        description: 'Drive to Uttarkashi (100 km). Visit Vishwanath Temple and Shakti Temple. Explore the spiritual town on banks of Bhagirathi river. Overnight in Uttarkashi.'
      },
      {
        day: 5,
        title: 'Gangotri Darshan',
        description: 'Early morning drive to Gangotri (100 km). Darshan at Gangotri Temple (source of Ganga). Take holy dip in Bhagirathi river. Visit Bhagirath Shila and Pandava Gufa. Return to Uttarkashi. Overnight.'
      },
      {
        day: 6,
        title: 'Uttarkashi to Guptkashi',
        description: 'Long drive to Guptkashi (230 km, 8-9 hours). En route visit Tehri Dam. Check in to hotel. Rest. Overnight in Guptkashi.'
      },
      {
        day: 7,
        title: 'Kedarnath Darshan',
        description: 'Early drive to Gaurikund. Trek or helicopter to Kedarnath. Darshan at Kedarnath Temple, one of 12 Jyotirlingas. Visit Bhairav Temple. Return to Guptkashi. Overnight.'
      },
      {
        day: 8,
        title: 'Guptkashi to Badrinath',
        description: 'Drive to Badrinath (190 km) via scenic valleys. Stop at Joshimath. Arrive Badrinath. Evening aarti at temple. Overnight in Badrinath.'
      },
      {
        day: 9,
        title: 'Badrinath to Rudraprayag',
        description: 'Morning darshan at Badrinath Temple. Visit Mana Village, Vyas Gufa, Ganesh Gufa, and Bhim Pul. Drive to Rudraprayag. Overnight.'
      },
      {
        day: 10,
        title: 'Rudraprayag to Haridwar',
        description: 'After breakfast, drive to Haridwar. Visit Devprayag and Rishikesh en route. Drop at Haridwar railway station/airport. Tour concludes with divine blessings.'
      }
    ],
    pricing: {
      standard: 34999,
      deluxe: 42999,
      premium: 49999
    },
    priceUnit: 'per person'
  },
  {
    id: 'vietnam-highlights',
    title: 'Vietnam Highlights Tour',
    category: 'International',
    destination: 'Vietnam',
    country: 'Vietnam',
    duration: '5 Nights 6 Days',
    nights: 5,
    days: 6,
    coverImage: 'https://images.unsplash.com/photo-1727802331329-7801398d4dff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5vaSUyMHZpZXRuYW0lMjBjaXR5JTIwdGVtcGxlfGVufDF8fHx8MTc3NDA3MDI3OXww&ixlib=rb-4.1.0&q=80&w=1080',
    heroImage: 'https://images.unsplash.com/photo-1732272933438-e04c490a293d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWV0bmFtJTIwaGFsb25nJTIwYmF5JTIwYm9hdHxlbnwxfHx8fDE3NzQwNzAyNzZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    shortDescription: 'Discover Vietnam from Hanoi to Ho Chi Minh City with Ha Long Bay cruise',
    highlights: [
      'Ha Long Bay overnight cruise',
      'Hanoi Old Quarter cyclo ride',
      'Cu Chi Tunnels exploration',
      'Mekong Delta boat tour',
      'Water puppet show'
    ],
    inclusions: [
      '5 Nights Accommodation',
      'Daily Breakfast & 4 Lunches',
      'Domestic flights included',
      'Ha Long Bay cruise',
      'All transfers & tours',
      'Visa assistance'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Hanoi',
        description: 'Arrive at Noi Bai International Airport, Hanoi. Transfer to hotel. Check in and freshen up. Evening explore the atmospheric Old Quarter on foot or by cyclo. Dinner at local restaurant. Watch traditional Water Puppet Show. Overnight in Hanoi.'
      },
      {
        day: 2,
        title: 'Hanoi City Tour & Ha Long Bay',
        description: 'Morning city tour visiting Ho Chi Minh Mausoleum, One Pillar Pagoda, Temple of Literature, and Hoan Kiem Lake. Afternoon drive to Ha Long Bay (3.5 hours). Board luxury cruise. Sail through limestone karsts. Kayaking and swimming. Sunset on deck. Seafood dinner. Overnight on cruise.'
      },
      {
        day: 3,
        title: 'Ha Long Bay to Hanoi to Ho Chi Minh',
        description: 'Early morning Tai Chi on deck. Visit Sung Sot Cave (Surprise Cave). Brunch on board while sailing back. Disembark and drive to Hanoi. Fly to Ho Chi Minh City (Saigon). Check in to hotel. Evening explore Ben Thanh Market. Overnight in Ho Chi Minh.'
      },
      {
        day: 4,
        title: 'Cu Chi Tunnels & City Tour',
        description: 'Morning half-day trip to Cu Chi Tunnels, an underground network used during Vietnam War. Crawl through tunnels and learn history. Afternoon city tour: Notre Dame Cathedral, Central Post Office, War Remnants Museum, and Reunification Palace. Evening Saigon River cruise with dinner.'
      },
      {
        day: 5,
        title: 'Mekong Delta Day Trip',
        description: 'Full day excursion to Mekong Delta. Boat ride through narrow canals. Visit local villages, fruit orchards, and coconut candy workshop. Traditional Vietnamese lunch. Experience rowing boat in small canals. Visit floating markets. Return to Ho Chi Minh City. Overnight.'
      },
      {
        day: 6,
        title: 'Departure',
        description: 'After breakfast, free time for last-minute shopping at Dong Khoi Street or Ben Thanh Market. Check out and transfer to Tan Son Nhat Airport for departure flight with wonderful memories of Vietnam.'
      }
    ],
    pricing: {
      standard: 54999,
      deluxe: 64999,
      premium: 74999
    },
    priceUnit: 'per person'
  }
];

export const getPackageById = (id: string): Package | undefined => {
  return packages.find(pkg => pkg.id === id);
};

export const getPackagesByCategory = (category: string): Package[] => {
  return packages.filter(pkg => pkg.category === category);
};

export const getPackagesByDestination = (destination: string): Package[] => {
  return packages.filter(pkg => pkg.destination === destination);
};

export const getAllCategories = (): string[] => {
  return Array.from(new Set(packages.map(pkg => pkg.category)));
};

export const getAllDestinations = (): string[] => {
  return Array.from(new Set(packages.map(pkg => pkg.destination)));
};

export const getDestinationInfo = () => {
  const destinations = getAllDestinations();
  return destinations.map(dest => ({
    name: dest,
    count: packages.filter(p => p.destination === dest).length
  }));
};