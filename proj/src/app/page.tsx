"use client";
// ReactのuseState, useEffectをインポート
import { useState, useEffect } from "react";
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
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">販売管理機一覧</h1>

      {/* 管理機一覧テーブル */}
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">名称</th>
            <th className="p-2">メーカー</th>
            <th className="p-2">価格</th>
            <th className="p-2">在庫</th>
          </tr>
        </thead>
        <tbody>
          {machines.map(m => (
            <tr
              key={m.id}
              className="cursor-pointer hover:bg-gray-50"
              onClick={() => setSelected(m)} // 行クリックでモーダルへ
            >
              <td className="p-2">{m.name}</td>
              <td className="p-2">{m.maker}</td>
              <td className="p-2">{m.price?.toLocaleString()} 円</td>
              <td className="p-2">{m.stock ? "在庫あり" : "要確認"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* モーダル表示 */}
      {selected && (
        <MachineModal
          machine={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}
