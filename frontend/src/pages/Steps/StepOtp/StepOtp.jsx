import React from 'react'
import Card from '../../../components/shared/Card/Card'
import TextInput from '../../../components/shared/TextInput/TextInput'
import Button from '../../../components/shared/button/Button'
import styles from './StepOtp.module.css'
import { verifyOtp } from '../../../http/index'
import { useSelector } from 'react-redux'
import { setAuth } from '../../../store/authSlice'
import { useDispatch } from 'react-redux';

const StepOtp = ({ onNext }) => {

    const [otp,setOtp] = React.useState('');
    const {phone,hash} = useSelector((state) => state.auth.otp);

    const dispatch = useDispatch();

    async function submit() {
        if(!phone || !hash || !otp) return;
        try {
            const { data } = await verifyOtp({otp,phone,hash});
            dispatch(setAuth(data));
            // console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className={styles.cardWrapper}>
                <Card title="Enter the OTP, we just sent to you!" icon="lock">
                <TextInput value={otp} onChange={((e) => setOtp(e.target.value))}/>
                <div className={styles.actionButtonWrap}>
                    <Button onClick={submit} text="Next"></Button>
                </div>
                <p className={styles.bottomParagraph}>
                    Mitesh Bediya is awesome
                </p>
                </Card>
            </div>
        </>
    )
}

export default StepOtp
