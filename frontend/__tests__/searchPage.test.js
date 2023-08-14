import { render } from '@testing-library/react'
import Search from '../src/app/page'
import mockRouter from 'next-router-mock'
import { createDynamicRouteParser } from "next-router-mock/dynamic-routes";
import { useRouter } from "next/navigation";

describe.skip('Search page tests', () => {
    beforeEach(() => {
        jest.mock('next/router', () => jest.requireActual('next-router-mock'))
        mockRouter.push('/')

        // mockRouter.useParser(createDynamicRouteParser([
        //     "/[query]",
        //   ]));

        // jest.mock('next/router', () => {
        //     const router = {
        //         push: jest.fn(),
        //         query: {},
        //     }
        //     return { useRouter: jest.fn().mockReturnValue(router) }
        // })
    })

    test('Search page snapshot test', () => {
        const searchPage = render(
            <html lang="en">
                <body>
                    <Search />
                </body>
            </html>
            // <Search />
        )

        expect(searchPage.toJSON()).toMatchSnapshot()
    })
})
