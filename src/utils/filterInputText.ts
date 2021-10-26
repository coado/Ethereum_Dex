
export const filterInputText = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!/^[0-9]*[.,]?[0-9]*$/.test(e.key) || (e.target as HTMLInputElement).value.length > 80) {
        e.preventDefault();
    }
}