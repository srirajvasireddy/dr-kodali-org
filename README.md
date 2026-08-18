# dr-kodali-org
Home for https://www.drkodali.org

## Analytics

Google Analytics 4, property `G-0WJH1YG4F6`. The tag lives in
[index.html](index.html); all behavioural tracking is in
[src/analytics.ts](src/analytics.ts).

`gtag.js` is only fetched on the live domain — localhost and `*.local` skip it,
and `npm run dev` logs every event to the browser console instead (`[analytics]`)
so tracking can be checked without polluting the property.

### Events sent

| Event | When | Key parameters |
| --- | --- | --- |
| `page_view` | after the app sets the per-page title | `page_title`, `page_location`, `page_path` |
| `navigation_click` | click on an internal link | `label`, `section`, `link_path` |
| `outbound_click` | click on a link to another site | `label`, `link_url`, `link_domain` |
| `contact_click` | click on a `tel:` or `mailto:` link | `method` (`phone` / `email`) |
| `image_open` | click on a link to an image or PDF (press clippings) | `label`, `link_url` |
| `button_click` | any other button click | `label`, `section`, `element_class` |
| `section_view` | a page section scrolls into view (35%) | `section` |
| `scroll_depth` | 25 / 50 / 75 / 90% of the page reached | `percent_scrolled` |
| `time_on_page` | 30 / 60 / 180 seconds on the page | `seconds` |
| `page_engagement` | tab hidden or page closed | `engaged_seconds`, `max_scroll` |
| `gallery_image_view` | a photograph is opened in the lightbox | `image_title`, `image_index` |
| `gallery_navigate` | lightbox arrow keys | `direction` |
| `carousel_navigate` | carousel swipe or arrow keys | `carousel`, `method`, `direction` |
| `form_start` | first keystroke in the Get Involved form | `form_name` |
| `form_submit` | the form is submitted | `has_phone`, `has_email`, `message_length` |

Every event also carries `page_path` and `page_title`.

### GA4 setup still needed in the console

Custom parameters only show up in reports once they are registered:
**Admin → Data display → Custom definitions → Create custom dimension**, scope
*Event*, for the parameters worth slicing on — `label`, `section`, `method`,
`direction`, `carousel`, `image_title`, `percent_scrolled`, `link_domain`.
Mark `form_submit` (and `contact_click`, if useful) as a **key event** under
Admin → Events.
