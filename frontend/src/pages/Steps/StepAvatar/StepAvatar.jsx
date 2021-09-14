import React from 'react'
import Card from '../../../components/shared/Card/Card';
import Button from '../../../components/shared/button/Button';
import styles from './StepAvatar.module.css';
import { useSelector,useDispatch } from 'react-redux';
import { setAvatar } from '../../../store/activateSlice';

const StepAvatar = ({ onNext }) => {

    const dispatch = useDispatch();

    const { name } = useSelector((state) => state.activate);
    const [image, setImage] = React.useState('/images/dsa.jpg');

    function captureImage(e){
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setImage(reader.result);
            dispatch(setAvatar(reader.result));
        }
        console.log(e);
    }

    function submit() {}

    return (
        <>
            <Card title={`Okay , ${name}`} icon="profile">
                <div className={styles.avatarWrapper}>
                    <img src={image} className={styles.img} alt="" />
                </div>
                <div>
                    <input 
                    onChange={captureImage}
                    className={styles.avatarInput} 
                    id="file" 
                    type="file"></input>
                    <label htmlFor="file" className={styles.avatarlabel}>Choose Different Photo</label>
                </div>
                <div>
                    <Button onClick={submit} text="Text"></Button>
                </div>
            </Card>
        </>
    )
}

export default StepAvatar