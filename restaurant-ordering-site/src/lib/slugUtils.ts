/**
 * Creates an SEO-optimized slug for a programmatic page.
 * Pattern: restaurant-{service}-software-in-{city}-{country}
 */
export function createSlug(
    serviceSlug: string,
    citySlug: string,
    countrySlug: string
): string {
    return `restaurant-${serviceSlug}-software-in-${citySlug}-${countrySlug}`;
}

/**
 * Parses a slug back into its component parts.
 * Returns null if the slug doesn't match the expected pattern.
 *
 * Pattern: restaurant-{service}-software-in-{city}-{country}
 */
export function parseSlug(
    slug: string
): { service: string; city: string; country: string } | null {
    // Match: restaurant-{service}-software-in-{city}-{country}
    // Country is always the last segment, city is before "country" after "in"
    // We need to handle multi-word city slugs like "abu-dhabi" or "new-york"

    const pattern = /^restaurant-(.+?)-software-in-(.+?)-([^-]+(?:-[^-]+)*)$/;

    // The country slug could be multi-word (e.g., saudi-arabia)
    // We can't just use the pattern naively. Instead, import location data to validate.
    const match = slug.match(pattern);
    if (!match) return null;

    return {
        service: match[1],
        city: match[2],
        country: match[3],
    };
}

/**
 * A more robust parser that validates against the known location data.
 * Tries all known country slugs to find the right split point.
 */
export function parseSlugSafe(
    slug: string,
    knownCountries: string[]
): { service: string; city: string; country: string } | null {
    // Must start with "restaurant-" and contain "-software-in-"
    const prefix = "restaurant-";
    const separator = "-software-in-";

    if (!slug.startsWith(prefix)) return null;

    const afterPrefix = slug.slice(prefix.length);
    const sepIndex = afterPrefix.indexOf(separator);
    if (sepIndex === -1) return null;

    const service = afterPrefix.slice(0, sepIndex);
    const locationPart = afterPrefix.slice(sepIndex + separator.length);

    // Try to match country slug from the end
    for (const country of knownCountries.sort((a, b) => b.length - a.length)) {
        if (locationPart.endsWith(`-${country}`)) {
            const city = locationPart.slice(0, locationPart.length - country.length - 1);
            if (city.length > 0 && service.length > 0) {
                return { service, city, country };
            }
        }
        // Country could be the entire location part with no city prefix? No — there's always a city.
    }

    return null;
}
