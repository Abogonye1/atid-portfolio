import { Activity, DraftingCompass, Mail, Zap } from 'lucide-react';

export function FeaturesSections() {
    return (
        <div className="contents">
            {/* First Features Section */}
            <section className="py-16 md:py-32">
                <div className="mx-auto max-w-xl md:max-w-6xl px-6">
                    <div className="grid items-center gap-12 md:grid-cols-2 md:gap-12 lg:grid-cols-5 lg:gap-24">
                        <div className="lg:col-span-2">
                            <div className="md:pr-6 lg:pr-0">
                                <h2 className="text-4xl font-semibold lg:text-5xl text-foreground">Built for AI-First Teams</h2>
                                <p className="mt-6 text-muted-foreground">Empower your startup with intelligent automation and scalable AI solutions that grow with your business needs.</p>
                            </div>
                            <ul className="mt-8 divide-y border-y *:flex *:items-center *:gap-3 *:py-3 text-foreground">
                                <li>
                                    <Mail className="size-5" />
                                    24/7 AI-powered support
                                </li>
                                <li>
                                    <Zap className="size-5" />
                                    Lightning-fast processing
                                </li>
                                <li>
                                    <Activity className="size-5" />
                                    Real-time monitoring
                                </li>
                                <li>
                                    <DraftingCompass className="size-5" />
                                    Smart architecture design
                                </li>
                            </ul>
                        </div>
                        <div className="border-border/50 relative rounded-3xl border p-3 lg:col-span-3">
                            <div className="bg-gradient-to-b aspect-[76/59] relative rounded-2xl from-muted/30 to-transparent p-px">
                                <picture>
                                  <source
                                    type="image/avif"
                                    srcSet="/lovable-uploads/53d1c4c1-71e0-46e0-b04f-3c93d652bd98-480w.avif 480w, /lovable-uploads/53d1c4c1-71e0-46e0-b04f-3c93d652bd98-768w.avif 768w, /lovable-uploads/53d1c4c1-71e0-46e0-b04f-3c93d652bd98-1024w.avif 1024w, /lovable-uploads/53d1c4c1-71e0-46e0-b04f-3c93d652bd98-1200w.avif 1200w, /lovable-uploads/53d1c4c1-71e0-46e0-b04f-3c93d652bd98-1600w.avif 1600w"
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1200px"
                                  />
                                  <source
                                    type="image/webp"
                                    srcSet="/lovable-uploads/53d1c4c1-71e0-46e0-b04f-3c93d652bd98-480w.webp 480w, /lovable-uploads/53d1c4c1-71e0-46e0-b04f-3c93d652bd98-768w.webp 768w, /lovable-uploads/53d1c4c1-71e0-46e0-b04f-3c93d652bd98-1024w.webp 1024w, /lovable-uploads/53d1c4c1-71e0-46e0-b04f-3c93d652bd98-1200w.webp 1200w, /lovable-uploads/53d1c4c1-71e0-46e0-b04f-3c93d652bd98-1600w.webp 1600w"
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1200px"
                                  />
                                  <img
                                    src="/lovable-uploads/53d1c4c1-71e0-46e0-b04f-3c93d652bd98.png"
                                    className="rounded-[15px] w-full h-full object-cover"
                                    alt="AI dashboard interface"
                                    width={1200}
                                    height={920}
                                    loading="lazy"
                                    decoding="async"
                                    fetchPriority="low"
                                  />
                                </picture>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Second Features Section - Reversed Layout */}
            <section className="py-16 md:py-32">
                <div className="mx-auto max-w-xl md:max-w-6xl px-6">
                    <div className="grid items-center gap-12 md:grid-cols-2 md:gap-12 lg:grid-cols-5 lg:gap-24">
                        <div className="border-border/50 relative rounded-3xl border p-3 lg:col-span-3 order-2 lg:order-1">
                            <div className="bg-gradient-to-b aspect-[76/59] relative rounded-2xl from-muted/30 to-transparent p-px">
                                <picture>
                                  <source
                                    type="image/avif"
                                    srcSet="/lovable-uploads/acf7a0f9-4092-4745-9a53-b92eb98e887d-480w.avif 480w, /lovable-uploads/acf7a0f9-4092-4745-9a53-b92eb98e887d-768w.avif 768w, /lovable-uploads/acf7a0f9-4092-4745-9a53-b92eb98e887d-1024w.avif 1024w, /lovable-uploads/acf7a0f9-4092-4745-9a53-b92eb98e887d-1200w.avif 1200w, /lovable-uploads/acf7a0f9-4092-4745-9a53-b92eb98e887d-1600w.avif 1600w"
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1200px"
                                  />
                                  <source
                                    type="image/webp"
                                    srcSet="/lovable-uploads/acf7a0f9-4092-4745-9a53-b92eb98e887d-480w.webp 480w, /lovable-uploads/acf7a0f9-4092-4745-9a53-b92eb98e887d-768w.webp 768w, /lovable-uploads/acf7a0f9-4092-4745-9a53-b92eb98e887d-1024w.webp 1024w, /lovable-uploads/acf7a0f9-4092-4745-9a53-b92eb98e887d-1200w.webp 1200w, /lovable-uploads/acf7a0f9-4092-4745-9a53-b92eb98e887d-1600w.webp 1600w"
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1200px"
                                  />
                                  <img 
                                    src="/lovable-uploads/acf7a0f9-4092-4745-9a53-b92eb98e887d.png" 
                                    className="rounded-[15px] w-full h-full object-cover" 
                                    alt="AI workflow automation" 
                                    width={1200} 
                                    height={920} 
                                    loading="lazy"
                                    decoding="async"
                                    fetchPriority="low"
                                  />
                                </picture>
                            </div>
                        </div>
                        <div className="lg:col-span-2 order-1 lg:order-2">
                            <div className="md:pl-6 lg:pl-0">
                                <h2 className="text-4xl font-semibold lg:text-5xl text-foreground">Intelligent Automation</h2>
                                <p className="mt-6 text-muted-foreground">Transform your workflows with AI agents that learn, adapt, and optimize your business processes automatically.</p>
                            </div>
                            <ul className="mt-8 divide-y border-y *:flex *:items-center *:gap-3 *:py-3 text-foreground">
                                <li>
                                    <Activity className="size-5" />
                                    Predictive analytics
                                </li>
                                <li>
                                    <Zap className="size-5" />
                                    Automated workflows
                                </li>
                                <li>
                                    <Mail className="size-5" />
                                    Smart notifications
                                </li>
                                <li>
                                    <DraftingCompass className="size-5" />
                                    Custom integrations
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}