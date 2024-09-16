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
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class DetailSurvey {
    static _OPENAPI_METADATA_FACTORY() {
        return { data: { required: true, type: () => [require("../entities/survey-item.entity").SurveyItemEntity] }, total: { required: true, type: () => Number } };
    }
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
    static _OPENAPI_METADATA_FACTORY() {
        return { data: { required: true, type: () => [require("./survey.dto").InputSurveyResponse] } };
    }
}
exports.CreateSurveyResponse = CreateSurveyResponse;
__decorate([
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], CreateSurveyResponse.prototype, "data", void 0);
class InputSurveyResponse {
    static _OPENAPI_METADATA_FACTORY() {
        return { surveyItemId: { required: true, type: () => Number }, answer: { required: true, type: () => String } };
    }
}
exports.InputSurveyResponse = InputSurveyResponse;
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], InputSurveyResponse.prototype, "surveyItemId", void 0);
class ListResultAnswer {
    static _OPENAPI_METADATA_FACTORY() {
        return { total: { required: true, type: () => Number }, listSurvey: { required: true, type: () => [require("./survey.dto").ListResultUserAnswer] } };
    }
}
exports.ListResultAnswer = ListResultAnswer;
class ListResultUserAnswer {
    static _OPENAPI_METADATA_FACTORY() {
        return { userId: { required: true, type: () => Number }, responses: { required: true, type: () => [require("../entities/survey-response").SurveyResponseEntity] } };
    }
}
exports.ListResultUserAnswer = ListResultUserAnswer;
class ListSurvey {
    static _OPENAPI_METADATA_FACTORY() {
        return { listSurvey: { required: true, type: () => [require("../entities/survey.entity").SurveyEntity] }, total: { required: true, type: () => Number }, itemPerPage: { required: true, type: () => Number, maximum: 100 }, page: { required: true, type: () => Number } };
    }
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
    static _OPENAPI_METADATA_FACTORY() {
        return { page: { required: false, type: () => Number }, itemPerPage: { required: false, type: () => Number, maximum: 50 } };
    }
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
    static _OPENAPI_METADATA_FACTORY() {
        return { eventId: { required: true, type: () => Number }, moduleId: { required: true, type: () => Number } };
    }
}
exports.BasicRouteParamsDto = BasicRouteParamsDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], BasicRouteParamsDto.prototype, "eventId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], BasicRouteParamsDto.prototype, "moduleId", void 0);
class SurveyRouteParamsDto extends BasicRouteParamsDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { surveyId: { required: true, type: () => Number } };
    }
}
exports.SurveyRouteParamsDto = SurveyRouteParamsDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], SurveyRouteParamsDto.prototype, "surveyId", void 0);
class ErrorResponseDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { status: { required: true, type: () => String }, message: { required: true, type: () => String }, errorCode: { required: false, type: () => String } };
    }
}
exports.ErrorResponseDto = ErrorResponseDto;
class SuccessResponseDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { status: { required: true, type: () => String }, message: { required: true, type: () => String }, data: { required: true, type: () => Object } };
    }
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