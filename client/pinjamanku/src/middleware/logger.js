export default function logger(store) {
    return function (next) {
        return function (action) {
            console.log(`action jalan`);
            const result = next(action)
            console.log(`action sudah selesai ${store.getState()}`);
            return result
        }
    }
}