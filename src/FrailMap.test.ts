import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { FrailMap } from "./FrailMap.ts";

Deno.test({
  name: "FrailMap",
  fn: async () => {
    const keys: string[] = [];
    const map = new FrailMap<string, Record<string, string>>();

    for (let i = 0; i < 100_000; i++) {
      const key = crypto.randomUUID();
      const value: Record<string, string> = {
        [crypto.randomUUID()]: crypto.randomUUID(),
        [crypto.randomUUID()]: crypto.randomUUID(),
        [crypto.randomUUID()]: crypto.randomUUID(),
        [crypto.randomUUID()]: crypto.randomUUID(),
        [crypto.randomUUID()]: crypto.randomUUID(),
        [crypto.randomUUID()]: crypto.randomUUID(),
        [crypto.randomUUID()]: crypto.randomUUID(),
        [crypto.randomUUID()]: crypto.randomUUID(),
        [crypto.randomUUID()]: crypto.randomUUID(),
        [crypto.randomUUID()]: crypto.randomUUID(),
        [crypto.randomUUID()]: crypto.randomUUID(),
      };

      map.set(key, value);

      keys.push(key);

      // Give it some time for GC to happen.
      if (i % 500 === 0) {
        await new Promise((r) => setTimeout(r, 100));
      }

      // Trigger keys disposal
      map.keys();

      if (map.size < keys.length) {
        break;
      }
    }

    assertEquals(map.size < keys.length, true);
  },
});
