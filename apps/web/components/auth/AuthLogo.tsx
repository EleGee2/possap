import Image from 'next/image'

export function AuthLogo() {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex items-center gap-4">
        <Image
          src="/images/npf-crest.png"
          alt="Nigeria Police Force"
          width={64}
          height={64}
          priority
        />
        <Image
          src="/images/coat-of-arms.png"
          alt="Nigerian coat of arms"
          width={64}
          height={64}
          priority
        />
      </div>
      <p className="text-sm font-medium tracking-wide text-npf-blue">
        Apply.&nbsp;&nbsp;Track.&nbsp;&nbsp;Get Approved.
      </p>
    </div>
  )
}
