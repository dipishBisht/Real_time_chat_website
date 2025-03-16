import { Skeleton } from "../ui/skeleton";

export default function ChatMessageSkeleton() {
    return (
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div className="flex justify-end">
                <div className="max-w-md">
                    <Skeleton className="h-12 w-64 rounded-2xl rounded-tr-none" />
                    <Skeleton className="h-5 w-16 mt-1 ml-auto" />
                </div>
            </div>
            <div className="flex justify-start">
                <div className="max-w-md">
                    <Skeleton className="h-12 w-72 rounded-2xl rounded-tl-none" />
                    <Skeleton className="h-5 w-16 mt-1" />
                </div>
            </div>
            <div className="flex justify-end">
                <div className="max-w-md">
                    <Skeleton className="h-12 w-64 rounded-2xl rounded-tr-none" />
                    <Skeleton className="h-5 w-16 mt-1 ml-auto" />
                </div>
            </div>
            <div className="flex justify-start">
                <div className="max-w-md">
                    <Skeleton className="h-12 w-72 rounded-2xl rounded-tl-none" />
                    <Skeleton className="h-5 w-16 mt-1" />
                </div>
            </div>
        </div>
    )
}