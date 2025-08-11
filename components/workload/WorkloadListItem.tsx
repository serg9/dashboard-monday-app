import { WorkloadListItemProps } from "@/types";
import { getCategoryColor } from "@/lib/constants/colors";

export const WorkloadListItem = ({ name, count, type }: WorkloadListItemProps) => {
    const color = getCategoryColor(type);
    return (
        <div className={`${color} p-3 rounded`}>
            <div className="text-sm text-gray-600">{name}</div>
            <div className="text-xl font-bold text-gray-600">{count}</div>
        </div>
    );
}