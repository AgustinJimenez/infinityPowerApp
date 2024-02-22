type Nullable<T> = T | null;

type RecursivePartial<T> = { [P in keyof T]?: RecursivePartial<T[P]> };

type OptionalAttribute<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>> & {
  [K]?: T[k];
};

type Recursion<T> = keyof {
  [Property in keyof T as T[Property] extends string | number | boolean | null
    ? Property
    : `${string & Property}.${string & Recursion<T[Property]>}`]: true;
};

type Awaited<T> = T extends null | undefined
  ? T
  : T extends object & {
      then(onfulfilled: infer F): any;
    }
  ? F extends (value: infer V, ...args: any) => any
    ? Awaited<V>
    : never
  : T;
