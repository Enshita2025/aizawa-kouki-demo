// mock-machines.ts
// このファイルは管理機（耕運機・畑作用）のダミーデータを保持します
// Supabase 移植時はこの構造をそのまま利用できます

// Machine 型定義
export type Machine = {
  id: string; // 管理機ID（UUID想定）
  name: string; // 管理機名称
  maker: string; // メーカー名
  price: number; // 価格
  stock: boolean; // 在庫有無
  thumbnail_url: string; // サムネイル画像URL
  video_url: string; // 動画URL
  description: string; // 説明文
  specs: {
    engine: string; // エンジン型式
    power: string; // 出力
    weight: string; // 重量
    dimension: string; // 寸法
    rotary_width: string; // ロータリー幅
    transmission: string; // 変速方式
  };
  created_at: string; // 作成日時（ISO8601）
};

// ダミーデータ配列
export const mockMachines: Machine[] = [
  {
    id: '1e7a9b2c-1d2e-4f3a-9c4b-123456789abc', // UUID
    name: 'スーパー耕運機A', // 名称
    maker: 'ヤンマー', // メーカー
    price: 350000, // 価格
  stock: true, // 在庫（常にあり）
    thumbnail_url: '/images/tractorA.jpg', // サムネイル
  video_url: 'https://www.youtube.com/embed/pMqriy7wNiI', // 動画
    description: '小型で扱いやすい耕運機。家庭菜園にも最適です。', // 説明
    specs: {
      engine: '空冷4サイクル', // エンジン
      power: '5.5馬力', // 出力
      weight: '60kg', // 重量
      dimension: '1200x600x800mm', // 寸法
      rotary_width: '500mm', // ロータリー幅
      transmission: '前進2段・後進1段', // 変速
    },
    created_at: '2025-11-01T10:00:00Z', // 作成日時
  },
  {
    id: '2b8c7d4e-2f3a-4b5c-8d7e-abcdef123456',
    name: '畑作マスターB',
    maker: 'クボタ',
    price: 480000,
  stock: true,
    thumbnail_url: '/images/tractorB.jpg',
  video_url: 'https://www.youtube.com/embed/KeXu9y1Og0Q',
    description: 'パワフルなエンジンで広い畑も楽々耕せます。',
    specs: {
      engine: '水冷ディーゼル',
      power: '8.0馬力',
      weight: '85kg',
      dimension: '1400x700x900mm',
      rotary_width: '600mm',
      transmission: '前進3段・後進1段',
    },
    created_at: '2025-11-02T11:00:00Z',
  },
  {
    id: '3c9d8e5f-3g4h-5i6j-9k0l-789abc123def',
    name: 'ロータリーキングC',
    maker: '三菱農機',
    price: 520000,
  stock: true,
    thumbnail_url: '/images/tractorC.jpg',
  video_url: 'https://www.youtube.com/embed/ZBjl59P8rak',
    description: '高耐久ロータリー搭載。プロ農家向けモデル。',
    specs: {
      engine: '空冷2サイクル',
      power: '6.0馬力',
      weight: '70kg',
      dimension: '1300x650x850mm',
      rotary_width: '550mm',
      transmission: '前進2段・後進2段',
    },
    created_at: '2025-11-03T12:00:00Z',
  },
];
