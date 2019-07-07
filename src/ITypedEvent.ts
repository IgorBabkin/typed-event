import { IObserver, IUnsubscribe } from './ISubscriber';
export interface ITypedEvent<T> {
    subscribe(observer: IObserver<T>): IUnsubscribe;
    subscribeOnce(observer: IObserver<T>): IUnsubscribe;
    unsubscribe(observer: IObserver<T>): void;
    raise(data: T): void;
}
