# Concert - Frontend

## Architecture Overview

This is a Next.js-based concert management system with a modular architecture designed for scalability and maintainability.

### Key Features

-   **Role-Based Access Control**: Separate interfaces for Admin and User roles
-   **Modular Design**: Feature-based module organization for better maintainability
-   **Responsive UI**: Mobile-first design with CSS Grid and Flexbox
-   **Real-time Updates**: Toast notifications for user feedback
-   **Type Safety**: Full TypeScript implementation

### Technology Stack, Libraries or Packages

-   **Framework**: Next.js 15 with App Router
-   **Language**: TypeScript
-   **Styling**: CSS Modules with responsive design
-   **Icons**: Lucide React
-   **Notifications**: React Hot Toast
-   **State Management**: React hooks (useState, useEffect)

### Role-Based Features

#### Admin Role

-   View concert statistics (total seats, reserved, cancelled)
-   Create new concerts
-   Delete existing concerts
-   View all user history records
-   Switch between admin and user views

#### User Role

-   Browse available concerts
-   Reserve concert seats
-   Cancel reservations
-   View personal reservation history
-   Switch to admin view (if permissions allow)

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

## Bonus Task (Optional):

-   Express your opinion about how to optimize your website in case that this
    website contains intensive data and when more people access, the lower speed
    you get?

    -   Caching for server side data fetching eg. React Query
    -   Add chunk fetching concerts data eg. Pagination, load on scroll
    -   Add Rate limit to prevent spam
    -   Use server side render to reduce client side load
    -   Add CDN for static assets global
    -   Optimize database query and use indexing where appropriate
    -   Add load balancer for traffic across multiple server
    -   Use database sharding for data across multiple server
    -   Use message queue e.g. RabbitMQ, Upstash QStash to handle concurrent
    -   Use monitoring tool to track performance and bottleneck

-   Express your opinion about how to handle when many users want to reserve the
    ticket at the same time? We want to ensure that in the concerts there is no one
    that needs to stand up during the show.

    -   Database level locking
    -   Use queue based processing eg. RabbitMQ, Redis
    -   Add rate limit to prevent spam
