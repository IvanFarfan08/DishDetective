# 🍽️ DishDetective

DishDetective is an AI-powered POS system that leverages Google's Teachable Machine Computer Vision model to instantly identify food items that are added to the customer's cart for payment (Stripe API).

## 🚀 Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM

## 🛠️ Getting Started

1. Clone the repository:
```bash
git clone https://github.com/IvanFarfan08/DishDetective.git
cd dish-detective
```

2. Install dependencies:
```bash
npm install
```

3. Set up your environment variables:
```bash
cp .env.example .env
```
Fill in your environment variables in the `.env` file.

4. Set up the database:
```bash
npx prisma generate
npx prisma db push
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## 🔧 Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run tests

## 📦 Project Structure

```
dish-detective/
├── src/
│   ├── app/          # Next.js app directory
│   ├── components/   # Reusable components
│   ├── lib/         # Utility functions and configurations
│   └── types/       # TypeScript type definitions
├── prisma/          # Database schema and migrations
├── public/          # Static assets
└── tests/           # Test files
```
