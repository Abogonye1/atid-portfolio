import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { Calendar, LucideIcon, MapPin } from 'lucide-react'
import { ReactNode } from 'react'
import { motion } from 'framer-motion'

export function Features() {
    return (
        <section className="bg-background py-16 md:py-32">
            <div className="mx-auto max-w-2xl px-6 lg:max-w-5xl">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium text-hero-primary mb-6 leading-tight">
                        Smart features{" "}
                        <br className="hidden lg:block" />
                        <span className="bg-gradient-to-r from-hero-primary via-hero-secondary to-hero-primary bg-clip-text text-transparent animate-pulse">
                            for modern websites
                        </span>
                    </h2>
                    <p className="text-lg md:text-xl text-hero-secondary max-w-2xl mx-auto leading-relaxed">
                        Everything you need to manage, track, and grow your business with intelligent automation and real-time insights.
                    </p>
                </div>

                <div className="mx-auto grid gap-4 lg:grid-cols-2">
                    <FeatureCard>
                        <CardHeader className="pb-3">
                            <CardHeading
                                icon={MapPin}
                                title="Enhanced Visibility and SEO Performance"
                                description="Increased organic traffic without relying solely on paid ads."
                            />
                        </CardHeader>

                        <div className="relative mb-6 border-t border-dashed sm:mb-0">
                            <div className="absolute inset-0 [background:radial-gradient(125%_125%_at_50%_0%,transparent_40%,hsl(var(--muted)),white_125%)]"></div>
                            <div className="aspect-[76/59] p-1 px-6">
                                <DualModeImage
                                    darkSrc="/lovable-uploads/478df223-efcf-45d9-a18f-90ea36eb3ed9.png"
                                    lightSrc="/lovable-uploads/478df223-efcf-45d9-a18f-90ea36eb3ed9.png"
                                    alt="circular interface illustration"
                                    width={1207}
                                    height={929}
                                />
                            </div>
                        </div>
                    </FeatureCard>

                    <FeatureCard>
                        <CardHeader className="pb-3">
                            <CardHeading
                                icon={Calendar}
                                title="Data-Driven Insights and Decision Making"
                                description="Gain a competitive edge by refining strategies based on real data."
                            />
                        </CardHeader>

                        <CardContent>
                            <div className="relative mb-6 sm:mb-0">
                                <div className="absolute -inset-6 [background:radial-gradient(50%_50%_at_75%_50%,transparent,hsl(var(--background))_100%)]"></div>
                                <div className="aspect-[76/59] border">
                                    <DualModeImage
                                        darkSrc="/lovable-uploads/5443ae12-dd79-4c87-b28e-8a9c33654bd4.png"
                                        lightSrc="/lovable-uploads/5443ae12-dd79-4c87-b28e-8a9c33654bd4.png"
                                        alt="UI elements illustration"
                                        width={1207}
                                        height={929}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </FeatureCard>

                    <FeatureCard>
                        <CardHeader className="pb-3">
                            <CardHeading
                                icon={Calendar}
                                title="Scalability and Operational Efficiency"
                                description="Reduces long-term costs and downtime."
                            />
                        </CardHeader>

                        <CardContent>
                            <div className="relative mb-6 sm:mb-0">
                                <div className="absolute -inset-6 [background:radial-gradient(50%_50%_at_75%_50%,transparent,hsl(var(--background))_100%)]"></div>
                                <div className="aspect-[76/59] border">
                                    <DualModeImage
                                        darkSrc="/lovable-uploads/1442919b-188e-42f9-8095-0aad329787b5.png"
                                        lightSrc="/lovable-uploads/1442919b-188e-42f9-8095-0aad329787b5.png"
                                        alt="scalability and operational efficiency illustration"
                                        width={1207}
                                        height={929}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </FeatureCard>

                    <FeatureCard>
                        <CardHeader className="pb-3">
                            <CardHeading
                                icon={MapPin}
                                title="AI-Powered Support"
                                description="Intelligent chatbot assistance, Get instant help tracking orders."
                            />
                        </CardHeader>

                        <div className="relative mb-6 border-t border-dashed sm:mb-0">
                            <div className="absolute inset-0 [background:radial-gradient(125%_125%_at_50%_0%,transparent_40%,hsl(var(--muted)),white_125%)]"></div>
                            <div className="aspect-[76/59] p-1 px-6">
                                <DualModeImage
                                    darkSrc="/lovable-uploads/811ee9ca-d04c-4bbf-a613-8f312770afd3.png"
                                    lightSrc="/lovable-uploads/811ee9ca-d04c-4bbf-a613-8f312770afd3.png"
                                    alt="chatbot AI illustration"
                                    width={1207}
                                    height={929}
                                />
                            </div>
                        </div>
                    </FeatureCard>
                </div>
            </div>
        </section>
    )
}

interface FeatureCardProps {
    children: ReactNode
    className?: string
}

const FeatureCard = ({ children, className }: FeatureCardProps) => (
    <motion.div
        whileHover={{ 
            rotateX: 2,
            rotateY: 2,
            scale: 1.01,
            transition: { duration: 0.2, ease: "easeOut" }
        }}
        style={{ 
            transformStyle: "preserve-3d",
            perspective: 1000
        }}
        className="transform-gpu will-change-transform"
    >
        <Card className={cn('group relative rounded-none shadow-zinc-950/5 transition-shadow duration-200', className)}>
            <CardDecorator />
            {children}
        </Card>
    </motion.div>
)

const CardDecorator = () => (
    <div className="contents">
        <span className="border-primary absolute -left-px -top-px block size-2 border-l-2 border-t-2"></span>
        <span className="border-primary absolute -right-px -top-px block size-2 border-r-2 border-t-2"></span>
        <span className="border-primary absolute -bottom-px -left-px block size-2 border-b-2 border-l-2"></span>
        <span className="border-primary absolute -bottom-px -right-px block size-2 border-b-2 border-r-2"></span>
    </div>
)

interface CardHeadingProps {
    icon: LucideIcon
    title: string
    description: string
}

const CardHeading = ({ icon: Icon, title, description }: CardHeadingProps) => (
    <div className="p-6">
        <span className="text-muted-foreground flex items-center gap-2">
            <Icon className="size-4" />
            {title}
        </span>
        <p className="mt-8 text-2xl font-semibold">{description}</p>
    </div>
)

interface DualModeImageProps {
    darkSrc: string
    lightSrc: string
    alt: string
    width: number
    height: number
    className?: string
}

const DualModeImage = ({ darkSrc, lightSrc, alt, width, height, className }: DualModeImageProps) => (
    <div className="contents">
        <img
            src={darkSrc}
            className={cn('hidden dark:block', className)}
            alt={`${alt} dark`}
            width={width}
            height={height}
        />
        <img
            src={lightSrc}
            className={cn('shadow dark:hidden', className)}
            alt={`${alt} light`}
            width={width}
            height={height}
        />
    </div>
)