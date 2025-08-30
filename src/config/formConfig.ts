import { Chapter } from '../types/form';

export const formConfig: Chapter[] = [
  {
    id: 'personal',
    title: 'Personal Information',
    screens: [
      {
        id: 'basic',
        title: 'Basic Details',
        questions: [
          {
            id: 'name',
            type: 'text',
            text: 'What is your full name?',
            required: true
          },
          {
            id: 'age',
            type: 'text',
            text: 'What is your age?',
            required: true
          }
        ]
      },
      {
        id: 'preferences',
        title: 'Preferences',
        questions: [
          {
            id: 'notification',
            type: 'radio',
            text: 'How would you like to be notified?',
            required: true,
            options: ['Email', 'SMS', 'Push Notification']
          },
          {
            id: 'interests',
            type: 'checkbox',
            text: 'What are your interests?',
            required: true,
            options: ['Sports', 'Music', 'Reading', 'Travel']
          }
        ]
      }
    ]
  }
];
