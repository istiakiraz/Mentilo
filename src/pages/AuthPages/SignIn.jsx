import React from 'react';
import logoGIF from '../../assets/animation/Login (1).gif'
import logo from '../../assets/logo/MentiloLogo.png'
import logo2 from '../../assets/logo/mentiloTitleLogo.png'


const SignIn = () => {
    return (
        <div className="grid grid-cols-1 bg-primary lg:bg-white h-screen lg:grid-cols-2 py-16 max-h-screen justify-center items-center  lg:pt-0  lg:pb-0">

             <div className=" bg-primary  hidden lg:block h-screen relative">
      

           
                
                <img className='w-[600px] relative  z-20 py-40 mx-40' src={logoGIF} alt="" />
                

            

      </div>

      
        <div className="  lg:w-5/12 mx-auto ">
        <div className='lg:flex justify-center mb-8 hidden  items-end'>
            <img className='w-20' src={logo} alt="" />
            <h2 className='text-4xl font-logo -ml-4 text-primary '>Mentilo</h2>
        </div>
        <img className='lg:hidden mb-8 w-50 mx-auto ' src={logo2} alt="" />


              <div className="bg-white rounded-xl  shadow-2xl p-7 sm:p-10">
                <h3 className="mb-4 lg:text-4xl font-semibold text-center sm:mb-6 text-2xl">
                  Log In
                </h3>
                <p className='text-gray-500 text-center pb-7 font-semibold ' >Welcome back! Please enter your details.</p>
                <form>
                  
                 
                  <div className="mb-1 sm:mb-2">
                    <label
                      htmlFor="email"
                      className="inline-block mb-1 font-medium"
                    >
                      E-mail
                    </label>
                    <input
                      placeholder="Email"
                      required
                      type="email"
                      className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                      id="email"
                      name="email"
                    />
                  </div>
                   <div className="mb-1 sm:mb-2">
                    <label
                      htmlFor="lastName"
                      className="inline-block mb-1 font-medium"
                    >
                      Password
                    </label>
                    <input
                      placeholder="Password"
                      required
                      type="text"
                      className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"                     
                      name="password"
                    />
                  </div>
                  <div className="mt-4 mb-2 sm:mb-4">
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-primary hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
                    >
                      Sign In
                    </button>
                  </div>
                  <p className="text-xs text-gray-600 sm:text-sm">
                    We respect your privacy. Unsubscribe at any time.
                  </p>
                </form>
            
            </div>
       </div>

     
    </div>
    );
};

export default SignIn;