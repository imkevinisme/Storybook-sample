import Link from "next/link";
import React, { FC, useContext, useState, useEffect } from "react";
import SidebarContext from "./context";
import { cn } from "@/lib/utils";

interface BadgeProps {
    number: number;
    colorClass?: string;
}

interface Props {
    href?: string;
    icon: JSX.Element;
    text: string;
    alert?: boolean;
    active?: boolean;
    groupItems?: Props[];
    badge?: BadgeProps;
}

const SidebarItem: FC<Props> = ({
    href,
    icon,
    text,
    alert,
    active,
    groupItems,
    badge
}) => {
    const { isOpen } = useContext(SidebarContext);
    const [isGroupExpanded, setIsGroupExpanded] = useState(false);

    useEffect(() => {
        if (active || (groupItems && groupItems.some(item => item.active))) {
            setIsGroupExpanded(true);
        }
    }, [active, groupItems]);

    const handleGroupClick = () => {
        setIsGroupExpanded(!isGroupExpanded);
    };

    const itemContent = (
        <>
            {icon && icon}
            <span className={`overflow-hidden transition-all ${isOpen ? 'w-auto ms-2' : 'w-0'}`}>{text}</span>
            {alert && (
                <span className={`absolute w-2 h-2 bg-slate-400 rounded ${isOpen ? 'right-2' : 'top-2 -right-1'}`} />
            )}
            {badge && (
                <span
                    className={cn(
                        "ml-auto px-1.5 py-0.5 text-xs font-semibold rounded-full text-white",
                        isOpen ? '' : 'absolute top-0 right-0 -mt-1 -mr-1',
                        badge.colorClass || 'bg-blue-500'
                    )}
                >
                    {badge.number}
                </span>
            )}
            {groupItems && (
                <svg
                    className={`w-4 h-4 ml-auto transition-transform ${isGroupExpanded ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            )}

            {!isOpen && (
                <div className={`
                    absolute left-full rounded-md px-3 py-2 ml-6
                    bg-slate-700 text-slate-50 text-sm
                    invisible opacity-20 transition-all duration-200
                    -translate-x-2
                    shadow-md
                    group-hover:opacity-100 group-hover:visible group-hover:translate-x-0
                    z-[99999]
                    text-nowrap
                    whitespace-nowrap
                `}>{text}</div>
            )}
        </>
    );

    const itemClasses = `
        group
        relative flex items-center py-2 ${isOpen ? 'px-3' : 'px-1 justify-center'} my-1
        font-medium rounded-md cursor-pointer
        transition-all duration-200
        ${active
            ? "bg-muted"
            : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
        }
    `;

    return (
        <>
            {href ? (
                <Link href={href} className={itemClasses}>
                    {itemContent}
                </Link>
            ) : (
                <div onClick={handleGroupClick} className={itemClasses}>
                    {itemContent}
                </div>
            )}

            {groupItems && (isGroupExpanded || active) && (
                <div className={isOpen ? "ml-4" : ""}>
                    {groupItems.map((item, index) => (
                        <SidebarItem key={index} {...item} />
                    ))}
                </div>
            )}
        </>
    );
};

export default SidebarItem;
