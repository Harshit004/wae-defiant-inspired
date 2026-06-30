const fs = require('fs');

let content = fs.readFileSync('components/footer.tsx', 'utf-8');

// Replace grid-cols-3 with grid-cols-4
content = content.replace(/grid-cols-3/g, 'grid-cols-4');

// Update column headings
const oldHeadings = `<h3 className="font-[Inter_Tight] font-semibold text-[10px] uppercase text-white tracking-wider">
                  INSIDE WAE
                </h3>
                <h3 className="font-[Inter_Tight] font-semibold text-[10px] uppercase text-white tracking-wider">
                  ETCETERA
                </h3>
                <h3 className="font-[Inter_Tight] font-semibold text-[10px] uppercase text-white tracking-wider">
                  POLICIES
                </h3>`;

const newHeadings = `<h3 className="font-[Inter_Tight] font-semibold text-[10px] uppercase text-white tracking-wider">
                  INSIDE WAE
                </h3>
                <h3 className="font-[Inter_Tight] font-semibold text-[10px] uppercase text-white tracking-wider">
                  RESPONSIBILITY
                </h3>
                <h3 className="font-[Inter_Tight] font-semibold text-[10px] uppercase text-white tracking-wider">
                  ETCETERA
                </h3>
                <h3 className="font-[Inter_Tight] font-semibold text-[10px] uppercase text-white tracking-wider">
                  POLICIES
                </h3>`;
content = content.replace(oldHeadings, newHeadings);

// Update link lists
const oldLinks = `{/* INSIDE WAE */}
                <ul className="space-y-2 font-[Inter_Tight] font-normal text-[13px] text-white">
                  <li><Link href="/this-is-us" className="hover:opacity-80 transition-opacity">This is Us</Link></li>
                  <li><Link href="/our-portfolio" className="hover:opacity-80 transition-opacity">Our Portfolio</Link></li>
                  <li><Link href="/careers" className="hover:opacity-80 transition-opacity">Reimagine Work</Link></li>
                </ul>

                {/* ETCETERA */}
                <ul className="space-y-2 font-[Inter_Tight] font-normal text-[13px] text-white">
                  <li><Link href="/sustainability" className="hover:opacity-80 transition-opacity">Sustainability</Link></li>
                  <li><Link href="/the-activist-co" className="hover:opacity-80 transition-opacity">The Activist Co.</Link></li>
                  <li><Link href="/blogs" className="hover:opacity-80 transition-opacity">Blogs</Link></li>
                </ul>

                {/* POLICY */}
                <ul className="space-y-2 font-[Inter_Tight] font-normal text-[13px] text-white">
                  <li><Link href="/terms-of-use" className="hover:opacity-80 transition-opacity">Terms of Use</Link></li>
                  <li><Link href="/cookie-policy" className="hover:opacity-80 transition-opacity">Cookie Policy</Link></li>
                  <li><Link href="/data-privacy-policy" className="hover:opacity-80 transition-opacity">Data Privacy Policy</Link></li>
                </ul>`;

const newLinks = `{/* INSIDE WAE */}
                <ul className="space-y-2 font-[Inter_Tight] font-normal text-[13px] text-white">
                  <li><Link href="/this-is-us" className="hover:opacity-80 transition-opacity">This is Us</Link></li>
                  <li><Link href="/our-portfolio" className="hover:opacity-80 transition-opacity">Our Portfolio</Link></li>
                  <li><Link href="/careers" className="hover:opacity-80 transition-opacity">Reimagine Work</Link></li>
                </ul>

                {/* RESPONSIBILITY */}
                <ul className="space-y-2 font-[Inter_Tight] font-normal text-[13px] text-white">
                  <li><Link href="/sustainability" className="hover:opacity-80 transition-opacity">Sustainability</Link></li>
                  <li><Link href="/the-activist-co" className="hover:opacity-80 transition-opacity">The Activist Co.</Link></li>
                  <li><Link href="/blogs" className="hover:opacity-80 transition-opacity">Blog</Link></li>
                </ul>

                {/* ETCETERA */}
                <ul className="space-y-2 font-[Inter_Tight] font-normal text-[13px] text-white">
                  <li><Link href="/contact" className="hover:opacity-80 transition-opacity">Contact</Link></li>
                  <li><Link href="/compliance" className="hover:opacity-80 transition-opacity">Compliance</Link></li>
                  <li><Link href="/mentioned" className="hover:opacity-80 transition-opacity">Mentioned</Link></li>
                </ul>

                {/* POLICIES */}
                <ul className="space-y-2 font-[Inter_Tight] font-normal text-[13px] text-white">
                  <li><Link href="/terms-of-use" className="hover:opacity-80 transition-opacity">Terms of Use</Link></li>
                  <li><Link href="/cookie-policy" className="hover:opacity-80 transition-opacity">Cookie Policy</Link></li>
                  <li><Link href="/data-privacy-policy" className="hover:opacity-80 transition-opacity">Data Privacy Policy</Link></li>
                </ul>`;
content = content.replace(oldLinks, newLinks);

// Add scroll to top button
content = content.replace('<div className="w-full">', '<div className="w-full relative pr-[80px]">');

const endOfLinks = `</div>
            </div>

          </div>`;
          
const newEndOfLinks = `</div>
              
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="absolute right-0 top-1/2 -translate-y-1/2 hover:opacity-80 transition-opacity"
                style={{ width: "54px", height: "54px" }}
              >
                <Image
                  src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/4a558429-0490-4c44-df30-94e4625a4600/public"
                  alt="Scroll to top"
                  width={54}
                  height={54}
                />
              </button>
            </div>

          </div>`;
content = content.replace(endOfLinks, newEndOfLinks);

// Update copyright
const oldCopyright = `<span>&copy; Copy Right WAE 2026</span>`;
const newCopyright = `<span>&copy; 2026 WAE. All Rights Reserved. &nbsp;|&nbsp; Sitemap &nbsp;|&nbsp; FAQ</span>`;
content = content.replace(oldCopyright, newCopyright);

fs.writeFileSync('components/footer.tsx', content);
console.log('Done!');
