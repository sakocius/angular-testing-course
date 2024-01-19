import { fakeAsync, flush, flushMicrotasks, tick } from '@angular/core/testing';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

describe("Async Testing Examples", () => {
  it("Asynchronous test example with Jasmine done()", (done: DoneFn) => {
    let test = false;

    setTimeout(() => {
      test = true;
      expect(test).toBeTruthy();
      done();
    }, 1000);


  });

  it("Asynchronous test example with setTimeout()", fakeAsync(() => {
    let test = false;

    setTimeout(() => {
      console.log('short assertion');
    }, 500);

    setTimeout(() => {
      console.log('long assertion');

      test = true;
    }, 1000);

    // tick(1000);
    flush();
    expect(test).toBeTruthy();

  }));

  it("Asynchronous test example with plain Promise", fakeAsync(() => {
    let test = false;

    console.log('creating promise');

    setTimeout(() => {
      console.log('setTimeout() first');
    });
    setTimeout(() => {
      console.log('setTimeout() second');
    });

    Promise.resolve().then(() => {
      console.log('Promise first resolved');
      test = true;

      return Promise.resolve();
    }).then(() => {
      console.log('Promise second resolved');
    });
    console.log('flushing microtasks');


    flushMicrotasks();
    console.log('flushing tasks');
    flush();

    console.log('running assertions');

    expect(test).toBeTruthy();

  }));

  it("Asynchronous test example Promise + settimeout", fakeAsync(() => {
    let counter = 0;
    Promise.resolve().then(() => {
      counter += 10;
      setTimeout(() => {
        counter += 1;
      }, 1000);
    });

    expect(counter).toBe(0);
    flushMicrotasks();
    expect(counter).toBe(10);
    tick(500);
    expect(counter).toBe(10);
    tick(500);
    expect(counter).toBe(11);

  }));

  it("Asynchronous test example observables", fakeAsync(() => {
    let test = false;
    console.log('Creating observable');

    const test$ = of(test).pipe(delay(1000));

    test$.subscribe(() => {
      test = true;
    });

    console.log('Running assertions');
    tick(1000);
    expect(test).toBe(true);

  }));
});
