import { Controller, Get } from '@nestjs/common';

@Controller('tester')
export class TesterController {
  @Get()
  async commonTester(): Promise<any> {
    // return mongoose.connections.length;
    // return cpus();
    return process.memoryUsage().rss;
  }
}
