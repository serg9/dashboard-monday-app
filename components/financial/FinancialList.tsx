import { FinancialListProps } from "@/types";
import { FinancialListItem } from "./FinancialListItem";

export const FinancialList = ({ userFinancials }: FinancialListProps) => {
    return (
        <div className="space-y-4">
            {userFinancials.map((user, index) => (
                <div key={index} className="border rounded-lg p-4 bg-white shadow-sm">
                    <h3 className="text-lg font-semibold mb-3 text-green-600">{user.name}</h3>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                        <FinancialListItem name="Відпрацьовано" count={user.totalHours} type="workedHours" />
                        <FinancialListItem name="Рейт" count={user.rate} type="rate" />
                        <FinancialListItem name="Базова виплата" count={user.salary} type="salary" />
                        <FinancialListItem name="Додатково" count={user.additionalPayment} type="additionalPayment" />
                    </div>
                </div>
            ))}
        </div>
    );
};