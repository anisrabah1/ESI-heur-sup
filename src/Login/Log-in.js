import log from './Login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfo } from '@fortawesome/free-solid-svg-icons';
import { useState,useEffect  } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import ApiUrls from '../APIs';
import { Spin } from "antd";
import {  toaster } from 'evergreen-ui'


export default function Log_in (){


   
    const apiUrl = new ApiUrls();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [error, setError] = useState('');
    // const history = useHistory();
const navigate=useNavigate();


    const toCreateEmploi = ()=>{
        navigate("creatEmploi");
    }
    const tosystemParam = ()=>{
        navigate("systemParam");
    }
    

    const offLigne = ()=>{
        navigate("tamplate");
    }
    //_____________________________________________________________________________
    const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOffline = () => {
      setIsOffline(true);
    };

    const handleOnline = () => {
      setIsOffline(false);
    };

    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);

    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
  }, []);


    const handleLogin = async (e) => {

        e.preventDefault();
        console.log('submit');
        {isOffline && (  toaster.warning('Please check your internet connection !'))}
        try {
            setIsSpinning(true);
          const response = await fetch(apiUrl.getUrl('login'), {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
          });
          setIsSpinning(false);
          console.log(response.message)
    
          const data = await response.json();
          console.log(data.data)
          if (!response.ok) { 
            console.log('ERROR :', data)
            setIsSpinning(false);
            throw new Error(data.message || 'Server Error'); 
          }
          
          if(data.status==="success"){
            Cookies.set("token",data.token,{expires:90})    // 90 days to disconect
            navigate("/home");
            console.log('succsee!');
            setIsSpinning(false);
          }
          
          const { token } = data;
          setIsLoggedIn(true);
         
          // You can store the token in localStorage or a state management library like Redux
          // localStorage.setItem('token', token);
        } catch (error) {
           console.log(error)
          setError(error);
        }
      };
    
      const [isSpinning,setIsSpinning] =useState(false);

      
    return (
        <section className='login_rapper'>
             <Spin tip="Loading..."
           fullscreen='true'
           spinning={isSpinning}
                >
                
             </Spin>
            
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
                            <div className='admin' onClick={tosystemParam}> 
                                <img src={require("./admin.webp")} />
                                <p>Admin</p>
                            </div>
                            <div className='teacher_login' onClick={toCreateEmploi}> 
                                <img src={require("./teachers.png")} />
                                <p>Teacher</p>
                            </div>
                        </div>

                        <div className='formBx'>
               
                             <h3>Welcome Back!</h3>
                            <form onSubmit={handleLogin} >
                                <div className='inputBx'>
                                    <span>Email:</span>
                                    <input type='email' name='' value={email}  onChange={(e)=>setEmail(e.target.value)}  />
                                </div>
                                <div className='inputBx'>
                                    <span>Password:</span>
                                    <input type='password' name='' value={password}  onChange={(e)=>setPassword(e.target.value)}/>
                                </div>
                                <div className='inputBx'>
                                    
                                    <input type='submit' value={isSpinning ? 'En cours...' : 'Log in'}
                                     name=''   ></input>
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