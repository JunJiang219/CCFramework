/**
 * 界面配置参考，不做实际使用
 */

import { CCMLayerID } from "../CCMLayer/CCMLayerManager";
import { CCMUIConf } from "./CCMUIManager";

// 界面ID，从1开始
enum CCMUIID {
    TEST1 = 1,
    TEST2,
    TEST3,
}

// 界面配置
const CCMUIConfig: { [uiId: number]: CCMUIConf } = {
    [CCMUIID.TEST1]: { prefabPath: "prefabs/test/UITest1", layerId: CCMLayerID.POPUP, preventTouch: true },
    [CCMUIID.TEST2]: { prefabPath: "prefabs/test/UITest2", layerId: CCMLayerID.POPUP, preventTouch: true },
    [CCMUIID.TEST3]: { prefabPath: "prefabs/test/UITest3", layerId: CCMLayerID.POPUP, preventTouch: true },
}