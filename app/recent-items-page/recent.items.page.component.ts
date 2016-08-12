import { Component, AfterViewInit } from '@angular/core';
import { ONS_DIRECTIVES } from 'angular2-onsenui';

import { ItemListComponent } from '../shared/item-list/item.list.component';
import { AppUiManagerService } from '../shared/app.ui.manager.service';
import { QiitaApiService } from '../shared/qiita.api.service';
import { Item } from '../shared/item';

@Component({
    selector: 'ons-page',
    templateUrl: 'app/recent-items-page/recent.items.page.component.html', // Angular 2 と webpack の仕様により相対パス指定は困難
    styleUrls: ['app/recent-items-page/recent.items.page.component.css'],
    directives: [ONS_DIRECTIVES, ItemListComponent] // template 内で使用する directive （component を含む）のリスト
})
export class RecentItemsPageComponent implements AfterViewInit {
    // 画面に表示する投稿のリスト
    items: Item[] = [];

    // 準備中か否か
    isLoading: boolean = true;

    // dependency injector に inject してもらいたいインスタンスをコンストラクタの引数で定義する
    constructor(
        private appUiManagerService: AppUiManagerService,
        private qiitaApiService: QiitaApiService) { // parameter property declaration を使って component のプロパティの宣言と実引数の受け取りを同時に実行
    }

    ngAfterViewInit() {
        this.qiitaApiService.getRecentItemsFromQiita()
        .then(items => {
            this.items = items;
            this.isLoading = false; // 準備中状態を解除する
        })
        .catch(error => {
            this.items = [];
            this.isLoading = false; // 準備中状態を解除する
        });
    }

    openSideMenu() {
        this.appUiManagerService.openSideMenu();
    }
}
