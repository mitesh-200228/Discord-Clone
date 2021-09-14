import React from 'react'
import Card from '../../../components/shared/Card/Card'
import TextInput from '../../../components/shared/TextInput/TextInput'
import Button from '../../../components/shared/button/Button'
import styles from './StepName.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { setName } from '../../../store/activateSlice';

const StepName = ({ onNext }) => {

    const { name } = useSelector((state) => state.activate);
    const dispatch = useDispatch();
    const [fullname, setFullName] = React.useState(name);

    function nextStep() {
        if (!fullname) {
            return;
        }
        dispatch(setName(fullname));
        onNext();
    }

    return (
        <>
            <Card title="Enter Your Full-Name" icon="cool">
                <TextInput value={fullname} onChange={((e) => setFullName(e.target.value))} />
                <p className={styles.paragraph}>
                    Mitesh Bediya is awesome
                </p>
                <div className={styles.actionButtonWrap}>
                    <Button onClick={nextStep} text="Next"></Button>
                </div>
            </Card>
        </>
    )
}

export default StepName;