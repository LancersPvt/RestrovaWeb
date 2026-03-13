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
