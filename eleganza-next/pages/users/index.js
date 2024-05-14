import UserLayout from '@/component/users/user-layout';
import Head from 'next/head';

export default function UsersIndex() {
    
}

UsersIndex.getLayout = function (page) {
  return <UserLayout>{page}</UserLayout>
}

