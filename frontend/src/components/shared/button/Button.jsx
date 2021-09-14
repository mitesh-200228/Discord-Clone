import React from 'react';
import styles from './Button.module.css';

const Button = ({text,onClick}) => {

    const xtz = {
        'width':'2px'
    }

    return (
        <div>
            <button onClick={onClick} className={styles.button}>
                <span>{text}</span>
                &nbsp;
                <img src="/images/right-arrow.png" className={xtz} alt="" />
            </button>
        </div>
    )
}

export default Button