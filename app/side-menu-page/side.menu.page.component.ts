import { Component, Type } from '@angular/core';

import { AppUiManagerService } from '../shared/app.ui.manager.service';
import { Tabs } from '../shared/tabs';
import { RecentItemsPageComponent } from '../recent-items-page/recent.items.page.component';

@Component({
    selector: 'ons-page',
    templateUrl: 'app/side-menu-page/side.menu.page.component.html' // Angular 2 と webpack の仕様により相対パス指定は困難
})
export class SideMenuPageComponent {
    // dependency injector に inject してもらいたいインスタンスをコンストラクタの引数で定義する
    constructor(private appUiManagerService: AppUiManagerService) { // parameter property declaration を使って component のプロパティの宣言と実引数の受け取りを同時に実行
    }

    showRecentItemsPage() {
        this.appUiManagerService.switchTab(Tabs.RECENT_ITEMS_PAGE);
        this.appUiManagerService.closeSideMenu();
    }

    showSearchPage() {
        this.appUiManagerService.switchTab(Tabs.SEARCH_PAGE);
        this.appUiManagerService.closeSideMenu();
    }

    showAboutPage() {
        this.appUiManagerService.switchTab(Tabs.ABOUT_PAGE);
        this.appUiManagerService.closeSideMenu();
    }
}
