import React from 'react';
import '../App.css';
import { signOut } from 'firebase/auth';
import { auth } from '../App'; // Adjust the path based on your structure

function SignOut() {
    return auth.currentUser && (
      <div className='flex flex-row bg-gray-800 items-center p-4'>
        <h2 className='flex-grow text-gray-200'>Chatterly</h2>
        <button onClick={() => signOut(auth)} className='px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-700 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring focus:ring-gray-400 focus:ring-opacity-80'>Sign Out</button>
      </div>
    );
  }

export default SignOut;