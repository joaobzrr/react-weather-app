declare module '*.svg';

declare var __OPEN_WEATHER_MAP_API_KEY__: string;
declare var __LOCATION_IQ_API_KEY__: string;

type NamedComponent<T> = ComponentType<T> & { _name: string; };

type ArrayElementType<ArrayType extends readonly unknown[]> =
    ArrayType extends readonly (infer ElementType)[] ? ElementType : never;
