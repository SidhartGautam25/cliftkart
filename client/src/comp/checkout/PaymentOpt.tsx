import {CircleCheck} from "lucide-react";




interface PaymentOptionProps {
    icon: React.ReactNode;
    title: string;
    subtitle?: string;
    selected: boolean;
    onSelect: () => void;
}



const PaymentOption: React.FC<PaymentOptionProps> = ({ icon, title, subtitle, selected, onSelect }) => (
    <div
        onClick={onSelect}
        className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all duration-200 ${selected ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200' : 'border-slate-300 hover:border-slate-400'}`}
    >
        <div className={`mr-4 ${selected ? 'text-blue-600' : 'text-slate-500'}`}>{icon}</div>
        <div className="flex-grow">
            <p className={`font-semibold ${selected ? 'text-blue-800' : 'text-slate-700'}`}>{title}</p>
            {subtitle && <p className="text-sm text-slate-500">{subtitle}</p>}
        </div>
        {selected && <CircleCheck size={20} className="text-blue-500" />}
    </div>
);
export default PaymentOption;
