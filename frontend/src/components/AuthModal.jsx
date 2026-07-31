import React, { useState, useEffect } from 'react';
import { X, User, CheckCircle2, Edit3, LogOut, Camera } from 'lucide-react';
import './AuthModal.css';

const DEFAULT_AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=200&auto=format&fit=crop'
];

export default function AuthModal({ isOpen, onClose, user, onLoginSuccess, onLogout }) {

  const [isEditing, setIsEditing] = useState(false);
  const [islogin,setlogin]=useState(false)
  const [error,setError]=useState("")


  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    avatar: user?.avatar || DEFAULT_AVATARS[0]
  });

  const [message, setMessage] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        avatar: user.avatar || DEFAULT_AVATARS[0]
      });
    }
  }, [user]);
  if (!isOpen) return null;

  const handleLoginSubmit = async(e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      setMessage('Please fill in your Name, Email, and Phone number.');
      return;
    }
    const userData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      avatar: formData.avatar
    };
    try {
      
      const response = await fetch("https://jnapika.onrender.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
      });

      const data = await response.json();
      console.log(data.data);
      if(data.status ==500){
        setError("User not found! Create a new account.")
        setMessage('Login request failed!');
        
      }else{
        onLoginSuccess(userData);
        setMessage('Logged in successfully!');
        setTimeout(() => {
          setMessage('');
          onClose()
        }, 1000);
      }
    } catch (error) {
      console.error("Error:", error);
    }
    
    setTimeout(() => {
      setMessage('');
    }, 1000);
  };
  const handleSinupSubmit = async(e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      setMessage('Please fill in your Name, Email, and Phone number.');
      return;
    }
    const userData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      avatar: formData.avatar
    };
    try {
      
      const response = await fetch("https://jnapika.onrender.com/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
      });

      const data = await response.json();
      console.log(data.data);
      if(data.status==500){
        setError("Email already existed!")
        setMessage('signup request failed!');

      }else{
        onLoginSuccess(userData);
        setMessage('Signup request failed!');
        setTimeout(() => {
          setMessage('');
          onClose()
        }, 1000);
      }
    } catch (error) {
      console.error("Error:", error);
    }
    setMessage('Signup successfully!');
    setTimeout(() => {
      setMessage('');
    }, 1000);
  };

  const handleProfileSave = async (e) => {
    e.preventDefault();
  
    const updatedUser = {
      ...user,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      avatar: formData.avatar,
    };
  
    try {
      
      const response = await fetch("https://jnapika.onrender.com/updateProfile", {
        method: "PUT", // or POST if your backend uses POST
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        onLoginSuccess(updatedUser);
        setIsEditing(false);
        setMessage("Profile updated successfully!");
      } else {
        setMessage(data.message || "Failed to update profile");
      }
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong");
    }
  
    setTimeout(() => setMessage(""), 1500);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="auth-dialog-box" onClick={(e) => e.stopPropagation()}>
        
        {/* Header - Heading is "Login" when not logged in, "Profile" when logged in */}
        <div className="auth-modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div className="auth-header-icon-bg">
              <User size={18} color="#d95e68" />
            </div>
            <h3 className="auth-modal-title">
              {user ? 'Profile' : islogin==true?'SignUp':'Login'}
            </h3>
          </div>
          <button onClick={onClose} className="auth-btn-close" title="Close modal">
            <X size={18} />
          </button>
        </div>

        {/* Content Body */}
        <div className="auth-modal-body">
          
          {message && (
            <div className="auth-alert-success">
              <CheckCircle2 size={16} color="#10B981" />
              <span>{message}</span>
            </div>
          )}

          {user ? (
            /* Logged In View - Student Profile */
            <div className="profile-container">
              
              {/* Profile Avatar Header */}
              <div className="profile-avatar-wrapper">
                <img
                  src={formData.avatar || DEFAULT_AVATARS[0]}
                  alt={user.name}
                  className="profile-avatar-image"
                />
                {isEditing && (
                  <div className="avatar-picker-row">
                    <span className="avatar-picker-label">Choose Avatar:</span>
                    <div className="avatar-options-grid">
                      {DEFAULT_AVATARS.map((img, idx) => (
                        <img
                          key={idx}
                          src={img}
                          alt="avatar option"
                          className={`avatar-option-thumb ${formData.avatar === img ? 'selected' : ''}`}
                          onClick={() => setFormData({ ...formData, avatar: img })}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {!isEditing ? (
                /* Display Mode */
                <div className="profile-details-card">
                  <h4 className="profile-user-name">{user.name}</h4>
                  
                  <div className="profile-info-row">
                    <span className="profile-info-label">Email:</span>
                    <span className="profile-info-value">{user.email}</span>
                  </div>

                  <div className="profile-info-row">
                    <span className="profile-info-label">Phone:</span>
                    <span className="profile-info-value">{user.phone}</span>
                  </div>

                  {/* Actions: Edit Profile & Logout */}
                  <div className="profile-actions-row">
                    <button
                      type="button"
                      onClick={() => setIsEditing(true)}
                      className="btn-edit-profile"
                    >
                      <Edit3 size={15} />
                      <span>Edit Profile</span>
                    </button>

                    <button
                      type="button"
                      onClick={onLogout}
                      className="btn-logout-minimal"
                    >
                      <LogOut size={15} />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* Edit Mode Form */
                <form onSubmit={handleProfileSave} className="profile-edit-form">
                  <div>
                    <label className="auth-form-label">Full Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="auth-form-input"
                    />
                  </div>

                  <div>
                    <label className="auth-form-label">Email Address</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="auth-form-input"
                    />
                  </div>

                  <div>
                    <label className="auth-form-label">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="auth-form-input"
                    />
                  </div>

                  <div className="profile-edit-actions">
                    <button type="submit" className="auth-btn-submit">
                      Save Changes
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="auth-btn-cancel"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}

            </div>
          ) : (
            /* Login Form (When not logged in) */
            islogin==false?<form onSubmit={handleLoginSubmit} className="auth-login-form">
              <div>
                <label className="auth-form-label">Student Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ananya Sharma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="auth-form-input"
                />
              </div>

              <div>
                <label className="auth-form-label">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="student@college.edu"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="auth-form-input"
                />
              </div>
              {error==""?"":<p style={{color : "red"}}>{error}</p>}
              <div>
                <label className="auth-form-label">Phone Number</label>
                <input
                  type="tel"
                  required
                  placeholder="9876543210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="auth-form-input"
                />
              </div>

              <button type="submit" className="auth-btn-submit">
                Login
              </button>
              <p>Don't have an account?<a style={{textDecoration:"underline",color:"blue",cursor:"pointer"}} onClick={()=>{setlogin(true)}}>signup</a></p>
            </form>:<form onSubmit={handleSinupSubmit} className="auth-login-form">
              <div>
                <label className="auth-form-label">Student Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ananya Sharma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="auth-form-input"
                />
              </div>

              <div>
                <label className="auth-form-label">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="student@college.edu"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="auth-form-input"
                />
              </div>
              {error==""?"":<p style={{color : "red"}}>{error}</p>}

              <div>
                <label className="auth-form-label">Phone Number</label>
                <input
                  type="tel"
                  required
                  placeholder="9876543210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="auth-form-input"
                />
              </div>

              <button type="submit" className="auth-btn-submit">
                Sign Up
              </button>
              <p>Already have an account?<a style={{textDecoration:"underline",color:"blue",cursor:"pointer"}} onClick={()=>{setlogin(false)}}>login</a></p>

            </form>
          )}

        </div>

      </div>
    </div>
  );
}
