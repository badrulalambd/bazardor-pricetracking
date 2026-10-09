
import { cacheLife } from "next/cache";

export async function getCategories(): Promise<ICategoryType[]> {
    "use cache";
    cacheLife("hours");

    try {
        const res = await fetch(
            "https://api.abcz.workers.dev/api/bazardor/categories", {
            next: {
                revalidate: 120,
            },
        });

        if (!res.ok) {
            console.error("Failed to fetch categories:", res.status);
            return [];
        }

        const data: unknown = await res.json();

        return Array.isArray(data) ? (data as ICategoryType[]) : [];
    } catch (error) {
        console.error("Category fetching failed:", error);
        return [];
    }
}