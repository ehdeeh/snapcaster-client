import React from 'react';
import { useInView } from 'react-intersection-observer';
import { trackAdClick, trackAdVisible } from '@/utils/analytics';
import { Ad } from '@/types/ads';

type AdComponentProps = {
  ad: Ad;
};

const AdComponent: React.FC<AdComponentProps> = ({ ad }) => {
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
    onChange: (inView, entry) => {
      if (inView) {
        const adId = entry.target.getAttribute('data-ad-id');
        if (adId) {
          trackAdVisible(adId);
        }
      }
    }
  });

  const handleAdClick = (adId: string) => {
    trackAdClick(adId);
  };

  return (
    <div
      ref={ref}
      data-ad-id={ad.id}
      className="mx-auto my-4 flex w-full max-w-5xl rounded border border-zinc-600 bg-zinc-700"
    >
      <a
        href={ad.url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => handleAdClick(ad.id.toString())}
      >
        <img
          src={ad.desktop_image}
          alt={`ad-${ad.id}`}
          className="hidden rounded-lg sm:block"
        />
        <img
          src={ad.mobile_image}
          alt={`ad-${ad.id}`}
          className="w-fill block rounded-lg sm:hidden"
        />
      </a>
    </div>
  );
};

export default AdComponent;
