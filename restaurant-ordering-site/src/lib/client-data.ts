export interface ClientTestimonial {
    id: string;
    name: string;
    company: string;
    role: string;
    testimonial: string;
    rating: number;
    logo: string;
    industry: string;
}

export const clientTestimonials: ClientTestimonial[] = [
    {
        id: "1",
        name: "Ahmed Malik",
        company: "Spice Garden",
        role: "Owner",
        testimonial: "Restrova transformed our business. We went from relying on expensive third-party apps to having our own branded platform. Orders increased by 40% in just 3 months!",
        rating: 5,
        logo: "/clients/spice-garden.png",
        industry: "Fine Dining",
    },
    {
        id: "2",
        name: "Zainab Raza",
        company: "Quick Bites",
        role: "Operations Manager",
        testimonial: "The admin app makes managing multiple branches so easy. Real-time order tracking and analytics help us make better decisions every day.",
        rating: 5,
        logo: "/clients/quick-bites.png",
        industry: "Fast Food",
    },
    {
        id: "3",
        name: "Usman Ali",
        company: "Desi Delights",
        role: "CEO",
        testimonial: "Best investment we made. The customer app is smooth, the POS integration works perfectly, and our customers love the loyalty program.",
        rating: 5,
        logo: "/clients/desi-delights.png",
        industry: "Casual Dining",
    },
    {
        id: "4",
        name: "Ayesha Siddiqui",
        company: "Café Aroma",
        role: "Founder",
        testimonial: "Professional team, beautiful design, and excellent support. Our online orders have tripled since launching with Restrova.",
        rating: 5,
        logo: "/clients/cafe-aroma.png",
        industry: "Café",
    },
];
