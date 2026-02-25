import React from 'react';
import Dashboard from '../components/Dashboard';

export default function DashboardPage() {
  return (
    <div className="flex flex-col">
      <div className="text-center mb-6">
        <h1 className="font-pacifico text-3xl text-primary mb-1">Your Progress 📊</h1>
        <p className="text-sm text-muted-foreground font-medium">
          Look how far you've bloomed! 🌺
        </p>
      </div>
      <Dashboard />
    </div>
  );
}
