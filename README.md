# FrailMap

FrailMap is an extension of WeakMap that supports primitive values using
WeakRef. It may also set individual pairs to be strongly referenced when
specified, or when WeakRef is not available.

## Usage

```ts
import { FrailMap } from "frail-map";

const myMap = new FrailMap<string, number>();
myMap.set("foo", "foo");
myMap.set("bar", "bar", { strong: true });

console.log(myMap.get("foo")); // -> "foo"
console.log(myMap.get("bar")); // -> "bar"

// ... After GC ...

console.log(myMap.get("foo")); // -> undefined
console.log(myMap.get("bar")); // -> "bar"
```

## Contributing

If you find a bug or would like to suggest a new feature, please open an issue
or submit a pull request on GitHub.

## License

FrailMap is licensed under the MIT License. See the LICENSE file for more
information.

## Funding

If you find this project useful, please consider supporting it by donating to
the author.

[![Donate](https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub)](https://github.com/sponsors/vicary)
