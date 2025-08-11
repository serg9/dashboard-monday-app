import {WorkloadListProps } from "@/types";
import { WorkloadListItem } from "./WorkloadListItem";
import { WorkloadListTaskCategoryItem } from "./WorkloadListTaskCategoryItem";

export const WorkloadList = ({ userWorkloads }: WorkloadListProps) => {
    return (
        <div className="space-y-4">
            {userWorkloads.map((user, index) => (
                <div key={index} className="border rounded-lg p-4 bg-white shadow-sm">
                  <h3 className="text-lg font-semibold mb-3 text-blue-600">{user.name}</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <WorkloadListItem name="Активні задачі" count={user.activeTasks} type="ACTIVE" />
                    <WorkloadListItem name="Завантаженість" count={user.totalWorkload} type="WORKLOAD" />
                    <WorkloadListItem name="Виконані задачі" count={user.completedTasks} type="COMPLETED" />
                  </div>

                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Задачі за статусами:</h4>
                    <WorkloadListTaskCategoryItem tasksByStatus={user.tasksByStatus} />
                  </div>
                </div>
              ))}
        </div>
    );
};