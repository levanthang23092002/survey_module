"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SurveyEntity = void 0;
const openapi = require("@nestjs/swagger");
class SurveyEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { surveyName: { required: true, type: () => String }, surveyDescription: { required: true, type: () => String }, duration: { required: true, type: () => Number }, type: { required: true, type: () => String }, day: { required: true, type: () => Date }, points: { required: true, type: () => Number }, timestampCreated: { required: true, type: () => Date } };
    }
}
exports.SurveyEntity = SurveyEntity;
//# sourceMappingURL=survey.entity.js.map