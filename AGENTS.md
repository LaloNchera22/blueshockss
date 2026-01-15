# BlueShocks AI Guidelines

## Tech Stack
- **Framework:** Next.js 14+ (App Router). Use `revalidatePath` for data mutation.
- **Database:** Supabase. Use Server Actions (`@/utils/supabase/server`) for backend logic.
- **Styling:** Tailwind CSS.

## Coding Principles
1.  **Mobile First:** Always design for mobile (`w-full`) first, then scale up with `md:` or `lg:`. Never use fixed widths like `w-[500px]`.
2.  **Server Actions:** Do not use API Routes (`/pages/api`). Use `use server` actions in `actions.ts` files co-located with features.
3.  **Graceful Degradation:** Free users see the same UI as Pro users, but locked/disabled. Use `opacity-50` and lock icons instead of hiding content.
4.  **No "Rewrite":** Refactor existing components progressively. Do not delete and start from scratch unless specified.

## Directory Structure
- `/app`: All pages and layout.
- `/components`: Reusable UI. 
- `/utils`: Supabase clients.
