export function GetObjectAsNullable<T>(obj: T | undefined): T | null {
    return obj === undefined ? null : obj;
}