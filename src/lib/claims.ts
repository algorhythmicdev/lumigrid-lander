export const claims = [
  {
    key: 'zones',
    title: 'Zones',
    text: 'Control parts of a sign separately or together.'
  },
  {
    key: 'scenes',
    title: 'Scenes',
    text: 'Save favourite looks and reuse them.'
  },
  {
    key: 'schedule',
    title: 'Schedule',
    text: 'Plan the day on a simple timeline.'
  },
  {
    key: 'sync',
    title: 'Sync',
    text: 'Chases and fades line up end to end.'
  },
  {
    key: 'web_app',
    title: 'Web app',
    text: 'Open in your browser; nothing to install.'
  },
  {
    key: 'failsafe_resume',
    title: 'Reliable',
    text: 'After power returns, the last scene resumes.'
  }
] as const;

export type ClaimKey = (typeof claims)[number]['key'];
