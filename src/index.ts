import axios from 'axios';
import cheerio from 'cheerio';

const url = 'https://www.1001tracklists.com/tracklist/h4gcxq1/k-motionz-ukf-on-air-hyper-vision-2020-07-03.html'
const AxiosInstance = axios.create();

async function getTracklist(): Promise<void> {
    console.log(`Getting tracklist from ${url}`)

    const response = await AxiosInstance.get(url);
    const html = response.data;
    const pageHTML = cheerio.load(html);
    const tracksTable = pageHTML('*[itemprop = "tracks"]');

    tracksTable.each((i, el) => {
        console.log(pageHTML(el).find('*[itemprop = "name"]').attr('content'));
    })
}

getTracklist();