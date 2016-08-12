import { Component, Input, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { ONS_DIRECTIVES } from 'angular2-onsenui';
import { OnsInputElement } from 'angular2-onsenui/onsenui';

import { AppUiManagerService } from '../../shared/app.ui.manager.service';
import { QiitaApiService } from '../../shared/qiita.api.service';
import { Item } from '../item';

@Component({
    selector: 'qr-item-list',
    templateUrl: 'app/shared/item-list/item.list.component.html', // Angular 2 と webpack の仕様により相対パス指定は困難
    styleUrls: ['app/shared/item-list/item.list.component.css'],
    directives: [ONS_DIRECTIVES] // template 内で使用する directive （component を含む）のリスト
})
export class ItemListComponent {
    @Input() items: Item[];

    // dependency injector に inject してもらいたいインスタンスをコンストラクタの引数で定義する
    constructor(private appUiManagerService: AppUiManagerService) { // parameter property declaration を使って component のプロパティの宣言と実引数の受け取りを同時に実行
    }

    // 日時を読みやすい形式（かつ実行環境のタイムゾーンの日時）に変換して返す
    toReadableDateString(dateString: string) {
        return new Date(dateString).toLocaleString();
    }

    // 長すぎる本文をカットする
    toShortBody(body: string) {
        return body.substring(0, 128);
    }

    // 投稿を開く
    openItem(item: Item) {
        window.open(item.url, '_blank');
    }

    showSearchPageAndSearchByTag(tagName: string) {
        this.appUiManagerService.showSearchPageAndSearch('tag:' + tagName);
    }

    showSearchPageAndSearchByUser(userName: string) {
        this.appUiManagerService.showSearchPageAndSearch('user:' + userName);
    }
}
