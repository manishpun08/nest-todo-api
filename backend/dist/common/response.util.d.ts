export declare function successResponse<T>(data: T, message: string, statusCode?: number): {
    success: boolean;
    statusCode: number;
    message: string;
    data: T;
};
