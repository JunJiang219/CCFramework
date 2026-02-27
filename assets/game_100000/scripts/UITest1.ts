import { _decorator, Component, Node, Sprite, SpriteFrame, UITransform } from 'cc';
import { CCMUIView } from '../../cocomat/scripts/CCMUI/CCMUIView';
import { GAME_BUNDLE_NAME } from './UIConfig';
const { ccclass, property } = _decorator;

@ccclass('UITest1')
export class UITest1 extends CCMUIView {
    start() {
        this.load(GAME_BUNDLE_NAME, "textures/singleColor/spriteFrame", SpriteFrame, (err: Error, asset: SpriteFrame) => {
            if (err) {
                console.error(err);
                return;
            }
            
            let node = new Node();
            node.parent = this.node;
            node.setPosition(0, 0);
            node.setSiblingIndex(0);
            let transform = node.addComponent(UITransform);
            let sprite = node.addComponent(Sprite);
            sprite.spriteFrame = asset;
            sprite.sizeMode = Sprite.SizeMode.CUSTOM;
            transform.setContentSize(100, 100);
        });
    }

    update(deltaTime: number) {
        
    }
}


