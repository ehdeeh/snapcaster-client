import React, { useEffect } from 'react';
import Head from 'next/head';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Loader2, Minus, Plus, Scroll } from 'lucide-react';
import useAuthStore from '@/stores/authStore';
import { Badge } from '@/components/ui/badge';
import LoginRequired from '@/components/login-required';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import PageTitle from '@/components/ui/page-title';
import useGlobalStore from '@/stores/globalStore';
import useMultiSearchStore from '@/stores/multiSearchStore';
import { WebsiteCombobox } from '@/components/multi-search/multi-website-combobox';
import { MultiSearchProduct, Product, Tcgs } from '@/types';
import { Textarea } from '@/components/ui/textarea';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from '@/components/ui/card';
import { CardDescription, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import BackToTopButton from '@/components/ui/back-to-top-btn';
import PoweredBy from '@/components/powered-by';
import { Separator } from '@/components/ui/separator';

type Props = {};

export default function Multisearch({}: Props) {
  const {
    mode,
    selectedWebsites,
    tcg,
    searchInput,
    results,
    resultsTcg,
    setResultsTcg,
    handleSubmit,
    setSearchInput,
    onWebsiteSelect,
    setTcg
  } = useMultiSearchStore();
  const { fetchWebsites, websites } = useGlobalStore();
  const { hasActiveSubscription, isAuthenticated } = useAuthStore();

  useEffect(() => {
    fetchWebsites();
  }, []);

  if (!isAuthenticated) {
    return (
      <LoginRequired
        title="Multi-search"
        message="You must be logged in to use this feature."
      />
    );
  }

  return (
    <>
      <main className="container mt-8 w-full flex-1 flex-col items-center justify-center px-2 py-8">
        <MultisearchHead />
        <div className="flex w-full flex-col justify-center gap-8 text-center">
          <PageTitle
            title="Multi Search"
            subtitle="Search for up to 100 cards across select stores."
          />

          {mode === 'search' && (
            <>
              <SearchView
                tcg={tcg}
                setTcg={setTcg}
                searchInput={searchInput}
                setSearchInput={setSearchInput}
                handleSubmit={handleSubmit}
                websites={websites}
                selectedWebsites={selectedWebsites}
                onWebsiteSelect={onWebsiteSelect}
              />
            </>
          )}
          {mode === 'results' && (
            <>
              <div className="flex flex-col gap-4 md:flex-row">
                <ResultsView results={results} />
              </div>
            </>
          )}
        </div>
        <BackToTopButton />
      </main>
    </>
  );
}

const ResultsView = ({ results }: { results: any[] }) => {
  return (
    <div className="grid w-full grid-cols-12 gap-4">
      <div className="col-span-2">
        <ResultSelector />
      </div>
      <div className="col-span-7 flex flex-col gap-4">
        <div className="flex w-full gap-4 rounded border border-border bg-popover p-4">
          <Button size="sm">Reset</Button>
          <Button size="sm">Save Search</Button>
          <Button size="sm">Export Cart</Button>
        </div>
        <div className="">
          <ResultsTable results={results} />
        </div>
      </div>
      <div className="col-span-3">
        <Cart />
      </div>
    </div>
  );
};

const Cart = () => {
  const { cart, removeFromCart } = useMultiSearchStore();
  const { getWebsiteName } = useGlobalStore();
  const getCartStoreSummary = (cart: any[]) => {
    const storeSummary: any = {};
    cart.forEach((product) => {
      if (storeSummary[product.website]) {
        storeSummary[product.website].count += 1;
        storeSummary[product.website].subtotal += product.price;
      } else {
        storeSummary[product.website] = {
          count: 1,
          subtotal: product.price
        };
      }
    });

    return Object.keys(storeSummary).map((store, i) => (
      <div key={i} className="flex w-full justify-between">
        <span>{getWebsiteName(store)}</span>
        <div className="flex flex-row items-center gap-4">
          <div>({storeSummary[store].count})</div>
          <div>${storeSummary[store].subtotal.toFixed(2)}</div>
        </div>
      </div>
    ));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cart</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-96 w-full">
          {cart.map((product, i) => (
            <div key={i}>
              <div
                key={i}
                className="flex w-full items-center justify-between rounded px-4 py-1 text-sm hover:bg-accent"
              >
                <span>{product.name}</span>
                <div className="flex flex-row items-center gap-4">
                  <div>${product.price}</div>
                  <Button
                    className="aspect-square h-6 w-6 p-0"
                    onClick={() => {
                      removeFromCart(product);
                    }}
                  >
                    <Minus size={12} />
                  </Button>
                </div>
              </div>
              <Separator />
            </div>
          ))}
        </ScrollArea>

        {/* Store summary */}
        {/* go over the cart and display this, only one row for each store*/}
        {/* Store name: number of cards: subtotal */}
        {getCartStoreSummary(cart)}
      </CardContent>
      <CardFooter>
        {/* total */}
        <div className="flex w-full justify-between">
          <span>Total</span>
          <span>${cart.reduce((acc, product) => acc + product.price, 0)}</span>
        </div>
      </CardFooter>
    </Card>
  );
};

const ResultSelector = () => {
  const { results, setSelectedResult } = useMultiSearchStore();
  const { getWebsiteName } = useGlobalStore();
  const totalRequested = results.length;

  const getTopWebsites = (results: MultiSearchProduct[]) => {
    const websiteProductSet: { [website: string]: Set<string> } = {};
    const websiteProductPrices: {
      [website: string]: { [productName: string]: number };
    } = {};

    results.forEach((result) => {
      result.results.forEach((product: Product) => {
        if (!websiteProductSet[product.website]) {
          websiteProductSet[product.website] = new Set();
          websiteProductPrices[product.website] = {};
        }
        websiteProductSet[product.website].add(product.name);

        if (!websiteProductPrices[product.website][product.name]) {
          websiteProductPrices[product.website][product.name] = product.price;
        } else {
          websiteProductPrices[product.website][product.name] = Math.min(
            websiteProductPrices[product.website][product.name],
            product.price
          );
        }
      });
    });

    const websiteCount: { [website: string]: number } = {};
    const websiteTotalCost: { [website: string]: number } = {};
    Object.entries(websiteProductSet).forEach(([website, productSet]) => {
      websiteCount[website] = Math.min(productSet.size, totalRequested);
      websiteTotalCost[website] = Object.values(
        websiteProductPrices[website]
      ).reduce((acc, price) => acc + price, 0);
    });

    // Convert the websiteCount object to an array of [website, count] pairs, sort it, and get the top 3
    const sortedWebsites = Object.entries(websiteCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([website, count]) => ({
        website,
        count,
        totalCost: websiteTotalCost[website]
      }));

    return sortedWebsites;
  };
  return (
    <div className="flex flex-col gap-2 text-xs">
      <div className="rounded border border-border bg-popover p-2">
        <div className="p-2 text-sm font-semibold">Top Stores</div>
        {getTopWebsites(results).map((websiteInfo, i) => (
          <div key={i}>
            <div className="flex w-full flex-col justify-between rounded px-4 py-2 text-left text-xs">
              <span className="font-semibold">{`${getWebsiteName(
                websiteInfo.website
              )}`}</span>
              <span>{`${websiteInfo.count}/${totalRequested} results`}</span>
              <span>{`$${websiteInfo.totalCost.toFixed(2)}`}</span>
            </div>
          </div>
        ))}
      </div>
      {results.map((result, i) => (
        <div key={i}>
          <div
            className="flex w-full justify-between rounded px-4 py-2 text-left hover:bg-accent"
            onMouseDown={() => {
              setSelectedResult(result);
            }}
          >
            <span>{result.name}</span>
          </div>
          {i < results.length - 1 && <Separator />}
        </div>
      ))}
    </div>
  );
};

const ResultsTable = ({ results }: { results: any[] }) => {
  const { selectedResult, addToCart, isInCart, removeFromCart } =
    useMultiSearchStore();
  const { getWebsiteName } = useGlobalStore();
  return (
    <ScrollArea className="max-h-[700px] min-h-[100px] w-full rounded-md border bg-popover p-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="hidden w-[100px] sm:table-cell">
              <span className="sr-only">Image</span>
            </TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Set</TableHead>
            <TableHead className="hidden md:table-cell">Condition</TableHead>
            <TableHead className="hidden md:table-cell">Website</TableHead>
            <TableHead className="hidden md:table-cell">Price</TableHead>
            <TableHead>
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {selectedResult?.results.map((result, i) => (
            <TableRow key={i}>
              <TableCell className="hidden sm:table-cell">
                <img
                  alt="Product image"
                  className="aspect-square rounded-md object-cover"
                  height="64"
                  src={result.image}
                  width="64"
                />
              </TableCell>
              <TableCell className="font-medium">{result.name}</TableCell>
              <TableCell className="capitalize">{result.set}</TableCell>
              <TableCell className="hidden md:table-cell">
                {' '}
                <Badge variant="outline">{result.condition}</Badge>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {getWebsiteName(result.website)}
              </TableCell>
              <TableCell className="hidden md:table-cell">
                ${result.price}
              </TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  onClick={() => {
                    isInCart(result)
                      ? removeFromCart(result)
                      : addToCart(result);
                  }}
                >
                  {isInCart(result) ? <Minus /> : <Plus />}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ScrollBar orientation="vertical" />
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

const SearchView = ({
  tcg,
  setTcg,
  searchInput,
  setSearchInput,
  handleSubmit,
  websites,
  selectedWebsites,
  onWebsiteSelect
}: {
  tcg: Tcgs;
  setTcg: (value: Tcgs) => void;
  searchInput: string;
  setSearchInput: (value: string) => void;
  handleSubmit: (tcg: string) => void;
  websites: any[];
  selectedWebsites: any[];
  onWebsiteSelect: (value: any) => void;
}) => {
  const { loading } = useMultiSearchStore();
  const { hasActiveSubscription } = useAuthStore();
  const { adsEnabled } = useGlobalStore();
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (!hasActiveSubscription) {
      const lines = value.split('\n');
      if (lines.length > 3) {
        return;
      }
    }
    setSearchInput(value);
  };
  return (
    <div className="outlined-container flex w-full flex-col gap-4 p-6">
      <div className="flex flex-col gap-4 md:flex-row">
        {/* TCG Select */}
        <Select value={tcg} onValueChange={(value: Tcgs) => setTcg(value)}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="MTG" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Select TCG</SelectLabel>
              <SelectItem value="mtg">MTG</SelectItem>
              <SelectItem value="pokemon">Pokemon</SelectItem>
              <SelectItem value="lorcana">Lorcana</SelectItem>
              <SelectItem value="yugioh">Yu-gi-oh</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* Store Combobox */}
        <WebsiteCombobox
          websites={websites.map((website) => ({
            name: website.name,
            code: website.code
          }))}
          selectedWebsites={selectedWebsites}
          onWebsiteSelect={onWebsiteSelect}
        />
        <div className=" flex-grow "></div>
        {adsEnabled && <PoweredBy size="small" />}
      </div>

      {/* Textarea */}
      <Textarea
        rows={hasActiveSubscription ? 10 : 3}
        className="text-[16px]"
        placeholder={`Enter card names (one per line). Max ${
          hasActiveSubscription ? 100 : 3
        } cards.${
          !hasActiveSubscription
            ? ' \nUpgrade to Pro to search up to 100 cards.'
            : ''
        }`}
        // max 3 lines unless hasActiveSubscription is true
        value={searchInput}
        onChange={handleInputChange}
      />
      <Button
        onClick={() => {
          handleSubmit(tcg);
        }}
        disabled={
          searchInput.length === 0 ||
          loading ||
          (!hasActiveSubscription && searchInput.split('\n').length > 3) ||
          searchInput.split('\n').length > 100
        }
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin" size={16} />
            <span className="ml-2">Loading</span>
          </>
        ) : searchInput.split('\n').length > 100 ? (
          'Too many cards'
        ) : (
          'Search'
        )}
      </Button>
    </div>
  );
};

const MultisearchHead = () => {
  return (
    <Head>
      <title>Multi Search</title>
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
