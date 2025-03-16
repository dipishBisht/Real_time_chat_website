import { Skeleton } from "../ui/skeleton";

export default function ChatHeaderSkeleton() {
    return (
        <div className="p-6 bg-white border-b">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <div className="relative flex items-center gap-2">
                        <Skeleton className="w-8 h-8 rounded-2xl" />
                        <div className="flex items-center justify-center">
                            <Skeleton className="w-12 h-12 rounded-full" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Skeleton className="h-7 w-32" />
                        <Skeleton className="h-5 w-16" />
                    </div>
                </div>
                <div className="flex items-center">
                    <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                        <Skeleton className="w-10 h-10 rounded-2xl" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                        <Skeleton className="w-10 h-10 rounded-2xl" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                        <Skeleton className="w-10 h-10 rounded-2xl" />
                    </button>
                </div>
            </div>
        </div>
    )
}