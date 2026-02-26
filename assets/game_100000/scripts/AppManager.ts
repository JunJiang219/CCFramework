import { _decorator, Component, Node, screen, view } from 'cc';
import CCMLogger from '../../cocomat/scripts/CCMLog/CCMLogger';
import CCMLayerManager, { CCMLayerID } from '../../cocomat/scripts/CCMLayer/CCMLayerManager';
const { ccclass, property } = _decorator;

@ccclass('AppManager')
export class AppManager extends Component {
    start() {
        this.appInit();
    }

    update(deltaTime: number) {

    }

    appInit() {
        CCMLogger.getInstance().log("AppManager appInit");
        CCMLayerManager.getInstance().getLayer(CCMLayerID.GAME);
    }
}


