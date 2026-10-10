import React from 'react';

const CategoryTitleSection = () => {
    return (
        <div className='bg-white p-5 rounded-2xl'>
            <div className="flex flex-row items-center gap-3">
                <div className="flex justify-center items-center">
                    <span className="text-6xl">🍚</span>
                </div>
                <div className="flex flex-col">
                    <h4 className="text-2xl md:text-3xl font-bold">চাল</h4>
                    <span className="text-gray-500 text-lg">৪টি পণ্যের আজকের দাম ও পরিবর্তন</span>
                </div>
            </div>
        </div>
    );
};

export default CategoryTitleSection;