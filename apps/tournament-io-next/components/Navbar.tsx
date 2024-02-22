'use client';

import {
  NavbarContent,
  NavbarItem,
  Link,
  NavbarBrand,
  Switch,
  Navbar,
} from '@nextui-org/react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { dark } from '@clerk/themes';

export default function NavbarComponent() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  const onChangeTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Navbar>
      <NavbarBrand>
        <>
          <img
            className="h-8 w-auto"
            src="https://res.cloudinary.com/dtrhgm3md/image/upload/v1696333927/turnuva2323_logo.png"
            alt="logo"
          />
          <p className="font-bold text-inherit">Tournament IO</p>
        </>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem>
          <Switch onChange={onChangeTheme} color="primary" size="sm" />
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">
          <SignedIn>
            {/* Mount the UserButton component */}
            <UserButton
              showName={false}
              userProfileMode="modal"
              userProfileProps={{
                appearance: {
                  baseTheme: theme === 'dark' ? dark : undefined,
                  layout: {
                    showOptionalFields: false,
                  },
                },
              }}
              appearance={{
                baseTheme: theme === 'dark' ? dark : undefined,
                layout: {
                  showOptionalFields: false,
                },
              }}
            />
          </SignedIn>
          <SignedOut>
            {/* Signed out users get sign in button */}
            <SignInButton />
          </SignedOut>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
