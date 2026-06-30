/**
 * SVG "gooey" filter — blur + alpha-threshold so nearby shapes merge into organic
 * blobs. Render once, then apply `filter: url(#<id>)` to the layer you want gooey.
 * Pure SVG, no dependencies.
 */
export function GooeyFilter({ id = 'goo-filter', strength = 10 }: { id?: string; strength?: number }) {
  return (
    <svg aria-hidden="true" className="absolute hidden">
      <defs>
        <filter id={id}>
          <feGaussianBlur in="SourceGraphic" stdDeviation={strength} result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
            result="goo"
          />
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />
        </filter>
      </defs>
    </svg>
  )
}
