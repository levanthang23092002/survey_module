"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const groups_service_1 = require("./groups.service");
describe('SurveyModuleRepository', () => {
    let repository;
    let prismaService;
    beforeEach(async () => {
        prismaService = {
            userGroup: {
                findFirst: jest.fn(),
            },
            objectGroup: {
                findFirst: jest.fn(),
            },
            survey: {
                findFirst: jest.fn(),
            },
        };
        repository = new groups_service_1.GroupsService(prismaService);
    });
    const mockUserGroups = {
        usergroupid: 1,
        instanceid: 1,
        userid: 1,
        groupid: 1,
        deleted: false,
        timestamp_created: new Date('2024-08-23T12:00:00Z'),
        timestamp_updated: new Date('2024-08-23T12:00:00Z'),
        timestamp_deleted: null,
    };
    const mockObjectGroup = {
        id: 1,
        type: 'ExampleType',
        objectid: 1,
        groupid: 1,
        userid: 1,
        instanceid: 1,
        deleted: false,
        timestamp_created: new Date('2024-08-23T12:00:00Z'),
        timestamp_updated: new Date('2024-08-23T12:00:00Z'),
        timestamp_deleted: null,
    };
    const mockSurvey = {
        groupid: 1,
    };
    describe('getUserGroup', () => {
        it('should return user group if it exists', async () => {
            prismaService.userGroup.findFirst.mockResolvedValue(mockUserGroups);
            const result = await repository.getUserGroup(1, 1);
            expect(result).toEqual(mockUserGroups);
        });
        it('should return null if user group does not exist', async () => {
            prismaService.userGroup.findFirst.mockResolvedValue(null);
            const result = await repository.getUserGroup(1, 1);
            expect(result).toBeNull();
        });
    });
    describe('isGroupActivated', () => {
        it('should return true if the group is activated', async () => {
            prismaService.objectGroup.findFirst.mockResolvedValue(mockObjectGroup);
            const result = await repository.isGroupActivated(1, 1);
            expect(result).toBe(true);
        });
        it('should return false if the group is not found', async () => {
            prismaService.objectGroup.findFirst.mockResolvedValue(null);
            const result = await repository.isGroupActivated(1, 1);
            expect(result).toBe(false);
        });
    });
    describe('isGroupInSurvey', () => {
        it('should return true if the group is in the survey', async () => {
            prismaService.survey.findFirst.mockResolvedValue(mockSurvey);
            const result = await repository.isGroupInSurvey(1, 1, 1);
            expect(result).toBe(true);
        });
        it('should return false if the group is not in the survey', async () => {
            prismaService.survey.findFirst.mockResolvedValue(null);
            const result = await repository.isGroupInSurvey(1, 1, 1);
            expect(result).toBe(false);
        });
    });
});
//# sourceMappingURL=groups.service.spec.js.map