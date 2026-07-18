class AudioEngine {
  private ctx: AudioContext | null = null;
  public isMuted: boolean = false;
  private tempoMs: number = 800; // Base tempo

  public init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  }

  private currentBgmType: 'menu' | 'game' | 'result' | null = null;

  public toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      if (this.gameAudio) this.gameAudio.pause();
      if (this.menuAudio) this.menuAudio.pause();
      if (this.resultAudio) this.resultAudio.pause();
    } else {
      if (this.currentBgmType === 'game' && this.gameAudio) this.gameAudio.play().catch(()=>{});
      else if (this.currentBgmType === 'menu' && this.menuAudio) this.menuAudio.play().catch(()=>{});
      else if (this.currentBgmType === 'result' && this.resultAudio) this.resultAudio.play().catch(()=>{});
    }
    return this.isMuted;
  }

  public playTone(freq: number, type: OscillatorType, duration: number, vol: number) {
    if (this.isMuted || !this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = type;
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
    
    gain.gain.setValueAtTime(vol, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + duration);
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.start();
    osc.stop(this.ctx.currentTime + duration);
  }

  // --- Background Music System (MP3 File) ---
  private gameAudio: HTMLAudioElement | null = null;

  public startBGM(tempoMs: number = 800) {
    this.tempoMs = tempoMs;
    this.currentBgmType = 'game';
    if (this.isMuted) return;
    
    this.stopMenuBGM(); // Dừng nhạc sảnh chờ trước khi bật nhạc game
    
    if (!this.gameAudio) {
      this.gameAudio = new Audio('/game-bgm.mp3');
      this.gameAudio.loop = true;
      this.gameAudio.volume = 0.25;
    }
    
    this.gameAudio.play().catch(err => {
      console.warn("Autoplay prevented or file missing:", err);
    });
  }

  public stopBGM() {
    if (this.gameAudio) {
      this.gameAudio.pause();
      this.gameAudio.currentTime = 0;
    }
    this.stopMenuBGM();
  }
  
  public setBGMTension(isHighTension: boolean) {
    const newTempo = isHighTension ? 300 : 800;
    if (this.tempoMs !== newTempo) {
      this.tempoMs = newTempo;
      if (this.gameAudio) {
        // Tăng tốc độ phát nhạc khi căng thẳng (sắp hết giờ)
        this.gameAudio.playbackRate = isHighTension ? 1.25 : 1.0;
      }
    }
  }

  // --- Menu BGM (MP3 File) ---
  private menuAudio: HTMLAudioElement | null = null;
  private resultAudio: HTMLAudioElement | null = null;

  public startMenuBGM() {
    this.currentBgmType = 'menu';
    if (this.isMuted) return;
    this.stopResultBGM(); // Stop any leftover result music
    
    if (!this.menuAudio) {
      this.menuAudio = new Audio('/menu-bgm.mp3');
      this.menuAudio.loop = true;
      this.menuAudio.volume = 0.25; // Default volume for menu
    }
    
    // Play might fail if the browser blocks it, so we catch the promise
    this.menuAudio.play().catch(err => {
      console.warn("Autoplay prevented or file missing:", err);
    });
  }

  public stopMenuBGM() {
    if (this.menuAudio) {
      this.menuAudio.pause();
      this.menuAudio.currentTime = 0; // Reset to start
    }
  }

  // --- Result BGM ---
  public playResultBGM(result: 'win' | 'lose' | 'draw') {
    this.currentBgmType = 'result';
    if (this.isMuted) return;
    this.stopBGM(); // Ensure game music is off
    this.stopMenuBGM();
    
    if (this.resultAudio) {
      this.resultAudio.pause();
    }
    
    this.resultAudio = new Audio(`/${result}-bgm.mp3`);
    this.resultAudio.loop = true;
    this.resultAudio.volume = 0.25;
    
    this.resultAudio.play().catch(err => {
      console.warn("Autoplay prevented or file missing:", err);
    });
  }

  public stopResultBGM() {
    if (this.resultAudio) {
      this.resultAudio.pause();
      this.resultAudio.currentTime = 0;
    }
  }

  // --- SFX ---
  public playClick() {
    this.playTone(600, 'sine', 0.1, 0.1);
  }

  public playTick() {
    this.playTone(800, 'triangle', 0.05, 0.05);
  }

  public playGain() {
    this.playTone(1200, 'sine', 0.3, 0.1);
    setTimeout(() => this.playTone(1600, 'sine', 0.4, 0.1), 100);
  }

  public playLoss() {
    this.playTone(300, 'sawtooth', 0.4, 0.1);
    setTimeout(() => this.playTone(250, 'sawtooth', 0.5, 0.1), 150);
  }

  public playAlarm() {
    this.playTone(400, 'square', 0.5, 0.2);
    setTimeout(() => this.playTone(400, 'square', 0.5, 0.2), 300);
    setTimeout(() => this.playTone(400, 'square', 0.5, 0.2), 600);
  }
}

export const audio = new AudioEngine();
