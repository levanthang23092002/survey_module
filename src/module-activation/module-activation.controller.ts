import { Controller } from '@nestjs/common';
import { ModuleActivationService } from './module-activation.service';

@Controller('module-activation')
export class ModuleActivationController {
  constructor(
    private readonly moduleActivationService: ModuleActivationService,
  ) {}
}
