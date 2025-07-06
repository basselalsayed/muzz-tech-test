import { nanoid } from 'nanoid';

import { type Message } from './schema';

export function seedChat(db: Map<string, Message[]>) {
  db.set('1-2', [
    {
      content: "Hey there! How's it going?",
      id: nanoid(),
      recipientId: 2,
      senderId: 1,
      timestamp: '2025-01-15T10:30:00.000Z',
    },
    {
      content: 'Pretty good! Just working on some code. How about you?',
      id: nanoid(),
      recipientId: 1,
      senderId: 2,
      timestamp: '2025-01-15T10:32:00.000Z',
    },
    {
      content:
        "Same here! Working on this new chat feature. It's coming along nicely.",
      id: nanoid(),
      recipientId: 2,
      senderId: 1,
      timestamp: '2025-01-15T10:35:00.000Z',
    },
    {
      content: "That sounds exciting! Can't wait to see it in action.",
      id: nanoid(),
      recipientId: 1,
      senderId: 2,
      timestamp: '2025-01-15T10:37:00.000Z',
    },
    {
      content:
        'Thanks! Should be ready for testing soon. Want to be my first beta tester?',
      id: nanoid(),
      recipientId: 2,
      senderId: 1,
      timestamp: '2025-01-15T10:40:00.000Z',
    },
    {
      content: "Absolutely! I'd love to help test it out.",
      id: nanoid(),
      recipientId: 1,
      senderId: 2,
      timestamp: '2025-01-15T11:45:00.000Z', // Over 1 hour later
    },
    {
      content: "Great! I'll send you the beta version soon.",
      id: nanoid(),
      recipientId: 2,
      senderId: 1,
      timestamp: '2025-01-15T11:47:00.000Z', // 2 minutes later
    },
    {
      content: 'Perfect timing!',
      id: nanoid(),
      recipientId: 1,
      senderId: 2,
      timestamp: '2025-01-15T11:47:15.000Z', // 15 seconds later (same user)
    },
    {
      content: 'Looking forward to it!',
      id: nanoid(),
      recipientId: 1,
      senderId: 2,
      timestamp: '2025-01-15T11:47:25.000Z', // 10 seconds later (same user)
    },
  ]);

  db.set('2-3', [
    {
      content: 'Hi! Are you free for a quick call?',
      id: nanoid(),
      recipientId: 3,
      senderId: 2,
      timestamp: '2025-01-15T14:00:00.000Z',
    },
    {
      content: "Sure! What's up?",
      id: nanoid(),
      recipientId: 2,
      senderId: 3,
      timestamp: '2025-01-15T14:02:00.000Z',
    },
    {
      content: 'Need to discuss the project timeline',
      id: nanoid(),
      recipientId: 3,
      senderId: 2,
      timestamp: '2025-01-15T14:03:00.000Z',
    },
    {
      content: 'Got it, let me check my calendar',
      id: nanoid(),
      recipientId: 2,
      senderId: 3,
      timestamp: '2025-01-15T14:04:00.000Z',
    },
    {
      content: 'Perfect, thanks!',
      id: nanoid(),
      recipientId: 3,
      senderId: 2,
      timestamp: '2025-01-15T14:04:10.000Z', // 10 seconds later (same user)
    },
    {
      content: "I'm available tomorrow at 2pm",
      id: nanoid(),
      recipientId: 2,
      senderId: 3,
      timestamp: '2025-01-16T09:00:00.000Z', // Over 1 hour later (next day)
    },
    {
      content: 'That works for me!',
      id: nanoid(),
      recipientId: 3,
      senderId: 2,
      timestamp: '2025-01-16T09:01:00.000Z',
    },
    {
      content: 'Great! See you then',
      id: nanoid(),
      recipientId: 2,
      senderId: 3,
      timestamp: '2025-01-16T09:01:15.000Z', // 15 seconds later (same user)
    },
  ]);

  db.set('1-3', [
    {
      content: "Hey! How's the new feature coming along?",
      id: nanoid(),
      recipientId: 3,
      senderId: 1,
      timestamp: '2025-01-15T16:00:00.000Z',
    },
    {
      content: "It's going well! Almost ready for review",
      id: nanoid(),
      recipientId: 1,
      senderId: 3,
      timestamp: '2025-01-15T16:05:00.000Z',
    },
    {
      content: "Excellent! Can't wait to see it",
      id: nanoid(),
      recipientId: 3,
      senderId: 1,
      timestamp: '2025-01-15T16:06:00.000Z',
    },
    {
      content: 'Thanks! Should be done by tomorrow',
      id: nanoid(),
      recipientId: 1,
      senderId: 3,
      timestamp: '2025-01-15T16:07:00.000Z',
    },
    {
      content: 'Perfect timing!',
      id: nanoid(),
      recipientId: 1,
      senderId: 3,
      timestamp: '2025-01-15T16:07:12.000Z', // 12 seconds later (same user)
    },
    {
      content: 'Looking forward to it!',
      id: nanoid(),
      recipientId: 1,
      senderId: 3,
      timestamp: '2025-01-15T16:07:18.000Z', // 6 seconds later (same user)
    },
    {
      content: "Great! I'll send you the PR link",
      id: nanoid(),
      recipientId: 3,
      senderId: 1,
      timestamp: '2025-01-16T10:00:00.000Z', // Over 1 hour later (next day)
    },
    {
      content: "Perfect! I'll review it right away",
      id: nanoid(),
      recipientId: 1,
      senderId: 3,
      timestamp: '2025-01-16T10:02:00.000Z',
    },
  ]);
}
