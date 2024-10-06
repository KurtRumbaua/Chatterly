import React from 'react';
import './App.css';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

import SignIn from './components/SignIn';
import ChatRoom from './components/ChatRoom';

// Firebase config and initialization
const firebaseConfig = {
  apiKey: "AIzaSyDTRtHnOs6NIBxFyEW6k0R_grVhC0A4xI0",
  authDomain: "superchat-1c59f.firebaseapp.com",
  projectId: "superchat-1c59f",
  storageBucket: "superchat-1c59f.appspot.com",
  messagingSenderId: "694595420379",
  appId: "1:694595420379:web:b349a93e7375d73ff54cfe",
  measurementId: "G-HEWFRHBCKL"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className='bg-gray-950 flex flex-col  justify-center h-screen'>
      {user ? <ChatRoom /> : <SignIn />}
    </div>

  );
}

export default App;
