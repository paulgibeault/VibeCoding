# Energy Grid Game Rules

## Core Mechanics

### Core Types and Values
- Basic energy core has a value of 1
- When cores fuse, their values add together (e.g., 1+1=2, 2+2=4)
- Higher value cores are more powerful and create more fragments when eliminated

### Energy Fragment System
- Eliminated cores break down into energy fragments
- Number of fragments created equals the core's value
- Examples:
  - Value 1 core → 1 fragment
  - Value 2 core → 2 fragments
  - Value 4 core → 4 fragments

### Regeneration Chamber
- Each player has a regeneration chamber on their player card
- Chamber status represents fragment count
- Fragments accumulate as cores are eliminated
- When a chamber is full (configurable size), fragements from eliminated cores are lost
- Players can see available fragments at all times

### Turn Structure
1. Players receive:
   - 1 free energy core (value 1) to place
   - Ability to convert fragments into additional cores
2. Fragment to Core Conversion:
   - n fragments = 1 energy core : for n=1,2
   - Players can convert as many fragments as desired during their turn
   - Conversion happens before placement
   - Converted cores are placed immediately, or get returned as fragements to the chamber

### Strategic Elements
Players must balance:
- Creating high-value cores for power
- Risk of losing high-value cores forcing them to regenerate
- When to convert fragments vs. saving them for later
- Placement strategy considering both immediate and future turns

### Visual Feedback
The regeneration chamber displays:
- Current fragment count
- Visual representation of fragments
- Conversion animation when fragments become cores
- Clear indication of available actions

## Game Flow

1. **Turn Start**
   - Player receives 1 free energy core
   - Player can convert fragments to additional cores
   - Player places their cores on the grid

2. **Core Placement**
   - Place free energy core
   - Place any converted cores
   - Cores can fuse with adjacent friendly cores
   - Higher value cores can eliminate lower value opponent cores

3. **Elimination**
   - When a core is eliminated, it creates fragments
   - Fragments are added to the opponent's regeneration chamber
   - Number of fragments equals the eliminated core's value

4. **Turn End**
   - Opponent's turn begins
   - Process repeats

## Strategic Considerations

### Fragment Economy
- 1 fragments needed to create 1 new core
- Eliminating 2 value 1 cores = 2 new cores
- Eliminating 1 value 4 core = 4 new cores
- Players must balance risk vs. reward when creating high-value cores

### Resource Management
- Deciding when to convert fragments
- Saving fragments for critical moments
- Managing fragment accumulation
- Strategic timing of high-value core creation

### Placement Strategy
- Creating fusion opportunities
- Protecting valuable cores
- Setting up elimination chains
- Controlling key grid positions

## Implementation Notes

### UI Elements
- Regeneration chamber display
- Fragment counter
- Conversion interface
- Core placement preview
- Turn phase indicators

### Animations
- Fragment creation
- Fragment to core conversion
- Core placement
- Fusion effects
- Elimination effects

### Game State Tracking
- Fragment counts
- Core values
- Turn phase
- Player actions
- Grid state 