import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpStatusCode } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { ProductsService } from './products.service';
import { Product, CreateProductDTO, UpdateProductDTO } from '../models/product.model';
import { generateManyProducts, generateOneProduct } from '../models/product.mock';
import { environment } from './../../environments/environment';
import { TokenService } from './token.service';
import { TokenInterceptor } from '../interceptors/token.interceptor';



describe('ProductsService', () => {
  let productsService: ProductsService;
  let httpController: HttpTestingController;
  let tokenService: TokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [
        ProductsService,
        TokenService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: TokenInterceptor,
          multi: true
        }
      ]
    });
    productsService = TestBed.inject(ProductsService);
    httpController = TestBed.inject(HttpTestingController);
    tokenService = TestBed.inject(TokenService);
  });

  afterEach(()=>{
    httpController.verify();
  });

  it('should be create', () => {
    expect(productsService).toBeTruthy();
  });

  describe('tests for getAllSimple and token interceptor', () => {
    it('should return a product list, and have a token inetrceptor in the headers', (doneFn) => {
      // Arrange
      const mockData: Product[] = generateManyProducts(6);
      // esto debería probarse en auth.service.ts
      spyOn(tokenService, 'getToken').and.returnValue('token123321nekot');
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
      const headers = req.request.headers;
      expect(headers.get('Authorization')).toEqual('Bearer token123321nekot');
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
      // httpController.verify();
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
        },
        {
          ...generateOneProduct(),
          price: 0 // 0 * .19 = 0 taxes
        },
        {
          ...generateOneProduct(),
          price: -100 // we should expect 0 taxes for all the negative prices
        }
      ];

      // Act
      productsService.getAll()
      .subscribe((data)=> {
        // Assert
        expect(data.length).toEqual(mockData.length);
        expect(data[0].taxes).toEqual(19);
        expect(data[1].taxes).toEqual(38);
        expect(data[2].taxes).toEqual(0);
        expect(data[3].taxes).toEqual(0);
        doneFn();
      });

      // http config, parte del Arrange
      const url = `${environment.API_URL}/api/v1/products`;
      const req = httpController.expectOne(url);
      req.flush(mockData);
      // httpController.verify();
    });
    it('should send query params with limit 10 and offset 3', (doneFn) => {
      // Arrange
      const limit = 10;
      const offset = 0;
      const mockData: Product[] = generateManyProducts(limit);

      // Act
      productsService.getAll(limit, offset)
      .subscribe((data)=> {
        // Assert
        expect(data.length).toEqual(mockData.length);
        // expect(data).toEqual(mockData); // no son iguales data tiene taxes
        doneFn();
      });

      // http config, parte del Arrange
      const url = `${environment.API_URL}/api/v1/products?limit=${limit}&offset=${offset}`;
      console.log(url);
      const req = httpController.expectOne(url);
      req.flush(mockData);
      const params = req.request.params;
      expect(params.get('limit')).toEqual(`${limit}`);
      expect(params.get('offset')).toEqual(`${offset}`);
      expect(req.request.method).toEqual('GET');
      // httpController.verify();
    });
  });
  describe('test for create', ()=>{
    it('should return a new product, dto should be inmutable and http.method is "POST"', (doneFn)=>{
      // ARRANGE
      const mockData = generateOneProduct();
      const dto: CreateProductDTO = {
        title: 'New Product',
        price: 100,
        images: ['image0', 'image1'],
        description: 'bal bla bla, bal bla, bla',
        categoryId: 12
      };

      // ACT
      productsService.create({...dto}).subscribe(data =>{
        // ASSERT
        expect(data).toEqual(mockData);
        doneFn();
      });

      // CONFIG
      const url = `${environment.API_URL}/api/v1/products`;
      console.log(url);
      const req = httpController.expectOne(url);
      req.flush(mockData);
      expect(req.request.body).toEqual(dto);
      expect(req.request.method).toEqual('POST');
      // httpController.verify();
    });
  });
  describe('test for update', () => {
    it('should update a product', (doneFn) => {
      // Arrange
      const mockData: Product = generateOneProduct();
      const dto: UpdateProductDTO = {
        title: 'updated product',
      }
      const productId = '1';
      // Act
      productsService.update(productId, {...dto})
      .subscribe((data) => {
        // Assert
        expect(data).toEqual(mockData);
        doneFn();
      });

      // http config
      const url = `${environment.API_URL}/api/v1/products/${productId}`;
      const req = httpController.expectOne(url);
      expect(req.request.method).toEqual('PUT');
      expect(req.request.body).toEqual(dto);
      req.flush(mockData);
    });
  });
  describe('test for delete', () => {
    it('should delete a product', (doneFn) => {
      // Arrange
      const mockData = true; // el método delete de esta API devuelve true si lo borra
      const productId = '1';
      // Act
      productsService.delete(productId)
      .subscribe((data) => {
        // Assert
        expect(data).toEqual(mockData);
        doneFn();
      });

      // http config
      const url = `${environment.API_URL}/api/v1/products/${productId}`;
      const req = httpController.expectOne(url);
      expect(req.request.method).toEqual('DELETE');
      req.flush(mockData);
    });
  });
  describe('test for getOne, Manejo de errores', () => {
    it('should get one a product', (doneFn) => {
      // Arrange
      const mockData: Product = generateOneProduct();
      const productId = '1';
      // Act
      productsService.getOne(productId)
      .subscribe((data) => {
        // Assert
        expect(data).toEqual(mockData);
        doneFn();
      });

      // http config
      const url = `${environment.API_URL}/api/v1/products/${productId}`;
      const req = httpController.expectOne(url);
      expect(req.request.method).toEqual('GET');
      req.flush(mockData);
    });
    it('should return the right msg when the status code is 404', (doneFn) => {
      // Arrange
      const msgError= '404 message';
      const productId = '1';
      // enviamos un error en vez de un producto
      const mockError = {
        status: HttpStatusCode.NotFound,
        statusText: msgError
      }
      // Act
      productsService.getOne(productId)
      .subscribe({
        error: (error)=>{
          // ASSERT
          expect(error).toEqual('El producto no existe');
          doneFn();
        }
      });

      // http config
      const url = `${environment.API_URL}/api/v1/products/${productId}`;
      const req = httpController.expectOne(url);
      expect(req.request.method).toEqual('GET');
      req.flush(msgError, mockError);
    });
    it('should return the right msg when the status code is 409', (doneFn) => {
      // Arrange
      const id = '1';
      const msgError = '409 message';
      const mockError = {
        status: HttpStatusCode.Conflict,
        statusText: msgError,
      };
      // Act
      productsService.getOne(id).subscribe({
        error: (error) => {
          // assert
          expect(error).toEqual('Algo esta fallando en el server');
          doneFn();
        },
      });
      //http config
      const url = `${environment.API_URL}/api/v1/products/${id}`;
      const req = httpController.expectOne(url);
      req.flush(msgError, mockError);
      expect(req.request.method).toEqual('GET');
    });
    it('should return the right msg when the status code is 401', (doneFn) => {
      // Arrange
      const id = '1';
      const msgError = '409 message';
      const mockError = {
        status: HttpStatusCode.Unauthorized,
        statusText: msgError,
      };
      // Act
      productsService.getOne(id).subscribe({
        error: (error) => {
          // assert
          expect(error).toEqual('No estas permitido');
          doneFn();
        },
      });
      //http config
      const url = `${environment.API_URL}/api/v1/products/${id}`;
      const req = httpController.expectOne(url);
      req.flush(msgError, mockError);
      expect(req.request.method).toEqual('GET');
    });
    it('should return the right msg when the status code is 500', (doneFn) => {
      // Arrange
      const id = '1';
      const msgError = '500 message';
      const mockError = {
        status: HttpStatusCode.BadGateway,
        statusText: msgError,
      };
      // Act
      productsService.getOne(id).subscribe({
        error: (error) => {
          // assert
          expect(error).toEqual('Ups algo salio mal');
          doneFn();
        },
      });
      //http config
      const url = `${environment.API_URL}/api/v1/products/${id}`;
      const req = httpController.expectOne(url);
      req.flush(msgError, mockError);
      expect(req.request.method).toEqual('GET');
    });
  });
});
