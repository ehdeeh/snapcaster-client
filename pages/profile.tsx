import MainLayout from '@/components/MainLayout';
import { type NextPage } from 'next';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import axiosInstance from '@/utils/axiosWrapper';
import useAuthStore from '@/stores/authStore';
import Signin from './signin';
import LoadingPage from '@/components/LoadingPage';
import Link from 'next/link';
import { useForm, Controller } from 'react-hook-form';

const Profile: NextPage = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const {
    fetchUser,
    hasActiveSubscription,
    email,
    fullName,
    emailVerified,
    betaFeaturesEnabled,
    toggleBetaFeatures
  } = useAuthStore();
  const [loading, setLoading] = useState(true);

  const createCheckoutSession = async () => {
    try {
      const response = await axiosInstance.post(
        `${process.env.NEXT_PUBLIC_PAYMENT_URL}/createcheckoutsession`
      );
      if (response.status !== 200) throw new Error('Failed to create session');
      const data = await response.data;
      console.log('Checkout session created:', data);
      window.location.href = data.url;
    } catch (error) {
      console.error('Error creating checkout session:', error);
    }
  };

  const createPortalSession = async () => {
    try {
      const response = await axiosInstance.post(
        `${process.env.NEXT_PUBLIC_PAYMENT_URL}/createportalsession`
      );
      if (response.status !== 200) throw new Error('Failed to create session');
      const data = await response.data;
      console.log('Portal session created:', data);
      // Redirect to Stripe portal
      window.location.href = data.url;
    } catch (error) {
      console.error('Error creating portal session:', error);
    }
  };
  const { control, reset } = useForm({
    defaultValues: {
      betaFeaturesEnabled: betaFeaturesEnabled
    }
  });

  useEffect(() => {
    reset({ betaFeaturesEnabled });
  }, [betaFeaturesEnabled, reset]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!isAuthenticated) {
        setLoading(false);
        return;
      }

      try {
        fetchUser();
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
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
        <div className="w-full max-w-2xl flex-1 flex-col justify-center text-center">
          <section className="w-full py-6 md:py-12">
            <div className="w-full grid gap-6">
              {!hasActiveSubscription &&
                SubscriptionCards(createCheckoutSession)}
              {hasActiveSubscription &&
                UserSettings(
                  email,
                  fullName,
                  hasActiveSubscription,
                  emailVerified,
                  createPortalSession,
                  toggleBetaFeatures,
                  control
                )}
            </div>
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
function UserSettings(
  email: string,
  fullName: string,
  hasActiveSubscription: boolean,
  emailVerified: boolean,
  createPortalSession: () => Promise<void>,
  toggleBetaFeatures: () => Promise<void>,
  control: any
) {
  return (
<div className="flex flex-col text-left p-4 rounded-md outline outline-2 outline-zinc-600 max-w-full overflow-hidden">
      <h3 className="text-lg font-bold">Settings</h3>
      <div className="p-2" />
      {/* user info container */}
      <div className="flex flex-col gap-2 p-3">
        {/* email container */}
        {emailVerified && (
          <div className="flex flex-row gap-2 text-xs items-center">
            <div className="aspect-square w-2 h-2 bg-green-400 rounded-full"></div>
            <p className="text-sm text-zinc-500">Email verified</p>
          </div>
        )}
        {!emailVerified && (
          <div className="flex flex-row gap-2 text-xs items-center">
            <div className="aspect-square w-2 h-2 bg-red-400 rounded-full"></div>
            <p className="text-sm text-zinc-500">Email not verified</p>
          </div>
        )}

        <div className="flex flex-row justify-between p-2 outline outline-1 outline-zinc-600 rounded-md">
          <p className="hidden md:flex text-sm text-zinc-500">Email</p>
          <p className="text-sm text-zinc-400 truncate max-w-full">{email}</p>
        </div>
        <div className="flex flex-row justify-between p-2 outline outline-1 outline-zinc-600 rounded-md">
          <p className="hidden md:flex text-sm text-zinc-500">Full name</p>
          <p className="text-sm text-zinc-400">{fullName}</p>
        </div>
      </div>
      <div className="p-2" />
      {/* subscription container */}
      <div className="flex flex-col gap-2 p-3 ">
        <div className="flex flex-row justify-between p-2 outline outline-1 outline-zinc-600 rounded-md">
          <p className="text-sm text-zinc-500">Subscription</p>
          <p className="text-sm text-zinc-400">
            {hasActiveSubscription ? 'Active' : 'Inactive'}
          </p>
        </div>
        <Controller
          name="betaFeaturesEnabled"
          control={control}
          render={({ field }) => (
            <div className="flex flex-row justify-between p-2 outline outline-1 outline-zinc-600 rounded-md items-center">
              <p className="text-sm text-zinc-500">Beta features</p>
              <label className="inline-flex relative items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer" // Hide the checkbox but make it accessible to screen readers
                  checked={field.value}
                  onChange={(e) => {
                    field.onChange(e.target.checked);
                    toggleBetaFeatures();
                  }}
                  onBlur={field.onBlur}
                  name={field.name}
                  ref={field.ref}
                />
                <div className="w-11 h-6 bg-zinc-500 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-pink-300 dark:peer-focus:ring-pink-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-pink-600"></div>
              </label>
            </div>
          )}
        />
      </div>
      <div className="p-2" />
      <button
        onClick={createPortalSession}
        className=" bg-white text-black text-sm font-bold rounded-md m-3 p-2 text-center"
      >
        Manage subscription
      </button>
    </div>
  );
}

function SubscriptionCards(createCheckoutSession: () => Promise<void>) {
  return (
    <div className="flex flex-row gap-2 w-full mx-auto">
      {/* free price card */}
      {/* should expand to match height of premium card */}
      <div className="flex flex-col w-full">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div className="flex flex-col text-left p-6 rounded-md outline outline-2 outline-zinc-700 w-full">
            <h3 className="font-semibold text-white">Free</h3>
            <h2 className="text-2xl font-bold">
              $0 <span className="text-sm font-normal">/mo</span>
            </h2>
            <div className="p-1" />

            {/* description */}
            <p className="text-sm text-zinc-500">
              Search for MTG singles across Canada.
            </p>
            <div className="p-2" />
            {/* stack for features */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-row items-center gap-2">
                <div className="aspect-square w-3 h-3 bg-pink-400 rounded-full"></div>
                <p className="text-sm text-zinc-400">
                  Search over 60 Canadian stores
                </p>
              </div>
              <div className="flex flex-row items-center gap-2">
                <div className="aspect-square w-3 h-3 bg-pink-400 rounded-full"></div>
                <p className="text-sm font-semibold text-zinc-400">
                  Search up to 5 cards at a time{' '}
                </p>
              </div>
            </div>
            <div className="p-4 flex-grow" />
            {/* upgrade now btn */}
            <Link
              href="/"
              className="w-full outline outline-2 outline-zinc-400 text-white font-bold rounded-md text-sm p-4 text-center"
            >
              Start searching
            </Link>
          </div>
          <div className="flex flex-col text-left p-6 rounded-md outline outline-2 outline-zinc-700 w-full">
            <h3 className="font-semibold text-pink-400">Pro</h3>
            <h2 className="text-2xl font-bold">
              $3.99 <span className="text-sm font-normal">/mo</span>
            </h2>
            <div className="p-1" />

            {/* description */}
            <p className="text-sm text-zinc-500">
              Support Snapcaster and get access to premium features and future
              updates.
            </p>
            <div className="p-2" />
            {/* stack for features */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-row items-center gap-2">
                <div className="aspect-square w-3 h-3 bg-pink-400 rounded-full"></div>
                <p className="text-sm font-semibold text-zinc-400">
                  Search over 60 Canadian stores
                </p>
              </div>
              <div className="flex flex-row items-center gap-2">
                <div className="aspect-square w-3 h-3 bg-pink-400 rounded-full"></div>
                <p className="text-sm font-semibold text-zinc-400">
                  Search up to 100 cards at a time
                </p>
              </div>
              <div className="flex flex-row items-center gap-2">
                <div className="aspect-square w-3 h-3 bg-pink-400 rounded-full"></div>
                <p className="text-sm font-semibold text-zinc-400">
                  Price monitoring and email notifications
                </p>
              </div>
              <div className="flex flex-row items-center gap-2">
                <div className="aspect-square w-3 h-3 bg-pink-400 rounded-full"></div>
                <p className="text-sm font-semibold text-zinc-400">
                  Beta access to new features
                </p>
              </div>
            </div>
            <div className="p-4" />
            {/* upgrade now btn */}
            <button
              onClick={createCheckoutSession}
              className="w-full bg-white text-black text-sm font-bold rounded-md p-4 text-center"
            >
              Upgrade now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
