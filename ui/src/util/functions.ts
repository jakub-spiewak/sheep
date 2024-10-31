export const isNullOrEmpty = (value: object | undefined | null): boolean => {
    return value === undefined || value === null || Object.keys(value).length === 0;
}

export const forceTypeBoolean = (value: string | null | boolean): boolean | null => typeof value === 'boolean' ? value : value === 'true' ? true : value === 'false' ? false : null;