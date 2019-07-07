import { ITypedEvent } from 'ITypedEvent';
import { ObserverStorage } from 'ObserverStorage';
import { TypedEvent } from 'TypedEvent';

export function createEvent<T>(): ITypedEvent<T> {
    return new TypedEvent(new ObserverStorage());
}

export { ITypedEvent } from 'ITypedEvent';
