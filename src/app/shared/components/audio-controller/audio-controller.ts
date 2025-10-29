// src/app/shared/components/audio-controller/audio-controller.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // <-- Necesario para directivas básicas

@Component({
  selector: 'app-audio-controller',
  standalone: true, // <-- ✨ HAZLO STANDALONE ✨
  imports: [CommonModule], // <-- ✨ IMPORTA CommonModule ✨
  templateUrl: './audio-controller.html',
  styleUrls: ['./audio-controller.css'],
})
export class AudioController {
  // ... (Tu lógica interna si la tienes) ...
}
