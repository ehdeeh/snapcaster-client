import { type NextPage } from 'next';
import Head from 'next/head';
import UpdateFeed from '@/components/UpdateFeed';
type Props = {};

const Updates: NextPage<Props> = () => {
  const updates = [
    {
        title: "Big backend changes.",
        date: "Feb 14, 2024",
        description: "I've made some changes that should improve performance and reliability. Some stores have been temporarily removed as I work on getting them integrated with the new backend system. Thanks for your support and patience!"
    },
    {
      title: 'Bug fixes for multi search.',
      date: 'Nov 15, 2023',
      description: ''
    },
    {
      title:
        'Added Fan of the Sport and Kingdom of the Titans to single search.',
      date: 'Aug 22, 2023',
      description: ''
    },
    {
      title: 'Added Level Up Games to single search.',
      date: 'Aug 8, 2023',
      description: ''
    },
    {
      title: 'Updates for 20+ stores using BinderPOS.',
      date: 'Aug 5, 2023',
      description: ''
    },
    {
      title: 'Bugfixes for multiple BinderPOS stores.',
      date: 'July 24, 2023',
      description: ''
    },
    {
      title: 'Added 14 new stores to single search.',
      date: 'July 12 2023',
      description: ''
    },
    {
      title: 'Added 8 new stores to single search.',
      date: 'July 11 2023',
      description: ''
    },
    {
      title:
        'Bug fixes for FantasyForged, 401 Games, OrachardCity, Kanatacg, EnterTheBattlefield, GameKnight',
      date: 'July 11 2023',
      description: ''
    },
    {
      title: 'Bug fixes for Fantasy Forged.',
      date: 'Apr 14 2023',
      description: ''
    },
    {
      title: 'Price monitoring and watchlist added.',
      date: 'Mar 28 2023',
      description: ''
    },
    {
      title: 'Bug fixes and FaceToFace added to sealed search.',
      date: 'Mar 27 2023',
      description: ''
    },
    {
      title:
        'GameKnight, OrchardCity, ExorGames, SequenceGaming added to sealed.',
      date: 'Mar 26 2023',
      description: ''
    },
    {
      title: 'EverythingGames,  FantasyForged, FirstPlayer added to sealed.',
      date: 'Mar 26 2023',
      description: ''
    },
    {
      title: 'Popular set carousel added.',
      date: 'Mar 26 2023',
      description: ''
    },
    {
      title: 'Bug fixes and popular card carousel added.',
      date: 'Mar 25 2023',
      description: ''
    },
    {
      title: 'EnterTheBattlefield added to sealed search.',
      date: 'Mar 18 2023',
      description: ''
    },
    {
      title: 'Gamezilla, Aethervault, Atlas, BorderCity added to sealed.',
      date: 'Mar 13 2023',
      description: ''
    },
    {
      title: 'HairyT, Chimera, ComicHunter, TopdeckHero added to sealed.',
      date: 'Mar 12 2023',
      description: ''
    },
    {
      title: 'Price history graphs added to single search.',
      date: 'Mar 11 2023',
      description: ''
    },
    {
      title: 'Chimera Gaming added to single search.',
      date: 'Mar 11 2023',
      description: ''
    }
  ];
  return (
    <>
      <UpdatesHead />
      <main className="flex min-h-screen flex-col items-center justify-between p-2 sm:p-8 mb-16">
        <div className="w-full max-w-xl flex-1 flex-col justify-center text-center">
          <UpdateFeed updates={updates} />
        </div>
      </main>
    </>
  );
};

export default Updates;

const UpdatesHead = () => {
  return (
    <Head>
      <title>snapcaster</title>
      <meta
        name="description"
        content="Search for Magic the Gathering singles in Canada"
      />
      <meta
        property="og:title"
        content={`snapcaster - Search for Magic: the Gathering cards across Canada`}
      />
      <meta
        property="og:description"
        content={`Find your Magic the Gathering singles and sealed product using snapcaster. Search over 20 Canadian stores.`}
      />
      <meta property="og:url" content={`https://snapcaster.ca`} />
      <meta property="og:type" content="website" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};