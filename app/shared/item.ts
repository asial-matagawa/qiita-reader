import { User } from './user';

// 投稿
// （Qiita API v2 のフォーマットを使用: https://qiita.com/api/v2/docs#%E6%8A%95%E7%A8%BF ）
export class Item {
    // Markdown形式の本文
    body: string;

    // 投稿の作成日時
    created_at: string;

    // 投稿に付いたタグ一覧
    tags: { name: string, versions: string[] }[];

    // 投稿のタイトル
    title: string;

    // 投稿のURL
    url: string;

    // 投稿者
    user: User;
}
