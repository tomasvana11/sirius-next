/*
// components/BranchCard/BranchCard.tsx
import Image from "next/image";
import type { BranchCardProps } from "./BranchCard.types";

export function BranchCard({ branch }: BranchCardProps) {
  const memberPhoto = branch.clenove_tymu?.Photo?.[0];
  const photoUrl = memberPhoto?.url ?? null;

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <h3 className="text-2xl font-bold text-neutral-800 mb-1">
        {branch.City}
      </h3>
      <p className="text-sm text-neutral-600 mb-4">{branch.Address}</p>

      {branch.clenove_tymu && (
        <div className="flex items-center gap-4 mb-4">
          {photoUrl ? (
            <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
              <Image
                src={photoUrl}
                alt={branch.clenove_tymu.Name}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
              <Image
                src="/icons/system/img-placeholder.svg"
                alt="Placeholder"
                width={32}
                height={32}
              />
            </div>
          )}
          <div>
            <p className="font-semibold text-neutral-800">
              {branch.clenove_tymu.Name}
            </p>
            <p className="text-sm text-neutral-600">
              {branch.clenove_tymu.Position}
            </p>
          </div>
        </div>
      )}

      <div className="space-y-2">
        <a
          href={`tel:${branch.Phone}`}
          className="flex items-center text-neutral-800 hover:text-golden-gate transition-colors"
        >
          <span className="font-medium">{branch.Phone}</span>
        </a>
        <a
          href={`mailto:${branch.Email}`}
          className="flex items-center text-neutral-800 hover:text-golden-gate transition-colors break-all"
        >
          <span>{branch.Email}</span>
        </a>
      </div>
    </div>
  );
}
*/
// components/BranchCard/BranchCard.tsx
import Image from "next/image";
import type { BranchCardProps } from "./BranchCard.types";

export function BranchCard({ branch }: BranchCardProps) {
  const memberPhoto = branch.clenove_tymu?.Photo?.[0];
  const photoUrl = memberPhoto?.url ?? null;

  return (
    <div className="bg-neutral-50">
      <div className="flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-8">
        {/* Levá strana - Kontaktní informace */}
        <div className="flex-1">
          <h3 className="text-2xl lg:text-3xl font-bold text-neutral-800 mb-4 [font-family:var(--font-nunito)]">
            {branch.City}
          </h3>

          <div className="space-y-1 text-neutral-600 text-base lg:text-lg">
            <p>{branch.Address}</p>
          </div>

          <div className="mt-4 space-y-1">
            <a
              href={`tel:${branch.Phone}`}
              className="block text-xl lg:text-2xl font-bold text-neutral-800 hover:text-[#FF6B35] transition-colors [font-family:var(--font-nunito)]"
            >
              {branch.Phone}
            </a>
            <a
              href={`mailto:${branch.Email}`}
              className="block text-neutral-600 hover:text-[#FF6B35] transition-colors break-all"
            >
              {branch.Email}
            </a>
          </div>
        </div>

        {/* Pravá strana - Člen týmu (na desktopu vedle, na mobilu pod) */}
        {branch.clenove_tymu && (
          <div className="lg:flex-shrink-0 lg:w-auto">
            <div className="bg-white rounded-lg p-4 lg:p-6 flex items-center gap-4 lg:min-w-[300px]">
              {photoUrl ? (
                <div className="relative w-16 h-16 lg:w-20 lg:h-20 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={photoUrl}
                    alt={branch.clenove_tymu.Name}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                  <Image
                    src="/icons/system/img-placeholder.svg"
                    alt="Placeholder"
                    width={32}
                    height={32}
                  />
                </div>
              )}
              <div>
                <p className="text-lg lg:text-xl font-bold text-neutral-800 [font-family:var(--font-nunito)]">
                  {branch.clenove_tymu.Name}
                </p>
                <p className="text-neutral-600 text-sm lg:text-base">
                  {branch.clenove_tymu.Position}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
