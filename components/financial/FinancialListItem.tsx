import { FinancialListItemProps } from "@/types";

export const FinancialListItem = ({ name, count, type }: FinancialListItemProps) => {
    if (type === 'workedHours') {
        return (
        <div className="bg-gray-50 p-3 rounded">
            <div className="text-sm text-gray-600">{name}</div>
            <div className="text-xl font-bold text-blue-600">{count.toFixed(1)}</div>
        </div>
        )
    }
    if (type === 'rate') {
        return (
        <div className="bg-gray-50 p-3 rounded">
            <div className="text-sm text-gray-600">{name}</div>
            <div className="text-xl font-bold text-gray-600">{count.toFixed(1)}</div>
        </div>
        )
    }
    if (type === 'salary') {
        return (
        <div className="bg-gray-50 p-3 rounded">
            <div className="text-sm text-gray-600">{name}</div>
            <div className="text-xl font-bold text-green-600">{count.toFixed(1)}</div>
        </div>
        )
    }
    if (type === 'additionalPayment') {
        return (
        <div className="bg-gray-50 p-3 rounded">
            <div className="text-sm text-gray-600">{name}</div>
            <div className="text-xl font-bold text-red-400">{count.toFixed(1)}</div>
        </div>
        )
    }
};