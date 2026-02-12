import { useState } from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import { Button } from './components/ui/button';
import BookServiceDialog from './components/BookServiceDialog';

export default function App() {
    const [isBookingDialogOpen, setIsBookingDialogOpen] = useState(false);
    const [selectedAppliance, setSelectedAppliance] = useState<string>('');

    const services = [
        {
            icon: '/assets/generated/ac-icon.dim_256x256.png',
            title: 'AC Service',
            description: 'Installation, repair, and maintenance of all AC brands',
            applianceType: 'AC'
        },
        {
            icon: '/assets/generated/washing-machine-icon.dim_256x256.png',
            title: 'Washing Machine',
            description: 'Expert repair for all washing machine models',
            applianceType: 'Washing Machine'
        },
        {
            icon: '/assets/generated/refrigerator-icon.dim_256x256.png',
            title: 'Refrigerator',
            description: 'Complete refrigerator repair and servicing',
            applianceType: 'Refrigerator'
        },
        {
            icon: '/assets/generated/electrical-icon.dim_256x256.png',
            title: 'Electrical Service',
            description: 'Professional electrical repairs and installations',
            applianceType: 'Electrical'
        }
    ];

    const handleServiceClick = (applianceType: string) => {
        setSelectedAppliance(applianceType);
        setIsBookingDialogOpen(true);
    };

    const handleBookServiceClick = () => {
        setSelectedAppliance('');
        setIsBookingDialogOpen(true);
    };

    return (
        <div className="min-h-screen flex flex-col">
            {/* Header */}
            <header className="bg-card border-b border-border sticky top-0 z-50">
                <div className="container mx-auto px-4 py-3">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center">
                            <img 
                                src="/assets/generated/vs-logo-uploaded-exact-v4-horizontal.dim_800x300.png" 
                                alt="VS Appliances Spares and Service Logo" 
                                className="h-10 md:h-12 lg:h-14 w-auto object-contain"
                            />
                        </div>
                        <div className="flex items-center gap-3 md:gap-6">
                            <div className="flex flex-col md:flex-row items-end md:items-center gap-2 md:gap-4 text-xs md:text-sm">
                                <a href="tel:9701078342" className="flex items-center gap-1.5 text-foreground hover:text-primary transition-colors">
                                    <Phone className="h-3.5 w-3.5 md:h-4 md:w-4 flex-shrink-0" />
                                    <span className="font-medium">9701078342</span>
                                </a>
                                <a href="mailto:vsappliancessparesandservice@gmail.com" className="flex items-center gap-1.5 text-foreground hover:text-primary transition-colors">
                                    <Mail className="h-3.5 w-3.5 md:h-4 md:w-4 flex-shrink-0" />
                                    <span className="hidden sm:inline">vsappliancessparesandservice@gmail.com</span>
                                    <span className="sm:hidden">Email Us</span>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="mt-2 md:hidden">
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
                            <span>Tirupathi District, Andhra Pradesh</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <main className="flex-1">
                <section className="relative bg-gradient-to-br from-primary/5 via-background to-accent/5 py-16 md:py-20">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto text-center space-y-6">
                            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground">
                                VS Appliances Spares and Service
                            </h1>
                            <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground">
                                Professional Home Appliance Repair at Affordable Prices
                            </p>
                            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
                                Expert service for AC, Washing Machines, Refrigerators, and Electrical Appliances in Tirupathi District, AP
                            </p>
                            <div className="pt-4">
                                <Button 
                                    size="lg" 
                                    onClick={handleBookServiceClick}
                                    className="text-base md:text-lg px-8 py-6"
                                >
                                    Book Service Now
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Services Section */}
                <section className="py-16 bg-background">
                    <div className="container mx-auto px-4">
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-12 text-foreground">
                            Our Services
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                            {services.map((service, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleServiceClick(service.applianceType)}
                                    className="bg-card border border-border rounded-lg p-6 text-center hover:shadow-lg hover:border-primary/50 transition-all cursor-pointer group"
                                >
                                    <div className="mb-4 flex justify-center">
                                        <img 
                                            src={service.icon} 
                                            alt={service.title}
                                            className="h-20 w-20 md:h-24 md:w-24 object-contain group-hover:scale-110 transition-transform"
                                        />
                                    </div>
                                    <h3 className="text-lg md:text-xl font-semibold mb-2 text-foreground">
                                        {service.title}
                                    </h3>
                                    <p className="text-sm md:text-base text-muted-foreground">
                                        {service.description}
                                    </p>
                                    <p className="text-sm text-primary mt-3 font-medium">
                                        Book Service
                                    </p>
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Why Choose Us */}
                <section className="py-16 bg-muted/30">
                    <div className="container mx-auto px-4">
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-12 text-foreground">
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
                                    <h3 className="text-lg md:text-xl font-semibold text-foreground">
                                        {feature.title}
                                    </h3>
                                    <p className="text-sm md:text-base text-muted-foreground">
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
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-12 text-foreground">
                            Contact Us
                        </h2>
                        <div className="max-w-2xl mx-auto space-y-6">
                            <div className="bg-card border border-border rounded-lg p-6 space-y-4">
                                <div className="flex items-start gap-4">
                                    <Phone className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                                    <div>
                                        <h3 className="font-semibold text-foreground mb-1">Phone</h3>
                                        <a href="tel:9701078342" className="text-muted-foreground hover:text-primary transition-colors">
                                            9701078342
                                        </a>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <Mail className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                                    <div>
                                        <h3 className="font-semibold text-foreground mb-1">Email</h3>
                                        <a href="mailto:vsappliancessparesandservice@gmail.com" className="text-muted-foreground hover:text-primary transition-colors break-all">
                                            vsappliancessparesandservice@gmail.com
                                        </a>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <MapPin className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
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

            {/* Book Service Dialog */}
            <BookServiceDialog 
                open={isBookingDialogOpen}
                onOpenChange={setIsBookingDialogOpen}
                preselectedAppliance={selectedAppliance}
            />
        </div>
    );
}
