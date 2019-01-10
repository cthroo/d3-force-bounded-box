A [D3 force](https://github.com/d3/d3-force#forces). Inspired by https://bl.ocks.org/cmgiven/547658968d365bcc324f3e62e175709b

## Examples:

```js
const boundedBox = require('d3-force-bounded-box')
const { forceSimulation } = require('d3-force');

const nodeData = [
  {
    size: 52,
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
  }
]

const boxForce = boundedBox()
  .bounds([[0, 0], [width, height]])
  .size(d => [d.size, d.size]);

const simulation = forceSimulation(nodeData)
  .force('boxForce', boxForce);
```
