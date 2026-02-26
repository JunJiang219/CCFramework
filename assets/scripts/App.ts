import { _decorator, AssetManager, assetManager, Component, director, instantiate, Prefab } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('App')
export class App extends Component {
    start() {
        assetManager.loadBundle("cocomat", (err: Error, bundle: AssetManager.Bundle) => {
            if (err) {
                console.error(err);
                return;
            }
            assetManager.loadBundle("game_100000", (err: Error, bundle: AssetManager.Bundle) => {
                if (err) {
                    console.error(err);
                    return;
                }
                // 加载管理节点作为常驻节点
                bundle.load("prefabs/AppManager", Prefab, (err: Error, prefab: Prefab) => {
                    if (err) {
                        console.error(err);
                        return;
                    }

                    let appManager = instantiate(prefab);
                    director.addPersistRootNode(appManager);
                });
            });
        });
    }

    update(deltaTime: number) {
        
    }
}


