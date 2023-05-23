import { describe, expect, it, jest } from '@jest/globals';

import { GithubRepository } from "../src/github-repository"

const exampleGithubValidUrl = "https://github.com/GithubAccount/GithubRepo"

describe("Test the GithubRepository.conformUrlFormat static class.", () => {
    const validGithubRepoUrls = [
        "https://github.com/GithubAccount/GithubRepo",
        "http://github.com/GithubAccount/GithubRepo",
        "github.com/GithubAccount/GithubRepo",
        "https://www.github.com/GithubAccount/GithubRepo",
        "http://www.github.com/GithubAccount/GithubRepo",
        "www.github.com/GithubAccount/GithubRepo",
        "https://github.com/GithubAccount/GithubRepo/",
        "http://github.com/GithubAccount/GithubRepo/",
        "github.com/GithubAccount/GithubRepo/",
        "https://www.github.com/GithubAccount/GithubRepo/",
        "http://www.github.com/GithubAccount/GithubRepo/",
        "www.github.com/GithubAccount/GithubRepo/",
    ]

    const invalidGithubRepoUrls = [
        "www.google.com",
        "https://github.com/"
    ]

    it.each(validGithubRepoUrls)('given valid url %s provided to the conformUrlFormat function, is a url string returned in the proper format?', (url) => {
        expect(GithubRepository.conformUrlFormat(url)).toMatch(/^https:\/\/github.com\/.*?\/.*?[^\/]$/)
    })

    it.each(invalidGithubRepoUrls)('given invalid url %s provided to the conformUrlFormat function, is an error thrown?', (url) => {
        expect(() => {
            GithubRepository.conformUrlFormat(url)
        }).toThrowError()
    })
})

describe("Test the GithubRepository constructor.", () => {

    // Skipping testing conformUrlFormat format again, as it has already been tested above.

    it(`given the valid url ${exampleGithubValidUrl}, does the repoOwner property get parsed correctly?`, () => {
        expect((new GithubRepository(exampleGithubValidUrl).repoOwner)).toEqual("GithubAccount")
    })

    it(`given the valid url ${exampleGithubValidUrl}, does the repoName property get parsed correctly?`, () => {
        expect((new GithubRepository(exampleGithubValidUrl).repoName)).toEqual("GithubRepo")
    })
})

describe("Test the releases() getter.", () => {



    const exampleGithubRepository = new GithubRepository(exampleGithubValidUrl)
    it(`given a url ${exampleGithubValidUrl}, at least some proper json data is returned`, async () => {
        jest.fn(fetch).mockResolvedValue(new Response("bob"))
        expect(await exampleGithubRepository.releases).toMatchObject({ bob: "jones" })
    })
})