/** Måste vara första importen i main.tsx: skyddar mot att lagringen kastar (alla kakor blockerade) innan något annat laddas. Se safe-storage.ts. */
import { installSafeStorage } from "./safe-storage";

installSafeStorage();
