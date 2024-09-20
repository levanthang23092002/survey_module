"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.inputDeleteGroup = exports.inputCreateGroup = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class inputCreateGroup {
    static _OPENAPI_METADATA_FACTORY() {
        return { instanceId: { required: true, type: () => Number } };
    }
}
exports.inputCreateGroup = inputCreateGroup;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], inputCreateGroup.prototype, "instanceId", void 0);
class inputDeleteGroup extends inputCreateGroup {
    static _OPENAPI_METADATA_FACTORY() {
        return { groupId: { required: true, type: () => Number } };
    }
}
exports.inputDeleteGroup = inputDeleteGroup;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], inputDeleteGroup.prototype, "groupId", void 0);
//# sourceMappingURL=create-group.dto.js.map