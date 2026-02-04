import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Clock, DollarSign, Headphones } from 'lucide-react';

export default function AboutPage() {
  const features = [
    {
      icon: Shield,
      title: 'Quality Guaranteed',
      description: 'All equipment is thoroughly tested and sanitized before each rental.',
    },
    {
      icon: Clock,
      title: 'Flexible Rentals',
      description: 'Choose rental periods that fit your schedule, from days to weeks.',
    },
    {
      icon: DollarSign,
      title: 'Affordable Rates',
      description: 'Competitive pricing with no hidden fees or surprise charges.',
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      description: 'Our team is always ready to help with any questions or issues.',
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-background via-ps5-blue/5 to-ps5-purple/5">
        <div className="container py-16 md:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              About{' '}
              <span className="bg-gradient-to-r from-ps5-blue to-ps5-purple bg-clip-text text-transparent">
                PS5 Rentals
              </span>
            </h1>
            <p className="text-lg text-muted-foreground md:text-xl">
              Your trusted partner for premium PlayStation 5 gaming equipment rentals.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="container py-16 md:py-24">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12">
            <h2 className="mb-4 text-3xl font-bold tracking-tight">Our Mission</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              At PS5 Rentals, we believe everyone should have access to the latest gaming technology without the
              commitment of purchasing expensive equipment. Our mission is to make next-generation gaming accessible
              and affordable for everyone, whether you're a casual gamer wanting to try out the PS5, a hardcore
              enthusiast looking to play the latest releases, or hosting a gaming party with friends.
            </p>
          </div>

          <div className="mb-12">
            <h2 className="mb-4 text-3xl font-bold tracking-tight">Why Choose Us</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <Card key={feature.title}>
                    <CardHeader>
                      <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-ps5-blue/20 to-ps5-purple/20">
                        <Icon className="h-6 w-6 text-ps5-blue" />
                      </div>
                      <CardTitle>{feature.title}</CardTitle>
                      <CardDescription>{feature.description}</CardDescription>
                    </CardHeader>
                  </Card>
                );
              })}
            </div>
          </div>

          <div className="mb-12">
            <h2 className="mb-4 text-3xl font-bold tracking-tight">Rental Policies</h2>
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="mb-2 font-semibold text-lg">Rental Terms</h3>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>Minimum rental period: 1 day</li>
                      <li>Maximum rental period: 30 days (extensions available)</li>
                      <li>Late returns subject to additional daily charges</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="mb-2 font-semibold text-lg">Equipment Care</h3>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>All equipment must be returned in the same condition as received</li>
                      <li>Damage or loss will be charged at replacement cost</li>
                      <li>Equipment is insured during the rental period</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="mb-2 font-semibold text-lg">Booking & Payment</h3>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>Submit rental inquiry through our website</li>
                      <li>We'll contact you to confirm availability and arrange pickup/delivery</li>
                      <li>Payment due at time of equipment pickup</li>
                      <li>Security deposit required for console rentals</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="mb-2 font-semibold text-lg">Cancellation Policy</h3>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>Free cancellation up to 24 hours before rental start date</li>
                      <li>50% charge for cancellations within 24 hours</li>
                      <li>No refunds for early returns</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <h2 className="mb-4 text-3xl font-bold tracking-tight">Service Area</h2>
            <Card>
              <CardContent className="pt-6">
                <p className="text-muted-foreground mb-4">
                  We currently serve the greater metropolitan area with both pickup and delivery options available.
                  Delivery fees may apply based on distance.
                </p>
                <p className="text-muted-foreground">
                  <strong>Service Hours:</strong> Monday - Saturday, 9:00 AM - 8:00 PM
                  <br />
                  <strong>Closed:</strong> Sundays and major holidays
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
