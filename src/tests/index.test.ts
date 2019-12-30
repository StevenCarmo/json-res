import { jsonRes as jsonResHelper, JsonRes } from '../index';
import { JsonResBuilder } from '../lib/json-res-builder';

it('is an object ', () => {
  expect(typeof jsonResHelper).toBe('object');
});

describe('on initialization', () => {
  const target = new JsonRes();
  it('format defaults to EXPRESS', () => {
    expect(target.format).toBe('EXPRESS');
  });
  it('envelope defaults to true', () => {
    expect(target.envelope).toBe(true);
  });
});

describe('instance', () => {
  it('is an instance of JsonRes ', () => {
    expect(jsonResHelper).toBeInstanceOf(JsonRes);
  });

  describe('#format', () => {
    it('can be set to LAMBDA', () => {
      const target = new JsonRes();
      target.format = 'LAMBDA';
      expect(target.format).toBe('LAMBDA');
    });
    it('can be set to EXPRESS', () => {
      const target = new JsonRes();
      target.format = 'EXPRESS';
      expect(target.format).toBe('EXPRESS');
    });
  });

  describe('#envelope', () => {
    it('can be assigned a boolean value', () => {
      const targetA = new JsonRes();
      const targetB = new JsonRes();
      targetA.envelope = true;
      targetB.envelope = false;
      expect(targetA.envelope).toBe(true);
      expect(targetB.envelope).toBe(false);
    });
  });

  describe('#createJsonResonse', () => {
    it('returns an instance of JsonResponse', () => {
      const targetInstance = new JsonRes('LAMBDA');
      const target = targetInstance.createJsonResonse('SUCCESS', {tests: []});
      expect(target).toBeInstanceOf(JsonResBuilder);
    });
  });

  describe('#create', () => {
    describe('given format is LAMBDA', () => {
      function setup() {
        const targetInstance = new JsonRes('LAMBDA');
        const target = targetInstance.create('SUCCESS', {tests: []});
        return target;
      }
      it('returns an object', () => {
        const target = setup();
        expect(typeof target).toBe('object');
      });
      it('with a numeric statusCode', () => {
        const target = setup();
        expect(typeof target.statusCode).toBe('number');
      });
      it('with a stringified body', () => {
        const target = setup();
        expect(typeof target.body).toBe('string');
      });
    });

    describe('given format is EXPRESS', () => {
      function setup() {
        const targetInstance = new JsonRes('EXPRESS');
        const target = targetInstance.create('SUCCESS', {tests: []});
        return target;
      }
      it('returns an object', () => {
        const target = setup();
        expect(typeof target).toBe('object');
      });
    });
  });

  describe('#send', () => {
    describe('given format is LAMBDA', () => {
      function setup() {
        const targetInstance: JsonRes = new JsonRes('LAMBDA');
        const res = {
          status: function() {
            return this;
          },
          json: function() {
            return this;
          }
      };
        const target = targetInstance.send(null, 'SUCCESS', {tests: []});
        return target;
      }
      it('returns an object', () => {
        const target = setup();
        expect(typeof target).toBe('object');
      });
      it('with a numeric statusCode', () => {
        const target = setup();
        expect(typeof target['statusCode']).toBe('number');
      });
      it('with a stringified body', () => {
        const target = setup();
        expect(typeof target['body']).toBe('string');
      });
    });

    describe('given format is EXPRESS', () => {
      function setup() {
        const targetInstance = new JsonRes('EXPRESS');
        const res = {
            status: function() {
              return this;
            },
            json: function() {
              return this;
            }
        };
        const target = targetInstance.send(res, 'SUCCESS', {tests: []});
        return target;
      }
      it('returns nothing', () => {
        const target = setup();
        expect(typeof target).toBe('undefined');
      });
    });
  });
});
