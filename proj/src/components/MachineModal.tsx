// windowオブジェクトにjspdf型拡張
declare global {
  interface Window {
    jspdf?: any;
  }
}
// jsPDFライブラリをインポート（CDN利用）
// ※本番ではnpmでインストール推奨
const loadJsPDF = async () => {
  if (!window.jspdf) {
    await new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
      script.onload = resolve;
      document.body.appendChild(script);
    });
  }
  return window.jspdf.jsPDF;
};
        // （この部分は削除します。PDF出力ボタンはMachineModalコンポーネント内に既に存在します）
// MachineModal.tsx
// 管理機詳細を表示するモーダルコンポーネント
// すべての行に日本語コメントを記載しています

import React, { useState } from 'react'; // Reactインポート
import EstimateModal from './EstimateModal'; // 見積内容表示用モーダル
import { Machine } from '../../data/mock-machines'; // Machine型インポート

// モーダルのprops型定義
interface MachineModalProps {
  machine: Machine | null; // 選択中の管理機データ
  onClose: () => void; // モーダルを閉じる関数
}

// モーダルコンポーネント本体
const MachineModal: React.FC<MachineModalProps> = ({ machine, onClose }) => {
  // machineがnullの場合は何も表示しない
  const [showEstimate, setShowEstimate] = useState(false); // 見積モーダル表示状態
  if (!machine) return null;

  return (
    // モーダルの背景（オーバーレイ）
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-2" style={{ width: '100vw' }}>
      {/* モーダル本体（スマホ対応: 横幅100%、余白・フォントサイズ調整） */}
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-4 sm:p-6 overflow-y-auto max-h-[90vh]" style={{ width: '100%', maxWidth: 400 }}>
        {/* 閉じるボタン（上部に常時表示） */}
        <div className="flex justify-end mb-2">
          <button className="text-gray-500 hover:text-gray-700 text-2xl font-bold px-2 py-1 sm:px-3 sm:py-2" onClick={onClose} aria-label="閉じる">
            ×
          </button>
        </div>
  {/* 商品名（テキストのみ大きく表示） */}
  {/* 商品名（黒字で大きく中央表示） */}
  <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center text-black break-words">{machine.name}</h2>
  {/* メーカー名（濃い色・太字） */}
  <p className="text-xs sm:text-sm font-semibold text-green-800 mb-1 break-words">メーカー: {machine.maker}</p>
  {/* 希望販売価格（濃い色・太字） */}
  <p className="text-base sm:text-lg font-bold text-red-700 mb-1">希望販売価格: ¥{machine.price.toLocaleString()} 円</p>
  {/* 在庫（常に在庫あり表示） */}
  <p className="text-xs sm:text-sm font-bold text-blue-700 mb-2">在庫あり</p>
        {/* 動画埋め込み */}
        <div className="mb-4">
          <iframe
            src={machine.video_url}
            title={machine.name + '動画'}
            className="w-full h-32 sm:h-40 rounded"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        {/* 仕様（specs） */}
        <div className="mb-4">
          <h3 className="text-sm sm:text-base font-bold text-purple-800 mb-1">仕様</h3>
          <ul className="text-xs sm:text-sm font-semibold text-gray-900 break-words">
            <li>エンジン: {machine.specs.engine}</li>
            <li>出力: {machine.specs.power}</li>
            <li>重量: {machine.specs.weight}</li>
            <li>寸法: {machine.specs.dimension}</li>
            <li>ロータリー幅: {machine.specs.rotary_width}</li>
            <li>変速方式: {machine.specs.transmission}</li>
          </ul>
        </div>
        {/* 説明文 */}
  <p className="mb-4 text-xs sm:text-base font-bold text-orange-800 break-words">{machine.description}</p>
        {/* 見積書PDF出力ボタン（下部に追加） */}
        {/* 見積内容を別モーダルで表示し、コピーできるボタン */}
        <button
          className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition mb-2 text-base sm:text-lg"
          onClick={() => setShowEstimate(true)}
        >
          見積内容を表示・コピー
        </button>
        {/* 見積内容表示用モーダル */}
        {showEstimate && (
          <EstimateModal machine={machine} onClose={() => setShowEstimate(false)} />
        )}
        {/* お問い合わせボタン */}
        {/* お問い合わせボタン：新規メール起動（タイトル・本文自動挿入） */}
        <button
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition text-base sm:text-lg"
          onClick={() => {
            if (!machine) return;
            // 見積内容テキスト生成
            const body =
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
            const subject = encodeURIComponent('管理機購入問い合わせ');
            const mailBody = encodeURIComponent(body);
            window.location.href = `mailto:?subject=${subject}&body=${mailBody}`;
          }}
        >
          お問い合わせ
        </button>
      </div>
    </div>
  );
};

export default MachineModal; // コンポーネントエクスポート
