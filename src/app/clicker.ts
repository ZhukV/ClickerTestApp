import { child, Database, get, increment, onValue, ref, update } from '@firebase/database';
import { loadUser } from './user';

export class Clicker {
    private readonly tokensSelector: HTMLDivElement;
    private readonly tapSelector: HTMLButtonElement;

    constructor(container: HTMLDivElement, private readonly database: Database) {
        this.tokensSelector = <HTMLDivElement>container.querySelector('.tokens');
        this.tapSelector = <HTMLButtonElement>container.querySelector('button');
    }

    async init(): Promise<void> {
        const user = await loadUser();

        let promiseResolver: any = null;

        const promise: Promise<void> = new Promise((resolve) => {
            promiseResolver = resolve;
        });

        const totalTokensRef = ref(this.database, `users/${user.id}/tokens`);

        onValue(totalTokensRef, (snapshot) => {
            if (snapshot.exists()) {
                this.changeTokensCount(snapshot.val());
            } else {
                this.changeTokensCount(0);
            }

            promiseResolver();
        });

        this.tapSelector.addEventListener('click', () => {
            const updates: any = {};

            updates[`users/${user.id}/tokens`] = increment(1);

            update(ref(this.database), updates);
        });

        return promise;
    }

    private changeTokensCount(tokens: number): void {
        this.tokensSelector.innerText = String(tokens);
    }
}
