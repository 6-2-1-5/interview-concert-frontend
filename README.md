# Concert - Frontend

## Prerequisites

-   Node.js 18+
-   pnpm package manager
-   Backend API service running (default: http://localhost:8080)

## Getting Started

### 1. Environment Setup

Create your environment configuration:

```bash
cp .env.local.example .env.local
```

Update the `.env.local` file with your backend service URL:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Run Development Server

```bash
pnpm run dev
```

### 4. Access the Application

Open [http://localhost:3000](http://localhost:3000) in your browser.

You can choose to login as either:

-   **Admin**
-   **User**
