import { useState } from 'react';
import { Phone, Mail, MapPin, X } from 'lucide-react';
import { SiFacebook, SiInstagram } from 'react-icons/si';
import { useApplianceBrandMap } from './hooks/useApplianceBrandMap';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './components/ui/dialog';
import { Button } from './components/ui/button';
import { Skeleton } from './components/ui/skeleton';

export default function App() {
    const [selectedService, setSelectedService] = useState<string | null>(null);
    const { getBrandsForAppliance, isLoading } = useApplianceBrandMap();

    const services = [
        {
            icon: '/assets/generated/ac-icon.dim_256x256.png',
            title: 'AC Service',
            description: 'Installation, repair, and maintenance of all AC brands',
            applianceName: 'Dryer' // Backend doesn't have AC, using Dryer as closest match
        },
        {
            icon: '/assets/generated/washing-machine-icon.dim_256x256.png',
            title: 'Washing Machine',
            description: 'Expert repair for all washing machine models',
            applianceName: 'Washing Machine'
        },
        {
            icon: '/assets/generated/refrigerator-icon.dim_256x256.png',
            title: 'Refrigerator',
            description: 'Complete refrigerator repair and servicing',
            applianceName: 'Fridge'
        },
        {
            icon: '/assets/generated/electrical-icon.dim_256x256.png',
            title: 'Electrical Service',
            description: 'Professional electrical repairs and installations',
            applianceName: 'Dishwasher' // Backend doesn't have electrical, using Dishwasher as placeholder
        }
    ];

    const handleServiceClick = (applianceName: string) => {
        setSelectedService(applianceName);
    };

    const handleCloseDialog = () => {
        setSelectedService(null);
    };

    const selectedServiceData = services.find(s => s.applianceName === selectedService);
    const brands = selectedService ? getBrandsForAppliance(selectedService) : [];

    return (
        <div className="min-h-screen flex flex-col">
            {/* Header */}
            <header className="bg-card border-b border-border sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <img 
                                src="/assets/generated/vs-logo.dim_800x300.png" 
                                alt="VS Appliances Logo" 
                                className="h-12 w-auto"
                            />
                        </div>
                        <div className="hidden md:flex items-center gap-6 text-sm">
                            <a href="tel:9701078342" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
                                <Phone className="h-4 w-4" />
                                <span>9701078342</span>
                            </a>
                            <a href="mailto:vsappliancessparesandservice@gmail.com" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
                                <Mail className="h-4 w-4" />
                                <span>Contact Us</span>
                            </a>
                        </div>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <main className="flex-1">
                <section className="relative bg-gradient-to-br from-primary/5 via-background to-accent/5 py-20">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto text-center space-y-6">
                            <h1 className="text-4xl md:text-6xl font-bold text-foreground">
                                VS Appliances Spares and Service
                            </h1>
                            <p className="text-xl md:text-2xl text-muted-foreground">
                                Professional Home Appliance Repair at Affordable Prices
                            </p>
                            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                                Expert service for AC, Washing Machines, Refrigerators, and Electrical Appliances in Tirupathi District, AP
                            </p>
                        </div>
                    </div>
                </section>

                {/* Services Section */}
                <section className="py-16 bg-background">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
                            Our Services
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {services.map((service, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleServiceClick(service.applianceName)}
                                    className="bg-card border border-border rounded-lg p-6 text-center hover:shadow-lg hover:border-primary/50 transition-all cursor-pointer group"
                                >
                                    <div className="mb-4 flex justify-center">
                                        <img 
                                            src={service.icon} 
                                            alt={service.title}
                                            className="h-24 w-24 object-contain group-hover:scale-110 transition-transform"
                                        />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2 text-foreground">
                                        {service.title}
                                    </h3>
                                    <p className="text-muted-foreground">
                                        {service.description}
                                    </p>
                                    <p className="text-sm text-primary mt-3 font-medium">
                                        Click to view brands
                                    </p>
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Why Choose Us */}
                <section className="py-16 bg-muted/30">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
                            Why Choose Us
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                            {[
                                {
                                    title: 'Affordable Pricing',
                                    description: 'Quality service at prices that won\'t break the bank'
                                },
                                {
                                    title: 'Expert Technicians',
                                    description: 'Skilled professionals with years of experience'
                                },
                                {
                                    title: 'Quick Service',
                                    description: 'Fast response times and efficient repairs'
                                }
                            ].map((feature, index) => (
                                <div key={index} className="text-center space-y-3">
                                    <h3 className="text-xl font-semibold text-foreground">
                                        {feature.title}
                                    </h3>
                                    <p className="text-muted-foreground">
                                        {feature.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Contact Section */}
                <section className="py-16 bg-background">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
                            Contact Us
                        </h2>
                        <div className="max-w-2xl mx-auto space-y-6">
                            <div className="bg-card border border-border rounded-lg p-6 space-y-4">
                                <div className="flex items-start gap-4">
                                    <Phone className="h-6 w-6 text-primary mt-1" />
                                    <div>
                                        <h3 className="font-semibold text-foreground mb-1">Phone</h3>
                                        <a href="tel:9701078342" className="text-muted-foreground hover:text-primary transition-colors">
                                            9701078342
                                        </a>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <Mail className="h-6 w-6 text-primary mt-1" />
                                    <div>
                                        <h3 className="font-semibold text-foreground mb-1">Email</h3>
                                        <a href="mailto:vsappliancessparesandservice@gmail.com" className="text-muted-foreground hover:text-primary transition-colors break-all">
                                            vsappliancessparesandservice@gmail.com
                                        </a>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <MapPin className="h-6 w-6 text-primary mt-1" />
                                    <div>
                                        <h3 className="font-semibold text-foreground mb-1">Location</h3>
                                        <p className="text-muted-foreground">
                                            Tirupathi District, Andhra Pradesh
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-card border-t border-border py-8">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="text-center md:text-left">
                            <p className="text-sm text-muted-foreground">
                                © {new Date().getFullYear()} VS Appliances Spares and Service. All rights reserved.
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <a 
                                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== 'undefined' ? window.location.hostname : 'vs-appliances')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-muted-foreground hover:text-primary transition-colors"
                            >
                                Built with ❤️ using caffeine.ai
                            </a>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Brand Dialog */}
            <Dialog open={selectedService !== null} onOpenChange={handleCloseDialog}>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="text-2xl">
                            {selectedServiceData?.title} - Available Brands
                        </DialogTitle>
                        <DialogDescription>
                            We service the following brands for {selectedServiceData?.title.toLowerCase()}
                        </DialogDescription>
                    </DialogHeader>
                    
                    <div className="mt-6">
                        {isLoading ? (
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {[1, 2, 3, 4, 5, 6].map((i) => (
                                    <Skeleton key={i} className="h-20 w-full rounded-lg" />
                                ))}
                            </div>
                        ) : brands.length > 0 ? (
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {brands.map((brand) => (
                                    <div
                                        key={brand.id.toString()}
                                        className="bg-muted/50 border border-border rounded-lg p-4 text-center hover:bg-muted transition-colors"
                                    >
                                        <p className="font-semibold text-foreground">
                                            {brand.name}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <p className="text-muted-foreground text-lg">
                                    No brands available for this appliance yet.
                                </p>
                                <p className="text-sm text-muted-foreground mt-2">
                                    Please contact us for more information.
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="mt-6 flex justify-end">
                        <Button onClick={handleCloseDialog} variant="outline">
                            Close
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
