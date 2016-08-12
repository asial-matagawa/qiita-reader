import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Item } from './item';

@Injectable()
export class QiitaApiService {
    // dependency injector に inject してもらいたいインスタンスをコンストラクタの引数で定義する
    constructor(private http: Http) { // parameter property declaration を使って component のプロパティの宣言と実引数の受け取りを同時に実行
    }

    // Qiita API にアクセスして最近の投稿の一覧を取得する
    getRecentItemsFromQiita(): Promise<Item[]>{
        return this.getItemsFromQiitaImpl(
            'https://qiita.com/api/v2/items?page=1&per_page=20'
        );
    }

    // Qiita API にアクセスして指定したクエリにヒットする投稿の一覧を取得する
    getItemsFromQiitaWithQuery(query: string): Promise<Item[]>{
        return this.getItemsFromQiitaImpl(
            'https://qiita.com/api/v2/items?page=1&per_page=20&query=' + encodeURIComponent(query)
        );
    }

    private getItemsFromQiitaImpl(url: string): Promise<Item[]> {
        return this.http.get(url)
                        .toPromise()
                        .then(response => response.json())
                        .catch(error => {
                            console.error('An error occurred', error);
                            return Promise.reject(error.message || error);
                        });
    }
}
