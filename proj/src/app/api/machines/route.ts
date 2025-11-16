// route.ts
// このファイルは管理機一覧APIのルートです
// mockデータを返却し、将来Supabaseに差し替え可能な構造です

import { NextResponse } from 'next/server'; // Next.jsのAPIレスポンス用
import { mockMachines } from '../../../../data/mock-machines'; // ダミーデータをインポート

// GETリクエスト時のレスポンス処理
export async function GET() {
  // mockデータをJSONで返却
  // Supabase移植時はここを supabase.from('machines').select(*) に変更するだけ
  return NextResponse.json(mockMachines);
}
