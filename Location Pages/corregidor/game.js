class ParatrooperGame {
  constructor() {
    this.canvas = document.getElementById('gameCanvas');
    this.ctx = this.canvas.getContext('2d');
    this.startButton = document.getElementById('startGame');
    this.scoreElement = document.getElementById('scoreValue');
    
    this.paratrooper = {
      x: this.canvas.width / 2,
      y: 50,
      width: 30,
      height: 40,
      speed: 5
    };
    
    this.obstacles = [];
    this.landingZones = [];
    this.score = 0;
    this.gameLoop = null;
    this.isGameRunning = false;
    
    this.keys = {
      left: false,
      right: false
    };

    // Bind event handlers so they can be removed later
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleWindowBlur = this.handleWindowBlur.bind(this);
    
    this.init();
  }
  
  init() {
    this.startButton.addEventListener('click', () => this.startGame());
    // Initial render
    this.draw();
  }
  
  startGame() {
    if (this.isGameRunning) return;
    this.isGameRunning = true;
    this.score = 0;
    this.scoreElement.textContent = this.score;
    this.obstacles = [];
    this.landingZones = [];
    this.paratrooper.y = 50;
    this.paratrooper.x = this.canvas.width / 2;
    this.resetKeys();
    
    // Create initial obstacles and landing zones
    this.createObstacles();
    this.createLandingZones();
    
    // Add event listeners
    document.addEventListener('keydown', this.handleKeyDown);
    document.addEventListener('keyup', this.handleKeyUp);
    window.addEventListener('blur', this.handleWindowBlur);
    
    // Start game loop
    this.gameLoop = setInterval(() => this.update(), 1000 / 60);
  }
  
  endGame() {
    this.isGameRunning = false;
    clearInterval(this.gameLoop);
    this.resetKeys();
    // Remove event listeners
    document.removeEventListener('keydown', this.handleKeyDown);
    document.removeEventListener('keyup', this.handleKeyUp);
    window.removeEventListener('blur', this.handleWindowBlur);
  }

  resetKeys() {
    this.keys.left = false;
    this.keys.right = false;
  }

  handleWindowBlur() {
    this.resetKeys();
  }
  
  createObstacles() {
    this.obstacles = [];
    const bandWidth = this.canvas.width * 0.8;
    const bandStart = (this.canvas.width - bandWidth) / 2;
    const safeZoneX = this.canvas.width / 2 - 100;
    const safeZoneY = 50 - 100;
    const safeZoneWidth = 30 + 200; // paratrooper width + 200px
    const safeZoneHeight = 40 + 200; // paratrooper height + 200px
    let attempts = 0;
    while (this.obstacles.length < 5 && attempts < 50) { // prevent infinite loop
      const x = Math.random() * (bandWidth - 60) + bandStart;
      const y = Math.random() * (this.canvas.height - 200) + 100;
      // Check if this obstacle is outside the safe zone
      const isSafe = (
        x + 60 < safeZoneX ||
        x > safeZoneX + safeZoneWidth ||
        y + 20 < safeZoneY ||
        y > safeZoneY + safeZoneHeight
      );
      if (isSafe) {
        this.obstacles.push({ x, y, width: 60, height: 20 });
      }
      attempts++;
    }
  }
  
  createLandingZones() {
    this.landingZones = [];
    for (let i = 0; i < 3; i++) {
      this.landingZones.push({
        x: Math.random() * (this.canvas.width - 80),
        y: this.canvas.height - 40,
        width: 80,
        height: 20
      });
    }
  }
  
  handleKeyDown(e) {
    if (e.key === 'ArrowLeft') this.keys.left = true;
    if (e.key === 'ArrowRight') this.keys.right = true;
  }
  
  handleKeyUp(e) {
    if (e.key === 'ArrowLeft') this.keys.left = false;
    if (e.key === 'ArrowRight') this.keys.right = false;
  }
  
  update() {
    // Move paratrooper
    if (this.keys.left) this.paratrooper.x -= this.paratrooper.speed;
    if (this.keys.right) this.paratrooper.x += this.paratrooper.speed;
    
    // Keep paratrooper in bounds
    this.paratrooper.x = Math.max(0, Math.min(this.canvas.width - this.paratrooper.width, this.paratrooper.x));
    
    // Move paratrooper down
    this.paratrooper.y += 2;
    
    // Check collisions
    this.checkCollisions();
    
    // Draw everything
    this.draw();
    
    // Check if game over
    if (this.paratrooper.y > this.canvas.height) {
      this.gameOver();
    }
  }
  
  checkCollisions() {
    // Check obstacle collisions
    for (let obstacle of this.obstacles) {
      if (this.checkCollision(this.paratrooper, obstacle)) {
        this.gameOver();
        return;
      }
    }
    
    // Check landing zone collisions
    for (let zone of this.landingZones) {
      if (this.checkCollision(this.paratrooper, zone)) {
        this.score += 100;
        this.scoreElement.textContent = this.score;
        this.paratrooper.y = 50;
        this.paratrooper.x = Math.random() * (this.canvas.width - this.paratrooper.width);
        this.createObstacles();
        return;
      }
    }
  }
  
  checkCollision(rect1, rect2) {
    return rect1.x < rect2.x + rect2.width &&
           rect1.x + rect1.width > rect2.x &&
           rect1.y < rect2.y + rect2.height &&
           rect1.y + rect1.height > rect2.y;
  }
  
  draw() {
    // Clear canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Draw paratrooper
    this.ctx.fillStyle = '#DB222A';
    this.ctx.fillRect(this.paratrooper.x, this.paratrooper.y, this.paratrooper.width, this.paratrooper.height);
    
    // Draw obstacles
    this.ctx.fillStyle = '#444';
    for (let obstacle of this.obstacles) {
      this.ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    }
    
    // Draw landing zones
    this.ctx.fillStyle = '#2ecc71';
    for (let zone of this.landingZones) {
      this.ctx.fillRect(zone.x, zone.y, zone.width, zone.height);
    }
  }
  
  gameOver() {
    this.endGame();
    alert(`Game Over! Your score: ${this.score}`);
  }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new ParatrooperGame();
}); 