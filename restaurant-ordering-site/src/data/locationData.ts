export interface CountryData {
    label: string;
    cities: CityData[];
    currency: string;
    phone: string;
}

export interface CityData {
    slug: string;
    label: string;
}

export const locationData: Record<string, CountryData> = {
    pakistan: {
        label: "Pakistan",
        currency: "PKR",
        phone: "+92",
        cities: [
            { slug: "karachi", label: "Karachi" },
            { slug: "lahore", label: "Lahore" },
            { slug: "islamabad", label: "Islamabad" },
            { slug: "rawalpindi", label: "Rawalpindi" },
            { slug: "faisalabad", label: "Faisalabad" },
            { slug: "multan", label: "Multan" },
            { slug: "peshawar", label: "Peshawar" },
            { slug: "quetta", label: "Quetta" },
            { slug: "sialkot", label: "Sialkot" },
            { slug: "gujranwala", label: "Gujranwala" },
        ],
    },
    uae: {
        label: "UAE",
        currency: "AED",
        phone: "+971",
        cities: [
            { slug: "dubai", label: "Dubai" },
            { slug: "abu-dhabi", label: "Abu Dhabi" },
            { slug: "sharjah", label: "Sharjah" },
            { slug: "ajman", label: "Ajman" },
            { slug: "al-ain", label: "Al Ain" },
            { slug: "ras-al-khaimah", label: "Ras Al Khaimah" },
        ],
    },
    "saudi-arabia": {
        label: "Saudi Arabia",
        currency: "SAR",
        phone: "+966",
        cities: [
            { slug: "riyadh", label: "Riyadh" },
            { slug: "jeddah", label: "Jeddah" },
            { slug: "mecca", label: "Mecca" },
            { slug: "medina", label: "Medina" },
            { slug: "dammam", label: "Dammam" },
            { slug: "khobar", label: "Khobar" },
        ],
    },
    uk: {
        label: "United Kingdom",
        currency: "GBP",
        phone: "+44",
        cities: [
            { slug: "london", label: "London" },
            { slug: "manchester", label: "Manchester" },
            { slug: "birmingham", label: "Birmingham" },
            { slug: "leeds", label: "Leeds" },
            { slug: "glasgow", label: "Glasgow" },
            { slug: "edinburgh", label: "Edinburgh" },
        ],
    },
    usa: {
        label: "USA",
        currency: "USD",
        phone: "+1",
        cities: [
            { slug: "new-york", label: "New York" },
            { slug: "los-angeles", label: "Los Angeles" },
            { slug: "chicago", label: "Chicago" },
            { slug: "houston", label: "Houston" },
            { slug: "phoenix", label: "Phoenix" },
            { slug: "dallas", label: "Dallas" },
        ],
    },
    canada: {
        label: "Canada",
        currency: "CAD",
        phone: "+1",
        cities: [
            { slug: "toronto", label: "Toronto" },
            { slug: "vancouver", label: "Vancouver" },
            { slug: "montreal", label: "Montreal" },
            { slug: "calgary", label: "Calgary" },
            { slug: "ottawa", label: "Ottawa" },
            { slug: "edmonton", label: "Edmonton" },
        ],
    },
    india: {
        label: "India",
        currency: "INR",
        phone: "+91",
        cities: [
            { slug: "delhi", label: "Delhi" },
            { slug: "mumbai", label: "Mumbai" },
            { slug: "bangalore", label: "Bangalore" },
            { slug: "hyderabad", label: "Hyderabad" },
            { slug: "kolkata", label: "Kolkata" },
            { slug: "pune", label: "Pune" },
            { slug: "chennai", label: "Chennai" },
            { slug: "ahmedabad", label: "Ahmedabad" },
        ],
    },
    egypt: {
        label: "Egypt",
        currency: "EGP",
        phone: "+20",
        cities: [
            { slug: "cairo", label: "Cairo" },
            { slug: "alexandria", label: "Alexandria" },
            { slug: "giza", label: "Giza" },
            { slug: "helwan", label: "Helwan" },
            { slug: "suez", label: "Suez" },
        ],
    },
    turkey: {
        label: "Turkey",
        currency: "TRY",
        phone: "+90",
        cities: [
            { slug: "istanbul", label: "Istanbul" },
            { slug: "ankara", label: "Ankara" },
            { slug: "izmir", label: "Izmir" },
            { slug: "bursa", label: "Bursa" },
            { slug: "antalya", label: "Antalya" },
        ],
    },
    malaysia: {
        label: "Malaysia",
        currency: "MYR",
        phone: "+60",
        cities: [
            { slug: "kuala-lumpur", label: "Kuala Lumpur" },
            { slug: "george-town", label: "George Town" },
            { slug: "johor-bahru", label: "Johor Bahru" },
            { slug: "kota-kinabalu", label: "Kota Kinabalu" },
            { slug: "petaling-jaya", label: "Petaling Jaya" },
        ],
    },
    indonesia: {
        label: "Indonesia",
        currency: "IDR",
        phone: "+62",
        cities: [
            { slug: "jakarta", label: "Jakarta" },
            { slug: "surabaya", label: "Surabaya" },
            { slug: "bandung", label: "Bandung" },
            { slug: "medan", label: "Medan" },
            { slug: "bali", label: "Bali" },
        ],
    },
    singapore: {
        label: "Singapore",
        currency: "SGD",
        phone: "+65",
        cities: [
            { slug: "central", label: "Singapore" },
        ],
    },
};

export function getAllCountries(): string[] {
    return Object.keys(locationData);
}

export function getCityLabel(countrySlug: string, citySlug: string): string {
    const country = locationData[countrySlug];
    if (!country) return citySlug;
    const city = country.cities.find((c) => c.slug === citySlug);
    return city?.label ?? citySlug;
}

export function getCountryLabel(countrySlug: string): string {
    return locationData[countrySlug]?.label ?? countrySlug;
}

export function isValidLocation(countrySlug: string, citySlug: string): boolean {
    const country = locationData[countrySlug];
    if (!country) return false;
    return country.cities.some((c) => c.slug === citySlug);
}
