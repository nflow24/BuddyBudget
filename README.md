# BuddyBudget

BuddyBudget is a gamified budgeting platform designed for college students who want to take control of their finances. By turning responsible spending into a fun, competitive experience, BuddyBudget helps you build better money habits while keeping up with your friends.

## What It Does

- **Raise your character** — Create a virtual character that grows and thrives as you make smart financial decisions
- **Compete with friends** — Connect with your friend group and climb the leaderboard based on your budgeting performance
- **Win real prizes** — Participate in sponsored challenges from partnering banking companies for a chance to earn cash rewards

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React, JavaScript |
| Backend | Node.js, Express |
| Database | MongoDB |
| Financial API | Plaid API |
| Prototyping | Canva |

## Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB instance (local or Atlas)
- Plaid API credentials ([get them here](https://plaid.com/))

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/buddybudget.git
   cd buddybudget
2. Install dependencies
   ```bash
   npm install
3. Set up environment variables in .env file
   ```bash
   PLAID_CLIENT_ID=your_client_id
   PLAID_SECRET=your_secret
   MONGODB_URI=your_mongodb_connection_string
4. Start the development server
   ```bash
   npm run dev
