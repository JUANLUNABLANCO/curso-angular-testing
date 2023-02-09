import { TestBed } from '@angular/core/testing';

import { MasterService } from './master.service';
import { ValueService } from './value.service';


describe('MasterService', () => {
  let masterService: MasterService;
  let valueServiceSpy: jasmine.SpyObj<ValueService>

  beforeEach(()=>{
    const spy = jasmine.createSpyObj('ValueService', ['getValue']);
    TestBed.configureTestingModule({
      providers: [
        MasterService, { provide: ValueService, useValue: spy }
      ]
    });
    masterService = TestBed.inject(MasterService);
    valueServiceSpy = TestBed.inject(ValueService) as jasmine.SpyObj<ValueService>;
  });

  it('should be create masterService',()=>{
    expect(masterService).toBeTruthy();
  });

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
