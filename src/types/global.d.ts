declare module '*.svg';

declare var __OPEN_WEATHER_MAP_API_KEY__: string;

type ArrayElementType<ArrayType extends readonly unknown[]> =
    ArrayType extends readonly (infer ElementType)[] ? ElementType : never;
