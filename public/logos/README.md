# Society Logos

Add your society logo images here with these filenames:

## Current Logos (in code)
1. `filmmaking.png` - Film Making Society
2. `hindu-society.png` - Manchester Hindu Society  
3. `love-society.png` - Love Society (heart logo)
4. `baking.png` - Baking Society
5. `awm.png` - Asset & Wealth Management Society
6. `isoc.png` - ISOC

## Additional Logos (add to code when ready)
7. `ba-econ.png` - BA Econ Society
8. `drama.png` - Drama Society (mask logo)
9. `psychology.png` - Psychology Society
10. `acs.png` - African Caribbean Society
11. `board-games.png` - UoM Board Games Society

## Requirements
- Square images (recommended: 200x200px or larger)
- PNG format preferred
- Logos display in 56x56px circular frames

## To add more logos to the landing page:

Edit `/src/app/(landing)/page.tsx` and add to the `orbitingLogos` array:

```tsx
const orbitingLogos = [
  // ... existing logos ...
  { id: 7, src: '/logos/ba-econ.png', name: 'BA Econ', position: 'top-4 left-1/3', delay: 0.6 },
  { id: 8, src: '/logos/drama.png', name: 'Drama', position: 'bottom-16 left-1/4', delay: 0.7 },
  // etc.
];
```

Position classes: `top-X`, `bottom-X`, `left-X`, `right-X`, `-left-X` (negative for outside container)
