type IEvent = 'logout';
type IHandler = (event: IEvent, data: IData) => void;
type IData = object;
type IDisposer = () => void;

export class EventEmitter {
  private subscribers: Record<IEvent, IHandler[]> = {
    logout: [],
  };

  on = (event: IEvent, handler: IHandler): IDisposer => {
    console.log('on', event);

    if (!this.subscribers[event].includes(handler)) {
      this.subscribers[event].push(handler);
    }

    return () => this.off(event, handler);
  }

  once = (event: IEvent, handler: IHandler): IDisposer => {
    console.log('once', event);

    const wrappedHandler = (event: IEvent, data: IData) => {
      handler(event, data);
      dispose();
    };

    const dispose = () => this.off(event, wrappedHandler);

    this.on(event, wrappedHandler);

    return dispose;
  }

  off = (event: IEvent, handler: IHandler) => {
    console.log('off', event);
    this.subscribers[event] = this.subscribers[event].filter(h => h !== handler);
  }

  emit = (event: IEvent, data?: IData) => {
    console.log('emit', event);
    this.subscribers[event].forEach((handler: IHandler) => {
      handler(event, data);
    });
  }
}

export default new EventEmitter();
