import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from '@tanstack/react-router';
import { Gamepad2, Joystick, Package } from 'lucide-react';

export default function HomePage() {
  const navigate = useNavigate();

  const categories = [
    {
      title: 'PS5 Consoles',
      description: 'Rent the latest PlayStation 5 console and experience next-gen gaming.',
      image: '/assets/generated/ps5-console.dim_400x300.jpg',
      icon: Package,
      gradient: 'from-ps5-blue/20 to-ps5-purple/20',
    },
    {
      title: 'Games',
      description: 'Access a vast library of the hottest PS5 games for every genre.',
      image: '/assets/generated/ps5-games.dim_400x300.jpg',
      icon: Gamepad2,
      gradient: 'from-ps5-purple/20 to-pink-500/20',
    },
    {
      title: 'Controllers',
      description: 'Extra DualSense controllers for multiplayer gaming sessions.',
      image: '/assets/generated/ps5-controllers.dim_400x300.jpg',
      icon: Joystick,
      gradient: 'from-pink-500/20 to-ps5-blue/20',
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-ps5-blue/5 to-ps5-purple/5">
        <div className="container py-16 md:py-24 lg:py-32">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col gap-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-ps5-blue/20 bg-ps5-blue/10 px-4 py-1.5 text-sm font-medium text-ps5-blue w-fit">
                <Gamepad2 className="h-4 w-4" />
                Premium Gaming Rentals
              </div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                Experience{' '}
                <span className="bg-gradient-to-r from-ps5-blue to-ps5-purple bg-clip-text text-transparent">
                  Next-Gen Gaming
                </span>
              </h1>
              <p className="text-lg text-muted-foreground md:text-xl">
                Rent PS5 consoles, games, and controllers at affordable rates. No commitment, just pure gaming
                excitement.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  size="lg"
                  onClick={() => navigate({ to: '/rentals' })}
                  className="bg-gradient-to-r from-ps5-blue to-ps5-purple hover:opacity-90 text-base"
                >
                  Start Renting
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => navigate({ to: '/about' })}
                  className="text-base"
                >
                  Learn More
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-ps5-blue/20 to-ps5-purple/20 blur-3xl" />
              <img
                src="/assets/generated/gaming-setup-hero.dim_800x400.jpg"
                alt="Gaming Setup"
                className="relative rounded-2xl shadow-2xl ring-1 ring-border/50"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="container py-16 md:py-24">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            What We Offer
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Choose from our premium selection of PS5 equipment and start gaming today.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Card
                key={category.title}
                className="group overflow-hidden transition-all hover:shadow-lg hover:shadow-ps5-blue/10"
              >
                <div className="relative h-48 overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient}`} />
                  <img
                    src={category.image}
                    alt={category.title}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute bottom-4 left-4 flex h-12 w-12 items-center justify-center rounded-lg bg-background/90 backdrop-blur">
                    <Icon className="h-6 w-6 text-ps5-blue" />
                  </div>
                </div>
                <CardHeader>
                  <CardTitle>{category.title}</CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    variant="outline"
                    className="w-full group-hover:bg-ps5-blue/10 group-hover:text-ps5-blue group-hover:border-ps5-blue/50"
                    onClick={() => navigate({ to: '/rentals' })}
                  >
                    View Rentals
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-ps5-blue/10 via-ps5-purple/10 to-background">
        <div className="container py-16 md:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Ready to Start Gaming?
            </h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Get instant access to the latest PS5 games and equipment. Flexible rental periods and competitive
              pricing.
            </p>
            <Button
              size="lg"
              onClick={() => navigate({ to: '/rentals' })}
              className="bg-gradient-to-r from-ps5-blue to-ps5-purple hover:opacity-90 text-base"
            >
              Browse Rentals
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
