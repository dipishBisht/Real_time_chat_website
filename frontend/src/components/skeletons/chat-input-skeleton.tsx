import { Skeleton } from "@/components/ui/skeleton";

export default function ChatInputSkeleton() {
    return (
        <div className="p-6 bg-white border-t">
            <div className="flex items-center space-x-4">
                <Skeleton className="w-10 h-10 rounded-xl" />
                <Skeleton className="flex-1 h-12 rounded-xl" />
                <Skeleton className="w-12 h-12 rounded-xl" />
                <Skeleton className="w-12 h-12 rounded-xl" />
                <Skeleton className="w-12 h-12 rounded-xl" />
            </div>
        </div>
    );
}