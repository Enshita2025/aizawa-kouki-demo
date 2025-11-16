// src/machines/page.tsx
// 機械一覧ページに動画再生機能を追加
// YouTubeリンクではなく、ローカル動画または埋め込み動画を再生します

import React from "react";
import { mockMachines } from "../../data/mock-machines";

export default function MachinesPage() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">機械一覧デモ</h1>
      {/* 機械一覧と動画埋め込み表示 */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">機械一覧と動画</h2>
        <div className="grid gap-8 md:grid-cols-2">
          {mockMachines.map((machine) => (
            <div key={machine.id} className="bg-white rounded-lg shadow p-4">
              <h3 className="text-lg font-bold mb-2 text-center">{machine.name}</h3>
              <p className="text-sm font-semibold text-green-800 mb-1">メーカー: {machine.maker}</p>
              <p className="text-base font-bold text-red-700 mb-1">希望販売価格: ¥{machine.price.toLocaleString()} 円</p>
              {/* 動画埋め込み（YouTubeパラメータ付き） */}
              <div className="w-full min-h-96 sm:min-h-[500px] mb-2 rounded overflow-hidden shadow">
                {/* min-h-96: 24rem(384px), sm:min-h-[500px]: 500px スマホ・PC両対応でさらに高さを広げる */}
                <iframe
                  src={machine.video_url + '?modestbranding=1&rel=0&showinfo=0'}
                  title={machine.name + '動画'}
                  className="w-full h-96 sm:h-[500px] rounded"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <p className="text-xs font-bold text-orange-800 mb-2">{machine.description}</p>
            </div>
          ))}
        </div>
      </section>
      {/* ...既存の機械一覧表示... */}
    </main>
  );
}
