export class GithubRepository {
    repoHttpUrl: string
    repoOwner: string
    repoName: string

    constructor(url: string) {
        this.repoHttpUrl = GithubRepository.conformUrlFormat(url)
        this.repoOwner = this.repoHttpUrl.split("/")[3]
        this.repoName = this.repoHttpUrl.split("/")[4]
    }

    static conformUrlFormat(url: string): string {
        if (url.match(/^.*?github.com\/.*?\/.*?$/)) {
            if (url[url.length - 1] === "/") { url = url.slice(0, -1) } // Remove '/' at end of url
            if (url.startsWith("http://")) { url = url.replace("http://", "https://") } // Replace 'http://' with 'https://'
            if (url.includes("www.")) { url = url.replace("www.", "") } // Remove "www."
            if (url.startsWith("github.com")) { url = `https://${url}` } // Add 'https://' if url only starts with 'github.com'
            return url
        }
        else { throw "Github repo url does not conform to any know format." }
    }

    get releases(): Promise<object[]> {
        return Promise.resolve(fetch(`https://api.github.com/repos/${this.repoOwner}/${this.repoName}/releases`))
            .then((response) => { return response.json() })
    }

    get latestRelease(): object {
        return Promise.resolve(this.releases)
            .then((data) => { return data[0] })
    }

    //TODO: Add a getter prop to pull a good guess of an image, possibly.
}