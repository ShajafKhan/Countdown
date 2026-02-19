# Countdown Page

A simple, modern countdown webpage that counts down to a user-defined date and, when finished, redirects the user to a personalized birthday card or event page.

[Click to generate custom url](https://shajafkhan.github.io/Url-Generator/Pages/index.html)
## Features

- **Live Countdown:** Displays the days, hours, minutes, and seconds left until a specified date.
- **Personalization:** Shows the user's name on the page.
- **Automatic Redirect:** When the countdown ends, a button appears to redirect to a personalized page (e.g., birthday card).
- **Parameter Handling:** Accepts name, end date, and redirect URL as query parameters, storing them in local storage for persistence.
- **Responsive Design:** Clean, user-friendly interface that works on desktop and mobile.

## How It Works

1. The page expects three parameters in the URL:
    - `n`: The name to display.
    - `end-date`: The target date/time for the countdown (ISO format recommended, e.g., `2025-08-20T00:00:00`).
    - `birthday-card-url`: The URL to redirect to after the countdown ends.

2. On first load, these parameters are parsed and stored in `localStorage`. The URL is then cleaned for a better user experience.

3. The countdown timer runs, showing the time remaining.

4. Once the countdown reaches zero, a button appears. Clicking it takes the user to the personalized URL.
<!--
## Example Usage

You can generate a link like:

```
https://yourdomain.com/Countdown.html?n=Alice&end-date=2025-12-31T00:00:00&birthday-card-url=https%3A%2F%2Fshajafkhan.github.io/Responsive-Birthday-Card/Pages/index.html%3Fn%3DAlice
```

- The countdown will show for "Alice" and, when finished, redirect to her birthday card.
-->
## Setup

1. Copy `Countdown.html` to your web server.
2. Open with the appropriate parameters in the URL.
3. For generating links, use [Url-Generator](https://github.com/ShajafKhan/Url-Generator/Pages/index.html) or build your own query string.

## Customization

- **Styling:** Edit the `<style>` section in the HTML for custom colors, fonts, or layout.
- **Redirect Button:** Change the button label or behavior in the JavaScript as needed.

## Dependencies

- No external dependencies. Pure HTML, CSS, and JavaScript.

## Related Projects

- [Url-Generator](https://github.com/ShajafKhan/Url-Generator): Quickly create personalized countdown and card URLs.
- [Responsive-Birthday-Card](https://github.com/ShajafKhan/Responsive-Birthday-Card) — Send a digital, animated, and customizable birthday card.

## License

MIT License. See [LICENSE](LICENSE) for details.
