export interface SocialPost {
  id: string
  author: {
    name: string
    username: string
    avatar: string
  }
  content: string
  timestamp: string
  likes: number
  comments: number
  reposts: number
  isLiked?: boolean
  isReposted?: boolean
}

export interface User {
  id: string
  name: string
  username: string
  avatar: string
  bio: string
  followers: number
  following: number
  isFollowing?: boolean
}

export interface Trend {
  id: string
  rank: number
  title: string
  posts: number
  category?: string
}

export const mockPosts: SocialPost[] = [
  {
    id: '1',
    author: {
      name: 'Sarah Chen',
      username: 'sarahchen',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
    },
    content: 'Minimalist Architecture is not about having less. It\'s about making room for what matters. The beauty lies in the intentional emptiness.',
    timestamp: '2h',
    likes: 124,
    comments: 23,
    reposts: 8,
    isLiked: false,
    isReposted: false,
  },
  {
    id: '2',
    author: {
      name: 'Marcus Johnson',
      username: 'marcusj',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
    },
    content: 'Typography Trends: The Return of Serif Elegance. Classic never goes out of style, especially when it comes to editorial design.',
    timestamp: '4h',
    likes: 89,
    comments: 15,
    reposts: 12,
    isLiked: true,
    isReposted: false,
  },
  {
    id: '3',
    author: {
      name: 'Emma Rodriguez',
      username: 'emmarod',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
    },
    content: 'Sustainable Fashion: A New Era begins when we realize that style and sustainability are not mutually exclusive. Every choice matters.',
    timestamp: '6h',
    likes: 156,
    comments: 34,
    reposts: 19,
    isLiked: false,
    isReposted: true,
  },
  {
    id: '4',
    author: {
      name: 'Alex Thompson',
      username: 'alexthompson',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
    },
    content: 'Next.js 14: The Future of React Frameworks. The developer experience just keeps getting better. Server components are a game changer.',
    timestamp: '8h',
    likes: 203,
    comments: 42,
    reposts: 28,
    isLiked: true,
    isReposted: false,
  },
  {
    id: '5',
    author: {
      name: 'Lucas Miller',
      username: 'lucasm',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80',
    },
    content: 'Hidden Gems: Travel Destinations Off the Beaten Path. Sometimes the best adventures are the ones you never planned for.',
    timestamp: '12h',
    likes: 178,
    comments: 29,
    reposts: 15,
    isLiked: false,
    isReposted: false,
  },
  {
    id: '6',
    author: {
      name: 'Olivia Brown',
      username: 'oliviab',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80',
    },
    content: 'The Psychology of Color in Editorial Design. Colors don\'t just decorate—they communicate, evoke emotions, and guide the reader\'s journey.',
    timestamp: '1d',
    likes: 267,
    comments: 51,
    reposts: 33,
    isLiked: true,
    isReposted: false,
  },
]

export const currentUser: User = {
  id: 'current',
  name: 'Tahsin Mert',
  username: 'tahsinmert',
  avatar: '/profile-avatar.png',
  bio: 'Designer, developer, and storyteller. Building beautiful experiences one pixel at a time.',
  followers: 1248,
  following: 342,
}

export const suggestedUsers: User[] = [
  {
    id: '1',
    name: 'Daniel Kim',
    username: 'danielkim',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&q=80',
    bio: 'AI & Design enthusiast',
    followers: 5234,
    following: 189,
    isFollowing: false,
  },
  {
    id: '2',
    name: 'Sophie Anderson',
    username: 'sophiea',
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&q=80',
    bio: 'Product designer & writer',
    followers: 8921,
    following: 234,
    isFollowing: false,
  },
  {
    id: '3',
    name: 'Isabella Martinez',
    username: 'isabellam',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80',
    bio: 'Fashion & lifestyle curator',
    followers: 15678,
    following: 456,
    isFollowing: true,
  },
]

export const trendingTopics: Trend[] = [
  {
    id: '1',
    rank: 1,
    title: 'Minimalist Architecture',
    posts: 2400,
    category: 'Design',
  },
  {
    id: '2',
    rank: 2,
    title: 'Editorial Typography',
    posts: 1890,
    category: 'Design',
  },
  {
    id: '3',
    rank: 3,
    title: 'Sustainable Living',
    posts: 1650,
    category: 'Lifestyle',
  },
  {
    id: '4',
    rank: 4,
    title: 'Next.js 14',
    posts: 1420,
    category: 'Technology',
  },
  {
    id: '5',
    rank: 5,
    title: 'Travel Photography',
    posts: 1280,
    category: 'Travel',
  },
]

export interface Bookmark extends SocialPost {
  savedAt: string
}

export const mockBookmarks: Bookmark[] = [
  {
    ...mockPosts[0],
    id: 'b1',
    savedAt: '2 days ago',
  },
  {
    ...mockPosts[2],
    id: 'b2',
    savedAt: '1 week ago',
  },
  {
    ...mockPosts[4],
    id: 'b3',
    savedAt: '3 days ago',
  },
]

export interface List {
  id: string
  title: string
  description?: string
  thumbnail?: string
  members: number
  isPinned: boolean
}

export const mockLists: List[] = [
  {
    id: 'l1',
    title: 'Design Inspiration',
    description: 'Beautiful design works and creative ideas',
    thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&q=80',
    members: 24,
    isPinned: true,
  },
  {
    id: 'l2',
    title: 'Tech Reads',
    description: 'Interesting articles about technology',
    thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80',
    members: 18,
    isPinned: false,
  },
  {
    id: 'l3',
    title: 'Travel Stories',
    description: 'Adventures from around the world',
    thumbnail: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&q=80',
    members: 31,
    isPinned: true,
  },
  {
    id: 'l4',
    title: 'Food & Recipes',
    description: 'Delicious recipes and food photography',
    thumbnail: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80',
    members: 15,
    isPinned: false,
  },
]

export interface Draft {
  id: string
  content: string
  createdAt: string
  updatedAt: string
}

export const mockDrafts: Draft[] = [
  {
    id: 'd1',
    content: 'The future of web design is not just about aesthetics, it\'s about creating meaningful experiences that resonate with users on a deeper level...',
    createdAt: '3 days ago',
    updatedAt: '2 hours ago',
  },
  {
    id: 'd2',
    content: 'Exploring the intersection of minimalism and functionality in modern UI design. How can we create interfaces that are both beautiful and practical?',
    createdAt: '1 week ago',
    updatedAt: '5 days ago',
  },
  {
    id: 'd3',
    content: 'Typography plays a crucial role in editorial design. The right font choice can transform a simple layout into an elegant piece of art.',
    createdAt: '2 weeks ago',
    updatedAt: '1 week ago',
  },
]

export interface MoodboardPost {
  id: string
  image: string
  title?: string
  description?: string
  likes: number
  comments: number
  timestamp: string
  aspectRatio: number // width/height ratio for layout calculations
}

export const mockMoodboardPosts: MoodboardPost[] = [
  {
    id: 'm1',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80',
    title: 'Minimalist Architecture',
    description: 'The beauty of simplicity in modern design',
    likes: 342,
    comments: 28,
    timestamp: '2h',
    aspectRatio: 1.33,
  },
  {
    id: 'm2',
    image: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45?w=600&q=80',
    title: 'Editorial Design',
    description: 'Typography meets visual storytelling',
    likes: 521,
    comments: 45,
    timestamp: '4h',
    aspectRatio: 0.75,
  },
  {
    id: 'm3',
    image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&q=80',
    title: 'Urban Aesthetics',
    description: 'Cityscapes and architectural details',
    likes: 289,
    comments: 19,
    timestamp: '6h',
    aspectRatio: 1.5,
  },
  {
    id: 'm4',
    image: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=700&q=80',
    title: 'Color Gradients',
    description: 'Vibrant color palettes for inspiration',
    likes: 678,
    comments: 67,
    timestamp: '8h',
    aspectRatio: 0.85,
  },
  {
    id: 'm5',
    image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&q=80',
    title: 'Fashion Editorial',
    description: 'Style meets artistry',
    likes: 423,
    comments: 34,
    timestamp: '10h',
    aspectRatio: 1.25,
  },
  {
    id: 'm6',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=80',
    title: 'Natural Light',
    description: 'Photography in perfect conditions',
    likes: 891,
    comments: 89,
    timestamp: '12h',
    aspectRatio: 0.8,
  },
  {
    id: 'm7',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    title: 'Abstract Art',
    description: 'Creative expressions through color',
    likes: 567,
    comments: 52,
    timestamp: '1d',
    aspectRatio: 1.6,
  },
  {
    id: 'm8',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=700&q=80',
    title: 'Design Studio',
    description: 'Workspace inspiration',
    likes: 334,
    comments: 23,
    timestamp: '1d',
    aspectRatio: 1.1,
  },
  {
    id: 'm9',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80',
    title: 'Art Gallery',
    description: 'Curated visual experiences',
    likes: 445,
    comments: 38,
    timestamp: '2d',
    aspectRatio: 0.7,
  },
  {
    id: 'm10',
    image: 'https://images.unsplash.com/photo-1542435503-956c469947f6?w=800&q=80',
    title: 'Minimalist Workspace',
    description: 'Clean and functional design',
    likes: 712,
    comments: 71,
    timestamp: '2d',
    aspectRatio: 1.4,
  },
  {
    id: 'm11',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=700&q=80',
    title: 'Tech Aesthetics',
    description: 'Modern technology design',
    likes: 389,
    comments: 31,
    timestamp: '3d',
    aspectRatio: 1.2,
  },
  {
    id: 'm12',
    image: 'https://images.unsplash.com/photo-1484100356142-db6ab6244067?w=600&q=80',
    title: 'Creative Process',
    description: 'Ideas coming to life',
    likes: 556,
    comments: 48,
    timestamp: '3d',
    aspectRatio: 0.9,
  },
]

export interface Edition {
  id: string
  title: string
  issueNumber: number
  coverImage: string
  curator: {
    name: string
    username: string
    avatar: string
  }
  posts: string[] // Post IDs
  description?: string
  publishedAt: string
  isPinned?: boolean
}

export const mockEditions: Edition[] = [
  {
    id: 'e1',
    title: 'Minimalist Living',
    issueNumber: 1,
    coverImage: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=800&q=80',
    curator: {
      name: 'Sarah Chen',
      username: 'sarahchen',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
    },
    posts: ['1', '8'],
    description: 'A curated collection exploring the art of minimalist living in modern times',
    publishedAt: 'March 15, 2024',
    isPinned: true,
  },
  {
    id: 'e2',
    title: 'Design Philosophy',
    issueNumber: 2,
    coverImage: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&h=800&q=80',
    curator: {
      name: 'Marcus Johnson',
      username: 'marcusj',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
    },
    posts: ['2', '6'],
    description: 'Typography and color psychology in editorial design',
    publishedAt: 'March 14, 2024',
    isPinned: false,
  },
  {
    id: 'e3',
    title: 'Sustainable Future',
    issueNumber: 3,
    coverImage: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=600&h=800&q=80',
    curator: {
      name: 'Emma Rodriguez',
      username: 'emmarod',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
    },
    posts: ['3', '9'],
    description: 'Fashion and lifestyle choices for a sustainable tomorrow',
    publishedAt: 'March 13, 2024',
    isPinned: true,
  },
  {
    id: 'e4',
    title: 'Tech Innovation',
    issueNumber: 4,
    coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=800&q=80',
    curator: {
      name: 'Alex Thompson',
      username: 'alexthompson',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
    },
    posts: ['4', '7'],
    description: 'The latest in technology and AI tools for creators',
    publishedAt: 'March 12, 2024',
    isPinned: false,
  },
]

