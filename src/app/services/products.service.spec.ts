import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ProductsService } from './products.service';
import { Product } from '../models/product.model';
import { generateManyProducts, generateOneProduct } from '../models/product.mock';
import { environment } from './../../environments/environment';

fdescribe('ProductsService', () => {
  let productsService: ProductsService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [
        ProductsService
      ]
    });
    productsService = TestBed.inject(ProductsService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be create', () => {
    expect(productsService).toBeTruthy();
  });

  describe('tests for getAllSimple', () => {
    it('should return a product list', (doneFn) => {
      // Arrange
      const mockData: Product[] = generateManyProducts(6);
      // console.log(mockData);

      // Act
      productsService.getAllSimple()
      .subscribe((data)=> {
        // Assert
        expect(data.length).toEqual(mockData.length);
        expect(data).toEqual(mockData);
        doneFn();
      });

      // http config, parte del Arrange
      const url = `${environment.API_URL}/api/v1/products`;
      const req = httpController.expectOne(url);
      req.flush(mockData);
      // httpController.verify();
    });
  });

  describe('tests for getAll', () => {
    it('should return a product list', (doneFn) => {
      // Arrange
      const mockData: Product[] = generateManyProducts(3);
      // console.log(mockData);

      // Act
      productsService.getAll()
      .subscribe((data)=> {
        // Assert
        expect(data.length).toEqual(mockData.length);
        // expect(data).toEqual(mockData); // no son iguales data tiene taxes
        doneFn();
      });

      // http config, parte del Arrange
      const url = `${environment.API_URL}/api/v1/products`;
      const req = httpController.expectOne(url);
      req.flush(mockData);
      httpController.verify();
    });
    it('Should return product list with taxes', (doneFn)=>{
      // Arrange
      const mockData: Product[] = [
        {
          ...generateOneProduct(),
          price: 100 // 100 * .19 = 19 taxes
        },
        {
          ...generateOneProduct(),
          price: 200 // 200 * .19 = 38 taxes
        }
      ];

      // Act
      productsService.getAll()
      .subscribe((data)=> {
        // Assert
        expect(data.length).toEqual(mockData.length);
        expect(data[0].taxes).toEqual(19);
        expect(data[1].taxes).toEqual(38);
        doneFn();
      });

      // http config, parte del Arrange
      const url = `${environment.API_URL}/api/v1/products`;
      const req = httpController.expectOne(url);
      req.flush(mockData);
      httpController.verify();
    });
  });
});
