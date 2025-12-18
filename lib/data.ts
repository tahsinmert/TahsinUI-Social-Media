export interface BlogPost {
  id: string
  title: string
  excerpt: string
  author: string
  date: string
  category: string
  image: string
  featured?: boolean
}

export const categories = ['All', 'Design', 'Technology', 'Lifestyle', 'Travel', 'Fashion']

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Art of Minimalist Living in Modern Times',
    excerpt: 'Discover how minimalism transforms not just spaces but minds, creating harmony in our fast-paced world.',
    author: 'Sarah Chen',
    date: 'March 15, 2024',
    category: 'Lifestyle',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80',
    featured: true,
  },
  {
    id: '2',
    title: 'Typography Trends: The Return of Serif Elegance',
    excerpt: 'Exploring how classic serif fonts are making a sophisticated comeback in digital design.',
    author: 'Marcus Johnson',
    date: 'March 14, 2024',
    category: 'Design',
    image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=80',
  },
  {
    id: '3',
    title: 'Sustainable Fashion: A New Era',
    excerpt: 'How the fashion industry is embracing sustainability without compromising on style.',
    author: 'Emma Rodriguez',
    date: 'March 13, 2024',
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&q=80',
  },
  {
    id: '4',
    title: 'Next.js 14: The Future of React Frameworks',
    excerpt: 'Deep dive into the latest features that make Next.js 14 the go-to choice for modern web development.',
    author: 'Alex Thompson',
    date: 'March 12, 2024',
    category: 'Technology',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80',
  },
  {
    id: '5',
    title: 'Hidden Gems: Travel Destinations Off the Beaten Path',
    excerpt: 'Uncover breathtaking destinations that remain untouched by mass tourism.',
    author: 'Lucas Miller',
    date: 'March 11, 2024',
    category: 'Travel',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
  },
  {
    id: '6',
    title: 'The Psychology of Color in Editorial Design',
    excerpt: 'Understanding how color choices influence reader perception and engagement.',
    author: 'Olivia Brown',
    date: 'March 10, 2024',
    category: 'Design',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
  },
  {
    id: '7',
    title: 'AI Tools Every Designer Should Know',
    excerpt: 'A curated list of AI-powered tools revolutionizing the design workflow.',
    author: 'Daniel Kim',
    date: 'March 9, 2024',
    category: 'Technology',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
  },
  {
    id: '8',
    title: 'Crafting the Perfect Morning Routine',
    excerpt: 'How successful creatives structure their mornings for maximum productivity and inspiration.',
    author: 'Sophie Anderson',
    date: 'March 8, 2024',
    category: 'Lifestyle',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80',
  },
  {
    id: '9',
    title: 'Paris Fashion Week: The Highlights',
    excerpt: 'A recap of the most memorable moments and trends from this season\'s Paris Fashion Week.',
    author: 'Isabella Martinez',
    date: 'March 7, 2024',
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=80',
  },
]

