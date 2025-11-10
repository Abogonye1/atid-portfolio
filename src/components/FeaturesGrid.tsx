// Icons removed per request: no SVGs rendered in this section

type Feature = {
    title: string;
    description: string;
}

export function FeaturesGrid() {
    const features: Feature[] = [
        {
            title: 'Web Development',
            description:
                'Building bespoke websites from scratch using modern technologies like HTML5, CSS3, JavaScript, and frameworks such as React, Vue.js, or Node.js. These sites are tailored to the client’s brand, goals, and audience.',
        },
        {
            title: 'UI/UX Design',
            description: 'Designing intuitive, visually appealing interfaces with a focus on user experience (UX).',
        },
        {
            title: 'SEO Optimization',
            description:
                'Optimizing websites for search engines through keyword research, on-page SEO, and technical enhancements like fast loading times and mobile-first indexing.',
        },
        {
            title: 'AI and Automation Integration',
            description:
                'Embedding AI tools like chatbots, predictive analytics, or automated marketing funnels to enhance user interaction and streamline operations.',
        },
        {
            title: 'Analytics and Data Tracking',
            description:
                'Setting up tools like Google Analytics, heatmaps, or custom dashboards to monitor user behavior, traffic sources, and conversion metrics.',
        },
        {
            title: 'Third-Party Integrations',
            description:
                'Connecting websites with external tools like CRMs (e.g., HubSpot), marketing platforms (e.g., Mailchimp), or social media APIs for seamless workflows.',
        },
    ]

    return (
        <section className="py-16 md:py-32">
            <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16">
                <div className="relative z-10 mx-auto max-w-xl space-y-6 text-center md:space-y-12">
                    <h2 className="text-4xl font-semibold lg:text-5xl text-foreground animate-[fade-in_1.4s_ease-out]">
                        Services that accelerate business growth
                    </h2>
                    <p className="text-muted-foreground">At Atid, our services go beyond traditional web design, incorporating advanced technologies, automation, and data-driven strategies to create dynamic, user-centric, and scalable online platforms for businesses and startups.</p>
                </div>

                {/* Grid with borders remains, children get padding via utility selector */}
                <div className="relative mx-auto grid max-w-4xl divide-x divide-y border *:p-6 *:md:p-12 grid-cols-1 md:grid-cols-2">
                    {features.map((f, idx) => (
                        <FeatureBox key={f.title} {...f} index={idx} />
                    ))}
                </div>
            </div>
        </section>
    )
}

function FeatureBox({ title, description, index }: Feature & { index: number }) {
    const topRow = index < 2 // first row in a 2-column grid
    return (
        <div className="relative group/feature">
            {/* Hover gradient overlay: from top on first row, from bottom otherwise */}
            {topRow ? (
                <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-muted/40 to-transparent pointer-events-none" />
            ) : (
                <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-muted/40 to-transparent pointer-events-none" />
            )}

            <div className="space-y-3 relative z-10">
                <div className="text-foreground font-medium relative pl-3">
                    {/* Left accent bar */}
                    <div className="absolute left-0 inset-y-0 my-auto h-6 w-1 rounded-tr-full rounded-br-full bg-border group-hover/feature:h-8 group-hover/feature:bg-hero-secondary transition-all duration-200 origin-center" />
                    <span className="inline-block transition-transform duration-200 group-hover/feature:translate-x-2 motion-reduce:transform-none">
                        {title}
                    </span>
                </div>
                <p className="text-muted-foreground">{description}</p>
            </div>
        </div>
    )
}