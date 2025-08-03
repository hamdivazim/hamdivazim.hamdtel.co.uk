export function getMeta(title, desc, url, image, ogtype="website") {
    return {
        metadataBase: new URL('https://hamdivazim.hamdtel.co.uk'),
        title: title,
        description: desc,

        keywords: ['Next.js', 'SEO', 'react', 'typescript', '2025', 'hamd', 'hamdwaseem', 'hamdivazim', 'python', 'aws', 'awscertified', 'blog', 'developerblog'],
        generator: 'Next.js 15',
        applicationName: 'Hamd Waseem - Portfolio',
        referrer: 'strict-origin-when-cross-origin',
        creator: 'Hamd Waseem',
        publisher: 'Hamd Waseem',
        formatDetection: {
            email: true,
            address: false,
            telephone: false
        },

        openGraph: {
            title: title,
            description: desc,
            url: url,
            siteName: 'Hamd Waseem - Portfolio',
            type: ogtype,
            locale: 'en_GB',
            images: [
            {
                url: image,
                alt: ogtype=="article" ? 'Blog Post by Hamd Waseem - '+title : "Hamd Waseem's Portfolio"
            }
            ]
        },

        twitter: {
            card: 'summary_large_image',
            title: title,
            description: desc,
            creator: '@hamdivazim',
            site: '@hamdivazim',
            image: image,
            imageAlt: ogtype === 'article' ? `Blog Post by Hamd Waseem - ${title}` : "Hamd Waseem's Portfolio"
        },

        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true
            }
        },

        manifest: '/manifest.json'

    };
}