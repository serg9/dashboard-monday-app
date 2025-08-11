import { WorkloadListTaskCategoryItemProps } from "@/types";
import { getCategoryColor } from "@/lib/constants/colors";

export const WorkloadListTaskCategoryItem = ({ tasksByStatus }: WorkloadListTaskCategoryItemProps) => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
            {Object.entries(tasksByStatus).map(([status, count]: [string, number]) => (
                <div key={status} className={`flex justify-between items-center p-2 ${getCategoryColor(status)} rounded`}>
                    <span className="text-gray-600">{status}</span>
                    <span className="font-medium">{count}</span>
                </div>
            ))}
        </div>
    );
}