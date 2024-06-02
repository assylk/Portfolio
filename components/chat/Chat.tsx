"use client";
import React, { useState } from 'react';
import { FaRegComment } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";


import styles from './Chat.module.css'; 

function ChatBot() {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [isResied, setResize] = useState(false);
    const [Text, setText] = useState('Email');

    const toggleResize = () => {
        setResize(!isResied);
    };

    const toggleChat = () => {
        setIsChatOpen(!isChatOpen);
    };
    const emailHandler = () => {
        Text==='Email'?setText('assylchk@gmail.com'):setText('Email');
    }

    return (
        <div className={isChatOpen ? styles.showChatBot : ''}>
            <button onClick={toggleChat} className={styles.chatBull}>
                <span><FaRegComment /></span>
                <span><IoIosClose /></span>
            </button>
            
            {isChatOpen && (
                <div className='rounded-lg shadow-lg p-4' id={isResied?styles.chatResize:styles.chat}>
                    <div className='flex' id={styles.flex}>
                        <div onClick={toggleChat} className={styles.ballrouge}></div>
                        <div onClick={toggleResize} className={styles.ballyellow}></div>
                        <div className={styles.ballvert}></div>
                    </div>
                    <div className="p-6">
                        <p className={styles.texts}>$ Assyl.personal</p>
                        <p className={styles.flesh}>&quot;Age 21. Sousse, Tunisia&quot;</p>

                        <p className={styles.texts}>$ Assyl.contact</p>
                        <p className={styles.flesh}>[&quot;<a href="https://www.linkedin.com/in/assyl-chouikh-b56988243/" target='_blanck'>Linkedin</a>&quot;, &quot;<a href="https://github.com/assylk" target='_blanck'>Github</a>&quot;, &quot;<span onClick={emailHandler}>{Text}</span>&quot;]</p>

                        <p className={styles.texts}>$ Assyl.education</p>
                        <p className={styles.flesh}>&quot;Institut Superieur des mathemathiques appliquées et Informatique,Kairouan&quot;</p>

                        <p className="text-xs text-gray-400 mb-2 animate-pulse">&gt; work in progress ... </p>
                        
                    </div>
                </div>
            )}
        </div>
    );
}

export default ChatBot;
