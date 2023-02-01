import { TestBed } from '@angular/core/testing';

import { MasterService } from './master.service';
import { ValueService } from './value.service';
// import { FakeValueService } from './value-fake.service';


describe('MasterService', () => {
  let masterService: MasterService;
  let valueServiceSpy: jasmine.SpyObj<ValueService>
  // let valueService: ValueService;
  // let fakeValueService: FakeValueService;
  beforeEach(()=>{
    const spy = jasmine.createSpyObj('ValueService', ['getValue']);
    TestBed.configureTestingModule({
      providers: [
        MasterService, { provide: ValueService, useValue: spy }
        // ValueService,
        // FakeValueService
      ]
    });
    masterService = TestBed.inject(MasterService);
    valueServiceSpy = TestBed.inject(ValueService) as jasmine.SpyObj<ValueService>;
    // valueService = TestBed.inject(ValueService);
    // fakeValueService = TestBed.inject(FakeValueService);
  });

  it('should be create masterService',()=>{
    expect(masterService).toBeTruthy();
  });

  // it('should return "my value" from the real service', () => {

  //   const masterService = new MasterService(valueService);
  //   expect(masterService.getValue()).toBe("my value");
  // });
  // it('should return "some value" from the fake service', () => {
  //   const fakeValueService = new FakeValueService();
  //   const masterService = new MasterService(fakeValueService as unknown as ValueService);
  //   expect(masterService.getValue()).toBe("fake value");
  // });
  // it('should return "some value" from the fake object', () => {
  //   const fake = {getValue: ()=> 'fake from obj'};
  //   const masterService = new MasterService(fake as ValueService);
  //   expect(masterService.getValue()).toBe("fake from obj");
  // });

  // los spy y mockups con jasmine, podemos borrar esto

  it('should call a getValue() from valueService', () => {
    // const valueServiceSpy = jasmine.createSpyObj('ValueService', ['getValue']); // ahora usará el método de la clase
    valueServiceSpy.getValue.and.returnValue('fake spy value');   // simula el envío
    // const masterService = new MasterService(valueServiceSpy);
    expect(masterService.getValue()).toBe("fake spy value");    // qué recibe
    expect(valueServiceSpy.getValue).toHaveBeenCalled();        // ¿fue llamado el método?
    expect(valueServiceSpy.getValue).toHaveBeenCalledTimes(1);  // ¿cuantas veces fue llamado?
  });
});
