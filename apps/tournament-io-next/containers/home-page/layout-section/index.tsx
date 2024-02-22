'use client';

import { useTheme } from 'next-themes';
import React from 'react';

export const LayoutHome = ({ children }: { children: React.ReactNode }) => {
  const currentTheme = useTheme();

  return (
    <div
      className="flex-row h-screen"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(${
          currentTheme.theme !== 'dark' ? '255, 255, 255, 1' : '1, 1, 1, 1'
        }), rgba(250, 54, 5, 0.322)), url('https://res.cloudinary.com/dtrhgm3md/image/upload/v1696944535/tournamentLandingPage.gif')`,
        backgroundSize: 'cover',
      }}
    >
      {children}
    </div>
  );
};
