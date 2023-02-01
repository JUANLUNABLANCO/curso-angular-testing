import { TestBed } from '@angular/core/testing';
import { ValueService } from './value.service';

describe('ValueService', () => {
  let service: ValueService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ ValueService ]
    });
    service = TestBed.inject(ValueService);
  });

  it('should be created', () => {

    expect(service).toBeTruthy();  // ha sido creado
  });
  describe('Tests for getValue()', ()=>{
    it('should return "my value"', ()=>{
      expect(service.getValue()).toBe("my value");

    });
  });
  describe('Tests for setValue()', ()=>{
    it('should return "my value"', ()=>{
      expect(service.getValue()).toBe("my value");
      service.setValue('change');
      expect(service.getValue()).toBe("change");
    });
  });
  describe('Tests for getPromiseValue()', ()=>{
    it('should return "promise value" from a promise', async ()=>{
      const rta = await service.getPromiseValue()
      expect(rta).toBe("promise value");
      });
    });
});

