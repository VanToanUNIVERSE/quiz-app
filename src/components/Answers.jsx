import React from 'react';

const Answers = (props) => {
    const labels = ['A', 'B', 'C', 'D'];
    const merged = props.answers.map((answer, index) => ({
        label: labels[index],
        ...answer
    }));
    if (!props.answers || props.answers.length === 0) {
        return (<h2 className='flex justify-center text-4xl p-5'>Bạn đã hoàn thành</h2>);
    }
    return (
        <div>
            <div className=' shadow-2xl p-5 flex flex-col gap-3 rounded-b-2xl'>
            {merged.map((item, index) => <div onClick={() => props.onClick(index)} className={`flex justify-start items-center gap-3 font-bold`}><span className='answer cursor-pointer hover:bg-black transition-all'>{item.label}</span>{item.content}</div>)}
                
            </div>
        </div>
    );
};

export default Answers;