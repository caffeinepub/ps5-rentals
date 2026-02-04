import { Link, useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Gamepad2, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export default function Header() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/rentals', label: 'Rentals' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-ps5-blue to-ps5-purple">
            <Gamepad2 className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-ps5-blue to-ps5-purple bg-clip-text text-transparent">
            PS5 Rentals
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-sm font-medium transition-colors hover:text-ps5-blue"
              activeProps={{ className: 'text-ps5-blue' }}
            >
              {link.label}
            </Link>
          ))}
          <Button
            onClick={() => navigate({ to: '/rentals' })}
            className="bg-gradient-to-r from-ps5-blue to-ps5-purple hover:opacity-90"
          >
            Rent Now
          </Button>
        </nav>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px]">
            <div className="flex flex-col gap-6 mt-8">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium transition-colors hover:text-ps5-blue"
                  activeProps={{ className: 'text-ps5-blue' }}
                >
                  {link.label}
                </Link>
              ))}
              <Button
                onClick={() => {
                  setIsOpen(false);
                  navigate({ to: '/rentals' });
                }}
                className="bg-gradient-to-r from-ps5-blue to-ps5-purple hover:opacity-90"
              >
                Rent Now
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
