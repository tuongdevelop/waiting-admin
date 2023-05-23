import { AllSellingModule } from './all-selling.module';

describe('AllSellingModule', () => {
  let allSellingModule: AllSellingModule;

  beforeEach(() => {
    allSellingModule = new AllSellingModule();
  });

  it('should create an instance', () => {
    expect(allSellingModule).toBeTruthy();
  });
});
