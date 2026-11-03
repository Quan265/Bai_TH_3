import { useState } from 'react';
import { useAuth } from './context/AuthContext';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

export default function App() {
  const { currentUser } = useAuth();
  const [isRegisterView, setIsRegisterView] = useState(false);

  if (currentUser) {
    return <Dashboard />;
  }

  return (
    <div>
      {isRegisterView ? (
        <Register switchToLogin={() => setIsRegisterView(false)} />
      ) : (
        <Login switchToRegister={() => setIsRegisterView(true)} />
      )}
    </div>
  );
}