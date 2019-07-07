import { createEvent } from 'index';

describe('ITypedEvent tests', () => {
    it('subscribes', () => {
        const expected = 10;
        let observerValue = 0;

        const event = createEvent<number>();
        event.subscribe((value) => observerValue = value);
        event.raise(10);

        expect(observerValue).toBe(expected);
    });

    it('should be able to unsubscribe#1', () => {
        let observerHasBeenCalled = false;

        const event = createEvent<void>();
        const unsubscribe = event.subscribe(() => observerHasBeenCalled = true);
        unsubscribe();
        event.raise();

        expect(observerHasBeenCalled).toBe(false);
    });

    it('should be able to unsubscribe#2', () => {
        let observerHasBeenCalled = false;

        const event = createEvent<void>();
        const observer = () => observerHasBeenCalled = true;
        event.unsubscribe(observer);
        event.raise();

        expect(observerHasBeenCalled).toBe(false);
    });

    it('subscribe once', () => {
        let callsCount = 0;

        const event = createEvent<void>();
        event.subscribeOnce(() => callsCount++);
        event.raise();
        event.raise();

        expect(callsCount).toBe(1);
    });

    it('calls observer a few times', () => {
        let callsCount = 0;

        const event = createEvent<void>();
        event.subscribe(() => callsCount++);
        event.raise();
        event.raise();

        expect(callsCount).toBe(2);
    });
});
