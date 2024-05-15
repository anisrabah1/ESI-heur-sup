import { useState ,useEffect } from 'react';
import Tamplate from '../tamplate/tamplate';
import './Home.css';
const Home = () => {
    const [total_t,set_total_t] = useState('64')
    const [total_h,set_total_h] = useState('123')
    let intervalId = null;
    let intervalId2 = null;
    useEffect(()=>{
        fetch('').then(res=>{return res.json();}).then(data => {set_total_t('64')});
        
    },[]);
    const [currentNumber, setCurrentNumber] = useState(0);
    const [currentNumber2, setCurrentNumber2] = useState(0);

    // Define a function to increment the current number
    const incrementNumber_T = () => {
        setCurrentNumber((prevNumber) => {
            // Increment the number by 1
            const newNumber = prevNumber + 1;
            // If the new number reaches or exceeds the target number, stop the interval
            if (newNumber >= total_t) {
                clearInterval(intervalId);
            }
            return newNumber;
        });
    };
    const incrementNumber_H = () => {
        setCurrentNumber2((prevNumber) => {
            // Increment the number by 1
            const newNumber = prevNumber + 1;
            // If the new number reaches or exceeds the target number, stop the interval
            if (newNumber >= total_h) {
                clearInterval(intervalId2);
            }
            return newNumber;
        });
        
    };

    // Set up an interval to increment the current number
    useEffect(() => {
        // Set up an interval to call incrementNumber every 100ms (you can adjust this timing)
         intervalId = setInterval(incrementNumber_T, currentNumber+currentNumber+30);
         intervalId2 = setInterval(incrementNumber_H, currentNumber+currentNumber2+30);
        // Cleanup the interval when the component unmounts or the effect re-runs
        return () => {
            clearInterval(intervalId);
            clearInterval(intervalId2);
        };
    }, [total_t,total_h]); 
    return (
        <div>
            <Tamplate/>
                        <div className='content'>

                        
                    <div className="home">
                        
                        <div className="labels">
                            <div className="label-1">Welcome, Administrators!</div>
                            <div className="label-2">Accurate Calculations, Clear Reports. All in One Place</div>
                        </div>
                        <div className="counters">
                        <div className="teacher-count">
                            <center>
                            <div className="c-label">total teachers</div>
                            <div className="n-label">{currentNumber}</div>
                            </center>
                        </div>
                        <div className="total-houre">
                        <center>
                            <div className="c-label">total additional hours</div>
                            <div className="n-label">{currentNumber2}</div>
                            </center>
                        </div>
                        </div>
                        
                    </div>
                    </div>
                    </div>
     );
}
 
export default Home;