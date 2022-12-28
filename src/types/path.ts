export type Get<T, X> = X extends keyof T ? T[X] : never;
export type Path<T, P extends any[]> = P extends [infer X, ...infer Y]
  ? Path<Get<NonNullable<T>, X>, Y>
  : T;

export type ArrayElement<A> = A extends readonly (infer T)[] ? T : never;
