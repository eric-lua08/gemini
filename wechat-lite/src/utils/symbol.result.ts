try {
  // @ts-ignore
  if (!Reflect.has(wx.request, Symbol.result)) throw 'Not support Symbol.result';
} catch (_e) {
  // @ts-ignore
  Symbol.result = Symbol('result');

  // @ts-ignore
  Reflect.defineProperty(Function.prototype, Symbol.result, {
    value: function (...args): [Error | null, any] {
      try {
        let result = this.apply(this, args);

        // @ts-ignore
        if (result && typeof result === 'object' && Symbol.result in result) {
          // @ts-ignore
          return result[Symbol.result]();
        }

        return [null, result];
      } catch (error) {
        return [error || new Error('Thrown error is falsy.'), null]
      }
    },
  })

  // @ts-ignore
  Reflect.defineProperty(Promise.prototype, Symbol.result, {
    value: async function (): Promise<[Error | null, any]> {
      try {
        const result = await this;
        return [null, result];
      } catch (error) {
        return [error || new Error('Thrown error is falsy.'), null]
      }
    },
  })
}


