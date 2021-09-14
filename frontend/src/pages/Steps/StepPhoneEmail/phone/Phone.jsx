import React from 'react'
import Card from '../../../../components/shared/Card/Card'
import Button from '../../../../components/shared/button/Button'
import TextInput from '../../../../components/shared/TextInput/TextInput'
import styles from '../StepEmail.module.css'
import { sendOtp } from '../../../../http/index'
import { useDispatch } from 'react-redux';
import { setOtp } from '../../../../store/authSlice';

const Phone = ({onNext}) => {

    const [phoneNumber, setphoneNumber] = React.useState('');

    const dispatch = useDispatch();

    async function submit() {
        //server request
        const { data } = await sendOtp({phone:phoneNumber});
        console.log(data);
        console.log({phone:data.phone,hash:data.hash});
        dispatch(setOtp({phone:data.phone,hash:data.hash}));
        onNext();
    }

    return (
        <Card title="Enter your Phone Number" icon="github">
            <TextInput value={phoneNumber} onChange={(e) => setphoneNumber(e.target.value)} />
            <div>
                <div className={styles.actionButtonWrap}>
                    <Button text="Next" onClick={submit}></Button>
                </div>
            </div>
            <p className={styles.bottomParagraph}>
                Mitesh Bediya , 2nd Year Civil Department IITM
            </p>
        </Card>
    )
}

export default Phone