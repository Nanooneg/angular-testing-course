import {fakeAsync, flush, flushMicrotasks, tick} from '@angular/core/testing';
import {of}                                      from 'rxjs';
import {delay}                                   from 'rxjs/operators';

describe('Async testing example', () => {

  it('Asynchronous test example with jasmine done()', (done: DoneFn) =>
  {

    let test = false;

    setTimeout(() => {

      console.log('Running test in setTimeout with done()');

      test = true;

      expect(test).toBeTruthy();

      done();

    }, 1000);

  });

  it('Asynchronous test example with jasmine fakeAsync()', fakeAsync(() =>
  {

    let test = false;

    setTimeout(() => {});

    setTimeout(() => {

      console.log('Changing test value in setTimeout');

      test = true;

    }, 1000);

    // tick(500);
    // tick(499);
    // tick(1);

    flush();

    console.log('Running test with fakeAsync()');

    expect(test).toBeTruthy();

  }));

  it('Asynchronous test example with plain Promise', fakeAsync(() =>
  {

    let test = false;

    console.log('Creating promise');

    Promise.resolve().then(() => {

      console.log('Promise evaluated');

      test = true;

      return Promise.resolve();

    }).then(() => {

      console.log('Promise evaluated in 2nd level');

    });

    flushMicrotasks();

    console.log('Running test assertion');

    expect(test).toBeTruthy();

  }));

  it('Asynchronous test example with Promise + setTimeout()', fakeAsync(() =>
  {

    let counter = 0;

    Promise.resolve().then(() => {

      counter += 10;

      setTimeout(() => counter += 1, 1000);

    });

    expect(counter).toBe(0);

    flushMicrotasks();

    expect(counter).toBe(10);

    tick(500);

    expect(counter).toBe(10);

    flush();

    expect(counter).toBe(11);

  }));

  it('Asynchronous test example with Observable', fakeAsync(() =>
  {

    let test = false;

    console.log('Creating observable');

    const test$ = of(test).pipe(delay(1000));

    test$.subscribe(() => {

      console.log('Observable emmit');

      test = true;

    });

    tick(1000);

    console.log('Running test assertion');

    expect(test).toBeTruthy();

  }));

});
