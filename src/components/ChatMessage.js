import React from 'react';
import '../App.css';
import { auth } from '../App';

function ChatMessage(props) {
    const { text, uid, photoURL } = props.message;
    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';
    const flexDirection = uid === auth.currentUser.uid ? 'flex-row-reverse' : 'flex-row';

    return (
        <div className={`message ${messageClass} flex ${flexDirection} items-center m-2`}>
            <img src={photoURL} alt="Profile" className="rounded-full size-14" />
            <p className="px-6 py-2 text-gray-50 bg-gray-700 rounded-full m-2">
                {text}
            </p>
        </div>
    );
}


export default ChatMessage;