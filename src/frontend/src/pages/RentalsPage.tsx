import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Gamepad2, Joystick, Package, Loader2, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import { useGetPricing, useSubmitRentalInquiry, useCalculateRentalCost } from '@/hooks/useQueries';
import { ItemType } from '@/backend';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function RentalsPage() {
  const [formData, setFormData] = useState({
    itemType: '' as ItemType | '',
    quantity: 1,
    startDate: '',
    durationDays: 1,
  });
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmedCost, setConfirmedCost] = useState<number>(0);

  const { data: pricing } = useGetPricing();
  const submitRentalInquiry = useSubmitRentalInquiry();
  const calculateCost = useCalculateRentalCost();

  const categories = [
    {
      type: ItemType.console_,
      title: 'PS5 Console',
      description: 'PlayStation 5 console with controller',
      image: '/assets/generated/ps5-console.dim_400x300.jpg',
      icon: Package,
      rate: pricing ? Number(pricing.console) : 1000,
    },
    {
      type: ItemType.game,
      title: 'PS5 Games',
      description: 'Latest PS5 game titles',
      image: '/assets/generated/ps5-games.dim_400x300.jpg',
      icon: Gamepad2,
      rate: pricing ? Number(pricing.game) : 300,
    },
    {
      type: ItemType.controller,
      title: 'DualSense Controller',
      description: 'Extra wireless controller',
      image: '/assets/generated/ps5-controllers.dim_400x300.jpg',
      icon: Joystick,
      rate: pricing ? Number(pricing.controller) : 200,
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.itemType || !formData.startDate) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (formData.quantity < 1 || formData.durationDays < 1) {
      toast.error('Quantity and duration must be at least 1');
      return;
    }

    const startDate = new Date(formData.startDate);
    if (startDate < new Date()) {
      toast.error('Start date cannot be in the past');
      return;
    }

    try {
      const totalCost = await submitRentalInquiry.mutateAsync({
        itemType: formData.itemType,
        quantity: BigInt(formData.quantity),
        startDate: BigInt(startDate.getTime() * 1000000),
        durationDays: BigInt(formData.durationDays),
      });

      setConfirmedCost(Number(totalCost));
      setShowConfirmation(true);
      setFormData({
        itemType: '',
        quantity: 1,
        startDate: '',
        durationDays: 1,
      });
    } catch (error) {
      toast.error('Failed to submit rental inquiry. Please try again.');
    }
  };

  const estimatedCost =
    formData.itemType && formData.quantity > 0 && formData.durationDays > 0
      ? categories.find((c) => c.type === formData.itemType)!.rate * formData.quantity * formData.durationDays
      : 0;

  const formatCurrency = (cents: number) => {
    return `$${(cents / 100).toFixed(2)}`;
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-background via-ps5-blue/5 to-ps5-purple/5">
        <div className="container py-16 md:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Rent Your{' '}
              <span className="bg-gradient-to-r from-ps5-blue to-ps5-purple bg-clip-text text-transparent">
                Gaming Gear
              </span>
            </h1>
            <p className="text-lg text-muted-foreground md:text-xl">
              Choose from PS5 consoles, games, and controllers. Flexible rental periods at competitive rates.
            </p>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="container py-16 md:py-24">
        <div className="mb-12">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-center">Available Equipment</h2>
          <p className="text-center text-muted-foreground">
            All equipment is tested, sanitized, and ready for your gaming experience.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-16">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Card key={category.type} className="overflow-hidden">
                <div className="relative h-48">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute bottom-4 left-4 flex h-12 w-12 items-center justify-center rounded-lg bg-background/90 backdrop-blur">
                    <Icon className="h-6 w-6 text-ps5-blue" />
                  </div>
                </div>
                <CardHeader>
                  <CardTitle>{category.title}</CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                  <div className="mt-2">
                    <span className="text-2xl font-bold text-ps5-blue">{formatCurrency(category.rate)}</span>
                    <span className="text-sm text-muted-foreground">/day</span>
                  </div>
                </CardHeader>
              </Card>
            );
          })}
        </div>

        {/* Rental Form */}
        <div className="mx-auto max-w-2xl">
          {showConfirmation ? (
            <Alert className="border-ps5-blue/50 bg-ps5-blue/10">
              <CheckCircle2 className="h-5 w-5 text-ps5-blue" />
              <AlertTitle className="text-lg font-semibold">Rental Inquiry Submitted!</AlertTitle>
              <AlertDescription className="mt-2 space-y-2">
                <p>
                  <strong>Total Cost:</strong> {formatCurrency(confirmedCost)}
                </p>
                <p className="text-sm">
                  Thank you for your rental inquiry! We've received your request and will contact you shortly to
                  confirm availability and arrange pickup or delivery.
                </p>
                <p className="text-sm font-medium">
                  Please contact us at <span className="text-ps5-blue">rentals@ps5rentals.com</span> or{' '}
                  <span className="text-ps5-blue">+1 (555) 123-4567</span> to finalize your booking.
                </p>
                <Button
                  onClick={() => setShowConfirmation(false)}
                  variant="outline"
                  className="mt-4"
                >
                  Submit Another Inquiry
                </Button>
              </AlertDescription>
            </Alert>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Rental Request Form</CardTitle>
                <CardDescription>
                  Fill out the form below to request a rental. We'll contact you to confirm and finalize your
                  booking.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="itemType">Item Type *</Label>
                    <Select
                      value={formData.itemType}
                      onValueChange={(value) => setFormData({ ...formData, itemType: value as ItemType })}
                    >
                      <SelectTrigger id="itemType">
                        <SelectValue placeholder="Select item type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={ItemType.console_}>PS5 Console</SelectItem>
                        <SelectItem value={ItemType.game}>PS5 Game</SelectItem>
                        <SelectItem value={ItemType.controller}>DualSense Controller</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="quantity">Quantity *</Label>
                      <Input
                        id="quantity"
                        type="number"
                        min="1"
                        value={formData.quantity}
                        onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) || 1 })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="durationDays">Rental Days *</Label>
                      <Input
                        id="durationDays"
                        type="number"
                        min="1"
                        value={formData.durationDays}
                        onChange={(e) =>
                          setFormData({ ...formData, durationDays: parseInt(e.target.value) || 1 })
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="startDate">Rental Start Date *</Label>
                    <Input
                      id="startDate"
                      type="date"
                      min={new Date().toISOString().split('T')[0]}
                      value={formData.startDate}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                      required
                    />
                  </div>

                  {estimatedCost > 0 && (
                    <div className="rounded-lg bg-gradient-to-br from-ps5-blue/10 to-ps5-purple/10 p-4 border border-ps5-blue/20">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Estimated Total Cost:</span>
                        <span className="text-2xl font-bold text-ps5-blue">{formatCurrency(estimatedCost)}</span>
                      </div>
                      <p className="mt-2 text-xs text-muted-foreground">
                        Final cost will be confirmed when we contact you.
                      </p>
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-ps5-blue to-ps5-purple hover:opacity-90"
                    disabled={submitRentalInquiry.isPending}
                  >
                    {submitRentalInquiry.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      'Submit Rental Inquiry'
                    )}
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    By submitting this form, you agree to our rental terms and policies.
                  </p>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      </section>
    </div>
  );
}
