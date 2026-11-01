import { Link } from 'react-router-dom';
import { Sprout } from 'lucide-react';

export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link to="/" className="group flex items-center gap-2.5">
      <span
        className={`flex h-9 w-9 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-105 ${
          light ? 'bg-cream-100 text-forest-800' : 'bg-forest-800 text-cream-100'
        }`}
      >
        <Sprout className="h-5 w-5" strokeWidth={2.2} />
      </span>
      <span className="flex flex-col leading-none">
        <span className={`font-display text-xl font-600 tracking-tightest ${light ? 'text-cream-100' : 'text-forest-800'}`}>
          RYTHARA
        </span>
        <span className={`mt-1 text-[9px] font-medium tracking-wide ${light ? 'text-cream-200/75' : 'text-forest-700/65'}`}>
          మా ఊరి పంట — ప్రతి ఇంటికి
        </span>
      </span>
    </Link>
  );
}
