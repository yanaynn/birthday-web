/**
 * =========================================================================
 * WEBSITE CONTENT CONFIGURATION
 * =========================================================================
 * You can easily customize texts, names, photos, or the background music below.
 * Store your personal photos in `public/photos/` or use direct image URLs.
 */

export const BIRTHDAY_DATA = {
  // Recipient Information
  recipient: {
    name: "My Love", // Full name or nickname
    nickname: "Cimi", // Sweet pet name
    birthDate: "2026-09-05", // Format YYYY-MM-DD
    age: 23, // Birthday age (optional)
  },

  // Opening Screen Text
  opening: {
    badge: "Build with Love by Your Moca",
    title: "Happy Birthday to My Sunshine",
    subtitle: "Like a sunflower that always turns towards the light, your presence forever warms my world.",
    instruction: "Tap the sunflower bouquet to bloom 🌻",
  },

  // Background Music
  music: {
    title: "Sunflower",
    artist: "Rex Orange County",
    url: "/Rex Orange County - Sunflower.mp3",
    startTime: 113, // Dimulai dari menit 1:53 (113 detik)
  },

  // Wish & Love Letter
  wish: {
    hero: {
      badge: "Birthday Wishes",
      title: "A New Chapter for",
      titleLine2: "My Lovely Cimi",
      description: "Happy 24th Birthday! Like a sunflower that always turns towards the light, every smile you share and every sweet memory we build brings boundless warmth into my life.",
      washImage: "/image-wishessection/main.jpeg",
      primaryImage: "/image-wishessection/main.jpeg",
      secondaryImage: "/image-wishessection/sub-photo.jpeg",
      primaryAlt: "Cimi",
      secondaryAlt: "Sunflower in Bloom",
    },
    title: "To the One Who Warms Every Corner of My Days",
    badge: "A Special Letter for You",
    date: "Your Special Day",
    paragraphs: [
      "Happy birthday to the wonderful person who brings boundless laughter, peaceful calm, and vibrant sunshine to every single one of my days. Thank you for being born and for choosing to grow alongside me.",
      "Wishing you a wonderful birthday! Rather than just hoping you have a great day, I’m praying for a beautiful year ahead. May life offer you ease in all your endeavors. I hope your plans align with what’s best for you, your responsibilities don't weigh you down, and your efforts are deeply rewarded. May your sustenance arrive abundantly, wrapped in gratitude and peace. And whenever times get tough, may you find the inner strength and patience to push through.",
      "Thank you for being you. Thank you for your kindness, your patience, your effort, and all the little things you do that sometimes you may not even realize mean so much to me. I appreciate the way you care, the way you listen, and the comfort I feel whenever I’m with you.",
      "I may not always know exactly what the future holds, but I know that I’m happy to have met you and to be able to share this part of my life with you. I hope we can continue learning about each other, supporting each other, and becoming better together, one day at a time.",
      "Happy birthday once again, Cimi.",
      "Barakallahu fii umrik",
      "May this new year of your life be filled with ease, endless blessings, beautiful moments, and the kind of happiness that stays.",
      "I’m really glad it’s you. 💛"
    ],
    closing: "With all my love,",
    sender: "From your Moca",
  },

  // Memories Polaroid Cards (Foto Kenangan Bernomor 1 - 6)
  memories: [
    {
      id: 1,
      title: "Eid al-Fitr",
      date: "Cherished Moment",
      location: "Our Favorite Spot",
      image: "/image-gallerysection/1.jpg",
      note: "Every time I see your smile, all my worries and fatigue instantly melt away.",
      rotation: -2,
    },
    {
      id: 2,
      title: "Holiday On the Beach",
      date: "Blooming Season",
      location: "Sunflower Garden",
      image: "/image-gallerysection/2.jpg",
      note: "Even among thousands of blooming sunflowers, my eyes will always only look for you.",
      rotation: 3,
    },
    {
      id: 3,
      title: "Eksad",
      date: "A Quiet Afternoon",
      location: "Cozy Time",
      image: "/image-gallerysection/3.jpg",
      note: "Our simple conversations about random little things are always the highlight of my week.",
      rotation: -3,
    },
    {
      id: 4,
      title: "English One",
      date: "Evening Stroll",
      location: "Golden Hour",
      image: "/image-gallerysection/4.jpg",
      note: "Holding hands with you makes any journey, no matter how far, feel so delightful.",
      rotation: 2,
    },
    {
      id: 5,
      title: "Edelweiss on Mt. Gede",
      date: "That Memorable Day",
      location: "Happy Corner",
      image: "/image-gallerysection/5.jpg",
      note: "May this year bring you countless more moments of pure, carefree laughter.",
      rotation: -1,
    },
    {
      id: 6,
      title: "Your Graduation Day",
      date: "Sunset Glow",
      location: "By Your Side",
      image: "/image-gallerysection/6.jpg",
      note: "I can't wait for all the new adventures and beautiful stories we have yet to write together.",
      rotation: 3,
    },
  ],

  // 7 Foto Tambahan Baru di Gallery (Tanpa Judul)
  extraMemories: [
    {
      id: 7,
      title: "",
      image: "/image-gallerysection/7.jpg",
    },
    {
      id: 8,
      title: "",
      image: "/image-gallerysection/8.jpg",
    },
    {
      id: 9,
      title: "",
      image: "/image-gallerysection/9.jpg",
    },
    {
      id: 10,
      title: "",
      image: "/image-gallerysection/10.jpg",
    },
    {
      id: 11,
      title: "",
      image: "/image-gallerysection/11.jpg",
    },
    {
      id: 12,
      title: "",
      image: "/image-gallerysection/12jpg.jpg",
    },
    {
      id: 13,
      title: "",
      image: "/image-gallerysection/13jpg.jpg",
    },
  ],

  // Special Gift & Love Coupons (Redeemable coupons)
  gift: {
    title: "Gift Box & Special Love Coupons",
    subtitle: "These coupons never expire and you can redeem them anytime you wish!",
    specialMessage: "Happy birthday once again, Cimi!! The greatest gift I could ever give is my time, my undivided attention, and my promise to always stand by your side in every single moment.",
    coupons: [
      {
        id: "c1",
        title: "Coffee & Dessert Date",
        desc: "Redeem whenever you crave a cozy cafe date, ice cream, or your favorite dessert. All on me!",
        tag: "Sweet Treat",
        icon: "coffee"
      },
      {
        id: "c2",
        title: "Casual Day Out",
        desc: "No big plans, no pressure. Just the two of us hanging out, or doing whatever we feel like doing today.",
        tag: "Quality Time",
        icon: "heart"
      },
      {
        id: "c3",
        title: "One 'Yes Day' Pass",
        desc: "A special day where I say yes to whatever you wish to do (Especcially 'Jajan'), anywhere you'd like to explore!",
        tag: "Special Pass",
        icon: "sparkles"
      },
      {
        id: "c4",
        title: "Real Gift",
        desc: "Special gift, you have to wait until I give it to you hehe.",
        tag: "Surprise",
        icon: "gift"
      }
    ]
  }
};
