# NoteFlow

### Your seamless solution for organized and efficient note-taking.

### Overview of NoteFlow

**Purpose:**
NoteFlow is a note-taking application designed to help users capture, organize, and remember information efficiently.

**Key Components:**
1. **Frontend:**
   - Built using React with Next.js for server-side rendering and API routes.
   - Utilizes Tailwind CSS for styling.
   - Components are organized in the `/src/components` directory, including forms for adding and editing notes, and visual effects like the aurora background.

2. **Backend:**
   - Backend logic is handled via Next.js API routes found in the `/src/pages/api` directory.
   - MongoDB is used for data storage, with connection logic in `connectDB.js`.

3. **Authentication:**
   - NextAuth is used for user authentication, with session management in `useSession` from `next-auth/react`.

4. **State Management:**
   - Uses React's `useState` and `useEffect` hooks for managing state within components.
   - Utilizes TanStack Query for data fetching and caching.

5. **UI Effects:**
   - Includes dynamic UI elements like a flip words effect and an aurora background.

### Key Files:
- **`/src/pages/index.js`**: Main landing page.
- **`/src/components/NoteCard.js`**: Displays individual notes with options to edit or delete.
- **`/src/pages/api/notes.js`**: Handles API requests for fetching notes.
- **`tailwind.config.js`**: Tailwind CSS configuration for custom themes and animations.

### Additional Notes:
- **Configuration Files**: Includes standard configuration files like `.eslintrc.json`, `tailwind.config.js`, and `next.config.mjs`.
- **Dependencies**: Managed with `package.json` and `package-lock.json`.

For more details, you can explore the repository directly: [NoteFlow GitHub Repository](https://github.com/gearHead87/noteflow/).