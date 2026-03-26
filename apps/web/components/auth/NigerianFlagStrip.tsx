export function NigerianFlagStrip() {
  return (
    <div
      aria-hidden="true"
      className="absolute left-0 top-0 hidden h-full w-[72px] flex-col md:flex"
    >
      {/* Top 40%: NPF Navy */}
      <div className="flex-[2] bg-npf-blue" />
      {/* Middle 20%: Gold */}
      <div className="flex-[1] bg-npf-gold" />
      {/* Bottom 40%: NPF Green */}
      <div className="flex-[2] bg-npf-green" />
    </div>
  )
}
