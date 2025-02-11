class MainScene extends Phaser.Scene {
    // Define game assets and properties
    assets = {
        bird: undefined,  // The player's character (bird)
        pipes: [],        // Array to store pipe obstacles
        pipeSpeed: -150,  // Speed at which pipes move leftward
        score: 0,         // Player's score
        scoreText: undefined, // Reference to score display text
    };

    constructor() {
        super({ key: 'MainScene' }); // Assigns a unique key to this scene
    }

    create() {
        // Set the background image and scale it to fit the screen
        this.add.image(0, 0, 'sky')
            .setOrigin(0, 0) // Top-left alignment
            .setDisplaySize(this.game.config.width, this.game.config.height); // Resize to cover the screen

        // Create the bird (player) with physics enabled
        this.assets.bird = this.physics.add.sprite(
            this.game.config.width / 10, // X-position (left side of the screen)
            this.game.config.height / 2, // Y-position (center of the screen)
            'bird' // Sprite key (should be preloaded)
        );
        
        this.assets.bird.body.gravity.y = 600; // Apply gravity to simulate falling

        // Display the score at the top-left corner
        this.assets.scoreText = this.add.text(20, 20, 'Score: 0', {
            fontSize: '24px',
            fill: '#fff', // White text color
        });

        // Add input listener: when SPACE is pressed, the bird jumps
        this.input.keyboard.on('keydown-SPACE', () => {
            this.assets.bird.setVelocityY(-250); // Move bird upwards
        });

        // Create a repeating event that spawns pipes every 1.5 seconds
        this.time.addEvent({
            delay: 1500, // Delay between pipe spawns
            callback: this.spawnPipes, // Function to call
            callbackScope: this, // Keep 'this' reference correct
            loop: true, // Repeat indefinitely
        });

        // Detect collision between the bird and the pipes, triggering game over
        this.physics.add.collider(this.assets.bird, this.assets.pipes, this.gameOver, null, this);
    }

    update() {
        // Check if the bird hits the ground (game over condition)
        if (this.assets.bird.y >= this.game.config.height) {
            this.gameOver();
        }

        // Remove pipes that have moved off-screen to free memory
        this.assets.pipes.forEach((pipe, index) => {
            if (pipe.x < -50) { // If the pipe moves beyond the left edge
                pipe.destroy(); // Remove from the game
                this.assets.pipes.splice(index, 1); // Remove from the array
                this.increaseScore(); // Increase score when successfully passed
            }
        });
    }

    spawnPipes() {
        // Define gap size for bird to pass through
        const gapSize = 125; 
        // Random height for the top pipe, ensuring the bottom pipe fits
        const topPipeHeight = Phaser.Math.Between(50, this.game.config.height - gapSize - 100);
        const bottomPipeY = topPipeHeight + gapSize; // Position for the bottom pipe

        // Create the top pipe, positioned at the right edge of the screen
        const topPipe = this.physics.add.sprite(this.game.config.width, topPipeHeight, 'pipe').setOrigin(0, 1);
        // Create the bottom pipe at the calculated position
        const bottomPipe = this.physics.add.sprite(this.game.config.width, bottomPipeY, 'pipe').setOrigin(0, 0);

        // Move both pipes leftward
        topPipe.body.velocity.x = this.assets.pipeSpeed;
        bottomPipe.body.velocity.x = this.assets.pipeSpeed;

        // Add pipes to the tracking array
        this.assets.pipes.push(topPipe, bottomPipe);

        // Detect collision between the bird and the pipes
        this.physics.add.collider(this.assets.bird, topPipe, this.gameOver, null, this);
        this.physics.add.collider(this.assets.bird, bottomPipe, this.gameOver, null, this);
    }

    increaseScore() {
        this.assets.score += 1; // Increase score
        this.assets.scoreText.setText(`Score: ${this.assets.score}`); // Update score display
    }

    gameOver() {
        this.assets.score=0;
        this.physics.pause(); // Stop all physics movements
        this.assets.bird.setTint(0xff0000); // Turn bird red to indicate failure
        this.time.delayedCall(1000, () => {
            this.scene.restart(); // Restart the scene after 1 second
        });
    }
}

export default MainScene;
