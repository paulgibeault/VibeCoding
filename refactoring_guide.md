# Token to Energy Core Refactoring Guide

This document outlines all the necessary changes to rename "Token" terminology to "Energy Core" throughout the codebase.

## File Renames Needed
- `js/tokens/Token.js` -> `js/energy-cores/EnergyCore.js`
- `js/tokens/EnergyToken.js` -> `js/energy-cores/BasicEnergyCore.js`
- `js/tokens/ChargedToken.js` -> `js/energy-cores/ChargedEnergyCore.js`

## Class Renames Needed
- `Token` base class -> `EnergyCore`
- `EnergyToken` -> `BasicEnergyCore`
- `ChargedToken` -> `ChargedEnergyCore`

## Variable/Property Renames in index.html
1. Player State:
   - `chargedTokens` -> `chargedCores`
   - `placedEnergyToken` -> `placedEnergyCore`

2. Element IDs:
   - `energyTokenBtn` -> `energyCoreBtn`
   - `chargedTokenBtn` -> `chargedCoreBtn`

3. Grid Cell Properties:
   - `token` property -> `core`
   - `token` in split operations -> `core`

## Function Renames in index.html
1. Core Functions:
   - `placeTokens()` -> `placeCores()`
   - `drawTokensAndSelections()` -> `drawCoresAndSelections()`
   - `drawEnergyToken()` -> `drawEnergyCore()`
   - `drawChargedToken()` -> `drawChargedCore()`

2. Variable Names in Functions:
   - `placedTokens` -> `placedCores`
   - `tokenQueue` -> `coreQueue`
   - `tokenParts` -> `coreParts`
   - `adjTokenParts` -> `adjCoreParts`
   - `tokenType` -> `coreType`

## String Literal Updates
1. Debug Messages:
   - "token" -> "core"
   - "tokens" -> "cores"
   - "Energy token" -> "Energy core"
   - "Charged token" -> "Charged core"

2. Type Strings:
   - `'energy'` type identifier can remain as is (represents the basic energy core type)
   - `'charged'` type identifier can remain as is (represents the charged energy core type)

## UI Text Updates
1. Button Labels:
   - "Energy Token" -> "Energy Core"
   - "Charged Token" -> "Charged Core"

2. Status Messages:
   - All instances of "token" -> "core"
   - All instances of "tokens" -> "cores"

## Implementation Notes
1. File moves should be done first to establish new structure
2. Class renames should be done next, updating all references
3. Variable and function renames can be done in batches by type
4. String literal updates should be done last
5. Thorough testing after each batch of changes is recommended 