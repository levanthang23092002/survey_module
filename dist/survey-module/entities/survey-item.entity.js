"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubQuestionEntity = exports.SurveyItemEntity = void 0;
const openapi = require("@nestjs/swagger");
class SurveyItemEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { questionNum: { required: true, type: () => Number }, question: { required: true, type: () => String }, description: { required: false, type: () => String }, image: { required: false, type: () => String }, choice1: { required: false, type: () => String }, choice2: { required: false, type: () => String }, choice3: { required: false, type: () => String }, choice4: { required: false, type: () => String }, type: { required: false, type: () => String }, required: { required: false, type: () => Boolean }, showDescription: { required: false, type: () => Boolean }, shuffleChoice: { required: false, type: () => Boolean }, hasCommentField: { required: false, type: () => Boolean }, subQuestions: { required: false, type: () => [require("./survey-item.entity").SubQuestionEntity] } };
    }
}
exports.SurveyItemEntity = SurveyItemEntity;
class SubQuestionEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { subQuestion: { required: true, type: () => String }, subNum: { required: true, type: () => Number } };
    }
}
exports.SubQuestionEntity = SubQuestionEntity;
//# sourceMappingURL=survey-item.entity.js.map