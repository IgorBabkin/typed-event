import {expect} from 'chai';
import {spy} from 'sinon';
import TypedEvent from '../src/typed_event';
describe('TypedEvent', () => {
    var event: TypedEvent<string>;
    let subscriber;

    beforeEach(() => {
        event = new TypedEvent<string>();
        subscriber = (data: string) => {
            let t = 1;
        };
    });

    it('should be available to subscribe', () => {
        subscriber = spy(subscriber);
        event.subscribe(subscriber);
        event.raise();

        expect(subscriber.called).to.be.ok;
    });

    it('cannot add the same subscriber twice', () => {
        subscriber = spy(subscriber);
        event.subscribe(subscriber);
        event.subscribe(subscriber);
        event.raise('super');

        expect(subscriber.calledOnce).to.be.ok;
    });

    it('should be available to unsubscribe', () => {
        subscriber = spy(subscriber);
        event.subscribe(subscriber);
        event.unsubscribe(subscriber);
        event.raise('super');

        expect(subscriber.notCalled).to.be.ok;
    });

    it('should provide data to subscriber', () => {
        let providedData = '';
        event.subscribe((data) => {
            providedData = data;
        });
        event.raise('super');
        expect(providedData).to.equal('super');
    });

    it('should provide the same data to all subscribers', () => {
        let providedData1 = '1';
        let providedData2 = '2';
        event.subscribe((data) => {
            providedData1 = data;
        });
        event.subscribe((data) => {
            providedData2 = data;
        });
        event.raise('super');
        expect(providedData1).to.equal(providedData2);
    });
});
