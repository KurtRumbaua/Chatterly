import React, { useState, useRef, useEffect } from 'react';
import '../App.css';
import { serverTimestamp, collection, addDoc, query, orderBy, limit } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { firestore, auth } from '../App'; // Adjust the path based on your structure
import ChatMessage from './ChatMessage'; // Ensure the correct path
import SignOut from './SignOut';
import Spinner from './Spinner';

function ChatRoom() {
    const messagesRef = collection(firestore, 'messages');
    const q = query(messagesRef, orderBy('createdAt'), limit(200));

    const [messages, loading] = useCollectionData(q, { idField: 'id' });
    const [formValue, setFormValue] = useState('');

    // Create a ref to the messages container
    const messagesEndRef = useRef(null);

    // Scroll to the bottom whenever messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const sendMessage = async (e) => {
        e.preventDefault();

        if (formValue.trim() === '') return; // Do nothing if the input is empty

        const { uid, photoURL } = auth.currentUser;

        await addDoc(messagesRef, {
            text: formValue,
            createdAt: serverTimestamp(),
            uid,
            photoURL
        });



        setFormValue('');
    }

    return (
        <>

            <div className='flex flex-col min-h-screen w-screen mx-auto'>
                <SignOut />
                <div className='flex-1 overflow-y-auto h-full bg-gray-900 px-4 scrollbar'>
                    {loading ? (
                        <div className="flex items-center justify-center h-full">
                            <Spinner />
                        </div>
                    ) : (
                        <>
                            {messages && messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
                            <div ref={messagesEndRef} />
                        </>
                    )}
                </div>


                <div>
                    <form onSubmit={sendMessage}>
                        <div className="flex items-center flex-grow bg-gray-800 p-4">
                            <input
                                value={formValue}
                                onChange={(e) => setFormValue(e.target.value)}
                                className="w-full bg-transparent outline-none text-gray-200"
                                placeholder='Type your message here....'
                            />
                            <button type='submit' className='px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-700 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring focus:ring-gray-400 focus:ring-opacity-80'> Send </button>
                        </div>
                    </form>
                </div>
            </div>

        </>
    );
}

export default ChatRoom;