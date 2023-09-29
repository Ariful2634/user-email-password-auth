/* eslint-disable no-constant-condition */
import { createUserWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { useRef, useState } from "react";
import auth from "../../firebase/firebase.config";


const SignIn = () => {
    const [register, setRegister] = useState("")
    const [success, setSuccess] = useState("")
    const emailRef = useRef(null)

    const handleInput = e =>{
        e.preventDefault()
        const email=e.target.email.value;
        const password = e.target.password.value;
        console.log(email,password)

        setRegister("")
        setSuccess("")

        if (password.length < 6) {
            setRegister("Password should be at least 6 characters or longer")
            return;
        }
        else if (!/[A-Z]/.test(password)) {
            setRegister("Password should contain at least one uppercase letter")
            return;
        }


        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user)
                setSuccess("User LoggedIn Successfully")
            })
            .catch(error => {
                console.error(error)
                setRegister(error.message)
            })

    }


    const handleforgetPassword=()=>{
        const email  = emailRef.current.value;
        if(!email){
                console.log('please provide an email')
                return
        }
        else if(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/){
            console.log('please provide valid email')

        }

        sendPasswordResetEmail(auth,email)
        .then(()=>{
            alert("Please check your email")
        })
        .catch(error=>{
            console.log(error)
        })
        
    }


    return (
        <div className="hero min-h-screen bg-base-200">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">Login now!</h1>
      <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
    </div>
    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <div className="card-body">
        <form onSubmit={handleInput}>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input ref={emailRef} type="text" name="email" placeholder="email" className="input input-bordered" />
        </div>
        
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" name="password" placeholder="password" className="input input-bordered" />
          <label className="label">
            <a onClick={handleforgetPassword} href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Login</button>
        </div>
        </form>
        {
                    register && <p className="text-red-600">{register}</p>
                }
                {
                    success && <p className="text-green-600">{success}</p>
                }

      </div>
    </div>
  </div>
</div>
    );
};

export default SignIn;