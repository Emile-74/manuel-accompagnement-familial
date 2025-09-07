'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from './ui/Button';
import { AuthModal } from './auth/AuthModal';
import { useAuth } from '@/contexts/AuthContext';
import { LogOut, User } from 'lucide-react';

const Header = () => {
  const { user, logout } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  const handleAuthClick = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <>
      <header className="bg-white/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <nav className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-primary-600">
            Manuel Aidant
          </Link>
          
          {user && (
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/dashboard" className="text-neutral-600 hover:text-primary-600 transition-colors">
                Tableau de bord
              </Link>
              <Link href="/lessons" className="text-neutral-600 hover:text-primary-600 transition-colors">
                Leçons
              </Link>
              <Link href="/rewards" className="text-neutral-600 hover:text-primary-600 transition-colors">
                Récompenses
              </Link>
            </div>
          )}
          
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-primary-600" />
                  </div>
                  <span className="text-sm font-medium text-neutral-700">
                    {user.displayName}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="flex items-center space-x-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Déconnexion</span>
                </Button>
              </div>
            ) : (
              <>
                <Button 
                  variant="ghost" 
                  onClick={() => handleAuthClick('login')}
                >
                  Connexion
                </Button>
                <Button onClick={() => handleAuthClick('signup')}>
                  Inscription
                </Button>
              </>
            )}
          </div>
        </nav>
      </header>

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authMode}
      />
    </>
  );
};

export default Header;

