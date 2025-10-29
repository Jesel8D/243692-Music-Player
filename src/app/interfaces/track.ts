// src/app/interfaces/track.ts (CORREGIDO)

import { Image } from './image'; // <-- ¡Importante!

export interface Track {
  id: string;
  name: string;
  duration_ms: number;
  href: string;
  artists: {
    id: string;
    name: string;
  }[];
  album: {
    id: string;
    name: string;
    images: Image[];
  };
}
