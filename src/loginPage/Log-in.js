import './Login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfo,faUserTie } from '@fortawesome/free-solid-svg-icons';
import { useState ,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import { useHistory } from 'react-router-dom';


export default function Log_in (){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [error, setError] = useState('');
    // const history = useHistory();
const navigate=useNavigate();


    const offLigne = ()=>{
        navigate("tamplate");
    }

    const handleLogin = async (e) => {

        e.preventDefault();
        console.log('submit');
        try {
          const response = await fetch('https://d758-105-235-139-244.ngrok-free.app/api/v1/admin/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
          });

          console.log(response)
    
          const data = await response.json();
          console.log(data.data)
          if (!response.ok) { 
            console.log('ERROR :', data)
            throw new Error(data.message || 'Server Error'); 
          }
    
          
          const { token } = data;
          setIsLoggedIn(true);
         
          console.log('succsee!');
        navigate("tamplate")


          // You can store the token in localStorage or a state management library like Redux
          // localStorage.setItem('token', token);
        } catch (error) {
           console.log(error)
          setError(error);
        }
      };
    

    return (
        <section>
            
            <div className="imgBx">
                <img src={require("./signin.png")}></img>
            </div> 
                <div className="contentBx">

                     <div className='box-indic'>


                        <div className='indication'>
                        <FontAwesomeIcon icon={faInfo}  bounce/>
                        <p >This site is only for university users</p>
                        </div>

                        <div className='chose'>
                            <div className='admin'> 
                                <img src={require("./admin.webp")} />
                                <p>Admin</p>
                            </div>
                            <div className='teacher'> 
                                <img src={require("./teachers.png")} />
                                <p>Teacher</p>
                            </div>
                        </div>

                        <div className='formBx'>
               
                             <h3>Welcome Back!</h3>
                            <form onSubmit={offLigne} >
                                <div className='inputBx'>
                                    <span>Email:</span>
                                    <input type='email' name='' value={email}  onChange={(e)=>setEmail(e.target.value)}  />
                                </div>
                                <div className='inputBx'>
                                    <span>Password:</span>
                                    <input type='password' name='' value={password}  onChange={(e)=>setPassword(e.target.value)}/>
                                </div>
                                <div className='inputBx'>
                                    <input type='submit' value='Log in' name=''  onC  />
                                </div>
                                <div className='inputBx'>
                                    <p className='forget'>Forget password?<a href='#'>Reset password</a> </p>
                                </div>
                            </form>
                        </div>
                </div>
            </div>
        </section>
    )
}