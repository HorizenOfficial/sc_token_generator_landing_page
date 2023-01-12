export function handleError(error: any): string {
    if (!error) {
        return "Unknown error"
    }
    if (error.response?.data?.error?.message) {
        return error.response?.data?.error?.message
    }
    if (error.message) {
        return error.message
    }
    if (error.data?.message) {
        return error.message
    }

    return error.toString()
}
