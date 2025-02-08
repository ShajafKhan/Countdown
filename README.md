# Countdown to Event

This repository contains a simple countdown web page that counts down to a specified event date and time. Once the countdown reaches zero, a button appears that redirects the user to a specified event page.

## Features

- Displays the remaining days, hours, minutes, and seconds to the event.
- Automatically updates the countdown every second.
- Shows a message and a button to redirect to an event page once the countdown reaches zero.

## Technologies Used

- HTML
- CSS
- JavaScript

## Installation

To run this project locally, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/ShajafKhan/countdown.git
    ```
2. Navigate to the project directory:
    ```bash
    cd countdown
    ```

## Usage

1. Open the `index.html` file in your preferred web browser.
2. The countdown will automatically start and display the remaining time to the event.
3. Once the countdown reaches zero, a button will appear that redirects you to the specified event page.

## Customization

#### Set a Custom Target Date

To set a custom target date, modify the `targetDate` variable in the `<script>` section of the `index.html` file:

```javascript
const targetDate = new Date('February 20, 2025 00:00:00').getTime();
