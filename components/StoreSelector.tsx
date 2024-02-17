import React from "react";
import { useStore } from "@/stores/store";

type Props = {};

export default function StoreSelector({}: Props) {
  const { websites, multiSearchSelectedWebsites, toggleMultiSearchSelectedWebsites,toggleMultiSearchSelectAllStores } = useStore();

  return (
    <div className="flex flex-col">
      <div className="grid w-full grid-cols-2 md:grid-cols-3 rounded-md p-2 outline outline-1 outline-zinc-800 backdrop-blur-sm backdrop-brightness-75">
        {websites.sort(
          (a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
          ).map((website, index) => {
          return (
            <div
              key={index}
              
              className={`m-1 flex items-center rounded-md p-2 accent-pink-700 bg-zinc-900 hover:bg-zinc-800`}
              onClick={() => {
                toggleMultiSearchSelectedWebsites(website.name);
              }}
            >

              <div
                className={`

                    h-2 w-2
                    mx-1
                    rounded-full
                    ${
                      multiSearchSelectedWebsites.includes(website.name)
                        ? "bg-pink-600"
                        : "bg-zinc-600"
                    }
                `}
              />
              <label className="ml-2 text-xs text-left truncate">{website.name}</label>
            </div>
          );
        })}
      </div>

      <button
        className="
        bg-pink-600
        hover:bg-pink-700
        text-white
        font-bold
        py-2
        px-4
        rounded
        focus:outline-none
        focus:shadow-outline
        my-4
        mx-auto
      "
        onClick={() => {
          // let allSelected = {}
          // let noneSelected = {}
          // websites.forEach((website) => {
          //     allSelected[website.code] = true
          //     noneSelected[website.code] = false
          // })
          // if (JSON.stringify(store.websites) === JSON.stringify(allSelected)) {
          //     store.setWebsites(noneSelected)
          // } else {
          //     store.setWebsites(allSelected)
          // }
          toggleMultiSearchSelectAllStores()
        }}
      >
        Select All
      </button>
    </div>
  );
}
