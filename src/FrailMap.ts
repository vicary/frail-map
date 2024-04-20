import type { FrailContainer } from "./FrailContainer.ts";
import { StrongRef } from "./StrongRef.ts";

export type SetOptions = {
  /** Use strong reference for this value. */
  strong?: boolean;
};

if (typeof WeakRef === "undefined") {
  console.warn(
    `WeakRef is not available at this environment, falling back to simple object references.`,
  );
}

/**
 * Strong limbs with a weak grab, a WeakMap that supports scalars.
 *
 * `size` is not updated until a disposed object is accessed via one of
 * these methods: `has`, `get`, `entries`, `forEach`, `keys` or `values`.
 */
export class FrailMap<K, V> extends Map<K, V> {
  constructor(entries?: readonly (readonly [K, V])[] | null) {
    super();

    if (entries) {
      for (const [k, v] of entries) {
        this.set(k, v);
      }
    }
  }

  /**
   * Returns a specified element from the Map object. If the value that is
   * associated to the provided key is an object, then you will get a reference
   * to that object and any change made to that object will effectively modify
   * it inside the Map.
   *
   * @returns Returns the element associated with the specified key. If no
   * element is associated with the specified key or the value has been garbage
   * collected, undefined is returned.
   */
  get(key: K): V | undefined {
    const ref = super.get(key) as FrailContainer<V> | undefined;
    const val = ref?.deref();
    if (val === undefined) {
      this.delete(key);
      return;
    }

    return val.data;
  }

  /**
   * @returns boolean indicating whether an element with the specified key
   * exists or not, updates size if value has been garbage collected.
   */
  has(key: K): boolean {
    return super.has(key) && this.get(key) !== undefined;
  }

  /**
   * Adds a new element with a specified key and value to the Map. If an element
   * with the same key already exists, the element will be updated.
   *
   * A `strong` option can be provided to use a strong reference to act like a
   * normal map.
   */
  set(key: K, value: V, options?: SetOptions): this {
    return super.set(
      key,
      (options?.strong || typeof WeakRef === "undefined"
        ? new StrongRef({ data: value })
        : new WeakRef({ data: value })) as V,
    );
  }

  /**
   * Executes a provided function once per each key/value pair in the Map, in
   * insertion order.
   */
  forEach(
    callbackfn: (value: V, key: K, map: Map<K, V>) => void,
    thisArg?: this,
  ): void {
    super.forEach((container, k) => {
      const ref = (container as FrailContainer<V>).deref();
      if (ref !== undefined) {
        callbackfn.call(thisArg, ref.data, k, this);
      } else {
        this.delete(k);
      }
    });
  }

  /**
   * Returns an iterable of key, value pairs for every entry in the map.
   */
  entries(): IterableIterator<[K, V]> {
    const map = new Map<K, V>();
    this.forEach((v, k) => {
      map.set(k, v);
    });
    return map.entries();
  }

  /**
   * Returns an iterable of keys in the map
   */
  keys(): IterableIterator<K> {
    const keys = new Set<K>();
    this.forEach((_, k) => {
      keys.add(k);
    });
    return keys.values();
  }

  /**
   * Returns an iterable of values in the map
   */
  values(): IterableIterator<V> {
    const keys = new Set<V>();
    this.forEach((v) => {
      keys.add(v);
    });
    return keys.values();
  }

  [Symbol.iterator](): IterableIterator<[K, V]> {
    return this.entries();
  }

  get [Symbol.toStringTag](): string {
    return "FrailMap";
  }

  toJSON(): Record<string, unknown> {
    const json: Record<string, unknown> = {};
    this.forEach((v, k) => {
      json[k as string] = v;
    });
    return json;
  }
}
