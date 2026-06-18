import Image from "next/image";
import { Award, BadgeCheck } from "lucide-react";
import type { FacilitatorProfile } from "@/data/courses/course-types";

type FacilitatorCardProps = {
  profile?: FacilitatorProfile | null;
};

/**
 * Independent "Facilitador(a)" section — separate from Certificación, Avales
 * and Competencias (see mh-premium-course-platform / mh-content-information-design).
 * Renders nothing unless `profile.verified === true`. This intentionally
 * keeps the card invisible today: no course JSON has a validated
 * `facilitatorProfile` yet, so no name, bio, photo, or credential is
 * fabricated. Once the owner confirms a profile, set `verified: true` on
 * that course's `publicCopy.facilitatorProfile` and this renders automatically.
 */
export function FacilitatorCard({ profile }: FacilitatorCardProps) {
  if (!profile || !profile.verified || !profile.name) return null;

  return (
    <div className="rounded-2xl border border-[#D4AF37]/25 bg-white p-5 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8D7530]">Facilitadora</p>

      <div className="mt-3 flex items-start gap-4">
        {profile.photoUrl ? (
          <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl border border-[#D4AF37]/25 bg-[#F6EFE2]">
            <Image src={profile.photoUrl} alt={profile.name} fill sizes="64px" className="object-cover" />
          </span>
        ) : null}

        <div className="min-w-0">
          <p className="suvoga-serif text-lg font-semibold text-[#0D3B22]">{profile.name}</p>
          {profile.role ? <p className="mt-0.5 text-xs text-[#6B6048]">{profile.role}</p> : null}
          {profile.institution ? (
            <p className="mt-0.5 inline-flex items-center gap-1.5 text-[11px] text-[#8D7530]">
              <BadgeCheck className="h-3.5 w-3.5" />
              {profile.institution}
            </p>
          ) : null}
        </div>
      </div>

      {profile.shortBio ? (
        <p className="mt-4 text-sm leading-6 text-[#4E6658]">{profile.shortBio}</p>
      ) : null}

      {profile.specialties?.length ? (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {profile.specialties.map((s) => (
            <span
              key={s}
              className="rounded-full border border-[#D4AF37]/30 bg-[#F6EFE2]/60 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#8D7530]"
            >
              {s}
            </span>
          ))}
        </div>
      ) : null}

      {profile.credentials?.length ? (
        <ul className="mt-4 space-y-1.5">
          {profile.credentials.map((c) => (
            <li key={c} className="flex items-start gap-2 text-xs leading-5 text-[#4E6658]">
              <Award className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#C5A028]" />
              {c}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
