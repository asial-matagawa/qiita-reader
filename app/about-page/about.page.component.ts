import { Component } from '@angular/core';
import { ONS_DIRECTIVES } from 'angular2-onsenui';

import { AppUiManagerService } from '../shared/app.ui.manager.service';

@Component({
    selector: 'ons-page',
    templateUrl: 'app/about-page/about.page.component.html', // Angular 2 と webpack の仕様により相対パス指定は困難
    styleUrls: ['app/about-page/about.page.component.css'],
    directives: [ONS_DIRECTIVES] // template 内で使用する directive （component を含む）のリスト
})
export class AboutPageComponent {
    // dependency injector に inject してもらいたいインスタンスをコンストラクタの引数で定義する
    constructor(private appUiManagerService: AppUiManagerService) { // parameter property declaration を使って component のプロパティの宣言と実引数の受け取りを同時に実行
    }
    
    openSideMenu() {
        this.appUiManagerService.openSideMenu();
    }
}
