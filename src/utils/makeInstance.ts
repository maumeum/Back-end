function makeInstance<T>(instance: new () => T): T {
  let singleton!: T;

  return (function getInstance(): T {
    if (!singleton) {
      singleton = new instance();
    }
    return singleton;
  })();
}

export { makeInstance };
