import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AuthService } from './auth.service';
import { TokenService } from './token.service';
import { Auth } from '../models/auth.model';

import { environment } from 'src/environments/environment';


fdescribe('AuthService', ()=>{
  let authService: AuthService;
  let httpController: HttpTestingController;
  let tokenService: TokenService;
  const tokenFake = '121212'

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [
        AuthService,
        TokenService
      ]
    });
    authService = TestBed.inject(AuthService);
    httpController = TestBed.inject(HttpTestingController);
    tokenService = TestBed.inject(TokenService);
  });
  afterEach(()=>{
    httpController.verify();
  });

  it('authService should be created', () => {
    expect(authService).toBeTruthy();
  });
  describe('login', ()=>{
    it('should return a token',(doneFn)=>{
      // Arrange
      const mockToken: Auth = {access_token: tokenFake};
      const email = "johnmoon@mail.com";
      const password = "1234";

      // Act
      authService.login(email, password)
      .subscribe((data)=> {
        // Assert
        expect(data).toEqual(mockToken);
        doneFn();
      });

      // http config, parte del Arrange
      const url = `${environment.API_URL}/api/v1/auth/login`;
      const req = httpController.expectOne(url);
      req.flush(mockToken);
    });
    it('should save a token in localStorage',(doneFn)=>{
      // Arrange

      const mockToken: Auth = {access_token: tokenFake};
      const email = "johnmoon@mail.com";
      const password = "1234";
      // espiamos la función pero no se ejecuta realmente callThrought
      spyOn(tokenService, 'saveToken').and.callThrough();

      // Act
      authService.login(email, password)
      .subscribe((data)=> {
        // Assert
        expect(data).toEqual(mockToken);
        expect(tokenService.saveToken).toHaveBeenCalledTimes(1);
        expect(tokenService.saveToken).toHaveBeenCalledOnceWith(tokenFake);
        doneFn();
      });

      // http config, parte del Arrange
      const url = `${environment.API_URL}/api/v1/auth/login`;
      const req = httpController.expectOne(url);
      req.flush(mockToken);
    });
  });
});
