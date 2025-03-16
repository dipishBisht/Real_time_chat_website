import ChatInputSkeleton from '@/components/skeletons/chat-input-skeleton';
import { useChatStore } from '@/store/useChatStore';
import { Send, Smile, Image as ImageIcon, X } from 'lucide-react';
import { useRef, useState } from 'react';
import toast from 'react-hot-toast';

export default function ChatInput() {

    const { isMessagesLoading, sendMessage } = useChatStore();
    const [text, setText] = useState("");
    const [image, setImage] = useState<any>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file?.type.startsWith("image/")) {
            toast.error("Please select an image file");
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            setImage(reader.result);
        }

        reader.readAsDataURL(file);
    };


    const removeImage = () => {
        setImage(null);
        if (fileInputRef.current)
            fileInputRef.current.value = "";
    };

    const handleSendMessage = () => {
        if (!text.trim() && !image)
            return;

        try {
            sendMessage({ text: text.trim(), image })
            setText("");
            setImage(null);
            if (fileInputRef.current)
                fileInputRef.current.value = "";
        } catch (error) {
            console.log("SEND MESSAGE ERROR :", error);
        }
    };

    if (isMessagesLoading)
        return <ChatInputSkeleton />

    return (
        <div className="p-6 bg-white border-t">
            {image && (
                <div className='relative mb-4'>
                    <img src={image} alt="image-preview" className="w-20 h-20 object-cover rounded-lg border border-zinc-700" />
                    <button onClick={removeImage} className='absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center bg-red-500 text-white'>
                        <X className='size-3' />
                    </button>
                </div>
            )
            }
            <div className="flex items-center space-x-4">
                <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                    <Smile className="w-6 h-6 text-gray-600" />
                </button>
                <div className="flex-1 relative">
                    <input
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Type your message..."
                        className="w-full px-6 py-3 bg-gray-50 rounded-xl pr-20 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all"
                    />
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-1">
                        <button
                            className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <ImageIcon className="w-5 h-5 text-gray-500" />
                        </button>
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            onChange={handleImageChange}
                            accept="image/*"
                        />
                    </div>
                </div>
                <button
                    className={`p-3 rounded-xl flex items-center justify-center group transition-colors ${text.trim() || image ? 'bg-purple-600 text-white hover:bg-purple-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                    onClick={handleSendMessage}
                    disabled={!text.trim() && !image}
                >
                    <Send className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </button>
            </div>
        </div>
    )
}