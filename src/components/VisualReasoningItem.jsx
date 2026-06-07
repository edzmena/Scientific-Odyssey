import VisualShape from './VisualShape'

// Renders one cell — either a shape spec, an array of shape specs (composed in
// one cell), or null (rendered as a blank "?" cell).
function Cell({ spec, size = 44, blank = false }) {
  if (blank || !spec) {
    return (
      <div className="w-12 h-12 flex items-center justify-center rounded-md border-2 border-dashed border-gray-300 bg-gray-50 text-gray-300 font-bold text-lg">
        ?
      </div>
    )
  }
  const specs = Array.isArray(spec) ? spec : [spec]
  return (
    <div className="w-12 h-12 flex items-center justify-center rounded-md border border-gray-200 bg-white relative">
      {specs.map((s, i) => (
        <div key={i} className={i > 0 ? 'absolute' : ''}>
          <VisualShape {...s} size={size - (specs.length > 1 ? 14 : 4)} />
        </div>
      ))}
    </div>
  )
}

function Grid({ rows, missingAt }) {
  return (
    <div className="inline-grid gap-1.5" style={{ gridTemplateColumns: `repeat(${rows[0].length}, minmax(0,1fr))` }}>
      {rows.map((row, r) =>
        row.map((spec, c) => {
          const isMissing = missingAt && missingAt[0] === r && missingAt[1] === c
          return <Cell key={`${r}-${c}`} spec={spec} blank={isMissing} />
        })
      )}
    </div>
  )
}

/**
 * Renders a visual (matrix / odd-one-out / sequence) Abstract Reasoning item.
 * Question shape:
 * {
 *   id, kind: 'matrix' | 'sequence' | 'oddOne',
 *   prompt: string,
 *   grid: Cell[][]              // for matrix/oddOne — 2D array of shape specs (or arrays for composed cells)
 *   missingAt: [row, col]       // for matrix — which cell is the "?"
 *   row: Cell[]                 // for sequence — 1D array, last entry usually null
 *   options: Cell[] | Cell[][]  // each option is a single spec (matrix/sequence) or a small grid (oddOne uses single cells)
 *   answer: 'A'..'E'
 *   explanation: string
 * }
 */
export default function VisualReasoningItem({ question }) {
  const q = question
  const letters = ['A', 'B', 'C', 'D', 'E']

  return (
    <div className="space-y-4">
      <p className="font-medium text-gray-900">{q.prompt}</p>

      <div className="flex justify-center py-2">
        {q.kind === 'sequence' ? (
          <div className="inline-flex gap-1.5">
            {q.row.map((spec, i) => (
              <Cell key={i} spec={spec} blank={spec === null} />
            ))}
          </div>
        ) : (
          <Grid rows={q.grid} missingAt={q.missingAt} />
        )}
      </div>

      <p className="text-xs text-gray-400 text-center">Choose which fits the figure:</p>
      <div className="flex flex-wrap justify-center gap-3">
        {q.options.map((opt, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            {Array.isArray(opt) && Array.isArray(opt[0]) ? (
              <Grid rows={opt} />
            ) : (
              <Cell spec={opt} />
            )}
            <span className="text-xs font-semibold text-gray-500">{letters[i]}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
