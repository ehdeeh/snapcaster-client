import React from 'react';
import { SingleSearchResult } from 'store';
type Props = {
  cardData: SingleSearchResult;
};
type WebsiteLogo = Record<string, string>;
import { trackOutboundLink } from '../utils/analytics';

const websiteLogos: WebsiteLogo = {
  abyss:
    'https://bryces-images.s3.us-west-2.amazonaws.com/Abyss_White_Bold_230x%402x.avif',
  chimera:
    'https://cdn.shopify.com/s/files/1/0131/2463/2640/files/logo_large.png?v=1672686974',
  gauntlet:
    'http://cc-client-assets.s3.amazonaws.com/store/gauntletgamesvictoria/7c8176e703db451bad3277bb6d4b8631/medium/Transparent_logo.png',
  houseofcards:
    'https://bryces-images.s3.us-west-2.amazonaws.com/houseofcards.webp',
  kanatacg: 'https://i.ibb.co/hm3qKWc/wizardstower-removebg-preview.png',
  dragoncards:
    'https://bryces-images.s3.us-west-2.amazonaws.com/dragon_cards_and_games_white.png',
  fusion: 'https://i.ibb.co/GkKmry9/fusiongaminglogo.png',
  four01: 'https://i.ibb.co/h9x3Ksb/401games.png',
  everythinggames:
    'https://cdn.shopify.com/s/files/1/0618/8905/2856/files/Header_76747500-dd40-4d94-8016-a1d21282e094_large.png?v=1650298823',
  magicstronghold:
    'https://magicstronghold-images.s3.amazonaws.com/customizations/logo.png',
  facetoface: 'https://i.ibb.co/W2bPWdK/logo-colored-1.png',
  connectiongames:
    'https://bryces-images.s3.us-west-2.amazonaws.com/connection.png',
  topdeckhero:
    'https://bryces-images.s3.us-west-2.amazonaws.com/topdeckhero.png',
  jeux3dragons:
    'https://bryces-images.s3.us-west-2.amazonaws.com/jeux3dragons.png',
  sequencegaming: 'https://i.ibb.co/C2jXrmD/sequence-no-bg-inverted.png',
  atlas: 'https://bryces-images.s3.us-west-2.amazonaws.com/atlas.png',
  hairyt:
    'https://cdn.shopify.com/s/files/1/0266/9513/9533/files/hariyt-horizontal-logo.png?v=1615403256',
  gamezilla:
    'https://cdn.shopify.com/s/files/1/0570/6308/0145/files/Screen_Shot_2018-09-07_at_1.02.57_PM_copy_141x.png?v=1626814255',
  exorgames:
    'https://cdn.shopify.com/s/files/1/0467/3083/8169/files/Untitled-2-01.png?v=1613706669',
  gameknight:
    'https://cdn.shopify.com/s/files/1/0367/8204/7276/files/GK-Logo-Full-Text-Below-1-768x603.png?v=1618430878',
  enterthebattlefield: 'https://i.ibb.co/hdnH9fY/enterthebattlefield.png',
  manaforce: 'https://bryces-images.s3.us-west-2.amazonaws.com/manaforce.png',
  firstplayer:
    'https://bryces-images.s3.us-west-2.amazonaws.com/firstplayer.png',
  orchardcity:
    'https://d1rw89lz12ur5s.cloudfront.net/store/orchardcitygames/eb6cb32f84b34b5cbb1c025fc41c9821/large/logo_v1.png',
  bordercity:
    'https://i.ibb.co/cvNCbXx/Border-City-Games-Large-85873391-3559-47f7-939a-420461a0033f-201x-removebg-preview.png',
  aethervault:
    'https://bryces-images.s3.us-west-2.amazonaws.com/AetherVaultGames.png',
  thecomichunter:
    'https://bryces-images.s3.us-west-2.amazonaws.com/ComicHunter.png',
  fantasyforged: 'https://bryces-images.s3.us-west-2.amazonaws.com/ff.png',
  gamebreakers:
    'https://gamebreakers.ca/cdn/shop/files/GameBreakersLogo_REV_2.png?v=1655901364',
  mythicstore:
    'https://themythicstore.com/cdn/shop/files/prise3.png?v=1677464824',
  vortexgames:
    'https://vortexgames.ca/cdn/shop/files/favico_x60_2x_c557b87f-6e22-4c6d-a5ad-dc202785f3e1_100x.png?v=1652245334',
  northofexile:
    'https://bryces-images.s3.us-west-2.amazonaws.com/northofexile.avif',
  crypt: 'https://bryces-images.s3.us-west-2.amazonaws.com/crypte.avif',
  silvergoblin:
    'https://bryces-images.s3.us-west-2.amazonaws.com/silvergoblin.avif',

  blackknight:
    'https://bryces-images.s3.us-west-2.amazonaws.com/blackknightgames.webp',

  eastridge: 'https://bryces-images.s3.us-west-2.amazonaws.com/eastridge.avif',

  hfx: 'https://bryces-images.s3.us-west-2.amazonaws.com/hfxgames.avif',

  kesselrun: 'https://bryces-images.s3.us-west-2.amazonaws.com/kesselrun.avif',
  nerdzcafe: 'https://bryces-images.s3.us-west-2.amazonaws.com/nerdzcafe.webp',
  omg: 'https://bryces-images.s3.us-west-2.amazonaws.com/omggames.webp',
  outofthebox:
    'https://bryces-images.s3.us-west-2.amazonaws.com/outofthebox.avif',
  pandorasboox:
    'https://bryces-images.s3.us-west-2.amazonaws.com/pandorasboox.avif',
  reddragon: 'https://bryces-images.s3.us-west-2.amazonaws.com/reddragon.webp',
  skyfox: 'https://bryces-images.s3.us-west-2.amazonaws.com/skyfox.avif',
  taps: 'https://bryces-images.s3.us-west-2.amazonaws.com/tapsgames.avif',
  timevault: 'https://bryces-images.s3.us-west-2.amazonaws.com/timevault.avif',
  upnorth: 'https://bryces-images.s3.us-west-2.amazonaws.com/upnorth.avif',
  waypoint: 'https://bryces-images.s3.us-west-2.amazonaws.com/waypoint.webp',
  levelup: 'https://bryces-images.s3.us-west-2.amazonaws.com/levelup.webp',
  fanofthesport:
    'https://bryces-images.s3.us-west-2.amazonaws.com/fanofthesport.avif',
  kingdomtitans:
    'https://bryces-images.s3.us-west-2.amazonaws.com/kingdomtitans.webp',
  untouchables:
    'https://bryces-images.s3.us-west-2.amazonaws.com/untouchables.webp',
  darkfoxtcg: 'https://bryces-images.s3.us-west-2.amazonaws.com/darkfoxtcg.webp'
};

export default function SingleCatalogRow({ cardData }: Props) {
  function handleBuyClick(link:string, price:number) {
    // extract the domain from the link
    const domain = link.split('/')[2];
    // convert price to cents
    const priceInCents = price * 100;
    trackOutboundLink(domain, priceInCents);
  }

  return (
    <>
      <>
        <div className="grid grid-cols-12 gap-4 my-2 p-2 sm:my-3 sm:p-4 rounded-md transition-all bg-zinc-900 hover:bg-zinc-700">
          {/* center content vertically in thje column */}
          <div className="col-span-3 flex">
            <img
              src={cardData.image}
              alt="card"
              className="w-16 md:w-24 rounded-md object-contain"
            />
          </div>
          <div className="col-span-5 mt-2">
            <div className="flex flex-col text-left">
              <div className="text-md font-bold">{cardData.name}</div>
              <div className="text-sm">{cardData.set}</div>
              {/* match cardData.website to it's websiteLogo from the map */}
              <div className="h-16 w-16">
                <img
                  //   map string of website to the image key
                  src={websiteLogos[cardData.website]}
                  alt="website logo"
                  className="h-16 w-16 object-contain"
                />
                {/* <div className="text-sm">{cardData.website}</div> */}
              </div>
            </div>
          </div>
          <div className="col-span-4 mt-2">
            <div className="flex flex-col items-end">
              <div className="text-lg font-bold">${cardData.price}</div>
              <div className="flex flex-row space-x-2">
                {cardData.foil && (
                  <div className="text-sm font-extrabold text-pink-500">
                    Foil
                  </div>
                )}
                <div className="text-sm font-bold">{cardData.condition}</div>
              </div>
              <a
                className="transition-all bg-zinc-800 hover:bg-zinc-900 text-white font-bold p-1 px-2 sm:py-1 sm:px-4 rounded focus:outline-none focus:shadow-outline mt-4 "
                href={cardData.link}
                data-price={cardData.price}
                target="_blank"
                id='buy-button'
                
                onClick={() => handleBuyClick(cardData.link, cardData.price)}
              >
                Buy
              </a>
            </div>
          </div>
        </div>
      </>
    </>
  );
}
