// page.tsx
// 管理機一覧ページ
// すべての行に日本語コメントを記載しています

import React, { useEffect, useState } from 'react'; // Reactとフックをインポート
import Image from 'next/image'; // 画像最適化コンポーネント
import MachineModal from '@/components/MachineModal'; // モーダルコンポーネントをインポート
import { Machine } from '../../data/mock-machines'; // Machine型をインポート

// 管理機一覧ページ本体
const MachinesPage: React.FC = () => {
  // 管理機データの状態
  const [machines, setMachines] = useState<Machine[]>([]); // 管理機一覧
  const [selected, setSelected] = useState<Machine | null>(null); // 選択中の管理機

  // APIから管理機一覧を取得
  useEffect(() => {
    // fetchでAPIを呼び出し
    fetch('/api/machines')
      .then((res) => res.json())
      .then((data) => setMachines(data)); // データをセット
  }, []);

  // 管理機一覧の表示
  return (
  <div className="w-full min-h-screen bg-white max-w-3xl mx-auto p-2 sm:p-4" style={{ width: '100%' }}>
  {/* タイトル（スマホ対応・中央・余白調整） */}
  <h1 className="text-xl sm:text-2xl font-bold mb-3 text-center text-gray-900">販売管理機一覧</h1>
  {/* タイトル下に画像（中央・スマホ対応） */}
  {/* タイトル下に画像（next/imageで最適化・Vercel対応） */}
  <div className="flex justify-center mb-6">
    <Image
      src="/images/sample.png"
      alt="サンプル画像"
      width={256} // w-64相当
      height={160} // 適宜調整
      className="rounded shadow"
      priority
    />
  </div>
  {/* 管理機カード一覧（スマホ対応: 1列→2列, 余白調整） */}
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {machines.map((machine) => (
          // カードクリックでモーダル表示
          <div
            key={machine.id}
            className="bg-white rounded shadow p-3 sm:p-4 cursor-pointer hover:bg-green-50 transition border flex flex-col"
            onClick={() => setSelected(machine)}
          >
            {/* 動画埋め込み（YouTube等） */}
            <div className="w-full h-24 sm:h-32 mb-2">
              <iframe
                src={machine.video_url}
                title={machine.name + '動画'}
                className="w-full h-full rounded"
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
};

export default MachinesPage; // ページコンポーネントエクスポート
