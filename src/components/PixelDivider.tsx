/**
 * Thin animated divider between sections: faint cyan rail, static pixel
 * nodes, and a glowing pixel that runs the length on a steps() timing.
 */
export function PixelDivider() {
  return (
    <div className="px-6" aria-hidden="true">
      <div className="pixel-divider">
        <span className="pixel-node" style={{ left: '15%' }} />
        <span className="pixel-node" style={{ left: '50%' }} />
        <span className="pixel-node" style={{ left: '85%' }} />
        <span className="pixel-runner" />
      </div>
    </div>
  );
}
