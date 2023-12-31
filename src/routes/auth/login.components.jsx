
import React, { useContext, useEffect, useState } from 'react'
import './login.styles.css'
import '../other-styles.styles.css';
import { MdLogin, MdOutlineMail, MdOutlineMarkEmailUnread } from 'react-icons/md'
import XformInput from '../../components/form/forminput.component'
import { Button, Spinner } from '@material-tailwind/react'
import { FcInfo } from 'react-icons/fc'
import { HiOutlineLockClosed } from 'react-icons/hi'
import { OTPGen, createAuth, createUserDocumentFromAuth, errorToast, infoToast, 
    logGoogleUser, searchOtp, signInAuthWithEmailAndPassword, successToast, updateOTPDoc 
} from '../../utils/firebase/firebase.utils'
import { UserContext } from '../../context/user.context'
import { useLocation, useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import { FaRegUser } from 'react-icons/fa6'


const LoginPage = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const { currentUser, setCurrentUser } = useAuth();
    // console.log('currentUser:');
    // var otpp = 'A'+Math.random()*107000;
    // console.log(otpp.substring(0, 5));
    
    var tempOTPstore = null;
    if (localStorage.getItem('tempOTP')) {
        tempOTPstore = JSON.parse(localStorage.getItem('tempOTP'));
    }
    const [tempOTP, setTempOTP] = useState(tempOTPstore);
    const [newUser, setNewUser] = useState(currentUser);
    const [register, setRegister] = useState(false);
    const [spinner, setSpinner] = useState(false);
    const userReg = () => setRegister(!register);
    const spinToggle = () => setSpinner(!spinner);

    const defaultFormFields = {
        otp: '',
        displayName: '',
        email: '',
        password: '',
        confirmPassword: '',
    };

    const [ formFields, setFormfields ] = useState(defaultFormFields);
    const { otp, displayName, email, password, confirmPassword } = formFields;

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormfields({...formFields, [name]: value})
    }


    const handleLogin = async (event) => {
        event.preventDefault();
        // successToast('dsfdfs')
        // OTPGen(50)
        // return;

        try {
            const { user } = await signInAuthWithEmailAndPassword(email, password);
            setFormfields(defaultFormFields);
            const { displayName } = user;
            successToast('Logging you in..!');
            // setCurrentUser(user);
            setNewUser(user);
            console.log(user.email);
            navigate(from, { replace: true })
            // console.log(user.displayName);
            
        } catch (error) {
            switch (error.code) {
                case ('auth/wrong-password'):
                    errorToast('Oops..! Wrong Password');
                    break;

                case ('auth/user-not-found'):
                    errorToast('Oops..! User not found. Check email');
                    break;

                case ('auth/invalid-login-credentials'):
                    errorToast('Oops..! Invalid login credentials');
                    break;
            
                default:
                    errorToast('User Login Error: ', error);
                    console.log('User Login Error: ', error);
                    break;
            }
        }
    }


    // localStorage.removeItem('tempOTP')
    const handleRegister = async (event) => {
        event.preventDefault();

        
        // console.log(OTPfield);
        // return

        if (tempOTP) {
                    
            const otp = tempOTP.otp;
            const displayName = event.target.displayName.value;
            const phone = event.target.phone.value;
            const email = event.target.email.value;
            const password = event.target.password.value;
            const confirmPassword = event.target.confirmPassword.value;

            const registerFormFields = {
                otp: otp,
                displayName: displayName,
                phone: phone,
                email: email,
                password: password,
                confirmPassword: confirmPassword,
            };
            // console.log(registerFormFields)
            // return 

            if (password !== confirmPassword) {
                infoToast('Oops..! Passwords do not match');
                return;
            }

            try {
                spinToggle();
                console.log('spinToggle: '+spinner);
                // return;
                const { user } = await createAuth(email, password);
                // await (user, { displayName });
                await createUserDocumentFromAuth(user, {displayName, otp, phone});
                // setFormfields(defaultFormFields);
                // console.log(displayName)
                // return;
                console.log('Registration successful. Welcome '+displayName);
                successToast('Registration successful. Welcome '+displayName);
                localStorage.removeItem('tempOTP')
                
            } catch (error) {
                // console.log('ErrMsg: ', error);
                if (error.code === 'auth/email-already-in-use') {
                    errorToast('Oops..! Email already in use');
                    return;
                } else if (error.code === 'auth/weak-password') {
                    return infoToast('Password should not be less than 8 characters')
                }
                errorToast('Oops..! Unable to register. Check Email!')
                console.log('User creation encountered an error: ', error);
            }

        } else { 

            const OTPfield = event.target.otp.value;
            const found = await searchOtp(OTPfield);
            if (found && found.status === 'no') {
                // A6893
                successToast('OTP Verified')
                found['status'] = 'yes';
                await updateOTPDoc(found).then(
                    localStorage.setItem('tempOTP', JSON.stringify(found)),
                    setTempOTP(found)
                );
            } else {
                errorToast('Oops..! Incorrect OTP');
            }
        }
        // console.log(found)


    }


    const registerWithOtp = async (event) => {
        event.preventDefault();

        const { target } = event;
        const dname = target.displayName.value;
        const otp = target.otp.value;

        const found = await searchOtp(otp);

        // if (found && found.status == 'no') {
        //     successToast(dname+' - '+otp)
        //     console.log(found.status); // A6893
            logGoogleUser();
        // } else {
        //     errorToast('Oops..! Incorrect OTP');
        // }
    }


    useEffect(() => {
    //     if (localStorage.getItem('curUser') !== ''){
            // if(from === '/login'){
            //     navigate('/', {replace:true})
            // } else {
                if (currentUser) {
                    navigate(from, {replace:true});
                }
            // }
    //             console.log(localStorage.getItem('curUser'));
    //     }
    }, [currentUser])



    // console.log('Page Loaded');



  return (
    <>
        <div className='login-container-size'>
            <div className='login-left'>
                <img src="https://static.vecteezy.com/system/resources/thumbnails/022/675/079/small_2x/data-protection-anti-virus-it-security-using-cyber-security-services-to-protect-private-personal-data-credit-card-pin-user-login-account-password-concept-illustration-free-vector.jpg" alt="" />
                <div id='reg1' className='register-container'>
                    
                {register === false ?
                    <>
                        <p>Don't have an account?</p>
                        <h3 onClick={userReg}>Register Here</h3>
                    </>
                    :
                    <>
                        <p>Already have an account?</p>
                        <h3 onClick={userReg}>Login Here</h3>
                    </>
                }
                </div>
            </div>

            {/* { currentUser ?
                <p>{currentUser.displayName}</p>
            :<p>No User</p>} */}

            {
                register === false ?
                <div className='login-right'>
                    <div className='inner2'>

                        <p className='sign-in'>Sign In</p>

                        <form onSubmit={handleLogin}>

                            {/* <p className="my-4">&nbsp;</p> */}
                            <div className='items-input-group flex'>
                                <h4 className='blue-head text-xs mx-4 my-1 tracking-wide'><FcInfo size='16' className='float-left' /> &nbsp; Enter email and password to proceed</h4>
                            </div>
                
                            <div className='items-input-group flex'>
                                <XformInput inIcon={<MdOutlineMail />} name='email' onChange={handleChange} value={email} type='email' size='lg' labelProp='hidden' placeholder='Email' elementClass='border-none px-5' className='bg-white/50 my-1§ w-full rounded-full shadow-md' required/>
                            </div>
                            
                            <div className='items-input-group flex'>
                                <XformInput inIcon={<HiOutlineLockClosed />} name='password' onChange={handleChange} value={password} type='password' size='lg' labelProp='hidden' placeholder='Password' elementClass='border-none px-5' className='bg-white/50 my-1 w-full rounded-full shadow-md' required/>
                            </div>
                
                            <div className='items-input-group'>
                                <Button type='submit' className='w-full float-center rounded-full' variant="outlined">&nbsp; Login &nbsp;<MdLogin size='18' className='float-right ml-2'/></Button>
                            </div>
                        </form>

                        <div id='reg2' className='register-container'>
                            <p>Don't have an account?</p>
                            <h3 onClick={userReg}>Register Here</h3>
                        </div>

                    </div>
                </div>
                :
                // <div className='login-right2'>
                //     <div className='inner2'>

                //         <p className='sign-in'>Register</p>
                //         { spinner === true ? <Spinner className='w-8 h-8 mx-[calc((100%-64px)/2)]' /> : null }

                //         <form onSubmit={registerWithOtp}>

                //             {/* <p className="my-4">&nbsp;</p> */}
                //             <div className='items-input-group flex'>
                //                 <h4 className='blue-head text-xs mx-4 my-1 tracking-wide'><FcInfo size='16' className='float-left' /> &nbsp; Enter Username and OTP to proceed</h4>
                //             </div>
                
                //             <div className='items-input-group flex'>
                //                 <XformInput inIcon={<MdOutlineMail />} name='displayName' type='text' size='lg' labelProp='hidden' placeholder='Username' elementClass='border-none px-5' className='bg-white/50 my-1§ w-full rounded-full shadow-md' required/>
                //             </div>
                            
                //             <div className='items-input-group flex'>
                //                 <XformInput inIcon={<HiOutlineLockClosed />} name='otp' type='password' size='lg' labelProp='hidden' placeholder='Enter OTP' elementClass='border-none px-5' className='bg-white/50 my-1 w-full rounded-full shadow-md' required/>
                //             </div>
                
                //             <div className='items-input-group'>
                //                 <Button type='submit' className='w-full float-center rounded-full' variant="outlined">&nbsp; Register &nbsp;<MdLogin size='18' className='float-right ml-2'/></Button>
                //             </div>
                //         </form>

                //         <div id='reg2' className='register-container'>
                //             <p>Already have an account?</p>
                //             <h3 onClick={userReg}>Login Here</h3>
                //         </div>

                //     </div>
                // </div>

                <div className='login-right2'>
                    <div className='inner2'>

                        <p className='sign-in'>Register</p>

                        { spinner === true ? <Spinner className='w-8 h-8 mx-[calc((100%-64px)/2)]' /> : null }

                        <form onSubmit={handleRegister}>
                
                            { tempOTP ?
                            <>
                                <div className='items-input-group flex'>
                                    <h4 className='blue-head text-xs mx-4 my-1 tracking-wide'><FcInfo size='16' className='float-left' /> &nbsp; Provide details to register</h4>
                                </div>

                                <div className='items-input-group flex'>
                                    <input type='hidden' name='anyName' />
                                    <XformInput inIcon={<FaRegUser />} name='displayName' type='text' size='lg' labelProp='hidden' placeholder='Username' elementClass='border-none px-5' className='bg-white/50 my-1§ w-full rounded-full shadow-md' required/>
                                </div>
                                
                                <div className='items-input-group flex'>
                                    <XformInput inIcon={<MdOutlineMail />} name='email' type='email' size='lg' labelProp='hidden' placeholder='Email' elementClass='border-none px-5' className='bg-white/50 my-1§ w-full rounded-full shadow-md' required/>
                                </div>
                                
                                <div className='items-input-group flex'>
                                    <XformInput inIcon={<MdOutlineMail />} name='phone' type='number' size='lg' labelProp='hidden' placeholder='Phone' min='0' elementClass='border-none px-5' className='bg-white/50 my-1§ w-full rounded-full shadow-md' required/>
                                </div>
                                
                                <div className='items-input-group flex'>
                                    <XformInput inIcon={<HiOutlineLockClosed />} name='password' type='password' size='lg' labelProp='hidden' placeholder='Password' elementClass='border-none px-5' className='bg-white/50 my-1 w-full rounded-full shadow-md' required/>
                                </div>
                                
                                <div className='items-input-group flex'>
                                    <XformInput inIcon={<HiOutlineLockClosed />} name='confirmPassword' type='password' size='lg' labelProp='hidden' placeholder='Confirm Password' elementClass='border-none px-5' className='bg-white/50 my-1 w-full rounded-full shadow-md' required/>
                                </div>
                    
                                <div className='items-input-group'>
                                    <Button type='submit' className='w-full float-center rounded-full' variant="outlined">&nbsp; Register &nbsp;<MdLogin size='18' className='float-right ml-2'/></Button>
                                </div>
                            </>
                            :
                            <>
                                <div className='items-input-group flex'>
                                    <h4 className='blue-head text-xs mx-4 my-1 tracking-wide'><FcInfo size='16' className='float-left' /> &nbsp; Enter OTP to proceed</h4>
                                </div>

                                <div className='items-input-group flex'>
                                    <XformInput inIcon={<HiOutlineLockClosed />} name='otp' type='text' size='lg' labelProp='hidden' placeholder='Enter OTP' elementClass='border-none px-5' className='bg-white/50 my-1§ w-full rounded-full shadow-md' required/>
                                </div>
                    
                                <div className='items-input-group'>
                                    <Button type='submit' className='w-full float-center rounded-full' variant="outlined">&nbsp; Submit &nbsp;<MdLogin size='18' className='float-right ml-2'/></Button>
                                </div>
                            </>
                            }
                            
                        </form>

                        <div id='reg2' className='register-container'>
                            <p>Already have an account?</p>
                            <h3 onClick={userReg}>Login Here</h3>
                        </div>

                    </div>
                </div>
            }
        </div>
    </>
  )
}

export default LoginPage