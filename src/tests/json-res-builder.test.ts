import { JsonResBuilder  } from '../lib/json-res-builder';
// // Target module

function setupSuccess() {
  return new JsonResBuilder('SUCCESS');
}

function setupSuccessWithoutData() {
  return new JsonResBuilder('SUCCESS');
}

function setupSuccessWithData() {
  return new JsonResBuilder('SUCCESS', {items: ['a', 'a']});
}

function setupError() {
  return new JsonResBuilder('INTERNAL_SERVER_ERROR');
}

function setupFail() {
  return new JsonResBuilder('CLIENT_ERROR', {}, 'Client error occured');
}

it('is an object ', () => {
  const target = new JsonResBuilder('CLIENT_ERROR', {});
  expect(typeof target).toBe('object');
});

describe('instance', () => {
  it('is an instance of JsonResBuilder', () => {
    const target = setupSuccess();
    expect(target).toBeInstanceOf(JsonResBuilder);
  });
  describe('given instance has "success" status', () => {
    describe('#httpStatusCode', () => {
      const target = setupSuccess();

      it('returns an number', () => {
        expect(target.body.status).toBe('success');
        expect(typeof target.httpStatusCode).toBe('number');
      });

      it('should equal 200', () => {
        expect(target.httpStatusCode).toBe(200);
      });
    });
    describe('#body', () => {
      it('returns an object', () => {
        const target = setupSuccess();
        expect(typeof target.body).toBe('object');
      });

      describe('without data passed in, returns an object', () => {
        const targetInstance = setupSuccessWithoutData();
        const target = targetInstance.body;
        it('with status attribute', () => {
          expect(typeof target.status).not.toBe('undefined');
          expect(target.status).toBe('success');
        });
        it('with code attribute', () => {
          expect(typeof target.code).not.toBe('undefined');
        });
        it('without data attribute', () => {
          expect(typeof target.data).toBe('undefined');
        });
        it('without message attribute', () => {
          expect(typeof target.message).toBe('undefined');
        });
      });

      describe('and had data passed in', () => {
        const targetInstance = setupSuccessWithData();
        const target = targetInstance.body;
        it('with status attribute', () => {
          expect(typeof target.status).not.toBe('undefined');
          expect(target.status).toBe('success');
        });
        it('with code attribute', () => {
          expect(typeof target.code).not.toBe('undefined');
        });
        it('with data attribute', () => {
          expect(typeof target.data).not.toBe('undefined');
        });
        it('without message attribute', () => {
          expect(typeof target.message).toBe('undefined');
        });
      });
    });
  });

  describe('given instance has "error" status', () => {
    describe('#httpStatusCode', () => {
      const target = setupError();

      it('returns an number', () => {
        expect(target.body.status).toBe('error');
        expect(typeof target.httpStatusCode).toBe('number');
      });

      it('should equal 501', () => {
        expect(target.httpStatusCode).toBe(501);
      });
    });
    describe('#body', () => {
      const targetInstance = setupError();
      const target = targetInstance.body;
      it('returns an object', () => {
        expect(typeof targetInstance.body).toBe('object');
      });
      it('with code attribute', () => {
        expect(typeof target.code).not.toBe('undefined');
        expect(target.code).toBe('INTERNAL_SERVER_ERROR');
      });
      it('with status attribute', () => {
        expect(typeof target.status).not.toBe('undefined');
        expect(target.status).toBe('error');
      });
      it('without data attribute', () => {
        expect(typeof target.data).toBe('undefined');
      });
      it('with message attribute', () => {
        expect(typeof target.message).not.toBe('undefined');
      });
    });
  });

  describe('given instance has "fail" status', () => {
    const targetInstance = setupFail();

    describe('#httpStatusCode', () => {
      const target = targetInstance;

      it('returns an number', () => {
        expect(typeof target.httpStatusCode).toBe('number');
      });

      it('should in the 400 range', () => {
        expect(target.httpStatusCode).toBeGreaterThanOrEqual(400);
        expect(target.httpStatusCode).toBeLessThanOrEqual(400);
      });
    });

    describe('#body', () => {
      const target = targetInstance.body;
      it('returns an object', () => {
        expect(typeof targetInstance.body).toBe('object');
      });
      it('with code attribute', () => {
        expect(typeof target.code).not.toBe('undefined');
        // expect(target.code).toBe('INTERNAL_SERVER_ERROR');
      });
      it('with status attribute', () => {
        expect(typeof target.status).not.toBe('undefined');
        expect(target.status).toBe('fail');
      });
      it('with message attribute', () => {
        expect(typeof target.message).not.toBe('undefined');
      });
    });
  });
});
