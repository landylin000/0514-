import React from 'react';
import Head from 'next/head'
import styles from './form.module.css';

import RegisterForm from '@/component/users/form/register';

export default function Register() {



   // if()

   // const res = await fetch('http://localhost:3007/api/myaccounts', {
   //       method: 'POST',
   //       header: {
   //          Accept: 'application/json',
   //          'Content-Type' : 'application/json',
   //       },
   //       body: JSON.stringify(user),
   // })

   // const data = await res.json()

   // console.log(data)
 
   return (
      <>
    <RegisterForm/>
</>
   );
}