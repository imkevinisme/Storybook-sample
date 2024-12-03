import { ReactNode, FC } from "react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

interface Props {
    children: ReactNode;
    title: string;
    description: string | null;
    className?: string;
    actions?: ReactNode;
}


const DashCard: FC<Props> = ({ children, title, description, className, actions }) => {
    return (
        <div className={cn("bg-white rounded-lg shadow", className)}>
            <div className="px-4 py-3 flex justify-between items-center">
                <div>
                    <h3 className="text-lg font-medium">{title}</h3>
                    {description && <p className="text-sm text-muted">{description}</p>}
                </div>
                {actions && <div>{actions}</div>}
            </div>
            <Separator />
            {children}
        </div>
    );
}

export default DashCard;
