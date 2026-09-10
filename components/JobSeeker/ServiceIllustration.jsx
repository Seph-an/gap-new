// Decorative artwork only. All visible service information comes from Strapi.
export default function ServiceIllustration({ icon }) {
  return <svg viewBox="0 0 440 230" fill="none" aria-hidden="true" focusable="false" className="h-auto w-full">
    <ellipse cx="220" cy="204" rx="148" ry="12" fill="#51D4D6" fillOpacity=".06" />
    <circle cx="220" cy="112" r="95" stroke="#51D4D6" strokeOpacity=".12" strokeDasharray="4 8" />
    <path d="M35 159C106 63 136 203 214 124S350 68 408 34" stroke="#51D4D6" strokeOpacity=".22" strokeWidth="2" />
    <circle cx="45" cy="146" r="4" fill="#51D4D6" fillOpacity=".6" />
    <circle cx="391" cy="44" r="4" fill="#51D4D6" fillOpacity=".6" />
    {icon === 'Edit' ? <>
      <g transform="rotate(-9 150 118)"><rect x="96" y="39" width="130" height="163" rx="12" fill="#151515" stroke="white" strokeOpacity=".15" /><path d="M118 74H190M118 91H178M118 128H195M118 145H180M118 162H190" stroke="#9CA3AF" strokeOpacity=".3" strokeWidth="5" strokeLinecap="round" /></g>
      <g className="motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:-translate-y-1 motion-safe:group-focus-within:-translate-y-1">
        <rect x="166" y="24" width="145" height="177" rx="14" fill="#1e1e1e" stroke="#51D4D6" strokeOpacity=".65" />
        <circle cx="194" cy="56" r="12" fill="#51D4D6" fillOpacity=".15" /><path d="M218 51H283M218 63H263" stroke="#51D4D6" strokeWidth="5" strokeLinecap="round" />
        <path d="M188 93H288M188 108H275M188 139H284M188 154H267M188 177H237" stroke="#D1D5DB" strokeOpacity=".55" strokeWidth="5" strokeLinecap="round" />
        <circle cx="310" cy="165" r="29" fill="#51D4D6" /><path d="m296 165 10 10 18-22" stroke="#0a0a0a" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <path d="m338 44 5 11 12 2-9 8 2 12-10-6-11 6 2-12-9-8 12-2 6-11Z" fill="#51D4D6" fillOpacity=".5" />
    </> : <>
      <rect x="87" y="69" width="267" height="124" rx="16" fill="#151515" stroke="white" strokeOpacity=".15" />
      <path d="M99 179H342" stroke="#51D4D6" strokeOpacity=".25" />
      <circle cx="158" cy="118" r="22" fill="#51D4D6" fillOpacity=".15" stroke="#51D4D6" strokeOpacity=".55" />
      <path d="M120 175c0-24 16-36 38-36s38 12 38 36" fill="#51D4D6" fillOpacity=".12" stroke="#51D4D6" strokeOpacity=".5" />
      <circle cx="282" cy="118" r="22" fill="white" fillOpacity=".06" stroke="#D1D5DB" strokeOpacity=".5" />
      <path d="M244 175c0-24 16-36 38-36s38 12 38 36" fill="white" fillOpacity=".04" stroke="#D1D5DB" strokeOpacity=".4" />
      <g className="motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:-translate-y-1 motion-safe:group-focus-within:-translate-y-1">
        <path d="M180 24h121a12 12 0 0 1 12 12v31a12 12 0 0 1-12 12h-66l-20 17V79h-35a12 12 0 0 1-12-12V36a12 12 0 0 1 12-12Z" fill="#1e1e1e" stroke="#51D4D6" strokeOpacity=".7" />
        <path d="M191 44h69M191 59h48" stroke="#51D4D6" strokeWidth="5" strokeLinecap="round" /><path d="m276 53 6 6 11-14" stroke="#51D4D6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <path d="M210 119h20m-5-5 5 5-5 5M230 142h-20m5-5-5 5 5 5" stroke="#51D4D6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </>}
  </svg>;
}
