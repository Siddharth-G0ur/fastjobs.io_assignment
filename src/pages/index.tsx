import Banner from "./banner"
import Background from "./background"
import { useState } from "react"
import { ToastContainer ,toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router'

export default function Home() {

  const router = useRouter()

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  
  const { username, password } = formData;
  
  const onChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const onSubmit = async (e: any) => {
    e.preventDefault();
    const res = await fetch("https://frontendtestapi.staging.fastjobs.io/auth/login", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
      credentials: 'include',
    });
    
    if (res.ok) {
      router.push('/protactedRoute')
    } else {
      toast.error('Please check your username and password', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    };
    
  }

  

  return (
    <>
      <Banner/>
      <Background/>
      <div className="rectangle2">
        <div className="login" >
          <div className="desc" >For us to stay in touch</div>
          <div className="form">
            <form onSubmit={(e) => onSubmit(e)}>
            <div className="username">
              <div className="credential-text" > Username</div>
              <input type="username" name="username" className="input-field" value={username} onChange={(e)=> onChange(e)}></input>
            </div>
            <div className="password">
              <div className="credential-text" > Password</div>
                <input type="password" name="password" className="input-field" value={password} onChange={(e) => onChange(e)}></input>
            </div>
            <div className="button" >
                <button type="submit" className="credential-text btn">Continue</button>
                <ToastContainer />
            </div>
            </form>
          </div>
        </div> 
     </div>    
  </>
  )
}
