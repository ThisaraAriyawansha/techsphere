# TechSphere

TechSphere is a modern, open-access tech blog platform built with Next.js. It allows anyone to create, publish, and read technology-related blog posts without requiring authentication.

## Features

- **Read & Write** — Anyone can browse posts or publish new ones without signing in
- **Image Uploads** — Attach cover images to posts via ImgBB hosting
- **Topic Filtering** — Browse posts by categories: AI, Web Dev, Mobile, Cloud, Security, and more
- **Search** — Find posts quickly from the homepage or blog listing
- **Admin Dashboard** — Manage and delete posts from an admin panel
- **Newsletter** — Newsletter subscription page
- **Responsive Design** — Clean UI that works across devices

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Frontend | React 18 |
| Database | Firebase Firestore |
| Image Hosting | ImgBB API |
| Form Parsing | Busboy |
| Styling | CSS (globals.css) |

## Pages

| Route | Description |
|---|---|
| `/` | Homepage with hero, search, and recent posts |
| `/blog` | Full blog listing with filtering |
| `/blog/[id]` | Individual post detail view |
| `/new` | Create a new blog post |
| `/topics` | Browse posts by topic/category |
| `/admin` | Admin panel |
| `/admin/dashboard` | Admin statistics and overview |
| `/about` | About TechSphere |
| `/newsletter` | Newsletter signup |
| `/privacy` | Privacy policy |
| `/terms` | Terms of service |

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/posts` | Fetch all posts |
| `POST` | `/api/posts` | Create a new post (multipart/form-data) |
| `GET` | `/api/posts/[id]` | Fetch a single post |
| `DELETE` | `/api/posts/[id]` | Delete a post |

## Getting Started

### Prerequisites

- Node.js 18+
- A Firebase project with Firestore enabled
- An ImgBB API key

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/ThisaraAriyawansha/techsphere.git
   cd techsphere
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env.local` file in the project root and add your credentials:

   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   IMGBB_API_KEY=your_imgbb_api_key
   ```

4. Run the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Build for production |
| `npm start` | Start the production server |
| `npm run lint` | Run ESLint |

## Project Structure

```
techsphere/
├── app/
│   ├── api/posts/          # REST API routes
│   ├── blog/               # Blog listing and detail pages
│   ├── new/                # Create post page
│   ├── admin/              # Admin panel and dashboard
│   ├── topics/             # Topics/categories page
│   ├── about/              # About page
│   ├── newsletter/         # Newsletter page
│   ├── privacy/            # Privacy policy
│   ├── terms/              # Terms of service
│   ├── Navbar.js           # Navigation component
│   ├── Footer.js           # Footer component
│   ├── layout.js           # Root layout
│   └── page.js             # Homepage
├── lib/
│   └── firebase.js         # Firebase configuration and helpers
├── public/
│   └── logo/               # Logo assets
├── next.config.js
└── package.json
```

## Image Upload

Posts support a cover image upload (max 5MB, formats: jpg, jpeg, png, webp). Images are uploaded to ImgBB and the URL is stored in Firestore alongside the post data.


