import { FC } from "react";
import { Loader2, MessageSquare, FileText, Package, RefreshCw, SquarePen, PencilLine, Trash2 } from "lucide-react";
import TimestampFormatter from "../TimestampFormat";

export interface Activity {
    id: number;
    type: 'CREATE' | 'UPDATE' | 'DELETE' | 'OTHER';
    description: string;
    user: string;
    timestamp: number;
}

interface ActivityListingProps {
    activities: Activity[];
    isLoading?: boolean;
    emptyMessage?: string | React.ReactNode;
}

const ActivityListing: FC<ActivityListingProps> = ({ activities, isLoading, emptyMessage }) => {
    if (isLoading) {
        return (
            <div className="space-y-4">
                {[1, 2, 3].map((_, index) => (
                    <div key={index} className="relative mb-4">
                        {index !== 2 && (
                            <div className="absolute left-[22px] top-12 w-[2px] h-[calc(100%+16px)] bg-slate-200 dark:bg-slate-700 animate-pulse" />
                        )}
                        <div className="flex items-start space-x-4 bg-slate-100 p-4 rounded-lg relative z-10 dark:bg-slate-700">
                            <div className="mt-1">
                                <div className="h-5 w-5 bg-slate-200 dark:bg-slate-600 rounded animate-pulse" />
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-start">
                                    <div className="h-4 w-24 bg-slate-200 dark:bg-slate-600 rounded animate-pulse" />
                                    <div className="h-4 w-20 bg-slate-200 dark:bg-slate-600 rounded animate-pulse" />
                                </div>
                                <div className="h-4 w-3/4 bg-slate-200 dark:bg-slate-600 rounded mt-2 animate-pulse" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    const getActivityIcon = (type: Activity['type']) => {
        switch (type) {
            case 'CREATE':
                return <SquarePen className="h-5 w-5" />;
            case 'UPDATE':
                return <PencilLine className="h-5 w-5" />;
            case 'DELETE':
                return <Trash2 className="h-5 w-5" />;
            default:
                return <FileText className="h-5 w-5" />;
        }
    };

    return (
        <div className="space-y-4">
            {activities.length === 0 ? (
                <>
                    {
                        emptyMessage ? (
                            <>{emptyMessage}</>
                        ) : (
                            <div className="text-center text-muted-foreground p-4">No activities to display.</div>
                        )
                    }
                </>
            ) : (
                activities.map((activity, index) => (
                    <div key={activity.id} className="relative mb-4">
                        {index !== activities.length - 1 && (
                            <div className="absolute left-[22px] top-12 w-[2px] h-[calc(100%+16px)] bg-slate-200 dark:bg-slate-700" />
                        )}
                        <div className="flex items-start space-x-4 bg-slate-100 p-4 rounded-lg relative z-10 dark:bg-slate-700">
                            <div className="mt-1 text-muted-foreground">
                                {getActivityIcon(activity.type)}
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-start">
                                    <p className="font-medium">{activity.user}</p>
                                    <time className="text-sm text-muted-foreground">
                                        <TimestampFormatter
                                            timestamp={activity.timestamp as any}
                                            className="text-xs"
                                            format="MMM dd, yyyy • hh:mm a"
                                        />
                                    </time>
                                </div>
                                <p className="text-sm mt-1 flex items-center gap-2">
                                    <span className="text-muted-foreground text-xs font-semibold">{activity.type}</span>
                                    <span className="text-muted-foreground">&bull;</span>
                                    <span>{activity.description}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default ActivityListing;

