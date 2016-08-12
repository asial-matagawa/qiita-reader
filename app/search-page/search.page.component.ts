import { Component, ViewChild, ElementRef } from '@angular/core';
import { ONS_DIRECTIVES } from 'angular2-onsenui';
import { OnsInputElement } from 'angular2-onsenui/onsenui';

import { ItemListComponent } from '../shared/item-list/item.list.component';
import { AppUiManagerService } from '../shared/app.ui.manager.service';
import { QiitaApiService } from '../shared/qiita.api.service';
import { Item } from '../shared/item';

@Component({
    selector: 'ons-page',
    templateUrl: 'app/search-page/search.page.component.html', // Angular 2 と webpack の仕様により相対パス指定は困難
    styleUrls: ['app/search-page/search.page.component.css'],
    directives: [ONS_DIRECTIVES, ItemListComponent] // template 内で使用する directive （component を含む）のリスト
})
export class SearchPageComponent {
    // 画面に表示する投稿のリスト
    items: Item[] = [];

    // 準備中か否か
    isLoading: boolean = false;

    // (1) template 内に含まれる DOM 要素、
    // または
    // (2) その DOM 要素を管理している directive インスタンス（※ component も directive の一種）
    // を操作するためのプロパティ
    @ViewChild('queryTextField') queryTextFieldElementRef: ElementRef;

    // dependency injector に inject してもらいたいインスタンスをコンストラクタの引数で定義する
    constructor(
        private appUiManagerService: AppUiManagerService,
        private qiitaApiService: QiitaApiService) { // parameter property declaration を使って component のプロパティの宣言と実引数の受け取りを同時に実行
    }

    openSideMenu() {
        this.appUiManagerService.openSideMenu();
    }

    setQueryAndSearch(query: string) {
       (<OnsInputElement>this.queryTextFieldElementRef.nativeElement).value = query;
       this.search(query);
    }

    search(query: string) {
        this.isLoading = true; // 準備中状態に移行する
        this.qiitaApiService.getItemsFromQiitaWithQuery(query)
        .then(items => {
            this.items = items;
            this.isLoading = false; // 準備中状態を解除する
        })
        .catch(error => {
            this.items = [];
            this.isLoading = false; // 準備中状態を解除する
        });
    }
}
