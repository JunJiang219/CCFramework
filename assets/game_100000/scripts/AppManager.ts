import { _decorator, Component, view } from 'cc';
import CCMLogger, { CCMLogLevel } from '../../cocomat/scripts/CCMLog/CCMLogger';
import CCMAdapter, { CCMDeviceOrientation } from '../../cocomat/scripts/CCMAdapter/CCMAdapter';
import { CCMEventManager } from '../../cocomat/scripts/CCMEvent/CCMEventManager';
import { CCMEvent } from '../../cocomat/scripts/CCMEvent/CCMEvent';
import { CCMResManager } from '../../cocomat/scripts/CCMRes/CCMResManager';
import { DEBUG } from 'cc/env';
import { CCMUIManager } from '../../cocomat/scripts/CCMUI/CCMUIManager';
import { UIConfig, UIID } from './UIConfig';
const { ccclass, property } = _decorator;

const EVENT_CANVAS_RESIZE = "canvas-resize";

@ccclass('AppManager')
export class AppManager extends Component {
    start() {
        this.appInit();
    }

    protected onDestroy(): void {
        this.unRegisterEvent();
    }

    update(deltaTime: number) {
        CCMResManager.getInstance().update(deltaTime);
    }

    appInit() {
        // 正式游戏根据环境修改日志等级
        CCMLogger.getInstance().setLogLevel(CCMLogLevel.TRACE);

        CCMLogger.getInstance().log("AppManager appInit");
        CCMAdapter.getInstance().deviceOrientation = CCMDeviceOrientation.AUTO;
        this.registerEvent();
        CCMAdapter.getInstance().resize();  // 第一次适配，主动调用

        CCMUIManager.getInstance().initUIConf(UIConfig); // 初始化UI配置

        if (DEBUG) {
            // 测试用
            window['uiMgr'] = CCMUIManager.getInstance();
        }

        CCMUIManager.getInstance().open(UIID.TEST1);
        CCMUIManager.getInstance().open(UIID.TEST2);
    }

    private registerEvent() {
        view.on(EVENT_CANVAS_RESIZE, this.onResize, this);
        CCMEventManager.getInstance().addEventListener(CCMEvent.ORIENTATION_CHANGE, this.onOrientationChange, this);
    }

    private unRegisterEvent() {
        view.off(EVENT_CANVAS_RESIZE, this.onResize, this);
        CCMEventManager.getInstance().removeEventListener(CCMEvent.ORIENTATION_CHANGE, this.onOrientationChange, this);
    }

    private onResize() {
        CCMLogger.getInstance().log("AppManager onResize");
        CCMAdapter.getInstance().resize();
    }

    private onOrientationChange(eventName: string, isLandscape: boolean) {
        CCMLogger.getInstance().log("AppManager onOrientationChange", isLandscape);
    }
}


