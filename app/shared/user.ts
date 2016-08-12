// ユーザ
// （Qiita API v2 のフォーマットを使用: https://qiita.com/api/v2/docs#%E3%83%A6%E3%83%BC%E3%82%B6 ）
export class User {
    // このユーザをフォローしているユーザの数
    followers_count: number;
    
    // ユーザID
    id: string;

    // 所属している組織
    organization: string;

    // 設定しているプロフィール画像のURL
    profile_image_url: string;
}
