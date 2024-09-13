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
exports.SuccessResponseDto = exports.ErrorResponseDto = exports.SurveyRouteParamsDto = exports.BasicRouteParamsDto = exports.InputSurvey = exports.ListSurvey = exports.ListResultUserAnswer = exports.ListResultAnswer = exports.InputSurveyResponse = exports.CreateSurveyResponse = exports.DetailSurvey = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class DetailSurvey {
}
exports.DetailSurvey = DetailSurvey;
__decorate([
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], DetailSurvey.prototype, "data", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], DetailSurvey.prototype, "total", void 0);
class CreateSurveyResponse {
}
exports.CreateSurveyResponse = CreateSurveyResponse;
__decorate([
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], CreateSurveyResponse.prototype, "data", void 0);
class InputSurveyResponse {
}
exports.InputSurveyResponse = InputSurveyResponse;
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], InputSurveyResponse.prototype, "surveyItemId", void 0);
class ListResultAnswer {
}
exports.ListResultAnswer = ListResultAnswer;
class ListResultUserAnswer {
}
exports.ListResultUserAnswer = ListResultUserAnswer;
class ListSurvey {
}
exports.ListSurvey = ListSurvey;
__decorate([
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], ListSurvey.prototype, "listSurvey", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ListSurvey.prototype, "total", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", Number)
], ListSurvey.prototype, "itemPerPage", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ListSurvey.prototype, "page", void 0);
class InputSurvey {
}
exports.InputSurvey = InputSurvey;
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], InputSurvey.prototype, "page", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Max)(50),
    __metadata("design:type", Number)
], InputSurvey.prototype, "itemPerPage", void 0);
class BasicRouteParamsDto {
}
exports.BasicRouteParamsDto = BasicRouteParamsDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 12345,
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], BasicRouteParamsDto.prototype, "eventId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 12345,
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], BasicRouteParamsDto.prototype, "moduleId", void 0);
class SurveyRouteParamsDto extends BasicRouteParamsDto {
}
exports.SurveyRouteParamsDto = SurveyRouteParamsDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 12345,
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], SurveyRouteParamsDto.prototype, "surveyId", void 0);
class ErrorResponseDto {
}
exports.ErrorResponseDto = ErrorResponseDto;
class SuccessResponseDto {
}
exports.SuccessResponseDto = SuccessResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Status of the response' }),
    __metadata("design:type", String)
], SuccessResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Message associated with the response' }),
    __metadata("design:type", String)
], SuccessResponseDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Data payload of the response' }),
    __metadata("design:type", Object)
], SuccessResponseDto.prototype, "data", void 0);
//# sourceMappingURL=survey.dto.js.map