import React from 'react';

const Answers = (props) => {
    const labels = ['A', 'B', 'C', 'D'];
    const merged = props.answers.map((answer, index) => ({
        label: labels[index],
        ...answer
    }));
    const handleClick = (index) => {
        if (!props.isChoose) {
            props.onClick(index); // chỉ gọi nếu chưa chọn
        }
    };
    if (!props.answers || props.answers.length === 0) {
        return (<h2 className='flex justify-center text-4xl p-5'>Your score: {props.score} / {props.length}</h2>);
    }
    return (
        <div className={`${props.isChoose ? ' cursor-no-drop' : ' cursor-pointer'}`}>
            <div className=' shadow-2xl p-5 flex flex-col gap-3 rounded-b-2xl'>
                {merged.map((item, index) => <div onClick={() => handleClick(index)} className={`${props.selectedIndex == index ? (props.correct ? ' bg-lime-400' : 'bg-red-500') : (item.correct && props.isChoose ? 'bg-lime-400' : '')} flex justify-start items-center gap-3 font-bold`}><span className={`answer ${props.isChoose ? '' : ' hover:bg-lime-500'} transition-all`}>{item.label}</span>{item.content}</div>)}
            </div>
        </div>
    );
};

export default Answers;