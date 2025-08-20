import React from 'react';
import StyledLink from '../components/ui/StyledLink';

const Profile = () => {
    return (
        <div className='background-image-random p-10 text-gray-200'>
            <StyledLink name="Back" to="/"></StyledLink>
            <h2>Your collections: </h2>
            <table className='table-auto w-full md:w-[50%] border-collapse shadow backdrop-blur-2xl'>
                <tr>
                    <th className="p-4 text-left">Quiz name</th>
                    <th className="p-4 text-center">Action</th>
                </tr>
                <tr>
                    <td className="p-4 text-left">Hello 2 i am</td>
                    <td className="p-4 text-center">
                        <button className="px-3 py-1 bg-blue-500 hover:bg-blue-400 rounded cursor-pointer">
                            Edit
                        </button>
                    </td>
                </tr>
               
            </table>
        </div>
    );
};

export default Profile;