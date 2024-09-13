"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateGroupDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_group_dto_1 = require("./create-group.dto");
class UpdateGroupDto extends (0, swagger_1.PartialType)(create_group_dto_1.CreateGroupDto) {
}
exports.UpdateGroupDto = UpdateGroupDto;
//# sourceMappingURL=update-group.dto.js.map