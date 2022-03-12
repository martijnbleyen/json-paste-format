let debounceTimer: number;
/**
 * Debounce update function
 */
export function useDebounce(callback: Function, ms = 200) {
    if (ms <= 0) {
        callback();
    }

    if (debounceTimer) {
        clearTimeout(debounceTimer);
    }

    debounceTimer = setTimeout(() => {
        callback();
    }, ms);

    return { debounceTimer, callback, ms };
}
