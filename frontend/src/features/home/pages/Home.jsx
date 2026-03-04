import React from 'react';
import { useAuth } from '../../auth/hooks/useAuth';
import '../styles/home.scss';

const Home = () => {
  const { user, handleLogout, isLoading, errors } = useAuth();

  if (isLoading) {
    return (
        <div className="home-page">
            <div className="loading-container">
                <div className="loading-spinner"></div>
            </div>
        </div>
    );
  }

  return (
    <div className="home-page">
      <div className="profile-card">
        <div className="profile-header-bg"></div>
        <div className="profile-info-container">
            <div className="profile-avatar-wrapper">
                <img 
                    src={`https://ui-avatars.com/api/?name=${user?.username || 'User'}&background=random&size=128`} 
                    alt="Profile" 
                    className="profile-avatar"
                />
            </div>
            <div className="user-details">
                <h1 className="user-name">{user?.username}</h1>
                <p className="user-email">{user?.email}</p>
                 <span className="user-role">
                    {user?.role || 'User'}
                </span>
            </div>
        </div>

        <div className="account-section">
            <h2 className="section-title">Account Details</h2>
            <div className="details-grid">
                <div className="detail-card">
                    <span className="detail-label">User ID</span>
                    <span className="detail-value">{user?._id}</span>
                </div>
                 
            </div>
        </div>

        <div className="card-footer">
          {errors.form && <div className="error-message">{errors.form}</div>}
          <button
            onClick={handleLogout}
            className="logout-button"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
