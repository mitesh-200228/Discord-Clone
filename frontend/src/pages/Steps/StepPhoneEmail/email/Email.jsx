import React from 'react'
import Card from '../../../../components/shared/Card/Card'
import Button from '../../../../components/shared/button/Button'
import TextInput from '../../../../components/shared/TextInput/TextInput'
import styles from '../StepEmail.module.css'

const Email = ({onNext}) => {

    const [email, setEmail] = React.useState('');

    return (
        <div>
            <Card title="Enter your Email" icon="github">
                <TextInput value={email} onChange={(e) => setEmail(e.target.value)} />
                <div>
                    <div className={styles.actionButtonWrap}>
                        <Button text="Next" onClick={onNext}/>
                    </div>
                </div>
                <p classname={styles.bottomParagraph}>
                    Mitesh Bediya , 2nd Year Civil Department IITM
                </p>
            </Card>
        </div>
    )
}

export default Email