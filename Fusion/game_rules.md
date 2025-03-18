# Energy Grid Game Rules

## Core Mechanics

### Core Types and Values
- Basic energy core has a value of 1
- Charged energy core has a value of 2
- When cores fuse, their values add together (e.g., 1+1=2, 2+2=4)
- Higher value cores are more powerful and can eliminate lower value opponent cores

### Core Placement System
- Each turn, players receive:
  - 1 free energy core (value 1) to place
  - Ability to place additional charged cores if available
- Players must place at least one energy core per turn
- Charged cores are limited by the player's available supply

### Core Interactions
1. **Fusion**
   - Any two adjacent friendly cores can fuse
   - Fusion creates a new core with combined value
   - Resulting core type matches the highest value component
   - Example: Energy(1) + Charged(2) = Charged(3)

2. **Elimination**
   - Higher value cores can eliminate adjacent lower value opponent cores
   - Eliminations can trigger chain reactions
   - Eliminated cores return to their owner as charged cores
   - Elimination value = eliminated core's value

### Strategic Elements
Players must balance:
- Creating high-value cores for power
- Risk of losing high-value cores
- When to use charged cores vs. saving them
- Placement strategy considering both immediate and future turns

### Visual Feedback
The player card displays:
- Current charged core count
- Visual representation of available charged cores
- Clear indication of available actions

## Game Flow

1. **Turn Start**
   - Player receives 1 free energy core
   - Player can place additional charged cores if available
   - Player places their cores on the grid

2. **Core Placement**
   - Place free energy core
   - Place any charged cores
   - Cores can fuse with adjacent friendly cores
   - Higher value cores can eliminate lower value opponent cores

3. **Elimination**
   - When a core is eliminated, it returns as a charged core
   - Charged cores are added to the player's supply
   - Chain reactions are processed in order of highest to lowest value

4. **Turn End**
   - Opponent's turn begins
   - Process repeats

## Strategic Considerations

### Charged Core Economy
- Players start with 0 charged cores
- Eliminated cores return as charged cores
- Placing a charged core decreases supply by 1
- Players must balance risk vs. reward when creating high-value cores

### Resource Management
- Deciding when to use charged cores
- Saving charged cores for critical moments
- Managing charged core supply
- Strategic timing of high-value core creation

### Placement Strategy
- Creating fusion opportunities
- Protecting valuable cores
- Setting up elimination chains
- Controlling key grid positions

## Implementation Notes

### UI Elements
- Player card display
- Charged core counter
- Core placement preview
- Turn phase indicators

### Animations
- Core placement
- Fusion effects
- Elimination effects
- Chain reaction effects

### Game State Tracking
- Charged core counts
- Core values
- Turn phase
- Player actions
- Grid state 