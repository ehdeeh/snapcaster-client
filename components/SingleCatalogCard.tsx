import React, { useState } from 'react';
import { SingleSearchResult } from '@/stores/store';
type Props = {
  cardData: SingleSearchResult;
};

import { useStore } from '@/stores/store';
import { trackOutboundLink } from '../utils/analytics';
import { Button } from './ui/button';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from '@/components/ui/card';
import Image from 'next/image';

export default function SingleCatalogCard({ cardData }: Props) {
  const { websites } = useStore();

  const findWebsiteNameByCode = (code: string): string => {
    const website = websites.find((website) => website.code === code);
    return website ? website.name : 'Website not found';
  };

  function handleBuyClick(link: string, price: number) {
    const domain = link.split('/')[2];
    const priceInCents = price * 100;
    trackOutboundLink(domain, priceInCents);
  }

  return (
    <Card>
      <CardHeader>
        <img
          src={cardData.image}
          alt="card"
          className="max-w-36 mx-auto rounded-lg object-contain"
        />
      </CardHeader>
      <CardContent className="text-left">
        <p className="text-xs opacity-70">{cardData.set}</p>
        <p className="text-sm font-bold">{cardData.name}</p>
        <div className="p-1"></div>
        <p className="text-xs opacity-70">
          {findWebsiteNameByCode(cardData.website)}
        </p>
        <p className="text-sm">{cardData.condition}</p>
        <p className="text-sm font-bold">${cardData.price}</p>
      </CardContent>
      <CardFooter>
        <Link
          href={cardData.link}
          target="_blank"
          rel="noreferrer"
          className="w-full"
        >
          <Button
            onClick={() => handleBuyClick(cardData.link, cardData.price)}
            className="w-full"
          >
            Buy
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}