# Fusion

A strategic battle game where players compete to create powerful energy cores through fusion reactions and eliminate opponent cores.

## How to Play

### Game Objective
Score the most points by creating fusions and eliminating opponent cores. The game ends when a player reaches 20 points.

### Turn Structure
1. Your first placed core each turn is automatically an Energy Core
2. Any additional cores placed are Charged Cores (using your available supply)
3. Click "End Turn" to confirm placement

### Core Types
- **Energy Core**: Basic core with value 1
- **Charged Core**: Advanced core with value 2

### Core Interactions
- **Fusion (Same Cores)**: When you place a core orthogonally adjacent (not diagonally) to your own cores, they fuse into a single core at the placement location. The value of the new core is the sum of the fused cores.
- **Elimination (Different Cores)**: When a core is adjacent to an opponent's core of lower value, the opponent's core is eliminated and returned to their owner as a charged core.

### Scoring
- Score increases by the sum of eliminated cores' values
- Energy Core elimination: 1 point
- Charged Core elimination: 3 points

### Charged Cores
- Players start with 0 charged cores
- Placing a charged core decreases your charged core count by 1
- When your cores are eliminated, they are returned to you as charged cores

## Code Architecture

### Core Components

#### Game State Management
- `GameState` class manages the overall game state
- Tracks current player, grid state, and game progress
- Handles player switching and game reset functionality

#### Game Rules
- `GameRules` class implements game logic and validation
- Handles token placement validation
- Manages fusion calculations and elimination checks
- Controls game end conditions and winner determination

#### Rendering System
- `GameRenderer` class handles all visual aspects
- Manages canvas rendering and animations
- Implements particle effects and visual feedback

#### Event Management
- `GameEventManager` handles game events and callbacks
- Manages user interactions and game state updates
- Coordinates between different game components

### Key Features
- Responsive canvas-based rendering
- Smooth animations for core interactions
- Mobile-friendly design
- Comprehensive game state validation
- Modular architecture for easy extension

## Technical Implementation

### Game Loop
1. User selects cells for token placement
2. End turn triggers token placement and interaction processing
3. Core interactions (fusions and eliminations) are processed
4. Game state is updated and rendered
5. Turn switches to next player

### State Management
- Game state is maintained in a centralized `GameState` object
- All state changes are validated through the `GameRules` class
- State updates trigger appropriate UI updates and animations

### Rendering Pipeline
1. Clear canvas
2. Draw grid
3. Render tokens with appropriate effects
4. Apply animations and particle effects
5. Update UI elements

## Development

### Project Structure
```
Fusion/
├── js/
│   ├── core/
│   │   └── GameState.js
│   ├── rules/
│   │   └── GameRules.js
│   ├── rendering/
│   │   └── GameRenderer.js
│   ├── events/
│   │   └── GameEventManager.js
│   └── Game.js
└── index.html
```

### Dependencies
- Modern web browser with JavaScript enabled
- Canvas API support
- No external dependencies required

## Credits

This game was developed with assistance from Claude 3.5 Sonnet, an AI coding assistant that helped with:
- Code architecture and organization
- Game logic implementation
- Bug fixes and optimizations
- Documentation and README creation 