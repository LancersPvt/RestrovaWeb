export interface Branch {
    id: string;
    tenantId: string;
    name: string;
    address: string;
    latitude: number;
    longitude: number;
    phone: string;
    email: string;
    openingHours: {
        monday: string;
        tuesday: string;
        wednesday: string;
        thursday: string;
        friday: string;
        saturday: string;
        sunday: string;
    };
    deliveryRadiusKm: number;
    isActive: boolean;
}

export interface MenuItem {
    id: string;
    categoryId: string;
    name: string;
    description: string | null;
    basePrice: number | null;
    effectivePrice: number | null;
    imageUrl: string | null;
    isActive: boolean;
}

export interface Category {
    id: string;
    tenantId: string;
    name: string;
    description: string | null;
    imageUrl: string | null;
    displayOrder: number;
    isActive: boolean;
    items: MenuItem[];
}

const BASE_URL = process.env.HYPERADMIN_BASE_URL || process.env.NEXT_PUBLIC_API_URL || "https://dev.restrova.com/api/v1";

const DAYS = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

function formatOpeningSlots(slots: any[]): Record<string, string> {
    const hours: Record<string, string> = {
        monday: "Closed",
        tuesday: "Closed",
        wednesday: "Closed",
        thursday: "Closed",
        friday: "Closed",
        saturday: "Closed",
        sunday: "Closed",
    };

    if (!slots || !Array.isArray(slots)) return hours;

    // Group active slots by dayOfWeek
    const grouped: Record<number, any[]> = {};
    slots.forEach(slot => {
        if (slot.active) {
            if (!grouped[slot.dayOfWeek]) {
                grouped[slot.dayOfWeek] = [];
            }
            grouped[slot.dayOfWeek].push(slot);
        }
    });

    // Format each day
    Object.keys(grouped).forEach(dayKey => {
        const dayNum = parseInt(dayKey);
        const dayName = DAYS[dayNum];
        if (!dayName) return;

        const daySlots = grouped[dayNum];
        daySlots.sort((a, b) => a.opensAt.localeCompare(b.opensAt));

        const formattedSlots = daySlots.map(s => `${s.opensAt}-${s.closesAt}`).join(", ");
        hours[dayName] = formattedSlots;
    });

    return hours;
}

/**
 * Fetch branches for a specific tenant directly from the live API
 */
export async function fetchBranches(tenantId: string): Promise<Branch[]> {
    try {
        const res = await fetch(`${BASE_URL}/menu/branches`, {
            method: "GET",
            headers: {
                "X-TenantID": tenantId,
                "Content-Type": "application/json",
            },
            next: { revalidate: 3600 },
        });

        if (!res.ok) {
            console.error(`[API Error] Failed to fetch branches for tenant ${tenantId}. Status: ${res.status}`);
            return [];
        }

        const data = await res.json();
        const content = data && Array.isArray(data.content) ? data.content : Array.isArray(data) ? data : [];
        
        return content.map((b: any) => ({
            id: b.id,
            tenantId: b.tenantId,
            name: b.name,
            address: b.address,
            latitude: b.latitude,
            longitude: b.longitude,
            phone: b.phone || "N/A",
            email: b.email || "N/A",
            deliveryRadiusKm: b.deliveryRadiusKm || 0,
            isActive: b.active ?? b.isActive ?? true,
            openingHours: formatOpeningSlots(b.openingSlots)
        }));
    } catch (error) {
        console.error(`[Network Error] Failed to fetch branches for tenant ${tenantId}:`, error);
        return [];
    }
}

/**
 * Fetch categories and their items for a specific tenant directly from the live API
 */
export async function fetchMenuCategories(tenantId: string): Promise<Category[]> {
    try {
        const [catRes, itemRes] = await Promise.all([
            fetch(`${BASE_URL}/menu/categories?active=true`, {
                method: "GET",
                headers: {
                    "X-TenantID": tenantId,
                    "Content-Type": "application/json",
                },
                next: { revalidate: 3600 },
            }),
            fetch(`${BASE_URL}/menu/items?active=true`, {
                method: "GET",
                headers: {
                    "X-TenantID": tenantId,
                    "Content-Type": "application/json",
                },
                next: { revalidate: 3600 },
            })
        ]);

        if (!catRes.ok || !itemRes.ok) {
            console.error(`[API Error] Failed to fetch categories or items for tenant ${tenantId}.`);
            return [];
        }

        const catData = await catRes.json();
        const itemData = await itemRes.json();

        const categories = catData.categories || [];
        const items = itemData.content || [];

        return categories.map((cat: any) => {
            const categoryItems = items
                .filter((item: any) => item.categoryId === cat.id && (item.active ?? item.isActive ?? true))
                .map((item: any) => ({
                    id: item.id,
                    categoryId: item.categoryId,
                    name: item.name,
                    description: item.description,
                    basePrice: item.basePrice || item.effectivePrice || 0,
                    effectivePrice: item.effectivePrice || item.basePrice || 0,
                    imageUrl: item.imageUrl,
                    isActive: item.active ?? item.isActive ?? true
                }));

            return {
                id: cat.id,
                tenantId: cat.tenantId,
                name: cat.name,
                description: cat.description,
                imageUrl: cat.imageUrl || cat.imageKey,
                displayOrder: cat.displayOrder || 0,
                isActive: cat.active ?? cat.isActive ?? true,
                items: categoryItems
            };
        });
    } catch (error) {
        console.error(`[Network Error] Failed to fetch categories for tenant ${tenantId}:`, error);
        return [];
    }
}
