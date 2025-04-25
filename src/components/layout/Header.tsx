"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image'; // Import next/image
import { usePathname } from 'next/navigation'; // Import usePathname
import { siteConfig } from '@/config/site';
import { mainNavItems } from '@/config/navigation';
import { Button } from '@/components/ui/button'; // Assuming shadcn/ui
import { ShoppingCart, Menu, X } from 'lucide-react'; // Example icons
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { cn } from '@/lib/utils';
import { useSocialLinks } from '@/context/SocialLinksContext'; // Import the context hook

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname(); // Get current path

  // Get social links from context
  const { socialLinks, isLoading, error: isError } = useSocialLinks();
  
  // Example cart count - would typically come from a cart context or state
  const cartCount = 0;

  // Effect to handle scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10); // Set scrolled state if scrolled more than 10px
    };
    
    window.addEventListener('scroll', handleScroll);
    // Initial check in case page is already scrolled
    handleScroll();
    
    // Cleanup listener on component unmount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Filter active social links for the mobile menu
  const mobileSocialLinks = socialLinks.filter(
    link => link.isActive !== false && 
           (link.category === 'social' || !link.category) // Only show 'social' or uncategorized
  );

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full border-b transition-all duration-300",
      scrolled 
        ? "border-border/40 bg-background/95 backdrop-blur-lg shadow-md"
        : "border-transparent bg-background/80 backdrop-blur-md"
    )}>
      <div className={cn(
        "container flex items-center transition-[height] duration-300",
        scrolled ? "h-14" : "h-16" // Adjust height/padding based on scroll
      )}>
        <div className="mr-4 hidden md:flex items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            {/* Use next/image */}
            <Image 
              src="/icons/gigacode_logo.png" 
              alt={siteConfig.name} 
              width={120} // Provide width (adjust as needed)
              height={32} // Provide height (adjust to match h-8, assuming 1rem = 16px)
              className="h-8 w-auto" // Keep Tailwind height for consistency
              priority // Prioritize loading the logo
            />
            {/* Keep the text name for screen readers or if image fails, but hide visually */}
            <span className="sr-only">
              {siteConfig.name}
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {mainNavItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "transition-colors hover:text-foreground/80 group", // Added group for hover effect
                    isActive ? "text-foreground" : "text-foreground/60"
                  )}
                >
                  {item.title}
                  {/* Animated underline for active/hover state */}
                  <span className={cn(
                    "block h-0.5 w-full bg-primary transition-transform duration-300 origin-left",
                    isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  )} />
                </Link>
              );
            })}
          </nav>
        </div>
        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden mr-2"
          aria-label="Toggle Menu"
          onClick={toggleMobileMenu}
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
        
        {/* Mobile Logo (shown on mobile) */}
        <div className="md:hidden flex-1">
          <Link href="/" className="flex items-center">
            {/* Mobile Image Logo */}
             <Image 
              src="/icons/gigacode_logo.png" 
              alt={siteConfig.name} 
              width={105} // Adjust width based on h-7
              height={28} // Adjust height (h-7)
              className="h-7 w-auto mr-2"
              priority
            />
            {/* Keep text logo hidden visually but available */}
            <span className="font-bold sr-only">
              {siteConfig.name}
            </span>
          </Link>
        </div>
        
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" aria-label="Shopping Cart" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-medium text-primary-foreground flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Button>
            <ThemeToggle />
            {/* TODO: Add Auth Button (Login/User) */}
          </nav>
        </div>
      </div>
      
      {/* Mobile Menu Drawer with transitions */}
      <div 
        className={cn(
          "fixed inset-0 z-50 md:hidden",
          mobileMenuOpen ? "pointer-events-auto" : "pointer-events-none opacity-0"
        )}
      >
        {/* Backdrop with opacity transition */}
        <div 
          className={cn(
            "fixed inset-0 bg-black/25 backdrop-blur-sm transition-opacity duration-300",
            mobileMenuOpen ? "opacity-100" : "opacity-0"
          )}
          onClick={toggleMobileMenu}
          aria-hidden="true"
        />
        
        {/* Drawer with slide transition */}
        <div 
          className={cn(
            "fixed inset-y-0 left-0 w-3/4 max-w-sm bg-background p-6 shadow-lg transition-transform duration-300 ease-in-out",
            mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between mb-8">
              <Link href="/" onClick={toggleMobileMenu} className="font-bold text-lg">
                {siteConfig.name}
              </Link>
              <Button variant="ghost" size="icon" onClick={toggleMobileMenu} aria-label="Close menu">
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            <nav className="flex flex-col space-y-6 text-base font-medium">
              {mainNavItems.map((item) => {
                 const isActive = pathname === item.href;
                 return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "transition-colors hover:text-foreground/80",
                      isActive ? "text-foreground" : "text-foreground/60"
                    )}
                    onClick={toggleMobileMenu}
                  >
                    {item.title}
                  </Link>
                 );
              })}
            </nav>
            
            <div className="mt-auto pt-6 border-t">
              <div className="flex flex-col space-y-4">
                {/* Display dynamic social links from context */}
                {!isLoading && !isError && mobileSocialLinks.length > 0 && mobileSocialLinks.map((link) => (
                  <Link
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center text-sm font-medium text-foreground/60 hover:text-foreground/80"
                  >
                    {link.name} 
                  </Link>
                ))}
              </div>
              
              <div className="mt-6 pt-6 border-t">
                <p className="text-sm text-muted-foreground">
                  {siteConfig.contact.email}
                </p>
                {siteConfig.contact.phone && (
                  <p className="text-sm text-muted-foreground mt-1">
                    {siteConfig.contact.phone}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
} 