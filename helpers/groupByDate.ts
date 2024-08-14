import { CollectionData } from "@/interfaces/CollectionData";
import { formatDate } from "./formatDate";

export function groupByDate(data: CollectionData[]): Record<string, CollectionData[]> {
    return data.reduce((acc, item) => {
        const formattedDate = formatDate(new Date(item.date));
        if (!acc[formattedDate]) {
            acc[formattedDate] = [];
        }
        acc[formattedDate].push(item);
        return acc;
    }, {} as Record<string, CollectionData[]>);
}