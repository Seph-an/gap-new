import Image from "next/image";
import { imageUrl } from "@/lib/cms/strapi";
import Link from "next/link";
import { normalizeListedJobsLink } from "@/lib/jobs";

export default function Footer({ global }) {
  const year = new Date().getFullYear();
  const footer = global?.footer;
  const assets = global?.assets;
  if (!footer) return null;

  const footerTitle = "text-center md:text-left text-lg font-semibold mb-4";
  const footerLink = "hover:text-[#51D4D6] transition-colors duration-300 ease-in-out";

  return (
    <footer className="m-4 md:m-6 lg:m-8">
      <div className="rounded-lg bg-[#1e1e1e]">
        <div className="w-full p-6 md:p-8 flex justify-between flex-wrap gap-8 lg:gap-10">
          <div className="bg-[#0a0a0a] w-full sm:w-fit mx-auto sm:mx-0 p-6 rounded-lg">
            <div className="flex flex-col items-center gap-6 mb-4">
              {footer.logo && <Image src={imageUrl(footer.logo)} alt={footer.brand} width={150} height={150} />}
              <div className="text-center flex flex-col gap-2">
                <h2 className="font-medium text-lg">{footer.brand}</h2>
                <h4 className="font-light text-base text-gray-400">{footer.tagline}</h4>
              </div>
            </div>
          </div>

          <div className="mx-auto sm:mx-0">
            <h3 className={footerTitle}>{footer.sections?.company}</h3>
            <div className="grid grid-cols-3 sm:grid-cols-2 gap-2 text-gray-300">
              {(footer.companyLinks || []).map((item) => <Link key={item.label} className={footerLink} href={normalizeListedJobsLink(item.url)}>{item.label}</Link>)}
            </div>
          </div>

          <div className="mx-auto sm:mx-0 flex flex-col gap-8">
            <div>
              <h3 className={footerTitle}>{footer.sections?.socials}</h3>
              <div className="flex gap-4 justify-center md:justify-start">
                {footer.socials?.map((social) => <a key={social.label} href={social.url} className="relative flex items-center justify-center"><div className="absolute rounded-full bg-white h-[85%] w-[85%] z-1" /><Image src={imageUrl(social.src)} alt={social.label} width={40} height={40} className="rounded-full z-5 transition-transform duration-500 ease-in-out hover:scale-110" /></a>)}
              </div>
            </div>
            {assets?.credentials?.length > 0 && <div><h3 className={footerTitle}>{footer.sections?.credentials}</h3><div className="flex gap-2">{assets.credentials.map((item) => { const src = typeof item === "string" ? item : item.value; return src ? <Image key={src} src={imageUrl(src)} alt="" width={80} height={80} className="rounded-full grayscale hover:grayscale-0 transition-all duration-300 ease-in-out" /> : null; })}</div></div>}
          </div>
        </div>
        <div className="container mt-10 text-center pb-10">
          <p className="text-base text-white/90">{footer.copyright?.replace("{year}", year)}</p>
          <div className="flex flex-wrap justify-center gap-4 mt-2 text-sm text-gray-400">{footer.legalLinks?.map((item) => <a key={item.label} href={item.url}>{item.label}</a>)}</div>
          {footer.developer && <p className="text-sm text-white/90 mt-2"><>{footer.developerPrefix} </><a href={footer.developer.url} className="underline font-medium text-[#51D4D6]">{footer.developer.label}</a></p>}
        </div>
      </div>
    </footer>
  );
}
