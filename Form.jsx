import React, { useState } from 'react';
import { useForm } from 'react-hook-form'
import { toast } from "react-toastify";
import Toast from './Toast';

const Form = () => {

   const { register, handleSubmit, formState: { errors } } = useForm();

   const [loader, setLoader] = useState(false)

   const onSubmit = (data) => {
      setLoader(true)
      // console.log(data);
      fetch('https://getform.io/f/2a31df75-c496-41eb-b996-2288610d76f0', {
         method: 'POST',
         body: data,
         headers: {
            "Accept": "application/json",
         },
      })
      .then((response) => {
         setLoader(false);
         clearInputs()
         toast.success("Message Delivered Successfully...");
         console.log(response);
      })
      .catch((error) => {
         setTimeout(()=>{
            setLoader(false);
            toast.error("Error Occurred Try Again");
            console.log(error);
         },1000)
      })

   }

   const clearInputs = () => {
      Array.from(document.querySelectorAll("input")).forEach(
         input => (input.value = "")
      );
      Array.from(document.querySelectorAll("textarea")).forEach(
         input => (input.value = "")
      );
   }

   return (
      <div className='col-span-3 w-full h-auto shadow-xl shadow-gray-400 rounded-xl lg:p-4'>
         <div className='p-4'>

            <form onSubmit={handleSubmit(onSubmit)} method='POST' id='form' acceptCharset="UTF-8" >
               <div className='grid md:grid-cols-2 gap-4 w-full py-2'>
                  <div className='flex flex-col'>
                     <label title="Fields marked with * are required" className='uppercase text-sm py-2'>Name<span className='text-red-500 text-base pl-1'>*</span></label>
                     <input type="text" {...register('name', { required: true, minLength: 3, maxLength: 20 })} className='border-2 rounded-lg p-3 flex border-gray-300' />
                     { errors.name && <p className='text-red-500'>Enter Your Name</p> }
                  </div>
                  <div className='flex flex-col'>
                     <label className='uppercase text-sm py-2'>WhatsApp Contact</label>
                     <input type="tel" {...register('phone', { minLength: 12, maxLength: 12, pattern: /[0][3][0-9]{2}-[0-9]{7}/ })} placeholder='0300-0000000' className='border-2 rounded-lg p-3 flex border-gray-300' />
                     { errors.phone && <p className='text-red-500'>Please Check the Phone</p> }
                  </div>
               </div>
               <div className='flex flex-col py-2'>
                  <label title="Fields marked with * are required" className='uppercase text-sm py-2'>Email<span className='text-red-500 text-base pl-1'>*</span></label>
                  <input type="email" {...register('email', { required: true, maxLength: 40, pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ } )} className='border-2 rounded-lg p-3 flex border-gray-300' />
                  { errors.email && <p className='text-red-500'>Enter Correct Email</p> }
               </div>
               <div className='flex flex-col py-2'>
                  <label title="Fields marked with * are required" className='uppercase text-sm py-2'>Subject<span className='text-red-500 text-base pl-1'>*</span></label>
                  <input type="text" {...register('subject', { required: true, maxLength: 100 })} className='border-2 rounded-lg p-3 flex border-gray-300' />
                  { errors.subject && <p className='text-red-500'>Subject is Required</p> }
                  <input type="hidden" name='_customFieldName' style={{display:'none !important'}} />
               </div>
               <div className='flex flex-col py-2'>
                  <label title="Fields marked with * are required" className='uppercase text-sm py-2'>Message<span className='text-red-500 text-base pl-1'>*</span></label>
                  <textarea {...register('message', { required: true, minLength: 20, maxLength: 5000 })} className='border-2 rounded-lg p-3 border-gray-300' rows='8'></textarea>
                  { errors.message && <p className='text-red-500'>Please Enter Your Query</p> }
               </div>
               {!loader ?
               <button type='submit' className='w-full p-4 mt-4 text-gray-100 bg-gradient-to-r from-[#5651e5] to-[#709dff]'>send message</button>
               :
               <div className="flex items-center justify-center">
                  <div className="inline-block h-8 w-8 p-4 mt-4 text-[#5651e5] animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
                  </div>
               </div> }
            </form>
         </div>
      <Toast />

      </div>
      
   )
}

export default Form