"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const admin_bro_1 = require("admin-bro");
class ExtendedRecord extends admin_bro_1.BaseRecord {
    constructor(instance, resource) {
        super(instance, resource);
        this._instance = null;
        this._customTitle = null;
        if (instance)
            this._instance = instance;
    }
    setTitle(value) {
        this._customTitle = value;
    }
    title() {
        if (this._customTitle != null)
            return this._customTitle;
        return super.title() || "";
    }
    toJSON(currentAdmin) {
        const obj = super.toJSON(currentAdmin);
        obj.title = this.title(); // sorry but, .toJSON() doesn't take title from .title()
        if (this._instance) {
            // patched strange objects ({"key.deepKey": 123}) to normal JSON.
            obj.params = {};
            for (const n in this._instance) {
                const value = this._instance[n];
                const property = this.resource.property(n);
                if (property && property.type) {
                    const type = property.type();
                    if (type == "mixed")
                        obj.params[n] = JSON.stringify(value);
                    else
                        obj.params[n] = value;
                }
            }
        }
        return obj;
    }
}
exports.ExtendedRecord = ExtendedRecord;
//# sourceMappingURL=ExtendedRecord.js.map