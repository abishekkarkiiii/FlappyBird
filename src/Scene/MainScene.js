import MenuScene from "./MenuScene";

class MainScene extends Phaser.Scene {
    // Define game assets and properties
    assets = {
        bird: undefined,  // The player's character (bird)
        pipes: [],        // Array to store pipe obstacles
        pipeSpeed: -150,  // Speed at which pipes move leftward
        score: 0,         // Player's score
        scoreText: undefined, // Reference to score display text
        pause:undefined,
        bestscore:localStorage.getItem("bestScore"),
        bestscoreText:undefined,
        pipemaker:undefined
    
    };

    constructor() {
        super({ key: 'MainScene' }); // Assigns a unique key to this scene
    }

    create() {
        // this.scene.launch('MenuScene');
 
        // Set the background image and scale it to fit the screen
        this.add.image(0, 0, 'sky')
            .setOrigin(0, 0) // Top-left alignment
            .setDisplaySize(this.game.config.width, this.game.config.height); // Resize to cover the screen

        // Create the bird (player) with physics enabled
        // this.assets.bird = this.physics.add.sprite(
        //     this.game.config.width / 10, // X-position (left side of the screen)
        //     this.game.config.height / 2, // Y-position (center of the screen)
        //     'bird' // Sprite key (should be preloaded)
        // );// Top-left alignment



        this.assets.pause=this.add.image(this.game.config.width-30, this.game.config.height-30, 'pause').setOrigin(0.5, 0.5).setScale(2);
        this.assets.pause.setDepth(5);
        this.assets.pause.setInteractive();
     
        this.createMenu();

        this.anims.create({
            key: "birdd",
            frames: this.anims.generateFrameNumbers("birdd", { start: 8, end: 15 }), // First row (frames 0-3)
            frameRate: 10,
            repeat: -1, // Loop animation
        });
        this.assets.bird = this.physics.add.sprite(200, 300, "birdd").setScale(3).setSize(15, 8).setOffset(0, 3);
        this.assets.bird.flipX = true
        this.assets.bird.play("birdd");

        this.assets.pause.on('pointerdown',()=>{
        
                this.physics.pause();
                this.assets.pipemaker.paused = true;
                this.assets.bird.anims.pause();
                this.showMenu();
                
            }
    
        )

          




       



        this.assets.bird.body.gravity.y = 600; // Apply gravity to simulate 
        
        // this.assets.bird.setCollideWorldBounds(true);  
        // this.assets.bird.body.onWorldBounds = true;
        // // Listen for collision with world boundslll
        // this.physics.world.on('worldbounds', (body) => {
        //     if (body.gameObject === this.assets.bird) { 
        //         this.assets.bird.setY(9); // Move bird back to starting position
        //         this.assets.bird.setVelocity(0); // Stop any movement
        
        //         // ✅ Reapply gravity
        //         this.assets.bird.body.setAllowGravity(true);
        //         this.assets.bird.body.setVelocityY(50);  
        //          // Call game over function or perform action
        //     }
        // });




        // Display the score at the top-left corner  
        this.assets.scoreText = this.add.text(20, 20, 'Score: 0', {
            fontSize: '24px',
            fill: '#fff', // White text color
        }).setDepth(10);


        this.assets.bestscoreText = this.add.text(20, 45, `High-Score:${this.assets.bestscore} `, {
            fontSize: '24px',
            fill: '#fff', // White text color
        }).setDepth(10);

        // Add input listener: when SPACE is pressed, the bird jumps
        this.input.keyboard.on('keydown-SPACE', () => {
            this.assets.bird.setVelocityY(-250); // Move bird upwards
        });

        // Create a repeating event that spawns pipes every 1.5 seconds
       this.assets.pipemaker= this.time.addEvent({
            delay: 2000, // Delay between pipe spawns
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

        if (this.assets.bird.y <= 0) {
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
        this.assets.scoreText.setText(`Score: ${this.assets.score}`);
         // Update score display
    }

    gameOver() {
        if(this.assets.bestscore<=this.assets.score){
            this.assets.bestscore=this.assets.score;
            localStorage.setItem('bestScore',this.assets.bestscore)
            this.assets.bestscoreText.setText(`HighScore: ${this.assets.bestscore}`);
        }
        this.assets.score = 0; 
        this.physics.pause(); // Stop all physics movements
        this.assets.bird.setTint(0xff0000); 
        this.time.delayedCall(1000, () => {
            this.showMenu(true);// Restart the scene after 1 second
        });
    }

    createMenu() {
        // 1️⃣ Create a semi-transparent background rectangle
        this.menuBg = this.add.rectangle(
            this.game.config.width / 2, 
            this.game.config.height / 2, 
            300, 200,  // Width & Height
            0x000000,  // Black color
            0.7        // Transparency (alpha)
        ).setOrigin(0.5).setDepth(10);
    
        // 2️⃣ Add a "Start Game" button text
        this.startButton = this.add.text(
            this.game.config.width / 2, 
            this.game.config.height / 2, 
            'Continue', 
            { fontSize: '24px', fill: '#fff', backgroundColor: '#444', padding: { x: 10, y: 5 } }
        ).setOrigin(0.5)
        .setInteractive().setDepth(10);
        
        this.restartButton = this.add.text(
            this.game.config.width / 2, 
            this.game.config.height / 2, 
            'Restart', 
            { fontSize: '24px', fill: '#fff', backgroundColor: '#444', padding: { x: 10, y: 5 } }
        ).setOrigin(0.5)
        .setInteractive().setDepth(10); // Make text clickable

          this.menuButton = this.add.text(
            this.game.config.width / 2, 
            this.game.config.height / 2+40, 
            'Menu', 
            { fontSize: '24px', fill: '#fff', backgroundColor: '#444', padding: { x: 10, y: 5 } }
        ).setOrigin(0.5)
        .setInteractive().setDepth(10);
        
        
        
        this.menuButton.on('pointerdown', () => {
            this.scene.start('MenuScene')
             // Hide menu when game starts
        });

        this.restartButton.on('pointerdown', () => {
            this.scene.start('MainScene')
             // Hide menu when game starts
        });
        // 3️⃣ Add a click event to start the game
        this.startButton.on('pointerdown', () => {
            this.physics.resume();
            this.assets.pipemaker.paused = false;
            this.assets.bird.anims.resume();
            this.hideMenu();
             // Hide menu when game starts
        });
       
    
        // Hide menu at the beginning
        this.hideMenu();
    }
    
    // Function to show the menu
    showMenu(gameOverCheck) {
        if(gameOverCheck){
            this.menuBg.setVisible(true);
            this.restartButton.setVisible(true);
            this.menuButton.setVisible(true);
        }else{
            this.menuBg.setVisible(true);
            this.startButton.setVisible(true);
            this.menuButton.setVisible(true);
        }
     
    }
    
    // Function to hide the menu
    hideMenu() {
        this.menuBg.setVisible(false);
        this.startButton.setVisible(false);
        this.menuButton.setVisible(false);
        this.restartButton.setVisible(false);
    }
    
   

}

export default MainScene;
