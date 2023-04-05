import {Component, Type} from '@wonderlandengine/api';

/**
 * Set player height for a Y-offset above the ground for
 * 'local' and 'viewer' reference spaces.
 */
export class PlayerHeight extends Component {
    static TypeName = 'player-height';
    static Properties = {
        height: {type: Type.Float, default: 1.75},
    };

    init() {
        this.engine.onXRSessionStart.push(this.onXRSessionStart.bind(this));
        this.engine.onXRSessionEnd.push(this.onXRSessionEnd.bind(this));
    }

    start() {
        this.object.resetTranslationRotation();
        this.object.translate([0.0, this.height, 0.0]);
    }

    onXRSessionStart() {
        const refSpaceType = this.engine.xrReferenceSpaceType;
        if (!['local', 'viewer'].includes(refSpaceType)) {
            this.object.resetTranslationRotation();
        }
    }

    onXRSessionEnd() {
        const refSpaceType = this.engine.xrReferenceSpaceType;
        if (!['local', 'viewer'].includes(refSpaceType)) {
            this.object.resetTranslationRotation();
            this.object.translate([0.0, this.height, 0.0]);
        }
    }
}
