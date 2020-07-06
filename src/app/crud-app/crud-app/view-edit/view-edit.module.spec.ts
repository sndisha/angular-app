import { ViewEditModule } from './view-edit.module';

describe('ViewEditModule', () => {
  let viewEditModule: ViewEditModule;

  beforeEach(() => {
    viewEditModule = new ViewEditModule();
  });

  it('should create an instance', () => {
    expect(viewEditModule).toBeTruthy();
  });
});
