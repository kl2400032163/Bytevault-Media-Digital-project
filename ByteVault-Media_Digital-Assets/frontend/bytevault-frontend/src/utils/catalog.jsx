const FREE_RESOURCE_LINKS = [
    {
        matches: ["linux command line"],
        url: "https://linuxcommand.org/tlcl.php"
    },
    {
        matches: ["pro git"],
        url: "https://git-scm.com/book/en/v2"
    },
    {
        matches: ["visual studio code", "vs code"],
        url: "https://code.visualstudio.com/download"
    },
    {
        matches: ["docker desktop"],
        url: "https://www.docker.com/products/docker-desktop/"
    },
    {
        matches: ["mdn", "web development"],
        url: "https://developer.mozilla.org/en-US/docs/Learn"
    },
    {
        matches: ["free programming", "open source ebook"],
        url: "https://github.com/EbookFoundation/free-programming-books"
    }
];

export function getProductCategory(product) {
    const type = String(product.type || "").toUpperCase();
    const name = String(product.name || "").toLowerCase();

    if (type === "EBOOK" || type === "BOOK" || name.includes("ebook")) {
        return "Ebooks";
    }

    if (type === "SOFTWARE" || type === "TOOL" || name.includes("tool")) {
        return "Development tools";
    }

    return "Digital resources";
}

export function getProductAccess(product) {
    return Number(product.price || 0) === 0 ? "Open source" : "Paid license";
}

export function getDownloadUrl(product) {
    if (product?.downloadUrl) {
        return product.downloadUrl;
    }

    const name = String(product?.name || "").toLowerCase();
    const match = FREE_RESOURCE_LINKS.find((resource) =>
        resource.matches.some((value) => name.includes(value))
    );

    return match?.url || "https://github.com/EbookFoundation/free-programming-books";
}

export function getProductDetails(product) {
    const name = String(product?.name || "digital resource");
    const type = String(product?.type || "").toUpperCase();
    const lowerName = name.toLowerCase();

    if (lowerName.includes("linux command line")) {
        return {
            description: "A practical guide to working confidently in Linux terminals, from everyday commands to shell scripting and system workflows.",
            uses: ["Learn terminal fundamentals", "Automate repeatable tasks", "Build confidence with Linux tooling"]
        };
    }

    if (lowerName.includes("pro git")) {
        return {
            description: "The complete, freely available guide to Git, covering version control fundamentals, branching, collaboration, and advanced workflows.",
            uses: ["Create reliable version histories", "Collaborate through branches and merges", "Understand Git beyond the basics"]
        };
    }

    if (lowerName.includes("visual studio code")) {
        return {
            description: "A powerful, extensible code editor for writing, debugging, and shipping projects across almost any programming language.",
            uses: ["Write and debug application code", "Extend your workflow with plugins", "Work with Git and integrated terminals"]
        };
    }

    if (lowerName.includes("docker")) {
        return {
            description: "A developer environment for building, running, and sharing applications in consistent containers across machines.",
            uses: ["Run isolated development environments", "Package services consistently", "Test multi-service applications locally"]
        };
    }

    if (type === "EBOOK" || type === "BOOK") {
        return {
            description: "A focused digital book for building practical knowledge through clear explanations, examples, and repeatable techniques.",
            uses: ["Study at your own pace", "Reference concepts during projects", "Build a stronger development foundation"]
        };
    }

    if (type === "TOOL" || type === "SOFTWARE") {
        return {
            description: "A development-focused tool selected to help you build, test, organize, or ship digital products more efficiently.",
            uses: ["Improve your development workflow", "Reduce repetitive manual work", "Create and maintain projects with confidence"]
        };
    }

    return {
        description: "A downloadable digital resource made to support practical learning and productive project work.",
        uses: ["Learn a useful skill", "Apply the resource to real projects", "Keep it available for future reference"]
    };
}