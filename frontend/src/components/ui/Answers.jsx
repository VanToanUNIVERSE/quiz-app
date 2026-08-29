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
        return props.score !== undefined
            ? <h2>Your score: {props.score} / {props.length}</h2>
            : <h2>Đang chấm điểm...</h2>;   // chờ result về
    }
    return (
        <div className={`backdrop-blur-sm ${props.isChoose ? ' cursor-no-drop' : ' cursor-pointer'}`}>
            <div className=' shadow-2xl p-5 flex flex-col gap-3 rounded-b-2xl'>
                {merged.map((item, index) => <div key={index} onClick={() => handleClick(index)} className={` ${props.isChoose ? '' : 'hover:bg-blue-300'} rounded-4xl transition-all duration-300 ${props.selectedIndex == index ? 'bg-blue-400' : ''} flex justify-start items-center gap-3 font-bold`}><span className={`answer ${props.isChoose ? '' : ' hover:bg-lime-500'} transition-all`}>{item.label}</span>{item.content}</div>)}
            </div>
        </div>
    );
};

export default Answers;