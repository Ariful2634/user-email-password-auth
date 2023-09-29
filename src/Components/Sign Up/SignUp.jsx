import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useState } from "react";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
// import { Result } from "postcss";


const SignUp = () => {
    const [register, setRegister] = useState("")
    const [success, setSuccess] = useState("")
    const [showPassword, setShowPassword] = useState(false)

    const handleClick = (e) => {
        e.preventDefault()
        const email = e.target.email.value;
        const password = e.target.password.value;
        const accepted = e.target.terms.checked

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

        if(!accepted){
            setRegister("Please Accept Our Terms and Conditions")
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then(res => {
                console.log(res.user)

                setSuccess("User Created Successfully")

                sendEmailVerification(res.user)
                .then(()=>[
                    alert('please check your email')
                ])
            })
            .catch(error => {
                console.error(error)
                setRegister(error.message)
            })
    }

    return (
        <div >
            <div className="mx-auto md:w-[60%] mt-16 ">
                <h2 className="text-4xl mb-8">Please Sign Up</h2>
                <form onSubmit={handleClick} action="">
                    <input className="w-full mb-6 py-3 rounded px-4" type="email" name="email" id="" placeholder="Email Address" required /> <br />
                    <div className="relative">
                        <input className="w-full py-3 mb-6 rounded px-4"
                            type={showPassword ? "text" : "password"}
                            name="password"
                            id="" placeholder="Password"
                            required />
                             <span className="absolute top-4 right-2" onClick={() => setShowPassword(!showPassword)}>
                            {
                                showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
                            }
                        </span>
                    </div> <br />
                    <div className="mb-3">
                        <input type="checkbox" name="terms" id="terms" />
                        <label htmlFor="terms"><a href="">Accept Terms And Conditions</a></label>
                    </div>

                    <input className="w-full btn btn-secondary" type="submit" value="Sign Up" />
                </form>
                {
                    register && <p className="text-red-600">{register}</p>
                }
                {
                    success && <p className="text-green-600">{success}</p>
                }
            </div>
        </div>
    );
};

export default SignUp;