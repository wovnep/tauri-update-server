import { getSignature, getDirectUrl } from './github.js';
export const template = async (release: any, version: string, oldversion: string) => {
    return {
        url: process.env.API_KEY ? await getDirectUrl(release.assets_url) : release.url,
        version: version,
        notes: `Changelog: https://github.com/${process.env.USERNAME}/${process.env.REPO}/compare/v${oldversion}...v${version}`,
        pub_date: release.date,
        signature: release.assets ? await getSignature(release.assets) : '',
    };
};
