export interface ISubscriber<G> {
    (data: G): void;
}

export default class TypedEvent<T> {
    private subscribers: ISubscriber<T>[] = [];

    subscribe(handler: ISubscriber<T>): void {
        if (!this.has(handler)) {
            this.subscribers = this.subscribers.concat([handler]);
        }
    }

    unsubscribe(handler: ISubscriber<T>): void {
        this.subscribers = this.subscribers.filter((subscriber: ISubscriber<T>) => {
            return handler !== subscriber;
        });
    }

    raise(data?: T): void {
        this.subscribers.forEach((subscriber: ISubscriber<T>) => {
            subscriber(data);
        });
    }

    private has(subscriber: ISubscriber<T>): boolean {
        return this.subscribers.indexOf(subscriber) !== -1;
    }
}
