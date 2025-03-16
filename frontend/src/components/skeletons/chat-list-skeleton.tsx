import { Skeleton } from "@/components/ui/skeleton";

export default function ChatListSkeleton() {
    return (
        <>
            {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="px-6 py-4">
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <Skeleton className="w-14 h-14 rounded-2xl" />
                            <Skeleton className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full" />
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-start mb-2">
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-3 w-10" />
                            </div>
                            <Skeleton className="h-3 w-3/4" />
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}