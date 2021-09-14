import React from 'react'
import styles from './Home.module.css'
import { Link, useHistory } from 'react-router-dom';
import Card from '../../../src/components/shared/Card/Card'
import Button from '../../../src/components/shared/button/Button'

const Home = () => {

    const history = useHistory();

    function startRegister(){
        history.push('/authenticate');  
    }

    return (
        <div className={styles.cardWrapper}>
            <Card title="Welcome to this cardhouse!" icon="github">
                <p className={styles.text}>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
                    Aliquid incidunt necessitatibus totam dolore natus 
                    sunt nemo, tempora laudantium dolorem ea minima dolor? Accusamus 
                    eveniet ea, suscipit eius delectus dicta placeat.
                </p>
                <div>
                    <Button onClick={startRegister} text={`Enter in Our World`}></Button>
                </div>
                <div>
                    <span>Have an invite text&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <Link className={styles.signin} to="/login">
                        Sign in
                    </Link>
                </div>
            </Card>
        </div>
    )
}

export default Home