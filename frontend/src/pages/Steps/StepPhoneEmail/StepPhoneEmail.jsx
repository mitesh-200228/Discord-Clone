import React from 'react'
import Phone from './phone/Phone';
import Email from './email/Email';
import styles from '../StepPhoneEmail/StepEmail.module.css';

const phoneEmailMap = {
    phone: Phone,
    email: Email
};
    
const StepPhoneEmail = ({ onNext }) => {
    const [type, setType] = React.useState('phone');
    const Component = phoneEmailMap[type]

    return (
        <>
            <div className={styles.cardWrapper}>
                <div>
                    <div className={styles.buttonWrapper}>
                        <button onClick={() => setType('phone')} className={styles.tabButton}><img src="/images/phone.png" alt=""></img></button>
                        <button onClick={() => setType('email')} className={styles.tabButton}><img src="/images/email.png" alt=""></img></button>
                    </div>
                    <Component onNext={onNext}></Component>
                </div>
            </div>

        </>
    )
}

export default StepPhoneEmail