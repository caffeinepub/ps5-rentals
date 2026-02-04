import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-border/40 bg-muted/30">
      <div className="container py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <h3 className="mb-4 text-lg font-semibold">PS5 Rentals</h3>
            <p className="text-sm text-muted-foreground">
              Your trusted source for PlayStation 5 console, game, and controller rentals.
            </p>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="/" className="hover:text-ps5-blue transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/rentals" className="hover:text-ps5-blue transition-colors">
                  Rentals
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-ps5-blue transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-ps5-blue transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Contact Info</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Email: rentals@ps5rentals.com</li>
              <li>Phone: +1 (555) 123-4567</li>
              <li>Hours: Mon-Sat, 9AM-8PM</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-border/40 pt-6 text-center text-sm text-muted-foreground">
          <p className="flex items-center justify-center gap-1">
            © 2025. Built with <Heart className="h-4 w-4 text-ps5-purple fill-ps5-purple" /> using{' '}
            <a
              href="https://caffeine.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ps5-blue hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
