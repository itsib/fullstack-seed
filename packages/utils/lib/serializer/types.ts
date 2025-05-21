export type Reviver = (key: string, value: any) => any;

export type StandardReplacer = (key: string, value: any) => any;

export type CircularReplacer = (key: string, value: any, referenceKey: string) => any;
