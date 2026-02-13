import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useCreateServiceRequest } from '../hooks/useCreateServiceRequest';

interface BookServiceDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    preselectedAppliance?: string;
}

export default function BookServiceDialog({ open, onOpenChange, preselectedAppliance = '' }: BookServiceDialogProps) {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        city: '',
        applianceType: preselectedAppliance,
        preferredTime: '',
        message: ''
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSuccess, setIsSuccess] = useState(false);

    const { mutate: createRequest, isPending } = useCreateServiceRequest();

    // Update appliance type when preselected changes
    useState(() => {
        if (preselectedAppliance && preselectedAppliance !== formData.applianceType) {
            setFormData(prev => ({ ...prev, applianceType: preselectedAppliance }));
        }
    });

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        } else if (!/^\d{10}$/.test(formData.phone.replace(/\s/g, ''))) {
            newErrors.phone = 'Please enter a valid 10-digit phone number';
        }

        if (!formData.city.trim()) {
            newErrors.city = 'City is required';
        }

        if (!formData.applianceType) {
            newErrors.applianceType = 'Please select an appliance type';
        }

        if (!formData.preferredTime) {
            newErrors.preferredTime = 'Please select a preferred time';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        createRequest(
            {
                name: formData.name,
                phone: formData.phone,
                email: '', // Empty string for backend compatibility
                city: formData.city,
                postalCode: '', // Empty string for backend compatibility
                applianceType: formData.applianceType,
                brand: '', // No brand selection required
                applianceAge: '', // Empty string for backend compatibility
                preferredTime: formData.preferredTime,
                message: formData.message
            },
            {
                onSuccess: () => {
                    setIsSuccess(true);
                    setTimeout(() => {
                        handleClose();
                    }, 3000);
                },
                onError: (error) => {
                    console.error('Failed to create service request:', error);
                    setErrors({ submit: 'Failed to submit request. Please try again.' });
                }
            }
        );
    };

    const handleClose = () => {
        setFormData({
            name: '',
            phone: '',
            city: '',
            applianceType: '',
            preferredTime: '',
            message: ''
        });
        setErrors({});
        setIsSuccess(false);
        onOpenChange(false);
    };

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[field];
                return newErrors;
            });
        }
    };

    if (isSuccess) {
        return (
            <Dialog open={open} onOpenChange={handleClose}>
                <DialogContent className="max-w-md">
                    <div className="flex flex-col items-center justify-center py-8 text-center space-y-4">
                        <img 
                            src="/assets/generated/success-check.dim_256x256.png" 
                            alt="Success" 
                            className="h-16 w-16"
                        />
                        <DialogTitle className="text-2xl">Request Submitted!</DialogTitle>
                        <DialogDescription className="text-base">
                            Thank you for your service request. We will contact you shortly to confirm your appointment.
                        </DialogDescription>
                    </div>
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Book a Service</DialogTitle>
                    <DialogDescription>
                        Fill in your details and we'll get back to you shortly
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Name *</Label>
                            <Input
                                id="name"
                                value={formData.name}
                                onChange={(e) => handleChange('name', e.target.value)}
                                placeholder="Your full name"
                                className={errors.name ? 'border-destructive' : ''}
                            />
                            {errors.name && (
                                <p className="text-sm text-destructive">{errors.name}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="phone">Mobile Number *</Label>
                            <Input
                                id="phone"
                                value={formData.phone}
                                onChange={(e) => handleChange('phone', e.target.value)}
                                placeholder="10-digit mobile number"
                                className={errors.phone ? 'border-destructive' : ''}
                            />
                            {errors.phone && (
                                <p className="text-sm text-destructive">{errors.phone}</p>
                            )}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="city">City *</Label>
                        <Input
                            id="city"
                            value={formData.city}
                            onChange={(e) => handleChange('city', e.target.value)}
                            placeholder="Your city"
                            className={errors.city ? 'border-destructive' : ''}
                        />
                        {errors.city && (
                            <p className="text-sm text-destructive">{errors.city}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="applianceType">Appliance Type *</Label>
                        <Select
                            value={formData.applianceType}
                            onValueChange={(value) => handleChange('applianceType', value)}
                        >
                            <SelectTrigger className={errors.applianceType ? 'border-destructive' : ''}>
                                <SelectValue placeholder="Select appliance type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="AC">AC</SelectItem>
                                <SelectItem value="Washing Machine">Washing Machine</SelectItem>
                                <SelectItem value="Refrigerator">Refrigerator</SelectItem>
                                <SelectItem value="Electrical">Electrical</SelectItem>
                                <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.applianceType && (
                            <p className="text-sm text-destructive">{errors.applianceType}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="preferredTime">Preferred Time *</Label>
                        <Select
                            value={formData.preferredTime}
                            onValueChange={(value) => handleChange('preferredTime', value)}
                        >
                            <SelectTrigger className={errors.preferredTime ? 'border-destructive' : ''}>
                                <SelectValue placeholder="Select preferred time" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Morning (9 AM - 12 PM)">Morning (9 AM - 12 PM)</SelectItem>
                                <SelectItem value="Afternoon (12 PM - 3 PM)">Afternoon (12 PM - 3 PM)</SelectItem>
                                <SelectItem value="Evening (3 PM - 6 PM)">Evening (3 PM - 6 PM)</SelectItem>
                                <SelectItem value="Anytime">Anytime</SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.preferredTime && (
                            <p className="text-sm text-destructive">{errors.preferredTime}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="message">Additional Details (Optional)</Label>
                        <Textarea
                            id="message"
                            value={formData.message}
                            onChange={(e) => handleChange('message', e.target.value)}
                            placeholder="Any specific issues or requirements..."
                            rows={3}
                        />
                    </div>

                    {errors.submit && (
                        <div className="bg-destructive/10 border border-destructive text-destructive px-4 py-3 rounded">
                            {errors.submit}
                        </div>
                    )}

                    <div className="flex gap-3 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleClose}
                            className="flex-1"
                            disabled={isPending}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="flex-1"
                            disabled={isPending}
                        >
                            {isPending ? (
                                <>
                                    <img 
                                        src="/assets/generated/loading-spinner.dim_64x64.png" 
                                        alt="Loading" 
                                        className="mr-2 h-4 w-4 animate-spin"
                                    />
                                    Submitting...
                                </>
                            ) : (
                                'Submit Request'
                            )}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
