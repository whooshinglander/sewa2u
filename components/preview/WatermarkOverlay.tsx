export default function WatermarkOverlay() {
  return (
    <div
      className="absolute inset-0 pointer-events-none z-10 overflow-hidden rounded-xl"
      aria-hidden="true"
    >
      {[10, 35, 60, 85].map((top) => (
        <div
          key={top}
          className="absolute left-[-20%] right-[-20%] text-center"
          style={{
            top: `${top}%`,
            transform: 'rotate(-30deg)',
            color: 'rgba(239, 68, 68, 0.12)',
            fontSize: '3rem',
            fontWeight: 800,
            letterSpacing: '0.1em',
            whiteSpace: 'nowrap',
            userSelect: 'none',
          }}
        >
          DRAFT — NOT FOR LEGAL USE
        </div>
      ))}
    </div>
  )
}
