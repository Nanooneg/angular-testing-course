import {CalculatorService} from './calculator.service';
import {LoggerService}     from './logger.service';
import {TestBed}           from '@angular/core/testing';
import createSpyObj = jasmine.createSpyObj;

describe('CalculatorService', () => {

  let calculator: CalculatorService, loggerSpy: any;

  beforeEach(() => {

    loggerSpy = createSpyObj('LoggerService', ['log']);

    TestBed.configureTestingModule({
      providers: [
        CalculatorService,
        {
          provide: LoggerService,
          useValue: loggerSpy
        }
      ]
    })

    calculator = TestBed.inject(CalculatorService);
  });

  it('should add two numbers', () => {

    const result = calculator.add(3, 3);

    expect(result).toEqual(6);

    expect(loggerSpy.log).toHaveBeenCalledTimes(1);

  });

  it('should subtract two numbers', () => {

    const result = calculator.subtract(3, 1);

    expect(result).toBe(2);

    expect(loggerSpy.log).toHaveBeenCalledTimes(1);

  });

});
