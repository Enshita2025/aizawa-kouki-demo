// EstimateModal.tsx
// 見積内容を表示し、クリップボードにコピーできるモーダル
// すべて日本語コメント付き

import React from 'react';
import { Machine } from '../../data/mock-machines';

interface EstimateModalProps {
  machine: Machine | null; // 見積対象の管理機
  onClose: () => void; // モーダルを閉じる関数
}

const EstimateModal: React.FC<EstimateModalProps> = ({ machine, onClose }) => {
  if (!machine) return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" style={{ width: '100vw' }}>
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 overflow-y-auto max-h-[90vh]" style={{ width: '100%', maxWidth: 400 }}>
        <div className="flex justify-end mb-2">
          <button className="text-gray-500 hover:text-gray-700 text-2xl font-bold" onClick={onClose} aria-label="閉じる">×</button>
        </div>
        <h3 className="text-xl font-bold mb-2 text-purple-800 text-center">見積内容</h3>
        <div className="bg-gray-100 p-3 rounded text-sm mb-4 text-gray-900">データがありません</div>
      </div>
    </div>
  );

  // 見積内容テキスト生成
  const estimateText =
    `見積書\n` +
    `商品名: ${machine.name}\n` +
    `メーカー: ${machine.maker}\n` +
    `希望販売価格: ¥${machine.price.toLocaleString()} 円\n` +
    `在庫: 在庫あり\n` +
    `仕様:\n` +
    `・エンジン: ${machine.specs.engine}\n` +
    `・出力: ${machine.specs.power}\n` +
    `・重量: ${machine.specs.weight}\n` +
    `・寸法: ${machine.specs.dimension}\n` +
    `・ロータリー幅: ${machine.specs.rotary_width}\n` +
    `・変速方式: ${machine.specs.transmission}\n` +
    `説明: ${machine.description}\n` +
    `発行日: ${new Date().toLocaleDateString()}`;

  // クリップボードにコピーする関数
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(estimateText);
      alert('見積内容をクリップボードにコピーしました');
    } catch {
      alert('コピーに失敗しました');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" style={{ width: '100vw' }}>
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 overflow-y-auto max-h-[90vh]" style={{ width: '100%', maxWidth: 400 }}>
        {/* 閉じるボタン */}
        <div className="flex justify-end mb-2">
          <button className="text-gray-500 hover:text-gray-700 text-2xl font-bold" onClick={onClose} aria-label="閉じる">
            ×
          </button>
        </div>
        {/* 見積内容表示 */}
        <h3 className="text-xl font-bold mb-2 text-purple-800 text-center">見積内容</h3>
  <pre className="bg-gray-100 p-3 rounded text-sm mb-4 whitespace-pre-wrap text-gray-900">{estimateText}</pre>
        {/* クリップボードコピー */}
        <button
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition mb-2"
          onClick={handleCopy}
        >
          見積内容をコピー
        </button>
      </div>
    </div>
  );
};

export default EstimateModal;
