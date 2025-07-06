import type TypedEmitter from 'typed-emitter';
import { type EventMap } from 'typed-emitter';
import EventEmitter, { on } from 'events';

import { type Message } from './schema';

export const EventTypes = {
  NEW_MESSAGE: 'NEW_MESSAGE',
  TYPING_STARTED: 'TYPING_STARTED',
  TYPING_STOPPED: 'TYPING_STOPPED',
} as const;

export type EventType = (typeof EventTypes)[keyof typeof EventTypes];

export type ChatEventMap = {
  [EventTypes.NEW_MESSAGE]: (message: Message) => void;
  [EventTypes.TYPING_STARTED]: (userId: number, roomId: string) => void;
  [EventTypes.TYPING_STOPPED]: (userId: number, roomId: string) => void;
};

export type ChatEventEmitter = TypedEmitter<ChatEventMap>;

class EventService {
  private static instance: EventService;
  private rooms: Map<string, ChatEventEmitter> = new Map();

  static getInstance(): EventService {
    if (!EventService.instance) {
      EventService.instance = new EventService();
    }
    return EventService.instance;
  }

  /**
   * Get or create an event emitter for a specific room
   */
  getRoomEmitter(roomId: string): ChatEventEmitter {
    if (!this.rooms.has(roomId)) {
      this.rooms.set(roomId, new EventEmitter() as ChatEventEmitter);
    }
    return this.rooms.get(roomId)!;
  }

  /**
   * Generic emit method for any event type
   */
  emit<K extends keyof ChatEventMap>(
    roomId: string,
    event: K,
    ...args: Parameters<ChatEventMap[K]>
  ): void {
    const emitter = this.getRoomEmitter(roomId);
    emitter.emit(event, ...args);
  }

  /**
   * Generic subscribe method for any event type
   */
  subscribe<K extends keyof ChatEventMap>(
    roomId: string,
    event: K,
    options?: { signal?: AbortSignal }
  ): AsyncIterableIterator<Parameters<ChatEventMap[K]>> {
    const emitter = this.getRoomEmitter(roomId);
    return this.typedOn(emitter, event, options);
  }

  /**
   * Type-safe event listener using Node.js events.on
   */
  private typedOn<E extends EventMap, K extends keyof E>(
    emitter: TypedEmitter<E>,
    event: K,
    options?: { signal?: AbortSignal }
  ): AsyncIterableIterator<Parameters<E[K]>> {
    return on(
      emitter as any,
      event as string,
      options
    ) as AsyncIterableIterator<Parameters<E[K]>>;
  }
}

export const eventService = EventService.getInstance();
