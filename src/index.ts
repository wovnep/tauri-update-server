import express from 'express';
import { compare } from 'compare-versions';
import { github } from '../lib/github.js';
import { getReleases } from '../lib/getReleases.js';
import { template } from '../lib/template.js';
import type { Request, Response } from 'express';

const app = express();

interface Parameters {
    current_version: string;
    target: string;
    arch: string;
}

app.get('/update', async (req: Request<{}, {}, {}, Parameters>, res: Response) => {
    if (req.query.current_version && req.query.target && req.query.arch) {
        const latest = await github();
        if (latest.message === 'Not Found') {
            res.status(204).send();
        }
        if (compare(latest.tag_name, req.query.current_version, '>')) {
            const version = process.env.TAG_STRUCTURE ? latest.tag_name.split(process.env.TAG_STRUCTURE)[1] : latest.tag_name;
            const release = getReleases(latest.assets, req.query.target, req.query.arch);
            if (Object.keys(release).length !== 0) {
                res.status(200).send(await template(release, version, req.query.current_version));
            } else {
                res.status(204).send();
            }
        } else {
            res.status(204).send();
        
        }
    } else {
        res.status(400).send({
            message: 'Invalid request',
        });
    }
});
app.listen(8080, '0.0.0.0', () => console.log(`Server listening on http://0.0.0.0:8080/`));
