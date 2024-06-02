"use client";
import React, { useState } from 'react';
import { FaRegComment } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";


import styles from './Chat.module.css'; 

function ChatBot() {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [isResied, setResize] = useState(false);
    const [Text, setText] = useState('Email');
        const [inputText, setInputText] = useState('');
    const [caretPosition, setCaretPosition] = useState(0);
    const toggleResize = () => {
        setResize(!isResied);
    };
    const toggleChat = () => {
        setIsChatOpen(!isChatOpen);
    };
    
    const emailHandler = () => {
        Text==='Email'?setText('assylchk@gmail.com'):setText('Email');
    }
    const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setInputText(e.target.value);
        setCaretPosition(e.target.selectionStart || 0);
    };
 
    return (
        <div className={isChatOpen ? styles.showChatBot : ''}>
            <button onClick={toggleChat} className={styles.chatBull}>
                <span><FaRegComment /></span>
                <span><IoIosClose /></span>
            </button>
            
            {isChatOpen && (
                <div className='rounded-lg shadow-lg p-2' id={isResied?styles.chatResize:styles.chat}>
                    <div className='flex' id={styles.flex}>
                        <div onClick={toggleChat} className={styles.ballrouge}></div>
                        <div onClick={toggleResize} className={styles.ballyellow}></div>
                        <div className={styles.ballvert}></div>
                    </div>
                    <div className="p-2">
                        <p className={styles.texts}>$ Assyl.personal</p>
                        <p className={styles.flesh}>&quot;Age 21. Sousse, Tunisia&quot;</p>

                        <p className={styles.texts}>$ Assyl.contact</p>
                        <p className={styles.flesh}>[&quot;<a href="https://www.linkedin.com/in/assyl-chouikh-b56988243/" target='_blanck'>Linkedin</a>&quot;, &quot;<a href="https://github.com/assylk" target='_blanck'>Github</a>&quot;, &quot;<span onClick={emailHandler}>{Text}</span>&quot;]</p>

                        <p className={styles.texts}>$ Assyl.education</p>
                        <p className={styles.flesh}>&quot;Institut Superieur des mathemathiques appliquées et Informatique,Kairouan&quot;</p >

                        <div className='animate-pulse' id={styles.Cur_Input_Line}>
                            <span className={styles.Ter_Green}>Me</span>
                            <span className={styles.Ter_Gray}>:</span>
                            <span className={styles.Ter_Blue}>~/Desktop/portfolio</span>
                            <span className={styles.Ter_Gray}>$</span>
                            <input autoFocus value={inputText}
                                onChange={handleInputChange} type="text" maxLength={20} className={styles.Ter_Input} />
                            <div style={{ left: `10rem`, marginLeft: `${caretPosition * 12}px` }} className={styles.Blink}></div>
                        </div>
                         
                    </div>
                </div>
            )}
        </div>
    );
}

export default ChatBot;
