import React from 'react'
import styles from './loading.module.css';
const loading = () => {
    return (
      <div className={styles.bod}>
           <div className={styles.center}>
         <div className={styles.ring}></div>
         <span className={styles.span}>loading...</span>
      </div> 
      </div>
    
  )
}

export default loading
