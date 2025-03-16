import { Skeleton } from "@/components/ui/skeleton";

export default function EmptyChatSkeleton() {
    return (
        <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 p-8">
            <div className="max-w-md w-full space-y-8">
                <div className="relative">
                    <div className="relative bg-white p-8 rounded-3xl shadow-xl">
                        <Skeleton className="w-20 h-20 rounded-2xl mx-auto" />
                        <Skeleton className="h-8 w-48 mx-auto mt-6" />
                        <Skeleton className="h-4 w-64 mx-auto mt-2" />

                        <div className="mt-10 grid grid-cols-2 gap-4">
                            <div className="p-4 rounded-2xl bg-gray-50">
                                <Skeleton className="w-8 h-8 mb-2" />
                                <Skeleton className="h-5 w-24 mb-1" />
                                <Skeleton className="h-4 w-32" />
                            </div>
                            <div className="p-4 rounded-2xl bg-gray-50">
                                <Skeleton className="w-8 h-8 mb-2" />
                                <Skeleton className="h-5 w-24 mb-1" />
                                <Skeleton className="h-4 w-32" />
                            </div>
                        </div>

                        <div className="mt-4 p-4 rounded-2xl bg-gray-50">
                            <Skeleton className="w-6 h-6 mb-2" />
                            <Skeleton className="h-5 w-36 mb-1" />
                            <Skeleton className="h-4 w-48" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}