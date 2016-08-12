import { Component, ViewChild, ViewChildren, QueryList, Type, AfterViewInit, ElementRef } from '@angular/core';
import { ONS_DIRECTIVES, OnsSplitterSide, OnsSplitterContent, OnsTabbar, OnsTab } from 'angular2-onsenui';
import { OnsTabbarElement } from 'angular2-onsenui/onsenui';

import { AppUiManagerService } from './shared/app.ui.manager.service';
import { QiitaApiService } from './shared/qiita.api.service';
import { Tabs } from './shared/tabs';
import { SideMenuPageComponent } from './side-menu-page/side.menu.page.component';
import { RecentItemsPageComponent } from './recent-items-page/recent.items.page.component';
import { SearchPageComponent } from './search-page/search.page.component';
import { AboutPageComponent } from './about-page/about.page.component';

@Component({
    selector: 'qr-app',
    templateUrl: 'app/app.component.html', // Angular 2 と webpack の仕様により相対パス指定は困難
    directives: [ONS_DIRECTIVES], // template 内で使用する directive （component を含む）のリスト
    providers: [AppUiManagerService, QiitaApiService] // injector に service provider を登録（register）する
})
export class AppComponent implements AfterViewInit {
    // (1) template 内に含まれる DOM 要素、
    // または
    // (2) その DOM 要素を管理している directive インスタンス（※ component も directive の一種）
    // を操作するためのプロパティ群
    @ViewChild(OnsSplitterSide) splitterSide: OnsSplitterSide;
    @ViewChild(OnsSplitterContent) splitterContent: OnsSplitterContent;
    @ViewChild('tabbar') tabbarElementRef: ElementRef; // Onsen UI - Angular 2 binding 側の修正が必要（OnsTabbar#element が必要）
    @ViewChildren(OnsTab) tabQueryList: QueryList<OnsTab>;

    // dependency injector に inject してもらいたいインスタンスをコンストラクタの引数で定義する
    constructor(private appUiManagerService: AppUiManagerService) { // parameter property declaration を使って component のプロパティの宣言と実引数の受け取りを同時に実行
        // AppComponent インスタンスを AppUiManagerService インスタンスに渡す
        appUiManagerService.appComponent = this;
    }

    ngAfterViewInit() {
        // サイドバーに component を割り当て
        this.splitterSide.page = SideMenuPageComponent;

        // タブバーの各タブに component を割り当て
        this.tabQueryList.toArray()[Tabs.RECENT_ITEMS_PAGE].page = RecentItemsPageComponent;
        this.tabQueryList.toArray()[Tabs.SEARCH_PAGE].page = SearchPageComponent;
        this.tabQueryList.toArray()[Tabs.ABOUT_PAGE].page = AboutPageComponent;

        // タブバーのバー部分を非表示にする
        (<OnsTabbarElement>this.tabbarElementRef.nativeElement).setTabbarVisibility(false);
    }
}
