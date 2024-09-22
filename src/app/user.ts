export type User = {
    readonly id: string;
}

export async function loadUser(): Promise<User> {
    const askId = (): string => {
        const userId = prompt('Please enter you ID (only number):');

        if (!userId || !/^\d+$/.test(String(userId))) {
            return askId();
        }

        return userId;
    };

    return new Promise((resolve, reject) => {
        resolve({
            id: askId()
        });
    });
}
