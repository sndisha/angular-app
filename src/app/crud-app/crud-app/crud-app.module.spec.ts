import { CrudAppModule } from './crud-app.module';

describe('CrudAppModule', () => {
  let crudAppModule: CrudAppModule;

  beforeEach(() => {
    crudAppModule = new CrudAppModule();
  });

  it('should create an instance', () => {
    expect(crudAppModule).toBeTruthy();
  });
});
