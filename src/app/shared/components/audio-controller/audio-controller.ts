// src/app/shared/components/audio-controller/audio-controller.ts
import {
  Component,
  ElementRef,
  ViewChild,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  AfterViewInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-audio-controller',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './audio-controller.html',
  styleUrls: ['./audio-controller.css'],
})
export class AudioController implements OnChanges, AfterViewInit {
  /** Si se provee 'src', el componente opera en modo interno (maneja el <audio>) */
  @Input() src: string | null = null;

  /** Para modo externo: tiempo actual y duración en segundos */
  @Input() currentTime: number | null = null;
  @Input() duration: number | null = null;

  /** Emite cuando el usuario busca (en segundos) */
  @Output() seek = new EventEmitter<number>();
  /** Emite cuando el audio termina (útil para pasar a la siguiente pista) */
  @Output() ended = new EventEmitter<void>();

  @ViewChild('audio') private audioRef?: ElementRef<HTMLAudioElement>;
  @ViewChild('bar') private barRef?: ElementRef<HTMLInputElement>;

  // Estado interno (si se usa <audio>)
  private _internalCurrent = 0;
  private _internalDuration = 0;
  private _pendingSeek: number | null = null;

  get isInternal(): boolean {
    return !!this.src;
  }

  /** Valores seguros que alimentan al input range */
  get safeCurrentTime(): number {
    if (this.isInternal) return this._internalCurrent || 0;
    return this.currentTime ?? 0;
  }
  get safeDuration(): number {
    if (this.isInternal) return this._internalDuration || 0;
    return this.duration ?? 0;
  }

  ngAfterViewInit(): void {
    // Inicializa el gradiente de progreso al montar
    this.updateProgressCSS(this.safeCurrentTime, this.safeDuration);
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Si estamos en modo externo, reflejar cambios entrantes en la barra
    if (!this.isInternal && (changes['currentTime'] || changes['duration'])) {
      this.updateProgressCSS(this.safeCurrentTime, this.safeDuration);
      // Actualiza el value del input para mantenerlo en sync
      const bar = this.barRef?.nativeElement;
      if (bar) {
        bar.min = '0';
        bar.max = String(this.safeDuration || 0);
        bar.value = String(this.safeCurrentTime || 0);
      }
    }
  }

  /** Input event (mientras arrastras) */
  handleInput(ev: Event): void {
    const bar = ev.target as HTMLInputElement;
    const val = Number(bar.value) || 0;
    const max = Number(bar.max) || 0;

    // Actualiza el relleno visual
    this.updateProgressCSS(val, max);

    // Guarda el seek pendiente
    this._pendingSeek = val;

    if (this.isInternal && this.audioRef?.nativeElement) {
      // En modo interno, aplicamos el seek inmediato mientras arrastras
      this.audioRef.nativeElement.currentTime = val;
      this._internalCurrent = val;
    }
  }

  /** Change event (cuando sueltas el drag o confirmas con teclado) */
  commitSeek(): void {
    if (this._pendingSeek == null) return;

    // En ambos modos emitimos el seek para que el padre reaccione si quiere
    this.seek.emit(this._pendingSeek);

    if (this.isInternal && this.audioRef?.nativeElement) {
      this.audioRef.nativeElement.currentTime = this._pendingSeek;
      this._internalCurrent = this._pendingSeek;
    }

    this._pendingSeek = null;
  }

  /** Eventos del <audio> (modo interno) */
  handleTimeUpdate(audio: HTMLAudioElement): void {
    this._internalCurrent = audio.currentTime || 0;
    this.updateProgressCSS(this._internalCurrent, this.safeDuration);
    // Mantén el value del input sincronizado
    const bar = this.barRef?.nativeElement;
    if (bar) bar.value = String(this._internalCurrent);
  }

  handleLoaded(audio: HTMLAudioElement): void {
    this._internalDuration = audio.duration || 0;
    // Asegura max correcto y progresos reiniciados
    const bar = this.barRef?.nativeElement;
    if (bar) {
      bar.max = String(this._internalDuration || 0);
      bar.value = '0';
    }
    this.updateProgressCSS(0, this._internalDuration);
  }

  handleEnded(): void {
    this.ended.emit();
  }

  /** Pinta el relleno de progreso con la CSS var --progress (WebKit) o solo sync para Firefox */
  private updateProgressCSS(value: number, max: number): void {
    const bar = this.barRef?.nativeElement;
    if (!bar || !isFinite(max) || max <= 0) {
      return;
    }
    const pct = Math.min(100, Math.max(0, (value / max) * 100));
    bar.style.setProperty('--progress', `${pct}%`);
  }
}
