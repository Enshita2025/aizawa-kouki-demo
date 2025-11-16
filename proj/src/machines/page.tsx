// src/machines/page.tsx
// 機械一覧ページに動画再生機能を追加
// YouTubeリンクではなく、ローカル動画または埋め込み動画を再生します

import React from "react";

export default function MachinesPage() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">機械一覧デモ</h1>
      {/* 動画再生セクション */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">動画デモ</h2>
        {/* YouTube動画をページ内で埋め込み再生 */}
        <div className="aspect-video w-full max-w-2xl mx-auto rounded overflow-hidden shadow">
          {/* srcのURLは任意のYouTube動画IDに変更可能 */}
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="YouTube動画デモ"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </section>
      {/* ...既存の機械一覧表示... */}
    </main>
  );
}
