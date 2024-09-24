import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class SurveyService {
  constructor(private prisma: PrismaService) {}

  async addSurvey() {
    return '';
  }

  async updateSurvey() {
    return '';
  }

  async deteteSurvey() {
    return '';
  }

  async undeteleSurvey() {
    return '';
  }

  async viewAllSurveyDeleted() {
    return '';
  }
}
