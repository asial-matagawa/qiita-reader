import { Injectable, Type, ElementRef } from '@angular/core';
import { OnsSplitterSide, OnsSplitterContent, OnsTabbar, OnsTab } from 'angular2-onsenui';
import { OnsSplitterSideElement, OnsSplitterContentElement, OnsTabbarElement } from 'angular2-onsenui/onsenui'; // DOM ツリーに直接アクセスする場合はアクセス対象ノードの型定義を import しておく

import { Tabs } from './tabs';
import { AppComponent } from '../app.component';
import { SearchPageComponent } from '../search-page/search.page.component';

@Injectable()
export class AppUiManagerService {
    // AppComponent インスタンスにアクセスするためのプロパティ
    appComponent: AppComponent;

    // サイドメニューを開く
    openSideMenu() {
        // ons-splitter-side 要素にアクセスして open メソッドを実行
        (<OnsSplitterSideElement>this.appComponent.splitterSide.element).open();
    }

    // サイドメニューを閉じる
    closeSideMenu() {
        // ons-splitter-side 要素にアクセスして close メソッドを実行
        (<OnsSplitterSideElement>this.appComponent.splitterSide.element).close();
    }

    // タブを切り替える
    switchTab(tabIndex: number) {
        (<OnsTabbarElement>this.appComponent.tabbarElementRef.nativeElement).setActiveTab(tabIndex);
    }

    showSearchPageAndSearch(query: string) {
        this.switchTab(Tabs.SEARCH_PAGE);
        (<SearchPageComponent><any>this.appComponent.tabQueryList.toArray()[Tabs.SEARCH_PAGE]._pageComponent._hostElement.component).setQueryAndSearch(query);
    }
}
