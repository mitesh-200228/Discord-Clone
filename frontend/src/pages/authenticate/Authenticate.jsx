import React from 'react'
import StepPhoneEmail from '../Steps/StepPhoneEmail/StepPhoneEmail';
import StepOtp from '../Steps/StepOtp/StepOtp';
const steps = {
    1: StepPhoneEmail,
    2: StepOtp
};
const Authenticate = () => {
    const [step,setStep] = React.useState(1);
    const Step = steps[step]
    
    function onNext(){
        setStep(step+1);
    }

    return (
        <div>
            {/* <button onClick={onNext}/> */}
            <Step onNext={onNext}></Step>
        </div>
    )
}

export default Authenticate