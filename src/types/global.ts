type TErrorResponse = {
    data: {
        message: string;
        stack: string;
        success: boolean;
    };
    status: number;
};

export type TResponse = {
    data?: any;
    error?: TErrorResponse;
}