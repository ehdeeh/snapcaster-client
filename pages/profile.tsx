import MainLayout from '@/components/MainLayout';
import { type NextPage } from 'next';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import axiosInstance from '@/utils/axiosWrapper';
import useAuthStore from '@/stores/authStore';
import Signin from './signin';
import LoadingPage from '@/components/LoadingPage';

type UserProfile = {
  email: string;
  fullName: string;
};

const Profile: NextPage = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true); // Added loading state

  useEffect(() => {
    const fetchUserData = async () => {
      if (!isAuthenticated) {
        setLoading(false);
        return;
      }

      try {
        const response = await axiosInstance.get(
          `${process.env.NEXT_PUBLIC_USER_URL}/profile`
        );
        if (response.status !== 200)
          throw new Error('Failed to fetch user profile');
        const data: UserProfile = await response.data;
        setUserProfile(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false); // Ensure loading is set to false after the fetch operation
      }
    };

    fetchUserData();
  }, [isAuthenticated]);

  if (loading) {
    return <LoadingPage />;
  }

  if (!isAuthenticated) {
    return <Signin />;
  }

  return (
    <>
      <ProfileHead />
      <MainLayout>
        <div className="w-full max-w-xl flex-1 flex-col justify-center text-center">
          <section className="w-full py-6 md:py-12 max-w-md mx-auto">
            <div className="w-full container grid md:px-6 gap-6">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter">Profile</h2>
                <p className="text-gray-500 dark:text-gray-400">
                  Manage your Snapcaster profile
                </p>
              </div>
              <div className="flex flex-col gap-2 w-full mx-auto">
                <div className="flex w-full flex-row justify-between">
                  <div className="text-sm opacity-80">Email</div>
                  <div className="text-sm font-bold tracking-tighter">
                    {userProfile?.email}
                  </div>
                </div>
                <div className="flex w-full flex-row justify-between">
                  <div className="text-sm opacity-80">Full Name</div>
                  <div className="text-sm font-bold tracking-tighter">
                    {userProfile?.fullName}
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6" />
            <div className="p-4" />
          </section>
        </div>
      </MainLayout>
    </>
  );
};

export default Profile;

const ProfileHead = () => {
  return (
    <Head>
      <title>Profile</title>
      <meta
        name="description"
        content="Search Magic the Gathering cards across Canada"
      />
      <meta
        property="og:title"
        content={`Snapcaster - Search Magic the Gathering cards across Canada`}
      />
      <meta
        property="og:description"
        content={`Find Magic the Gathering singles and sealed product using in Snapcaster. Search your favourite Canadian stores.`}
      />
      <meta property="og:url" content={`https://snapcaster.ca`} />
      <meta property="og:type" content="website" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};