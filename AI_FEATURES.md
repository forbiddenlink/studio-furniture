# STUDIO Furniture - AI-Powered E-Commerce Platform

A modern, minimalist furniture e-commerce platform showcasing **AI-powered features** and best practices in web development.

## 🌟 Portfolio Highlights

### AI Features Implemented

#### 1. **AI Shopping Assistant** 💬
- Intelligent chatbot with natural language understanding
- Context-aware product recommendations
- Simulates real-time AI processing
- Persistent chat history within session
- Located: Floating button (bottom-right corner on all pages)

#### 2. **AI-Powered Product Recommendations** ✨
- Smart product matching based on browsing behavior
- Category-aware suggestions
- Price similarity analysis
- Tag-based product relationships
- Seen on: Homepage, Product detail pages

#### 3. **AI-Enhanced Search** 🔍
- Natural language query understanding
- Price intent detection ("under $1000")
- Room/use case recognition ("modern chair for living room")
- Relevance scoring algorithm
- Smart search suggestions
- Located: Shop page with "Try AI Search" button

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4.0
- **State Management**: Zustand (with persistence)
- **UI Components**: Radix UI + shadcn/ui
- **Animations**: Framer Motion
- **Icons**: Lucide React

## 📁 Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── page.tsx           # Homepage with AI recommendations
│   ├── shop/              # Shop with AI search
│   ├── cart/              # Shopping cart
│   ├── about/             # About page
│   └── contact/           # Contact with form handling
├── components/
│   ├── ai/                # AI-powered components ⭐
│   │   ├── AIAssistant.tsx
│   │   ├── AIRecommendations.tsx
│   │   └── AISearch.tsx
│   ├── product/           # Product components
│   ├── layout/            # Header & Footer
│   └── ui/                # Reusable UI components
├── lib/
│   ├── data/             # Product data
│   ├── store/            # Zustand store
│   └── metadata.ts       # SEO metadata
└── types/                # TypeScript definitions
```

## 🚀 Features

### E-Commerce Core
- ✅ Product catalog with filtering & sorting
- ✅ Shopping cart with persistence
- ✅ Responsive design (mobile-first)
- ✅ Product detail pages
- ✅ Category browsing
- ✅ Search functionality

### AI Integration
- ✅ Conversational AI assistant
- ✅ Smart product recommendations
- ✅ Natural language search
- ✅ Intent recognition
- ✅ Context-aware responses

### Developer Best Practices
- ✅ TypeScript for type safety
- ✅ ESLint configuration
- ✅ Clean component architecture
- ✅ Performance optimized
- ✅ Accessibility focused
- ✅ SEO friendly

## 🎯 AI Implementation Notes

### For Production

The current AI features use **smart algorithms and rule-based systems** for demonstration. To connect to real AI services:

1. **AI Assistant**: Replace `generateAIResponse()` with OpenAI API calls
2. **Recommendations**: Connect to recommendation engine (e.g., AWS Personalize)
3. **Search**: Integrate with vector search (e.g., Pinecone, OpenAI embeddings)

### Example OpenAI Integration

```typescript
// In AIAssistant.tsx
const response = await fetch('/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    messages: [...messages, { role: 'user', content: userMessage }]
  })
});

const data = await response.json();
return data.message;
```

```typescript
// In app/api/chat/route.ts
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  const { messages } = await req.json();
  
  const completion = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      { role: 'system', content: 'You are a helpful furniture shopping assistant...' },
      ...messages
    ],
  });

  return Response.json({ message: completion.choices[0].message.content });
}
```

## 📦 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Run linting
npm run lint
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## 🎨 Design Philosophy

- **Minimalist**: Clean, uncluttered interface
- **Modern**: Latest web technologies and patterns
- **Accessible**: WCAG compliant components
- **Performant**: Optimized for speed
- **Scalable**: Architecture ready for growth

## 💡 AI Features to Add Next

1. **Visual Search**: Upload images to find similar furniture
2. **Room Designer**: AI-powered virtual room planner
3. **Size Recommendations**: ML model for space-fit suggestions
4. **Sentiment Analysis**: Review analysis
5. **Dynamic Pricing**: AI-optimized pricing suggestions
6. **Voice Shopping**: Voice-activated AI assistant

## 📄 License

This is a portfolio demonstration project.

## 👤 Author

Built to showcase modern web development and AI integration skills.

---

**Note**: This is a demonstration project for portfolio purposes. Product data is static and AI features are simulated for demo purposes. In production, these would connect to real AI services and databases.
