"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SuccessResponseDto = exports.ErrorResponseDto = exports.SurveyRouteParamsDto = exports.BasicRouteParamsDto = exports.InputSurvey = exports.ListSurvey = exports.ListResultUserAnswer = exports.ListResultAnswer = exports.InputSurveyResponse = exports.CreateSurveyResponse = exports.DetailSurvey = void 0;
var class_validator_1 = require("class-validator");
var swagger_1 = require("@nestjs/swagger");
var DetailSurvey = /** @class */ (function () {
    function DetailSurvey() {
    }
    __decorate([
        class_validator_1.IsArray()
    ], DetailSurvey.prototype, "data");
    __decorate([
        class_validator_1.IsNumber()
    ], DetailSurvey.prototype, "total");
    return DetailSurvey;
}());
exports.DetailSurvey = DetailSurvey;
var CreateSurveyResponse = /** @class */ (function () {
    function CreateSurveyResponse() {
    }
    __decorate([
        class_validator_1.IsArray()
    ], CreateSurveyResponse.prototype, "data");
    return CreateSurveyResponse;
}());
exports.CreateSurveyResponse = CreateSurveyResponse;
var InputSurveyResponse = /** @class */ (function () {
    function InputSurveyResponse() {
    }
    __decorate([
        class_validator_1.IsNumber()
    ], InputSurveyResponse.prototype, "surveyItemId");
    return InputSurveyResponse;
}());
exports.InputSurveyResponse = InputSurveyResponse;
var ListResultAnswer = /** @class */ (function () {
    function ListResultAnswer() {
    }
    return ListResultAnswer;
}());
exports.ListResultAnswer = ListResultAnswer;
var ListResultUserAnswer = /** @class */ (function () {
    function ListResultUserAnswer() {
    }
    return ListResultUserAnswer;
}());
exports.ListResultUserAnswer = ListResultUserAnswer;
var ListSurvey = /** @class */ (function () {
    function ListSurvey() {
    }
    __decorate([
        class_validator_1.IsArray()
    ], ListSurvey.prototype, "listSurvey");
    __decorate([
        class_validator_1.IsNumber()
    ], ListSurvey.prototype, "total");
    __decorate([
        class_validator_1.IsNumber(),
        class_validator_1.Max(100)
    ], ListSurvey.prototype, "itemPerPage");
    __decorate([
        class_validator_1.IsNumber()
    ], ListSurvey.prototype, "page");
    return ListSurvey;
}());
exports.ListSurvey = ListSurvey;
var InputSurvey = /** @class */ (function () {
    function InputSurvey() {
    }
    __decorate([
        class_validator_1.IsNumber()
    ], InputSurvey.prototype, "page");
    __decorate([
        class_validator_1.IsNumber(),
        class_validator_1.Max(50)
    ], InputSurvey.prototype, "itemPerPage");
    return InputSurvey;
}());
exports.InputSurvey = InputSurvey;
var BasicRouteParamsDto = /** @class */ (function () {
    function BasicRouteParamsDto() {
    }
    __decorate([
        swagger_1.ApiProperty({
            example: 12345
        }),
        class_validator_1.IsNumber()
    ], BasicRouteParamsDto.prototype, "eventId");
    __decorate([
        swagger_1.ApiProperty({
            example: 12345
        }),
        class_validator_1.IsNumber()
    ], BasicRouteParamsDto.prototype, "moduleId");
    return BasicRouteParamsDto;
}());
exports.BasicRouteParamsDto = BasicRouteParamsDto;
var SurveyRouteParamsDto = /** @class */ (function (_super) {
    __extends(SurveyRouteParamsDto, _super);
    function SurveyRouteParamsDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        swagger_1.ApiProperty({
            example: 12345
        }),
        class_validator_1.IsNumber()
    ], SurveyRouteParamsDto.prototype, "surveyId");
    return SurveyRouteParamsDto;
}(BasicRouteParamsDto));
exports.SurveyRouteParamsDto = SurveyRouteParamsDto;
var ErrorResponseDto = /** @class */ (function () {
    function ErrorResponseDto() {
    }
    return ErrorResponseDto;
}());
exports.ErrorResponseDto = ErrorResponseDto;
var SuccessResponseDto = /** @class */ (function () {
    function SuccessResponseDto() {
    }
    __decorate([
        swagger_1.ApiProperty({ description: 'Status of the response' })
    ], SuccessResponseDto.prototype, "status");
    __decorate([
        swagger_1.ApiProperty({ description: 'Message associated with the response' })
    ], SuccessResponseDto.prototype, "message");
    __decorate([
        swagger_1.ApiProperty({ description: 'Data payload of the response' })
    ], SuccessResponseDto.prototype, "data");
    return SuccessResponseDto;
}());
exports.SuccessResponseDto = SuccessResponseDto;
