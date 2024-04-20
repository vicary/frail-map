import type { StrongRef } from "./StrongRef.ts";

export type FrailContainer<V> = WeakRef<{ data: V }> | StrongRef<{ data: V }>;
