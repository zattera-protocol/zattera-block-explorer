# Zattera Block Explorer

A modern, real-time block explorer for the Zattera blockchain built with React and Vite.

## Features

- Real-time block updates (3-second intervals matching Zattera block time)
- Block list view with pagination
- Detailed block information with transaction data
- Account information lookup
- Search functionality (by block number or account name)
- Transaction operation details
- Responsive design with dark/light theme support

## Tech Stack

- **Frontend Framework**: React 19
- **Build Tool**: Vite 7
- **Routing**: React Router v6
- **Icons**: Lucide React
- **Styling**: Plain CSS with CSS variables
- **API**: Direct Zattera RPC JSON-RPC calls

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone https://github.com/zattera-protocol/zattera-block-explorer.git
cd zattera-block-explorer

# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

### Linting

```bash
npm run lint
```

## Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── BlockList.jsx   # Block list with real-time updates
│   ├── BlockDetail.jsx # Detailed block information
│   └── SearchBar.jsx   # Search functionality
├── pages/             # Page components
│   ├── HomePage.jsx   # Main page with block list
│   └── BlockPage.jsx  # Individual block detail page
├── services/          # API integration
│   └── zatteraApi.js  # Zattera RPC API client
├── App.jsx            # Main app with routing
└── main.jsx           # Entry point
```

### Configuration

The RPC endpoint is configured via environment variable:

- `VITE_ZATTERA_RPC_URL` - Zattera RPC node endpoint (default: `http://localhost:8090`)

Create a `.env` file in the root directory:

```env
VITE_ZATTERA_RPC_URL=http://localhost:8090
```

## Key Concepts

### Blocks
Blocks are produced every 3 seconds by witnesses and contain multiple transactions.

### Transactions
Each transaction can include multiple operations such as:
- `transfer_operation` - Token transfers
- `vote_operation` - Content voting
- `comment_operation` - Posts and comments
- `custom_json_operation` - Custom data
- And more...

### Witnesses
Block producers that validate transactions and secure the network.

## Development Guidelines

- Use functional components with React Hooks
- Keep components small and focused
- Component files use PascalCase (e.g., `BlockList.jsx`)
- Utility functions use camelCase
- English comments only
- Follow the commit message convention below

## Commit Message Convention

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code formatting
- `refactor`: Code refactoring
- `test`: Adding test code
- `chore`: Build tasks, dependency updates

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feat/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feat/amazing-feature`)
5. Open a Pull Request

## Security

- Never commit private keys or sensitive credentials
- Use public RPC nodes or configure trusted endpoints
- Validate and sanitize all blockchain data
- Implement rate limiting for API calls

## License

This software is provided under the MIT License. See [LICENSE.md](LICENSE.md) for full terms.

```
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
```