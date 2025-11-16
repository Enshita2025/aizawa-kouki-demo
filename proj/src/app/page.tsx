"use client";
// ReactのuseState, useEffectをインポート
import { useState, useEffect } from "react";
import Image from "next/image";
// 管理機型をインポート
import { Machine } from "../../data/mock-machines";
// 管理機詳細モーダルをインポート
import MachineModal from "../components/MachineModal";


// トップページ（管理機一覧表示）
export default function Home() {
  // 管理機一覧データの状態
  const [machines, setMachines] = useState<Machine[]>([]); // 管理機一覧
  const [selected, setSelected] = useState<Machine | null>(null); // 選択中の管理機

  // 一覧データを取得（日本語コメント）
  useEffect(() => {
    // APIから管理機一覧を取得
    fetch("/api/machines")
      .then(res => res.json())
      .then(data => setMachines(data));
  }, []);

  return (
    <div className="w-full min-h-screen bg-white max-w-3xl mx-auto p-2 sm:p-4" style={{ width: '100%' }}>
      {/* タイトル（スマホ対応・中央・余白調整） */}
      <h1 className="text-xl sm:text-2xl font-bold mb-3 text-center text-gray-900">販売管理機一覧</h1>
      {/* タイトル下に画像（next/imageで最適化・Vercel対応） */}
      <div className="flex justify-center mb-6">
        <Image
          src="/images/sample.png"
          alt="サンプル画像"
          width={256}
          height={160}
          className="rounded shadow"
          priority
        />
      </div>
      {/* 管理機カード一覧（サムネイル廃止・動画埋め込み） */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {machines.map((machine) => (
          // カードクリックでモーダル表示
          <div
            key={machine.id}
            className="bg-white rounded shadow p-3 sm:p-4 cursor-pointer hover:bg-green-50 transition border flex flex-col"
            onClick={() => setSelected(machine)}
          >
            {/* 動画埋め込み（YouTube等）: 高さを大きくし、ページ内再生のみ */}
            <div className="w-full min-h-96 sm:min-h-[500px] mb-2 rounded overflow-hidden shadow">
              <iframe
                src={machine.video_url + '?rel=0&modestbranding=1&showinfo=0&controls=1'}
                title={machine.name + '動画'}
                className="w-full h-96 sm:h-[500px] rounded"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            {/* 名称・メーカー・価格 */}
            <h2 className="text-base sm:text-lg font-bold mb-1 text-gray-900 break-words">{machine.name}</h2>
            <p className="text-xs sm:text-sm text-gray-600 mb-1 break-words">メーカー: {machine.maker}</p>
            <p className="text-xs sm:text-sm text-gray-600 mb-1">価格: ¥{machine.price.toLocaleString()}</p>
            {/* 在庫表示（成約済みは強調: 赤太字） */}
            {machine.stock ? (
              <p className="text-xs font-bold text-blue-700 mb-1">在庫あり</p>
            ) : (
              <p className="text-xs font-bold text-red-700 mb-1 animate-pulse">成約済み</p>
            )}
          </div>
        ))}
      </div>
      {/* モーダル表示 */}
      <MachineModal machine={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
