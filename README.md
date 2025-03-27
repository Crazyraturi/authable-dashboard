
# Authentication Demo App

A simple React application that demonstrates user authentication using local storage. This project provides a complete authentication flow that includes registration, login, and account management.

## Live Demo

**URL**:

## Features

- User registration with name, email, and password
- User login with email and password
- Persistent authentication using localStorage
- Account management (logout, delete account)
- Demo account for easy testing
- Mobile responsive design
- Form validation

## Demo Credentials

For quick testing, you can use the following demo credentials:

- **Email**: demo@example.com
- **Password**: password123

A demo account is automatically created when the application loads.

## Technologies Used

- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui components
- Zod for form validation
- React Router for navigation

## Getting Started

### Prerequisites

Make sure you have Node.js and npm installed on your system.

### Installation

1. Clone the repository:
   ```sh
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```sh
   cd authentication-demo-app
   ```

3. Install the dependencies:
   ```sh
   npm install
   ```

4. Start the development server:
   ```sh
   npm run dev
   ```

5. Open your browser and visit:
   ```
   http://localhost:8080
   ```

## Project Structure

- `src/components/` - UI components
- `src/pages/` - Page components for different routes
- `src/context/` - Context providers including AuthContext
- `src/hooks/` - Custom React hooks

## How It Works

This application uses localStorage to simulate a backend authentication system. When users register, their information is stored in localStorage under the 'users' key. When they log in, their credentials are validated against the stored users. After successful authentication, the user data is stored in localStorage under the 'user' key to maintain a persistent session.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
