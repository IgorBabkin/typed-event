import { IObserverStorage } from './IObserverStorage';
import { IObserver, IUnsubscribe } from './ISubscriber';
import { ITypedEvent } from './ITypedEvent';

export class TypedEvent<T> implements ITypedEvent<T> {
    private observerStorage: IObserverStorage<T>;

    public constructor(observerStorage: IObserverStorage<T>) {
        this.observerStorage = observerStorage;
    }

    public subscribe(observer: IObserver<T>): IUnsubscribe {
        this.observerStorage.add(observer);
        return () => this.unsubscribe(observer);
    }

    public subscribeOnce(observer: IObserver<T>): IUnsubscribe {
        const onceObserver: IObserver<T> = (data) => {
            observer(data);
            this.unsubscribe(onceObserver);
        };
        this.observerStorage.add(onceObserver);
        return () => this.unsubscribe(onceObserver);
    }

    public unsubscribe(observer: IObserver<T>): void {
        this.observerStorage.remove(observer);
    }

    public raise(data: T): void {
        this.observerStorage.each((o) => o(data));
    }
}
