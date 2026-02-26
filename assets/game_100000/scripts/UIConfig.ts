import { CCMLayerID } from "../../cocomat/scripts/CCMLayer/CCMLayerManager";
import { CCMUIConf } from "../../cocomat/scripts/CCMUI/CCMUIManager";

export const GAME_BUNDLE_NAME = "game_100000";

// 界面ID，从1开始
export enum UIID {
    TEST1 = 1,
    TEST2,
    TEST3,
}

// 界面配置
export const UIConfig: { [uiId: number]: CCMUIConf } = {
    [UIID.TEST1]: { prefabPath: "prefabs/test/UITest1", layerId: CCMLayerID.POPUP, preventTouch: true, bundleName: GAME_BUNDLE_NAME },
    [UIID.TEST2]: { prefabPath: "prefabs/test/UITest2", layerId: CCMLayerID.POPUP, preventTouch: true, bundleName: GAME_BUNDLE_NAME },
    [UIID.TEST3]: { prefabPath: "prefabs/test/UITest3", layerId: CCMLayerID.POPUP, preventTouch: true, bundleName: GAME_BUNDLE_NAME },
}