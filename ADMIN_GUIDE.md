# Bingo Admin Guide

This guide is for event organizers and administrators to help manage the Bingo event using the Admin Dashboard and Settings panel.

## Accessing the Admin Panel

You can access the admin panel by navigating to `admin.html` in your browser. From there, you can click the 'Settings' button to configure the event.

## The Admin Dashboard

The Admin Dashboard (`admin.html`) provides a high-level overview of the entire event.

### 1. Event Settings & Overview
A collapsible section at the top that displays the current configuration loaded from your CSV or local settings:
*   **Event Name & Codeword**: Basic event identity.
*   **Format & Size**: The game mode (e.g., Clan vs. Clan, Blackout) and grid dimensions (e.g., 5x5, 7x7).
*   **Team Count**: Number of active teams.
*   **Bonuses**: Points awarded for completing Rows, Columns, or Diagonals.
*   **CSV URL**: The source of all game data.

### 2. Points Leaderboard
A real-time ranking of all teams based on their total points.
*   Points include tile values + bingo bonuses.
*   Top 3 teams are highlighted with medals (🥇, 🥈, 🥉).

### 3. Tile Statistics
Insights into how the event is progressing:
*   **Easiest Tiles**: The top 5 most completed tiles across all teams.
*   **Hardest Tiles**: The top 5 least completed tiles (often those with 0 completions).

### 4. Recent Updates
A live feed showing the latest activity.
*   **Live Feed**: Updates automatically when a team completes a tile.

### 5. Team Boards
A grid of mini-boards for every team.
*   Allows you to see the visual state of every team's board at a glance.
*   Clicking a team's card will take you to their specific player view (`index.html?team=TeamX`).

## Settings & Configuration

The Settings page (`settings.html`) is the primary tool for configuring your event. It reads your existing `config.json` and the linked CSV file, populates the fields, and allows you to make changes and export a new `config.json` file to update your event.

### Loading Data
*   When you open `settings.html`, it automatically fetches `config.json` from the root of the website.
*   It then uses the CSV URL found in the config file (specifically from `teams.Team1.url`) to fetch and parse your bingo data sheet.
*   It then uses the `masterCsvUrl` found in `eventConfig` to fetch and parse your bingo data sheet.
*   All the fields on the page (Event Details, Team Names, etc.) are populated from this data.

### Editing & Exporting
*   All fields on this page are editable.
*   You can change the Event Title, Description, Codeword, and even the source CSV URL.
*   Use the dropdowns to set the Format, Board Size, and Team Count.
*   You can also update the names for each team.
*   Team names will be used as keys in the exported `config.json`'s `teams` object.
*   Once you have made your desired changes, click the **Export Config** button. This will generate and download a new `config.json` file containing all your updated settings.

### Deployment
*   To apply your changes, you must manually upload the newly downloaded `config.json` file to the root directory of your web server, replacing the old one.
*   Players will see the updated configuration the next time they load the bingo board.

## Additional Tools

### Public Overview
The Overview page (`overview.html`) is a read-only dashboard suitable for public display or a second monitor. It mirrors the Admin Dashboard's layout but removes all settings and administrative controls.

### Stream Overlay
The Stream Overlay (`overlay.html`) is a widget designed for OBS/Streamlabs.
*   **Features**: Transparent background, auto-cycles between Grid and Leaderboard.
*   **URL Parameters**:
    *   `?team=TeamName`: Select the team to display (e.g., `?team=My%20Awesome%20Team`).
    *   `?cycle=15`: Set the rotation interval in seconds.
    *   `?size=32`: Set the tile size in pixels.

## Gains Tracker

The Gains page (`gains.html`) allows you to compare two snapshots of player data (e.g., start of event vs. end of event) to calculate XP gained or Boss KC achieved.
*   This page is useful for verifying progress or running side-competitions (e.g., "Most XP gained").
*   It parses standard Wise Old Man or CML CSV exports.

---

### Quick Setup Checklist
1.  Create your Google Sheet with the required layout and publish it to CSV.
2.  Create an initial `config.json` file (you can use a basic template or export one from the settings page). Make sure `eventConfig.masterCsvUrl` points to your CSV. Upload it to your server.
3.  Navigate to `settings.html`. The page will load your current configuration.
4.  Modify the settings as needed (Event Name, Team Names, etc.).
5.  Click **Export Config** to download the updated `config.json`.
6.  Upload the new `config.json` to your web server, replacing the old file.