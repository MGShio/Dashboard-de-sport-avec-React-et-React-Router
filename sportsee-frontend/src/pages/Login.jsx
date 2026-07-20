import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import Logo from '../components/header/Logo';
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAppContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const success = await login(username, password);
      if (success) {
        navigate('/dashboard');
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || 'Identifiants invalides');
      } else {
        setError('Une erreur est survenue. Veuillez réessayer.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-left-column">
        <Logo />
        
        <div className="login-content">
          <h1 className="login-title">
            Transformez<br />
            vos stats en résultats
          </h1>
          
          <h2 className="login-se-connecter">
            Se connecter
          </h2>
          
          <div className="login-form-container">
            <form onSubmit={handleSubmit} className="login-form">
              <div className="login-input-group">
                <label htmlFor="username" className="login-label">
                  Nom d'utilisateur
                </label>
                <input
                  type="text"
                  id="username"
                  className="login-input"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  placeholder="sophiemartin"
                />
              </div>
              
              <div className="login-input-group">
                <label htmlFor="password" className="login-label">
                  Mot de passe
                </label>
                <input
                  type="password"
                  id="password"
                  className="login-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="password123"
                />
              </div>
              
              {error && (
                <p className="login-error">{error}</p>
              )}
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="login-button"
              >
                {isSubmitting ? 'Connexion...' : 'Se connecter'}
              </button>
            </form>
            
            <p className="login-forgot-password">
              Mot de passe oublié ?
            </p>
          </div>
        </div>
      </div>
      
      <div className="login-right-column">
        <img 
          src="/images/background_picture.png" 
          alt="Background" 
          className="login-background-image"
        />
      </div>
      
      <div className="login-info-bubble">
        <p>
          Analysez vos performances en un clin d'œil,<br />
          suivez vos progrès et atteignez vos objectifs.
        </p>
      </div>
    </div>
  );
}

export default Login;
