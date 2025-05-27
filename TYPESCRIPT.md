# TypeScript Setup for Link Shortener

This project has been set up with TypeScript to provide better type safety and developer experience.

## TypeScript Configuration

The TypeScript configuration is defined in `tsconfig.json` with the following key features:

- Strict type checking enabled
- Support for both JavaScript and TypeScript files
- Path aliases configured (e.g., `@/*` for `src/*`)
- Next.js plugin integration

## Converting Files from JS to TS

When converting files from JavaScript to TypeScript:

1. Rename the file extension:

   - `.js` to `.ts`
   - `.jsx` to `.tsx`

2. Add type annotations to function parameters and return types.

3. Create interfaces or types for data structures.

4. For React components, use appropriate types:

   ```tsx
   import { FC } from "react";

   interface MyComponentProps {
     title: string;
     count?: number;
   }

   const MyComponent: FC<MyComponentProps> = ({ title, count = 0 }) => {
     return (
       <div>
         <h1>{title}</h1>
         <p>Count: {count}</p>
       </div>
     );
   };
   ```

## Type Declarations

Custom type declarations are located in the `src/types` directory:

- `index.d.ts` - Global type declarations
- `env.d.ts` - Environment variable types
- `next-auth.d.ts` - Next Auth module augmentations

## ESLint Configuration

ESLint is configured to work with TypeScript via the `@typescript-eslint` plugin.

## Adding Types for External Libraries

If you need to add types for external libraries, install them using:

```bash
npm install --save-dev @types/library-name
```
