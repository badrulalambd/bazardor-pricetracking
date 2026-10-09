import Link from 'next/link';

const NotFound = () => {
    return (
        <div className="container mx-auto flex justify-center px-5 py-10">
            <div className="flex flex-col gap-5">
                <div className='flex justify-center'>
                    <span className='text-6xl font-bold'>🧺</span>
                </div>
                <div className="flex flex-col justify-center items-center gap-2.5">
                    <h2 className="text-2xl md:text-3xl font-bold">পাতাটি খুঁজে পাওয়া যায়নি</h2>
                    <span className="text-lg text-gray-500">আপনি যে পণ্য বা পাতাটি খুঁজছেন সেটি সরানো হয়েছে বা কখনো ছিল না।</span>
                </div>
                <div className="flex justify-center gap-2.5">
                    <Link href="/">
                        <button className="btn btn-active text-sm md:text-lg bg-(--primary) text-white">← হোম পেজে ফিরে যান</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFound;