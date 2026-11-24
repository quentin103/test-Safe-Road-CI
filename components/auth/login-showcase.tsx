import { LogoIcon } from "@/components/brand/logo-mark"
import { Icon } from "@/components/ui/icon"

const highlights = [
  { icon: "shield-check-linear", label: "Jamais un conducteur identifié" },
  { icon: "calendar-linear", label: "Chiffres de périodes terminées" },
  { icon: "wi-fi-linear", label: "Léger, même en réseau lent" },
]

/** Hauteurs (en %) du mini-graphique de la carte « Score moyen ». */
const scoreBars = [52, 57, 53, 62, 65, 70]

const floatingCard = "absolute shadow-[0_18px_40px_rgba(0,0,0,0.25)]"

/**
 * Panneau vert de gauche : marque, promesse et aperçu des indicateurs.
 * Affiché à partir de `lg`. Compact par défaut, tailles de la maquette en `tall:`.
 */
export function LoginShowcase() {
  return (
    <section className="relative hidden min-h-0 grow basis-120 flex-col justify-between gap-4 overflow-hidden rounded-3xl bg-primary p-6 text-primary-foreground lg:flex tall:gap-7 tall:p-9">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-30 -right-30 size-90 rounded-full border border-sage"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-15 -right-15 size-60 rounded-full border border-sage"
      />

      <div className="relative flex items-center gap-3">
        <LogoIcon variant="inverse" className="size-10 tall:size-11" />
        <span className="flex flex-col">
          <span className="text-base font-bold tall:text-[17px]">
            Safe Road CI
          </span>
          <span className="text-[13px] text-mist">Portail flotte</span>
        </span>
      </div>

      <div className="relative flex max-w-115 flex-col gap-2.5 tall:gap-3">
        <h1 className="text-[32px] leading-[1.08] font-semibold tracking-[-0.02em] tall:text-[40px]">
          Faites baisser le risque de votre flotte.
        </h1>
        <p className="text-[15px] leading-[1.6] text-mist tall:text-base">
          Sans surveiller personne&nbsp;: des chiffres d’ensemble, sur des
          périodes terminées, pour prévenir plutôt que sanctionner.
        </p>
      </div>

      {/* Aperçu illustratif : valeurs d'exemple, ignorées par les lecteurs d'écran. */}
      <div
        aria-hidden="true"
        className="relative h-53 shrink-0 short:hidden tall:h-57.5"
      >
        <div
          className={`${floatingCard} top-1.5 left-0 flex w-65 -rotate-4 items-center justify-between gap-3 rounded-2xl bg-card px-4.5 py-4 text-foreground`}
        >
          <span className="flex flex-col gap-1">
            <span className="text-xs text-muted-foreground">Score moyen</span>
            <span className="text-[26px] leading-[1.3] font-bold">
              82
              <span className="text-[13px] font-medium text-muted-foreground">
                /100
              </span>
            </span>
            <span className="self-start rounded-full bg-accent px-2 py-0.5 text-[11px] font-bold text-accent-foreground">
              +3 pts
            </span>
          </span>
          <span className="flex items-end gap-[5px]">
            {scoreBars.map((height, index) => (
              <span
                key={index}
                className="flex h-12 w-[7px] items-end overflow-hidden rounded-[4px] bg-mist"
              >
                <span
                  className="block w-full rounded-[4px] bg-sage"
                  style={{ height: `${height}%` }}
                />
              </span>
            ))}
          </span>
        </div>

        <div
          className={`${floatingCard} top-21 left-37.5 flex w-60 rotate-3 flex-col gap-1 rounded-2xl bg-sand px-4 py-3.5 text-foreground tall:top-23`}
        >
          <span className="text-xs text-sand-foreground">
            Événements pour 100&nbsp;km
          </span>
          <span className="flex items-center justify-between gap-2">
            <span className="text-2xl font-bold">2,4</span>
            <svg
              width="80"
              height="28"
              viewBox="0 0 80 28"
              className="shrink-0 text-ochre"
            >
              <path
                d="M2 6 C14 8 18 4 28 10 S46 12 54 18 S70 20 78 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                strokeLinecap="round"
              />
            </svg>
          </span>
        </div>

        <div
          className={`${floatingCard} top-36 left-7.5 flex w-57.5 -rotate-2 items-center justify-between gap-2.5 rounded-[16px] bg-foreground px-4 py-3 text-primary-foreground shadow-[0_18px_40px_rgba(0,0,0,0.3)] tall:top-40`}
        >
          <span className="text-[13px] font-semibold">Alertes de choc</span>
          <span className="rounded-full bg-card px-2.5 py-[3px] text-xs font-bold text-foreground">
            moins de 5
          </span>
        </div>
      </div>

      <ul className="relative grid grid-cols-3 gap-2.5 tall:gap-3">
        {highlights.map(({ icon, label }) => (
          <li
            key={label}
            className="flex items-center gap-2 text-[13px] leading-[1.4] tall:gap-2.5"
          >
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-sage tall:size-8.5">
              <Icon icon={icon} className="size-4 text-white" />
            </span>
            <span>{label}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
